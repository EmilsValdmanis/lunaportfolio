import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className="flex w-full justify-center">
            <ReactLoading type={"spin"} color="#F69329" />
        </div>
    );
};

export default Loading;
