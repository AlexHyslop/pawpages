import React from "react";
import Success from "./booking-thankyou-success.component";
import Failed from "./booking-thankyou-failed.component";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ThankYou() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    
    const success = 'Thank you for your order';
    const failed = 'There\'s been a problem with your order';

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
                <div className="container m-0-auto pt-10">
                    <h2 className={`mt-10 text-left text-4xl font-medium leading-9 tracking-tight`}>
                        {status === 'success' ? success : failed}
                    </h2>
                </div>
                <div className="container m-0-auto pt-10">
                    {status === 'success' ? <Success /> : <Failed />}   
                </div>
                <div className="text-center mt-10">
                    <Link className="button" to="/">Back Home</Link>
                </div>
            </div>
        </>
    );
}
