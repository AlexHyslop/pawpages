import React from "react";

export default function Success() {

    return (
        <>
            <h2 className="text-2xl text-gray-500">Your order (number here) has been placed. Details of your order will shortly be emailed to you</h2>

            <h3 className="text-2xl mt-5 font-bold inline-block pr-2"> Your tracking number : </h3>
            <a className="text-xl inline-block" href="#">1234566576e</a>

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
                    <div className="border-y-2 border-solid border-gray-500 p-10">
                        <p className="text-base">
                            Item Name: Name Here
                        </p>
                        <p className="text-base">
                            Item Weight: Weight Here
                        </p>
                        <p className="text-base">
                            More Details: ...
                        </p>
                    </div>
                    <div className="border-y-2 border-solid border-gray-500 p-10">
                        <p className="text-base">
                            Item Name: Name Here
                        </p>
                        <p className="text-base">
                            Item Weight: Weight Here
                        </p>
                        <p className="text-base">
                            More Details: ...
                        </p>
                    </div>
                    <div className="border-y-2 border-solid border-gray-500 p-10">
                        <p className="text-base">
                            Item Name: Name Here
                        </p>
                        <p className="text-base">
                            Item Weight: Weight Here
                        </p>
                        <p className="text-base">
                            More Details: ...
                        </p>
                    </div>
            </div>
        </>
    );
}
