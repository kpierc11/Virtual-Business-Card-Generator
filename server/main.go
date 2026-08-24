package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *pgxpool.Pool

type CardData struct {
	ID   string `json:"id"`
	Data any    `json:"data,omitempty"`
}

func listCards(c *gin.Context) {

	rows, err := db.Query(context.Background(), `SELECT card_id, card_data FROM virtual_cards`)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var cards []CardData

	for rows.Next() {
		var card CardData

		err := rows.Scan(
			&card.ID,
			&card.Data,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Couldn't read card",
			})
			return
		}

		cards = append(cards, card)

	}

	c.JSON(http.StatusOK, cards)
}

func createCard(c *gin.Context) {
	var card CardData

	if err := c.BindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jsonData, err := json.Marshal(card)

	fmt.Printf("Body: %v", jsonData)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to encode JSON"})
		return
	}

	sqlStatement := `INSERT INTO virtual_cards (card_data) VALUES ($1)`

	_, dbError := db.Exec(context.Background(), sqlStatement, card.Data)
	if dbError != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Record Added",
	})
}

func getCard(c *gin.Context) {

	id := c.Param("id")
	var card CardData

	err := db.QueryRow(context.Background(), "SELECT card_id, card_data FROM virtual_cards WHERE card_id = $1", id).Scan(&card.ID, &card.Data)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, card)
}

func editCard(c *gin.Context) {

	id := c.Param("id")
	var card CardData

	if err := c.ShouldBindJSON(&card.Data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sqlStatement := `UPDATE virtual_cards SET card_data = $2 WHERE card_id = $1`

	_, dbError := db.Exec(context.Background(), sqlStatement, id, card.Data)
	if dbError != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Record Updated",
	})
}

func deleteCard(c *gin.Context) {
	id := c.Param("id")

	sqlStatement := `DELETE FROM virtual_cards WHERE card_id = $1`

	_, dbError := db.Exec(context.Background(), sqlStatement, id)
	if dbError != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Record Deleted",
	})
}

func RegisterCardRoutes(rg *gin.RouterGroup) {
	cards := rg.Group("/cards")
	{
		cards.GET("/", listCards)
		cards.POST("/", createCard)
		cards.GET("/:id", getCard)
		cards.PUT("/:id", editCard)
		cards.DELETE("/:id", deleteCard)
	}
}

func main() {

	if os.Getenv("FLY_REGION") == "" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Println("No .env file found, continuing with existing environment variables")
		}
	}

	dsn, exists := os.LookupEnv("DATABASE_URL")
	if !exists {
		log.Fatalf("Couldn't find env variable")
	}

	var dbError error
	db, dbError = pgxpool.New(context.Background(), dsn)
	if dbError != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", dbError)
		os.Exit(1)
	}

	if dbError = db.Ping(context.Background()); dbError != nil {
		log.Fatal("Couldn't connect to database:", dbError)
	}

	defer db.Close()

	router := gin.Default()
	router.SetTrustedProxies([]string{"localhost:5173"})

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173", "https://superfreevirtualbusinesscards.netlify.app"}
	config.AllowCredentials = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	router.Use(cors.New(config))

	api := router.Group("/v1")
	RegisterCardRoutes(api)

	router.Run("[::]:8080")
}
