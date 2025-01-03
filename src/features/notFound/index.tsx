import React from "react";  
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div>
            <h1>Oops ... Something went wrong</h1>
            <Link to="/">Go to home page</Link>
        </div>
    );
};  

export default NotFound;