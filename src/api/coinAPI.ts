import axios from 'axios';

const newsAPI = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    headers: {
        "Content-type": "application/json",
    },
});

// GET PRICES OF CRYPTOCURRENCY FROM THE LAST 24H
export const getCoinPrices = async (id: string, vsCurrency: string): Promise<any> => {
	return newsAPI.get(`coins/${id}/market_chart?vs_currency=${vsCurrency}&days=1&interval=hourly`)

};

// GET LIST OF AVAILABLE CRYPTOCURRENCIES
export const getCoinsList = async (): Promise<any> => {
	return await newsAPI.get("coins")
}

// GET DATA OF SPECIFIC CRYPTOCURRENCY
export const getCoinInfo = async (id: string): Promise<any> => {
	return await newsAPI.get(`coins/${id}`)
}