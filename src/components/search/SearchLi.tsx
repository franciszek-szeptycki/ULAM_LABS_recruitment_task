import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCoinInfo } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import { getLocalCoins, setLocalCoin } from "../../utils/manageLocalStorage";

const SearchLi = (props: { id: string }) => {

	const setContextCoins = useContext(CoinsContext)?.setContext

	const handleSearchCoin = (): void => {
		if (!setContextCoins) return
		
		// CHECK THAT THIS COIN IS NOT SELECTED
		const localCoins = getLocalCoins()
		if (localCoins.includes(id)) return console.log("can not check this same crypto twice")
		
		// CHECK COINS LIMIT
		const done = setLocalCoin(id)
		if (!done) console.log("too much coins")

		// SET COIN IN CONTEXT
		setContextCoins(localCoins)

		console.log("succesfully selected")
		
	}


	const { id } = props;

	const [imageURL, setImageURL] = useState("")
	const [symbol, setSymbol] = useState("")

	const {status} = useQuery(`search-get-${id}-info`, () => getCoinInfo(id), {
		onSuccess: (data) => {
			setSymbol(data.data.symbol)
			setImageURL(data.data.image.thumb)

		}
	})

	switch (status) {
		case "success":
			return (<li className="search__li" onClick={handleSearchCoin} ><img src={imageURL} className="search__li-img" /><p className="search__li-name">{symbol} - {id}</p></li> );
		default:
			return <li className="search__li" >loading...</li>
	}


}
 
export default SearchLi;