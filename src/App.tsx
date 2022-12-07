import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { getCryptoPrices } from './api/cryptoData'
import { useQuery } from "react-query";


const App = () => {

    const [cryptoCurrencies, setCryptoCurrencies] = useState<any>()

    const { status } = useQuery('get-crypto-data', () => {
        return getCryptoPrices("bitcoin", "usd")
    }, {
        onSuccess: (newData) => {
            setCryptoCurrencies(newData)
        }
    })

    console.log(cryptoCurrencies)

    return (
        <div className="App">
            haha
        </div>
    );
}

export default App;
