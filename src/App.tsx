import Search from "./components/search/Search";
import Container from "./components/container/Container";
import { useState } from "react";
import "./App.sass";

const App = () => {
    // const [darkmodeOff, setDarkmodeOff] = useState(true)
    const [hiddenPanel, setHiddenPanel] = useState(true);

    return (
        <div className="App">
            <div className={`wrapper ${hiddenPanel ? "panel-hidden" : ""}`}>
                <aside className="aside">
                    <button
                        className="toggle"
                        onClick={() => setHiddenPanel((prev) => !prev)}
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
