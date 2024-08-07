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
        <form className="p-10 bg-gray-100 w-full max-w-md rounded-3xl flex flex-col gap-4 m-auto shadow-lg">
            {notice && <p className="text-orange-500">{notice}</p>}
            <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Username"
                value={email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 focus:outline-none focus:ring-0"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 focus:outline-none focus:ring-0"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={login}
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Submit
            </button>
        </form>
    );
};

export default AdminLogin;
