import React from "react";
import Dropzone from "./components/dropzone";

const AdminUpload = () => {
    return (
        <div className="grow flex flex-col w-full max-w-7xl mx-auto justify-center">
            <Dropzone />
        </div>
    );
};

export default AdminUpload;
