import Search from "./components/search/Search";
import Container from "./components/container/Container";
import { useState } from "react";
import "./App.sass";
import { CoinsContext, initCoinsContext } from "./context";
import Header from "./components/header/Header";
import Chart from "./components/charts/Chart";

const App = () => {
    const [panelMode, setPanelMode] = useState(1);

    const [coinsContextValue, setCoinsContextValue] = useState(
        initCoinsContext()
    );
    const handleChangeCoinsValue = (data: string[]) => {
        setCoinsContextValue(data);
    };

    return (
        <CoinsContext.Provider
            value={{
                context: coinsContextValue,
                setContext: handleChangeCoinsValue,
            }}
        >
            <div className="App">
                <aside className="aside">
                    <Search />
                    <Container />
                </aside>
                <main className="main">
                    <Chart />
                </main>
            </div>
        </CoinsContext.Provider>
    );
};

export default App;
