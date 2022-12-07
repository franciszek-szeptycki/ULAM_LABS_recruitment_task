import { useState } from "react";
import { useQuery } from "react-query";
import { getCoinInfo } from "../../api/coinAPI";
import WidgetError from "./WidgetError";
import WidgetLoading from "./WidgetLoading";

const Widget = (props: { id: string; index: number }) => {
    const { id, index } = props;

    const [content, setContent] = useState<any>();

    const { status } = useQuery(`get-${id}-info`, () => getCoinInfo(id), {
        onSuccess: (data) => {
            setContent(data.data);
        },
	});
	
	console.log(content)

    switch (status) {
        case "loading":
            return <WidgetLoading />;
        case "success":
            return <div className="widget">{id}</div>;
        default:
            return <WidgetError />;
    }
};

export default Widget;
