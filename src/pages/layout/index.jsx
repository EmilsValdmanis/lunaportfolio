import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.utils";
import Loading from "../../components/loading";
import ScrollButton from "../../components/scroll-button";

const Layout = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <Navbar user={user} />
            <main className="bg-grey-50 flex grow flex-col p-10">
                <ScrollButton />
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
