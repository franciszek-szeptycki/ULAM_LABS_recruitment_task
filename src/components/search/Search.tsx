import { useState } from "react";
import { setLocalCoins } from "../../utils/manageLocalStorage";

const Search = () => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = () => {
        setLocalCoins(inputValue);
    };

    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Search;
