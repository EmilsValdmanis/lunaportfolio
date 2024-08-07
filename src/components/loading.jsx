import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className="flex w-full justify-center">
            <ReactLoading type={"bubbles"} color="#F69329" />
        </div>
    );
};

export default Loading;
