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
            return 

        // Check the coins limit
        const done = setLocalCoin(id);
        if (!done) return 

        // Set coin into the context
        const newLocalCoins = getLocalCoins();
        setCoinsContext(newLocalCoins);

        inputClear();
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

            return (
                <li className="search__li" onClick={handleSearchCoin}>
                    <img src={content.image.thumb} className="search__li-img" />
                    <p className="search__li-info">
                        <p className="search__li-info-symbol">{content.symbol}</p><p className="search__li-info-name">{content.name}</p>
                    </p>
                </li>
            );
        default:
            return <li className="search__li">loading...</li>;
    }
};

export default SearchLi;
