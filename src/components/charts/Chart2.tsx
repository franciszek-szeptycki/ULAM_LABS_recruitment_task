import { useQuery } from "react-query";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { getCoinInfo, getCoinPrices } from "../../api/coinAPI";
import convertString from "../../utils/convertStringToColor";
import parseData from "./parseData";


const Chart2 = (props: any) => {
	const data: string[] = props.data

	let coinsNames: string[] = []
	let chartData: any[] = []
	
	const dataToParse: any[] = [];
    data.map((id: string) => {
        const info = useQuery(`${Math.floor(Math.random() * 10000)}`, () => getCoinInfo(id));

        const { data } = useQuery(`${Math.floor(Math.random() * 10000)}`, () =>
            getCoinPrices(id, "usd")
        );

        if (data && info.data) {
            const { name } = info.data.data;
            coinsNames.push(name);
            dataToParse.push({ name, data });
        }
    });
    const { list } = parseData(dataToParse);
    chartData = list;

    return (
        <LineChart data={chartData}>
            {coinsNames.map((item, index) => {
                return (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={item}
                        stroke={convertString(item)}
                    />
                );
            })}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
        </LineChart>
    );
};

export default Chart2;
