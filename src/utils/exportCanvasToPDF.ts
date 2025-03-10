import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportCanvasToPDF = async () => {
    // Get the canvas element
    const canvasElement = document.querySelector(".canvas") as HTMLElement;
  
    if (!canvasElement) return;
  
    // Use html2canvas to capture the canvas content
    const canvas = await html2canvas(canvasElement, {
      logging: false,
      useCORS: true,
      scale: 2,
    });
  
    // Create PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("raspored-sedenja.pdf");
  };

  export default exportCanvasToPDF