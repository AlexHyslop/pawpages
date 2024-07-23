import React from "react";

export default function Success() {

    const orderNumber = '1235o';
    const trackingNumber = '1234t';
    const labelDownload = 'https://staging2.services3.transglobalexpress.co.uk/Download/Label/5Dc8uZc_x9eQK_amE22Rhz~kx4r03_6iJygKHKN9WtfUIWyGoaiI_3OodoPKzED1cBPKxnkAOMgnFj06ZjE98Q==/';

    const items = [
        {
            itemName: 'Name Here',
            itemWeight: 'Weight Here',
            moreDetails: '...'
        },
        {
            itemName: 'Name Here',
            itemWeight: 'Weight Here',
            moreDetails: '...'
        },
        {
            itemName: 'Name Here',
            itemWeight: 'Weight Here',
            moreDetails: '...'
        }
    ];
    

    return (
        <>
            <h2 className="text-2xl text-gray-500">Your order has been placed. Details of your order will be emailed to you shortly.</h2>

            <div className="mt-5">
                <a className="button" href={labelDownload}>Donwload Label</a>
            </div>

            <div>
                <h3 className="text-2xl mt-5 font-bold inline-block pr-2"> Your tracking number : </h3>
                <a className="text-xl inline-block" href="#">{trackingNumber}</a>
            </div>
            
            <div>
                <h3 className="text-2xl mt-5 font-bold inline-block pr-2"> Your order number : </h3>
                <a className="text-xl inline-block" href="#">{orderNumber}</a>
            </div>
            

            <div className="md:grid md:grid-cols-2 pb-5">
                <div className="col-span-2 pb-5">
                    <h2 className="text-2xl mt-10 font-bold">Delivery Details</h2>
                </div>
                <div className="pb-5">
                    <p className="text-xl text-gray-500">Sending From:</p>
                </div>
                <div className="pb-5">
                    <p className="text-xl text-gray-500">Going to:</p>
                </div>
            </div>
            <div className="pb-10 md:grid md:grid-cols-3 gap-x-5">
                 <h2 className="text-2xl mt-10 font-bold pb-5 col-span-3 gap-x-2">Items Include:</h2>
                    {items.map((item, index) => (
                        <div key={index} className="border-y-2 border-solid border-gray-500 p-10">
                        <p className="text-base">
                            Item Name: {item.itemName}
                        </p>
                        <p className="text-base">
                            Item Weight: {item.itemWeight}
                        </p>
                        <p className="text-base">
                            More Details: {item.moreDetails}
                        </p>
                    </div>
                    ))}
            </div>
        </>
    );
}
