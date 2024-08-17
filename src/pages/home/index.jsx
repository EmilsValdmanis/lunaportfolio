import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { storage } from "../../utils/firebase.utils";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import Loading from "../../components/loading";
import ExpandableImage from "./expandable-image";
import ProgressBar from "./scroll-progress";
import {
    format,
    parseISO,
    startOfMonth,
    compareDesc,
    eachMonthOfInterval,
    startOfYear,
    endOfYear,
} from "date-fns";
import { ChevronLeft, ChevronRight, X, CalendarArrowDown } from "lucide-react";
import { useOutsideClick } from "../../hooks/use-outside-click";

const groupImagesByMonth = (imagesArray) => {
    const grouped = imagesArray.reduce((acc, image) => {
        const month = format(
            startOfMonth(parseISO(image.createdAt)),
            "yyyy-MM",
        );
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(image);
        return acc;
    }, {});

    Object.keys(grouped).forEach((month) => {
        grouped[month].sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
        );
    });

    return Object.keys(grouped)
        .sort((a, b) => compareDesc(new Date(a), new Date(b)))
        .reduce((sortedGrouped, month) => {
            sortedGrouped[month] = grouped[month];
            return sortedGrouped;
        }, {});
};

const formatMonthTitle = (month) => {
    const date = parseISO(`${month}-01`);
    return format(date, "MMMM yyyy");
};

const Home = () => {
    const [allImages, setAllImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const monthRefs = useRef({});
    const dialogRef = useRef(null);

    useOutsideClick(dialogRef, () => setDialogOpen(false));

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
        fetchImages();
    }, []);

    const scrollToMonth = (month) => {
        if (monthRefs.current[month]) {
            const topPosition =
                monthRefs.current[month].getBoundingClientRect().top +
                window.scrollY;
            window.scrollTo({
                top: topPosition - 144,
                behavior: "smooth",
            });
        }
    };

    const monthsOfYear = eachMonthOfInterval({
        start: startOfYear(new Date(selectedYear, 0)),
        end: endOfYear(new Date(selectedYear, 11)),
    });

    return (
        <div>
            {loading ? (
                <Loading type="spin" color="#000" height={50} width={50} />
            ) : (
                <div className="flex flex-col gap-10">
                    <ProgressBar />
                    {Object.keys(allImages).map((month) => (
                        <div
                            key={month}
                            ref={(el) => (monthRefs.current[month] = el)}
                        >
                            <div className="m-auto flex max-w-7xl flex-col gap-6">
                                <h2
                                    className="cursor-pointer font-calligraphy text-4xl"
                                    onClick={() => {
                                        setDialogOpen(true);
                                        setSelectedMonth(month);
                                    }}
                                >
                                    {formatMonthTitle(month)}
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {allImages[month].map(
                                        (image, imageIndex) => (
                                            <div key={`${month}-${imageIndex}`}>
                                                <ExpandableImage
                                                    image={image}
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {dialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div
                        className="flex flex-col gap-6 rounded-xl bg-gray-400 bg-opacity-30 bg-clip-padding p-6 shadow-lg backdrop-blur-md backdrop-filter"
                        ref={dialogRef}
                    >
                        <div className="flex items-center justify-between">
                            <button
                                className="cursor-pointer rounded-xl bg-gray-200 bg-opacity-10 bg-clip-padding p-2 text-white shadow-lg backdrop-blur-md backdrop-filter"
                                onClick={() =>
                                    setSelectedYear(selectedYear - 1)
                                }
                            >
                                <ChevronLeft />
                            </button>
                            <span className="text-xl font-bold text-white">
                                {selectedYear}
                            </span>
                            <button
                                className="cursor-pointer rounded-xl bg-gray-200 bg-opacity-10 bg-clip-padding p-2 text-white shadow-lg backdrop-blur-md backdrop-filter"
                                onClick={() =>
                                    setSelectedYear(selectedYear + 1)
                                }
                            >
                                <ChevronRight />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {monthsOfYear.map((date) => {
                                const monthKey = format(date, "yyyy-MM");
                                const hasImages = allImages[monthKey];
                                return (
                                    <div
                                        key={monthKey}
                                        className={`flex items-center gap-2 rounded-xl p-3 text-white shadow-lg backdrop-blur-md backdrop-filter ${
                                            hasImages
                                                ? monthKey === selectedMonth
                                                    ? "cursor-pointer bg-gray-50 bg-opacity-30"
                                                    : "cursor-pointer bg-gray-200 bg-opacity-10"
                                                : "cursor-not-allowed opacity-50"
                                        }`}
                                        onClick={() => {
                                            if (hasImages) {
                                                scrollToMonth(monthKey);
                                                setDialogOpen(false);
                                            }
                                        }}
                                    >
                                        {format(date, "MMMM")}
                                        {monthKey ===
                                            format(new Date(), "yyyy-MM") && (
                                            <CalendarArrowDown className="absolute right-2 top-2 size-4" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <motion.button
                            initial={{
                                opacity: 0,
                                rotate: -15,
                                y: -10,
                                x: "-100%",
                            }}
                            animate={{
                                opacity: 1,
                                rotate: 0,
                                y: 0,
                                x: "100%",
                                transition: {
                                    stiffness: 300,
                                    damping: 10,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, 10, -10, 10, 0],
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            whileTap={{ scale: 0.8 }}
                            className="absolute right-0 top-0 -mr-2 hidden cursor-pointer rounded-full bg-gray-200 bg-opacity-20 bg-clip-padding p-2 shadow-lg backdrop-blur-md backdrop-filter sm:block"
                            onClick={() => setDialogOpen(false)}
                            style={{ pointerEvents: "auto" }}
                        >
                            <X className="size-6" />
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
