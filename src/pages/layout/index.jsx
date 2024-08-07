import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.utils";
import Loading from "../../components/loading";

const Layout = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <div className="flex flex-col w-screen min-h-screen">
            <Navbar user={user} />
            <main className="grow p-10 flex flex-col bg-grey-50">
                {loading ? (
                    <Loading />
                ) : (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                )}
            </main>
            <Footer user={user} />
        </div>
    );
};

export default Layout;
