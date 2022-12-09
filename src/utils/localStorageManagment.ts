const COINS = "COINS";
const IS_USER_NEW = "IS_USER_NEW"

// RETURNS USER'S SELECTED CRYPTOCURRENCIES
export const getLocalCoins = (): string[] => {
    const storage = localStorage.getItem(COINS);

    if (!storage) return [];
    else return JSON.parse(storage);
};

// ADDS NEW CRYPTOCURRENCIES TO THE CONTAINER
export const setLocalCoin = (id: string): boolean => {
	const localCoins = getLocalCoins()
	if (localCoins.length >= 5) return false;
	
	const newStorage = [id, ...localCoins]
	localStorage.setItem(COINS, JSON.stringify(newStorage));
	return true;
};

// SETS CRYPTOCURRENCIES IN THE CONTAINER IF USER IS NEW
export const setInitialCoins = (): void => {
	if (checkIsUserNew()) {
		const initialArray = ["bitcoin", "ethereum"];
		localStorage.setItem(COINS, JSON.stringify(initialArray));

		localStorage.setItem(IS_USER_NEW, "true");	
	}
};

// CHECK WHETHER THE USER HAS BEEN ON THIS SITE
export const checkIsUserNew = (): boolean => {
	const isUserNew = localStorage.getItem(IS_USER_NEW)

	if (!isUserNew) return true
	else return false
}

// REMOVE CRYPTOCURRENCY AND RETURN NEW ARRAY
export const removeLocalCoin = (id: string): string[] => {
	const localCoins: string[] = getLocalCoins()

	const itemIndex = localCoins.indexOf(id)
	localCoins.splice(itemIndex, 1)
	localStorage.removeItem(COINS)

	localStorage.setItem(COINS, JSON.stringify(localCoins));
	
	return localCoins
}