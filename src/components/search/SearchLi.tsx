import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCoinInfo } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";
import { getLocalCoins, setLocalCoin } from "../../utils/localStorageManagment";
import "./SearchLi.sass";

const SearchLi = (props: { id: string; inputClear: () => {} }) => {
    const { id, inputClear } = props;

    const [content, setContent] = useState<any>();

    // SET COINSCONTEXT FUNCTION
    const setCoinsContext = useContext(CoinsContext)?.setContext;

    const handleSearchCoin = (): void => {
        if (!setCoinsContext) return;

        // Check that this coin is not selected
        const localCoins = getLocalCoins();
        if (localCoins.includes(id))
            return console.log("can not check this same crypto twice");

        // Check the coins limit
        const done = setLocalCoin(id);
        if (!done) return console.log("too much coins");

        // Set coin into the context
        const newLocalCoins = getLocalCoins();
        setCoinsContext(newLocalCoins);

        inputClear();
        console.log("succesfully selected");
    };

    // FETCH INFO FOR SEARCHING SINGLE RESULT
    const { isRefetching, status } = useQuery(
        `search-get-${id}-info`,
        () => getCoinInfo(id),
        {
            onSuccess: (data) => {
                setContent(data.data);
            },
        }
    );

    switch (status) {
        case "success":
            if (isRefetching) return <></>;

            const rndColor = convertString(id)

            return (
                <li className="search__li" style={{"backgroundColor" : rndColor}} onClick={handleSearchCoin}>
                    <div className="search__li-img-wrapper">
                        <img
                            src={content.image.thumb}
                            className="search__li-img"
                        />
                    </div>
                    <p className="search__li-name">
                        {content.symbol} - {id}
                    </p>
                </li>
            );
        default:
            return <li className="search__li">loading...</li>;
    }
};

export default SearchLi;
