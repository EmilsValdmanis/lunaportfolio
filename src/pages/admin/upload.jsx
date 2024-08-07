import React from "react";
import Dropzone from "./components/dropzone";

const AdminUpload = () => {
    return (
        <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center">
            <Dropzone />
        </div>
    );
};

export default AdminUpload;
