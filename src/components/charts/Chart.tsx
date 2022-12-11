import { interpolateMagma } from "d3";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { getCoinInfo, getCoinPrices } from "../../api/coinAPI";
import { CoinsContext } from "../../context";
import convertString from "../../utils/convertStringToColor";

let chartData: any[] = [];
let isLoading: boolean = true;
let time: any = []

const Chart = () => {
    // GET COINS ID FROM CONTEXT
    const coinsContext: string[] | undefined = useContext(CoinsContext).context;
    if (!coinsContext) return <></>;

    const initializeChartData = () => {
        const coinsPrices: any[] = []
        coinsContext.map((id: string) => {
            const { data } = useQuery(`fetch-prices-of-${id}`, () =>
                getCoinPrices(id, "usd")
            );

            if (data) {
                const coinData = data.data.prices.map((item: any, index: number) => {

                    const date = new Date(item[0])
                    const hours = date.getHours()
                    const minutes = date.getMinutes()
                    time.push(`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`)
                    

                    coinsPrices.push({
                        name: id,
                        price: item[1],
                    })

                })
                
                return coinData
            }
        });
        chartData = coinsPrices;
        isLoading = false;
    };

    
    initializeChartData();
    
    if (isLoading) return <div>loading</div>;
    else {
        if (chartData[0] === undefined) return <></>;
        else {
            // console.log(chartData.length)
            return (
                <LineChart width={400} height={400} data={chartData}>
                    {chartData.map((item, index) => {
                        console.log(item);
                        return (<Line
                            key={index}
                            type="monotone"
                            dataKey="price"
                            // data={1}
                            name="date"
                            stroke="#ccc"
                        />);
                    })}
                    <XAxis dataKey={time} />
                    <YAxis  />
                    <Tooltip />
                </LineChart>
            );
        }
    }
};

export default Chart;