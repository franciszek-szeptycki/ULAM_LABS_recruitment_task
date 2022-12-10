import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCoinsList } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import "./Search.sass";
import SearchLi from "./SearchLi";

const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const [coinsList, setCoinsList] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // CONTEXT
    const coinsContext: string[] | undefined = useContext(CoinsContext).context;

    // FETCH LIST OF AVAILABLE CRYPTOCURRENCIES NAME
    const { status } = useQuery("get-coin-list", () => getCoinsList(), {
        onSuccess: (props) => {
            const data: coinListInterface[] = props.data;
            const list: string[] = data.map((item) => item.id);
            setCoinsList(list);
        },
    });


    // USED WHEN USER CHANGES CONTENT OF INPUT
    const handleChange = (e: any) => {

        const text: string = e.target.value;
        setInputValue(text);

        // If input content is null don't display suggestions
        if (!text) return setSuggestions([]);

        // Display non repeated and matching suggestions
        const options: string[] = coinsList.filter((item) =>
            item.includes(text.toLowerCase())
        );

        const nonRepeatedOptions = options.filter((item) => {
            let finalItem: string | false = item
            coinsContext.map((element) => {
                if (element === item) finalItem = false
            });
            return finalItem
        });

        setSuggestions(nonRepeatedOptions);
    };

    // CLEAR SEARCH ENGINE
    const inputClear = (): any => {
        setInputValue("");
        setSuggestions([]);
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
                {suggestions.map(
                    (item, index) =>
                        index < 6 && (
                            <SearchLi
                                key={index}
                                id={item}
                                inputClear={inputClear}
                            />
                        )
                )}
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
