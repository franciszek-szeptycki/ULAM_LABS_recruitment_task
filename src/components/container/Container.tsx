import { useEffect, useState } from "react";
import { getLocalCoins, setInitialCoins } from "../../utils/manageLocalStorage";
import Widget from "../widget/Widget";

const Container = () => {
    const [currencies, setCurrencies] = useState(getLocalCoins());

    useEffect(() => {
        const localCoins = getLocalCoins();

        if (!localCoins.length) {
            setInitialCoins();
            setCurrencies(getLocalCoins);
        }
    }, []);

    return (
        <div className="container">
            <ul className="container__ul">
                {currencies.length ? (
                    currencies.map((item, index) => (
                        <li key={index} className="container__li">
                            <Widget id={item} index={index} />
                        </li>
                    ))
                ) : (
                    <div>ni mo</div>
                )}
            </ul>
        </div>
    );
};

export default Container;
