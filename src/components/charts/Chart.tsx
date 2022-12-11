import { interpolateMagma } from "d3";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { getCoinInfo, getCoinPrices } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";
import parseData from "./parseData";

let chartData: any[] = [];
let isLoading: boolean = true;
let coinsNames: string[] = [];
let timeline: any = []

const Chart = () => {
    // GET COINS ID FROM CONTEXT
    const coinsContext: string[] | undefined = useContext(CoinsContext).context;
    if (!coinsContext) return <></>;

    const initializeChartData = () => {
        const dataToParse: any[] = [];
        coinsContext.map((id: string) => {
            const info = useQuery(`fetch-${id}-info`, () => getCoinInfo(id));

            const { data } = useQuery(`fetch-prices-of-${id}`, () =>
                getCoinPrices(id, "usd")
            );

            if (data && info.data) {
                const { name } = info.data.data;
                coinsNames.push(name);
                dataToParse.push({ name, data });
            }
        });
        const { time, list } = parseData(dataToParse);
        chartData = list
        console.log(time)
        isLoading = false;
    };

    initializeChartData();

    if (isLoading) return <div>loading</div>;
    else {
        if (chartData[0] === undefined) return <></>;
        else {
            return (
                <LineChart width={700} height={700} data={chartData}>
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
                    <XAxis dataKey="date" />
                    <YAxis />
                    {/* <Tooltip /> */}
                </LineChart>
            );
        }
    }
};

export default Chart;
