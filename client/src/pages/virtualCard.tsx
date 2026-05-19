import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../../components/Card";

export default function VirtualCard() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    color: "",
    websiteLink: "",
    companyName: "",
    jobTitle: "",
    previewBackgroundImage: "",
    previewImage: "",
  });

  const getCardData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}get-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        return;
      }

      const cardData = await response.json();

      setFormData(cardData.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  function handleVcfDownload(event: any): void {
    event.preventDefault();

    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${formData.name};;;;`,
      `FN:${formData.name}`,
      `ORG:${formData.companyName}`,
      `TITLE:${formData.jobTitle}`,
      `TEL;TYPE=CELL:${formData.phone}`,
      `EMAIL:${formData.email}`,
      "ADR;TYPE=HOME:;;123 Main St;Bristol;VA;24201;USA",
      `URL:${formData.websiteLink}`,
      "BDAY:19900101",
      "NOTE:Met at tech conference",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf";
    a.click();

    URL.revokeObjectURL(a.href);
  }

  return (
    <Card
      name={formData.name}
      email={formData.email}
      phone={formData.phone}
      color={formData.color}
      websiteLink={formData.websiteLink}
      companyName={formData.companyName}
      jobTitle={formData.jobTitle}
      previewBackgroundImage={formData.previewBackgroundImage}
      previewImage={formData.previewImage}
      handleVcfDownload={() => handleVcfDownload}
    ></Card>
  );
}
