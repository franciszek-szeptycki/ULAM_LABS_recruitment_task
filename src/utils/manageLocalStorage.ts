const COINS = "COINS";

export const getLocalCoins = (): string[] => {
    const storage = localStorage.getItem(COINS);

    if (!storage) return [];
    else return JSON.parse(storage);
};

export const setLocalCoins = (id: string): boolean => {
	const localCoins = getLocalCoins()
	if (localCoins.length >= 5) return false;
	
	const newStorage = [id, ...localCoins]
	localStorage.setItem(COINS, JSON.stringify(newStorage));
	return true;
};

export const setInitialCoins = (): void => {
    const initialArray = ["bitcoin", "ethereum"];
    localStorage.setItem(COINS, JSON.stringify(initialArray));
};
