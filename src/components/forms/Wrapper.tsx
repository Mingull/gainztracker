import { ReactNode } from "react";
import { View } from "react-native";
import Text from "../Text";

type FormWrapperProps = {
	title: string;
	children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<View className="p-3 rounded-lg bg-zinc-200">
			<Text
				size={"xl"}
				className="mb-4 font-bold leading-tight tracking-tight text-zinc-600 md:text-2xl dark:text-white"
			>
				{title}
			</Text>
			{children}
		</View>
	);
}
