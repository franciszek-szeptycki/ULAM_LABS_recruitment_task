import "./LoadingSpinner.sass";

const LoadingSpinner = (props: { x: string; y: string; border: string }) => {
    const { x, y, border } = props;
    return (
        <div className="loading-spinner">
            <div
                className="loading-spinner__item"
                style={{ width: x, height: y, borderWidth: border}}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
