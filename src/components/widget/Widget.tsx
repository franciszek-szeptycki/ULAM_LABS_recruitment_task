import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCoinInfo } from "../../api/coinAPI";
import WidgetError from "./WidgetError";
import "./Widget.sass";
import LoadingSpinner from "../loading-sign/LoadingSpinner";
import { removeLocalCoin } from "../../utils/localStorageManagment";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";
import Chart from "../charts/Chart";

const Widget = (props: { id: string }) => {
    const { id } = props;

    const [content, setContent] = useState<any>();

    const { isRefetching, status } = useQuery(
        `get-${id}-info`,
        () => getCoinInfo(id),
        {
            onSuccess: (data) => {
                setContent(data.data);
            },
        }
    );

    const setCoinsContext = useContext(CoinsContext).setContext;

    const handleCloseBtn = () => {
        const localCoins = removeLocalCoin(id);
        setCoinsContext(localCoins);
    };

    switch (status) {
        case "loading":
            return (
                <div className="widget" style={{ position: "relative" }}>
                    <LoadingSpinner x="40px" y="40px" border="5px" />
                </div>
            );

        case "success":
            if (isRefetching) return <></>;

            const rndCol: string = convertString(id);

            return (
                <div className="widget">
                    <div className="widget__shortcut">
                        <div className="widget__shortcut-img-wrapper">
                            <img
                                src={content.image.small}
                                alt={`${id} logo`}
                                className="widget__shortcut-img"
                            />
                        </div>
                        <p className="widget__shortcut-info">
                            <p className="widget__shortcut-info-symbol">
                                {content.symbol}
                            </p>
                            <p className="widget__shortcut-info-name">
                                {content.name}
                            </p>
                        </p>
                    </div>
                    <div className="widget__price">
                        {content.market_data.current_price["usd"]} USD
                    </div>
                    <button className="widget__close" onClick={handleCloseBtn}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            );
        default:
            return <WidgetError />;
    }
};

export default Widget;
