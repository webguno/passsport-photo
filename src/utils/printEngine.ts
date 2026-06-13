import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(elementId: string, format: string | [number, number], orientation: 'portrait' | 'landscape') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Preview element not found');

  const canvas = await html2canvas(element, { scale: 3, useCORS: true, logging: false });
  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('passport_photos.pdf');
}

export async function generateImage(elementId: string, format: 'image/jpeg' | 'image/png' = 'image/jpeg') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Preview element not found');

  const canvas = await html2canvas(element, { scale: 3, useCORS: true, logging: false });
  const ext = format === 'image/jpeg' ? 'jpg' : 'png';
  
  const link = document.createElement('a');
  link.download = `passport_photos.${ext}`;
  link.href = canvas.toDataURL(format, 1.0);
  link.click();
}
