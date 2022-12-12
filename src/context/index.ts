import { createContext, useContext, useState } from "react";
import { getLocalCoins, setInitialCoins } from "../utils/localStorageManagment";

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

