import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import { QRCodeSVG } from "qrcode.react";
import Modal from "../../components/Modal";

export default function CardListing() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any>([{}]);
  const [itemToDeleteID, setItemToDelteID] = useState(0);

  const handleDownloadQR = () => {
    const svg = document.querySelector("#qr-code");
    if (!svg) {
      return;
    }
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(source);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 300;
      canvas.height = img.height || 300;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const jpegUrl = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = jpegUrl;
      link.download = "qr-code.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const getCardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}cards/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      const cardData = await response.json();

      setCards(cardData);

      console.log(cardData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}cards/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      getCardData();
    }
  };

  const handleModalOpen = (cardID: number) => {
    setItemToDelteID(cardID);
    let modal:any = document.getElementById("my_modal_1");

    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="w-[100%] h-[400px] mt-20 flex flex-col justify-center items-center">
          <p className="mb-2">Loading Card...</p>
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex w-[100%] mb-10">
        <a className="btn" href="dashboard/cards/new">
          Create New Card
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </a>
      </div>
      <div className="flex flex-wrap gap-20">
        {cards.map(({ id, data }: any) => {
          return (
            <div key={id} className="card bg-base-100 w-96 shadow-lg">
              <figure className="mt-5">
                <QRCodeSVG
                  id="qr-code"
                  width="200"
                  height="200"
                  value={`${import.meta.env.VITE_BASE_URL}cards/${id}`}
                />
              </figure>
              <div className="card-body">
                <div className="badge badge-soft badge-primary">
                  Virtual Card
                </div>
                <div className="font-bold mt-4">Owner: {data?.name}</div>
                <div className="flex items-center mt-4">
                  <p>Edit Card</p>
                  <a
                    className="tooltip"
                    data-tip="Edit"
                    href={`dashboard/cards/${id}/edit`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </a>
                </div>
                <div className="flex items-center">
                  <p>Delete Card</p>
                  <button
                    className="tooltip"
                    data-tip="Delete"
                    onClick={() => handleModalOpen(id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                <div className="card-actions justify-center mt-8">
                  <a className="btn btn-primary" href={`dashboard/cards/${id}`}>
                    View Card
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={handleDownloadQR}
                  >
                    Download QR
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal onDelete={() => handleCardDelete(itemToDeleteID)}></Modal>
    </>
  );
}
