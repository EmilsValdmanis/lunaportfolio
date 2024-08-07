import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ user }) => {
    return (
        <footer className="flex w-full flex-col items-center justify-between gap-2 bg-gray-100 p-10 font-calligraphy text-2xl md:flex-row md:text-3xl">
            {!user && (
                <Link
                    to={"/admin/login"}
                    className="border-b-2 border-transparent hover:border-orange-500"
                >
                    Login to upload an image
                </Link>
            )}
            <p>
                <span className="text-xl">©</span> Luna. All rights reserved
            </p>
        </footer>
    );
};

export default Footer;
