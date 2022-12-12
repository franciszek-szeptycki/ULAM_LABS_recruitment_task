import { createContext, useContext, useState } from "react";
import { getLocalCoins, setInitialCoins } from "../utils/localStorageManagment";

// IF USER IS NEW USER, SETS "Bitcoin" AND "Ethereum" IN LOCALSTORAGE
// AND RETURNS THEM
export const initCoinsContext = (): string[] => {
	setInitialCoins()
	const localCoins = getLocalCoins()
	return localCoins
}

export const defaultObject = {
	context: [""],
	setContext: () => { }
}

export const CoinsContext = createContext<ContextType>(defaultObject)
	
type ContextType = {
	context: string[]
	setContext: (context: string[]) => void
}

