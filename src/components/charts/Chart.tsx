import { interpolateMagma } from "d3";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { getCoinInfo, getCoinPrices } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";
import { getLocalCoins } from "../../utils/localStorageManagment";
import prepareData from "./prepareData";

let lastContext: any[] = [];

const Chart = () => {
    const [data, setData] = useState<any[]>([]);
    const [coinsNames, setCoinsNames] = useState<string[]>([]);

    // Getting info about coins
    const coinsContext: string[] | undefined = useContext(CoinsContext).context;

    // If user has changed context 
    // => flag(single rendering of this function on context change)
    if (lastContext !== coinsContext) {
        lastContext = coinsContext;

        const run = async () => {
            let coinsDataList: any[] = [];
            let namesList: string[] = [];

            // Fetching data to the chart
            for (let i = 0; i < coinsContext.length; i++) {
                let item;
                try {
                    const protoInfo = await getCoinPrices(
                        coinsContext[i],
                        "usd"
                    );
                    const protoName = await getCoinInfo(coinsContext[i]);

                    const info = protoInfo.data.prices;
                    const { name } = protoName.data;

                    item = { name, info };
                } catch {
                    item = null;
                } finally {
                    if (item) {
                        coinsDataList.push(item);
                        namesList.push(item.name);
                    }
                }
            }

            // Getting data prepared to chart
            const list = prepareData(coinsDataList);

            setData(list);
            setCoinsNames(namesList);
        };
        run();
    }

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                {coinsNames ? (
                    <LineChart width={700} height={700} data={data}>
                        {coinsNames.map((item: string, index: number) => {
                            console.log(item);
                            console.log(data);
                            return (
                                <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={item}
                                    stroke={convertString(item)}
                                />
                            );
                        })}
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Legend />
                        <Tooltip />
                    </LineChart>
                ) : (
                    <></>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
