import { ContextType, useContext, useEffect, useState } from "react";
import { CoinsContext } from "../../context";
import { getLocalCoins, setInitialCoins } from "../../utils/localStorageManagment";
import Chart from "../charts/Chart";
import MyChart from "../charts/MyChart";
import Header from "../header/Header";
import Widget from "../widget/Widget";
import './Container.sass'


const Container = () => {

    const contextCoins: string[] | undefined = useContext(CoinsContext)?.context

    return (<>
        {/* <Header /> */}
        <div className="container">
            {/* <ul className="container__ul">
                {contextCoins && contextCoins.length ? (
                    contextCoins.map((item: string, index: number) => (
                        <li key={index} className="container__li">
                            <Widget id={item} />
                        </li>
                    ))
                ) : (
                    <div>ni mo</div>
                )}
            </ul> */}
            <Chart />
            {/* <MyChart /> */}
        </div>
        </>
    );
};

export default Container;
