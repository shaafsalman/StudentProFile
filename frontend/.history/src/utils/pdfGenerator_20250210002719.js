import html2pdf from 'html2pdf.js';

export const generatePdf = async ({ element, filename, options }) => {
  const opt = {
    margin: options.margin || 10,
    filename: filename || 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { 
      unit: 'mm', 
      format: options.format || 'a4', 
      orientation: 'portrait' 
    }
  };

  return html2pdf().set(opt).from(element).save();
};