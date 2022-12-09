import Search from "./components/search/Search";
import Container from "./components/container/Container";
import { createContext, useContext, useState } from "react";
import "./App.sass";
import { CoinsContext, initCoinsContext } from "./context";
// import { CoinsContext, initCoinsContext } from "./context";

const App = () => {
    const [panelMode, setPanelMode] = useState(1);
    const handlePanelMode = () => {
        const nextMode = panelMode === 1 ? 2 : 1
        setPanelMode(nextMode)
    }

    const coinContext = () => initCoinsContext()
    const [coinsContextValue, setCoinsContextValue] = useState(coinContext)

    return (
        <CoinsContext.Provider value={{context: coinsContextValue, setContext: setCoinsContextValue}}>
            <div className="App">
            <div className={`wrapper panel-mode${panelMode}`}>
                <aside className="aside">
                    <button
                        className="toggle"
                        onClick={handlePanelMode}
                    >
                        toggle
                    </button>
                    <Search />
                </aside>
                <main className="main">
                    <Container />
                </main>
            </div>
        </div>
        </CoinsContext.Provider>
    );
};

export default App;
