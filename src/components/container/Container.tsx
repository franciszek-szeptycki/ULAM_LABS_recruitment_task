import { ContextType, useContext, useEffect, useState } from "react";
import { CoinsContext } from "../../context";
import { getLocalCoins, setInitialCoins } from "../../utils/manageLocalStorage";
import Widget from "../widget/Widget";


const Container = () => {

    const coinsList: string[] | undefined = useContext(CoinsContext)?.context

    return (
        <div className="container">
            <ul className="container__ul">
                {coinsList && coinsList.length ? (
                    coinsList.map((item: string, index: number) => (
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
