import { useState } from "react";
import { useQuery } from "react-query";
import { getCryptoInfo } from "../../api/cryptoData";

const Widget = (props: { id: string; index: number }) => {
	const { id, index } = props;
	
	const [content, setContent] = useState<any>()

    const { status } = useQuery(`get-${id}-info`, () => getCryptoInfo(id), {
        onSuccess: (data) => {
            setContent(data)
        },
	});
	
	console.log(status)

	return <div className="widget">{id}</div>;
};

export default Widget;
