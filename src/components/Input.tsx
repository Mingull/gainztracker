import { cva, VariantProps } from "cva";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import cn from "../lib/utils/ClassName";
import Text from "./Text";

const inputVariants = cva(
	"bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
	{
		variants: {
			variant: {
				default: "",
			},
			validation: {
				default: "",
				success:
					"bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-green-500",
				error: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-zinc-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
			},
		},
		defaultVariants: {
			variant: "default",
			validation: "default",
		},
	}
);

export interface InputProps extends TextInputProps, VariantProps<typeof inputVariants> {
	label: string;
	withValidation?: boolean;
	touched?: boolean | undefined;
	error?: string | undefined;
}

export default function Input({ variant, withValidation, touched, error, label, ...props }: InputProps) {
	if (withValidation) {
		return (
			<View className={cn("self-stretch mb-4")}>
				<Text
					className="block font-medium"
					validation={touched && error ? "error" : touched && !error ? "success" : "default"}
				>
					{label}
				</Text>
				<TextInput
					className={cn(
						inputVariants({
							variant,
							validation: touched && error ? "error" : touched && !error ? "success" : "default",
						})
					)}
					{...props}
					placeholderTextColor={
						touched && error ? "rgb(185 28 28)" : touched && !error ? "rgb(21 128 61)" : "rgb(63 63 70)"
					}
				/>
				{touched && error && <Text validation={"error"}>{error}</Text>}
			</View>
		);
	} else {
		return (
			<View className={cn("self-stretch mb-4")}>
				<Text
					className="block font-medium"
					validation={"default"}
				>
					{label}
				</Text>
				<TextInput className={cn(inputVariants({ variant }))} {...props} />
			</View>
		);
	}
}
