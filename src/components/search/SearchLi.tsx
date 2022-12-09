import { useState } from "react";
import { useQuery } from "react-query";
import { getCoinInfo } from "../../api/coinAPI";

const SearchLi = (props: { id: string }) => {
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
			return (<li className="search__li" ><img src={imageURL} className="search__li-img" /><p className="search__li-name">{symbol} - {id}</p></li> );
		default:
			return <li className="search__li" >loading...</li>
	}


}
 
export default SearchLi;