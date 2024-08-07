import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [user] = useAuthState(auth);

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    };

    if (user) {
        navigate("/");
    }

    return (
        <form className="m-auto flex w-full max-w-md flex-col gap-4 rounded-3xl bg-gray-100 p-10 shadow-lg">
            {notice && <p className="text-orange-500">{notice}</p>}
            <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Username"
                value={email}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 focus:ring-orange-500"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 focus:ring-orange-500"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={login}
                className="w-full rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 sm:w-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default AdminLogin;
