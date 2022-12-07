import Search from "./components/search/Search";
import Container from "./components/container/Container";
import { useState } from "react";
import "./App.sass";

const App = () => {
    // const [darkmodeOff, setDarkmodeOff] = useState(true)
    const [panelMode, setPanelMode] = useState(1);
    const handlePanelMode = () => {
        const nextMode = panelMode === 1 ? 2 : 1
        setPanelMode(nextMode)
    }

    return (
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
    );
};

export default App;
