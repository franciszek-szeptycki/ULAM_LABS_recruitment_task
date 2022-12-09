import { createContext, useContext, useState } from "react";
import { getLocalCoins, setInitialCoins } from "../utils/manageLocalStorage";

export const initCoinsContext = (): string[] => {
	setInitialCoins()
	const localCoins = getLocalCoins()
	return localCoins
}

export const CoinsContext = createContext<ContextType | null>(null)

export type ContextType = {
	context: string[]
	setContext: (context: string[]) => void
}