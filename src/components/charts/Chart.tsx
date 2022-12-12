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
} from "recharts";
import { getCoinInfo, getCoinPrices } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";
import { getLocalCoins } from "../../utils/localStorageManagment";
import parseData from "./parseData";

// let flag: boolean = true;
let lastContext: any[] = [];

const Chart = () => {
    const [data, setData] = useState<any[]>([]);
    const [timeline, setTimeline] = useState<string[]>([]);
    const [coinsNames, setCoinsNames] = useState<string[]>([]);

    const coinsContext: string[] | undefined = useContext(CoinsContext).context;

    if (lastContext !== coinsContext) {
        lastContext = coinsContext;
        // flag = false;
        const run = async () => {
            let coinsDataList: any[] = [];
            let namesList: string[] = [];

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
            const { list, time } = parseData(coinsDataList);

            setData(list);
            setTimeline(time);
            setCoinsNames(namesList);
        };
        run();
    }

    return (
        <div className="chart-wrapper">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
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
                    <Tooltip />
                </LineChart>
            {/* </ResponsiveContainer> */}
        </div>
    );
};

export default Chart;
