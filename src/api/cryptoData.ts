import axios from 'axios';

const newsAPI = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    headers: {
        "Content-type": "application/json",
    },
});

export const getCryptoPrices = async (id: string, vsCurrency: string): Promise<any> => {
	// REQUEST AND RETURN
	return await newsAPI.get(`coins/${id}/market_chart?vs_currency=${vsCurrency}&days=1`)
};

export const getCryptoList = async () => {
	// REQUEST AND RETURN
	return await newsAPI.get("coins")
}