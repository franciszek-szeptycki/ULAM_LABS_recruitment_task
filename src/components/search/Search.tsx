import { useState } from "react";
import { useQuery } from "react-query";
import { getCoinsList } from "../../api/coinAPI";
import "./Search.sass";
import SearchLi from "./SearchLi";

const Search = () => {
    
    const [inputValue, setInputValue] = useState("");
    const [coinsList, setCoinsList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

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

        const options: string[] = coinsList.filter((item) =>
            item.includes(text)
        );
        setSuggestions(options);
    };

    return (
        <div className="search">
            <div className="search__input-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    className="search__input"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter crypto name..."
                />
            </div>
            <ul className="search__ul">
                {suggestions.map((item, index) => (
                    index < 8 && <SearchLi key={index} id={item} />
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
