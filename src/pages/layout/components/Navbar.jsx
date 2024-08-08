import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../utils/firebase.utils";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const logoutUser = async (e) => {
        e.preventDefault();
        await signOut(auth);
        navigate("/");
    };

    const linkVariants = {
        initial: {
            y: -100,
        },
        animate: {
            y: 0,
            transition: {
                type: "ease",
                stiffness: 100,
                damping: 10,
            },
        },
        hover: {
            scale: 1.1,
            rotate: [0, 5, -5, 5, 0],
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    };

    return (
        <div className="supports-[backdrop-filter]:bg-background/60 top-0 z-50 w-full bg-gray-100/80 backdrop-blur md:sticky">
            <div className="flex w-full flex-col items-center justify-between gap-2 px-16 py-8 font-calligraphy md:flex-row">
                <motion.div
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <Link
                        to={`/`}
                        className="border-b-2 border-transparent text-4xl hover:border-orange-500"
                    >
                        Luna
                    </Link>
                </motion.div>
                <div className="flex gap-8 text-2xl md:text-3xl">
                    <motion.div
                        variants={linkVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <Link
                            to={`/`}
                            className="border-b-2 border-transparent hover:border-orange-500"
                        >
                            Home
                        </Link>
                    </motion.div>
                    <motion.div
                        variants={linkVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <Link
                            to={`/about`}
                            className="border-b-2 border-transparent hover:border-orange-500"
                        >
                            About
                        </Link>
                    </motion.div>
                    {user && (
                        <>
                            <motion.div
                                variants={linkVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <Link
                                    to={"/admin/upload"}
                                    className="border-b-2 border-transparent hover:border-orange-500"
                                >
                                    Upload
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={linkVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <button
                                    onClick={logoutUser}
                                    className="border-b-2 border-transparent hover:border-orange-500"
                                >
                                    Log out
                                </button>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
