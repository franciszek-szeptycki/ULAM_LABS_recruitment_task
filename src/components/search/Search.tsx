import { ChangeEvent, FormEventHandler, useState } from "react";
import { useQuery } from "react-query";
import { setLocalCoins } from "../../utils/manageLocalStorage";
import { getCoinsList } from "../../api/coinAPI";
import "./Search.sass";

const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const [coinsList, setCoinsList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleSubmit = (e: any) => {
        setLocalCoins(inputValue);
    };

    const { status } = useQuery("get-coin-list", () => getCoinsList(), {
        onSuccess: (props) => {
            const data: coinListInterface[] = props.data;
            const list: string[] = data.map((item) => item.id);
            setCoinsList(list);
        },
    });

    const handleChange = (e: any) => {
        const text: string = e.target.value;
        setInputValue(text);

        if (!text) return setSuggestions([]);

        const options: string[] = coinsList.filter((item) => item.includes(text));
        setSuggestions(options);
    };

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__form-input-wrapper">
                    <input
                        className="search__form-input"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </div>
                <input
                    className="search__form-submit"
                    type="submit"
                    value="submit"
                />
            </form>
            <ul className="search__suggestions">
                {suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;

interface coinListInterface {
    id: string;
    image: {
        large: string;
        small: string;
        thumb: string;
    };
    last_updated: string;
    symbol: string;
}
