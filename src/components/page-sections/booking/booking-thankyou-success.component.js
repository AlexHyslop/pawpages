import React from "react";
import QuoteDisplay from '../../quotes/quote-display.component';
import { useSelector } from "react-redux";
export default function Success() {
    const order = useSelector((state) => state?.booking);   
    
    function base64ToBlob(base64, contentType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }

    function downloadPDF(base64String, fileName) {
        const contentType = 'application/pdf';
        const blob = base64ToBlob(base64String, contentType);
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        URL.revokeObjectURL(url); 
    }

    const handleDownload = (base64String, fileName) => {
        downloadPDF(base64String, fileName);
      };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 border p-6">
            <div className="col-span-3"> 
                <h2 className="text-2xl text-gray-500">Your order has been placed. Details of your order will be emailed to you shortly.</h2>
     
                <h3 className="text-2xl mt-10 font-bold pb-5 col-span-1 gap-x-2">Labels: </h3>
                {order?.Labels?.map((label, index) => (
                    label.LabelFormat == "PDF" ? 
                    <button key={index} className="button m-3" onClick={(e) => handleDownload(label.LabelContent, "label.pdf")}>
                        Download {label.LabelRole} {label.LabelSize} {label.LabelFormat}
                    </button>
                : null
                ))}
 
                {/* Packing list is only for admins  */}
                {/* <button onClick={(e) => handleDownload(order.Documents[0].Content, "packing-list.pdf" )}>
                    Download Packing List
                </button> */}
                <div>
                    <h3 className="text-2xl mt-5 font-bold inline-block pr-2"> Tracking URL: </h3>
                    <a className="text-xl inline-block" href="#">{ order?.TrackingURL }</a>
                </div>
                
                <div>
                    <h3 className="text-2xl mt-5 font-bold inline-block pr-2"> Order reference: </h3>
                    <a className="text-xl inline-block" href="#">{order?.OrderReference}</a>
                </div>
                
                <h3 className="text-2xl mt-10 font-bold pb-5 col-span-1 gap-x-2">Confirmation: </h3>
                <div className="md:grid md:grid-cols-1 border-2 border-b-0 border-solid border-gray-500">
        
                    <div className="border-b-2 border-solid border-gray-500 p-5">
                        <p className="text-base">
                            Description: {order?.OrderInvoice.InvoiceItems[0].ItemDescription}
                        </p> 
                    </div> 
                </div>
            </div>
            <div className="col-span-1">
                <QuoteDisplay /> 
            </div>
        </div>
    );

    
}
