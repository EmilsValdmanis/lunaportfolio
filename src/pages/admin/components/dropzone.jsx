import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudImage from "../../../assets/upload.svg";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../utils/firebase.utils";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading";

function Dropzone() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadFile] = useUploadFile();
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    const UploadAllFiles = async () => {
        setIsUploading(true);
        await Promise.all(selectedFiles.map((file) => uploadImage(file)));
        navigate("/");
    };

    const uploadImage = async (file) => {
        try {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            await new Promise((resolve) => {
                image.onload = resolve;
            });

            const canvas = document.createElement("canvas");
            const maxWidth = 1200;
            const maxHeight = 1200;
            let newWidth = image.width;
            let newHeight = image.height;

            if (image.width > maxWidth || image.height > maxHeight) {
                const aspectRatio = image.width / image.height;

                if (aspectRatio > 1) {
                    newWidth = maxWidth;
                    newHeight = maxWidth / aspectRatio;
                } else {
                    newHeight = maxHeight;
                    newWidth = maxHeight * aspectRatio;
                }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, newWidth, newHeight);

            const compressedDataURL = canvas.toDataURL("image/jpeg", 0.9);
            const blob = await fetch(compressedDataURL).then((res) =>
                res.blob(),
            );
            await uploadFile(ref(storage, file.name), blob, {
                contentType: "image/jpeg",
            });
        } catch (error) {
            console.error("Error uploading compressed image:", error);
        }
    };

    if (isUploading) return <Loading />;

    return (
        <div className="flex w-full flex-col items-center justify-center gap-10">
            <div
                {...getRootProps()}
                className="flex w-full max-w-xl flex-col items-center gap-2 rounded-2xl bg-gray-100 p-10"
            >
                <img
                    src={CloudImage}
                    alt="Upload"
                    className="h-16 w-16 text-orange-500 opacity-70"
                />
                <input {...getInputProps()} />
                <div className="text-extrabold">
                    {isDragActive ? (
                        <p>Drop those pictures right here...</p>
                    ) : (
                        <p>
                            Drop your files here, or{" "}
                            <span className="text-orange-500">browse</span>
                        </p>
                    )}
                </div>
                <p className="text-sm opacity-60">
                    PNG and JPEG files are allowed
                </p>
            </div>
            {selectedFiles.length > 0 && (
                <>
                    <button
                        className="w-full rounded-lg bg-orange-500 px-10 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 sm:w-auto"
                        onClick={UploadAllFiles}
                    >
                        Upload files
                    </button>
                    <div className="grid max-w-xl grid-cols-3 gap-2">
                        {selectedFiles.map((file) => (
                            <img
                                key={file.name}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="rounded-xl"
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Dropzone;
