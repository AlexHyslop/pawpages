import React from "react";
import { Link } from "react-router-dom";

export default function Failed() {

    return (
        <>
            <p className="">Please try again or note the below error code and <Link to="/contact">contact us</Link> for help.</p>
            <p>Error code: </p>
        </>
    );
}
