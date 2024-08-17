import React, { useState, useEffect } from "react";
import { storage } from "../../utils/firebase.utils";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import Loading from "../../components/loading";
import ExpandableImage from "./expandable-image";
import ProgressBar from "./scroll-progress";

const groupImagesByMonth = (imagesArray) =>
    imagesArray.reduce((groupedImages, image) => {
        const month = image.createdAt.split("T")[0].substring(0, 7);
        groupedImages[month] = [...(groupedImages[month] || []), image];
        return groupedImages;
    }, {});

const formatMonthTitle = (month) => {
    const [year, monthNum] = month.split("-");
    const monthName = new Date(`${year}-${monthNum}-01`).toLocaleString(
        "default",
        { month: "long" },
    );
    return `${monthName} ${year}`;
};

const Home = () => {
    const [allImages, setAllImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        try {
            const result = await listAll(ref(storage, "/"));
            const imagesDataArray = await Promise.all(
                result.items.map(async (imageRef) => {
                    const imageUrl = await getDownloadURL(imageRef);
                    const metadata = await getMetadata(imageRef);
                    const imageName = metadata.name;
                    const createdAt = metadata.timeCreated;

                    return { url: imageUrl, name: imageName, createdAt };
                }),
            );
            setAllImages(groupImagesByMonth(imagesDataArray));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching images:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchImages();
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <Loading type="spin" color="#000" height={50} width={50} />
            ) : (
                <div className="flex flex-col gap-8">
                    <ProgressBar />
                    {Object.keys(allImages)
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map((month, monthIndex) => (
                            <div key={month}>
                                <div className="m-auto flex max-w-7xl flex-col gap-6">
                                    <h2 className="font-calligraphy text-4xl">
                                        {formatMonthTitle(month)}
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                        {allImages[month]
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.createdAt) -
                                                    new Date(a.createdAt),
                                            )
                                            .map((image, imageIndex) => (
                                                <div
                                                    key={`${month}-${imageIndex}`}
                                                >
                                                    <ExpandableImage
                                                        image={image}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Home;
