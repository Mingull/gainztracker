import { createContext, useContext } from "react";

export const createSafeContext = <C,>(errorMessage: string) => {
	const Context = createContext<C | null>(null);

	const useSafeContext = () => {
		const ctx = useContext(Context);

		if (!ctx) throw new Error(errorMessage);

		return ctx;
	};

	const Provider = ({ children, value }: { value: C; children: React.ReactNode }) => (
		<Context.Provider value={value}>{children}</Context.Provider>
	);

	return [Provider, useSafeContext] as const;
};
export default createSafeContext;
