import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../utils/firebase.utils";
import { signOut } from "firebase/auth";

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const logoutUser = async (e) => {
        e.preventDefault();
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="supports-[backdrop-filter]:bg-background/60 top-0 z-50 w-full bg-gray-100/80 backdrop-blur md:sticky">
            <div className="flex w-full flex-col items-center justify-between gap-2 px-16 py-8 font-calligraphy md:flex-row">
                <Link
                    to={`/`}
                    className="border-b-2 border-transparent text-4xl hover:border-orange-500"
                >
                    Luna
                </Link>
                <div className="flex gap-8 text-2xl md:text-3xl">
                    <Link
                        to={`/`}
                        className="border-b-2 border-transparent hover:border-orange-500"
                    >
                        Home
                    </Link>
                    <Link
                        to={`/about`}
                        className="border-b-2 border-transparent hover:border-orange-500"
                    >
                        About
                    </Link>
                    {user && (
                        <>
                            <Link
                                to={"/admin/upload"}
                                className="border-b-2 border-transparent hover:border-orange-500"
                            >
                                Upload
                            </Link>
                            <button
                                onClick={logoutUser}
                                className="border-b-2 border-transparent hover:border-orange-500"
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
