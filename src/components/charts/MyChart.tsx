import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", Bitcoin: 4000, Ethereum: 2400, Ripple: 2400, Litecoin: 2400, Cardano: 2400 },
  { name: "Feb", Bitcoin: 3000, Ethereum: 1398, Ripple: 2210, Litecoin: 2210, Cardano: 2210 },
  { name: "Mar", Bitcoin: 2000, Ethereum: 9800, Ripple: 2290, Litecoin: 2290, Cardano: 2290 },
  { name: "Apr", Bitcoin: 2780, Ethereum: 3908, Ripple: 2000, Litecoin: 2000, Cardano: 2000 },
  { name: "May", Bitcoin: 1890, Ethereum: 4800, Ripple: 2181, Litecoin: 2181, Cardano: 2181 },
  { name: "Jun", Bitcoin: 2390, Ethereum: 3800, Ripple: 2500, Litecoin: 2500, Cardano: 2500 },
  { name: "Jul", Bitcoin: 3490, Ethereum: 4300, Ripple: 2100, Litecoin: 2100, Cardano: 2100 },
];

const MyChart = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="Bitcoin" stroke="#8884d8" />
      <Line type="monotone" dataKey="Ethereum" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Ripple" stroke="#ffc658" />
      <Line type="monotone" dataKey="Litecoin" stroke="#f4a4a4" />
      <Line type="monotone" dataKey="Cardano" stroke="#a4a4f4" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

 
export default MyChart;