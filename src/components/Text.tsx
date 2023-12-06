import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";
import { cva, VariantProps } from "cva";
import cn from "@/lib/utils/ClassName";
import React, { useRef } from "react";
import Animated, { AnimateProps } from "react-native-reanimated";

const textVariants = cva("", {
	variants: {
		variant: {
			default: "",
			title: "text-center",
			bordered: "border border-zinc-700 rounded py-2 px-4",
			login: "text-xl font-bold self-start flex justify-center text-white",
		},
		transform: {
			uppercase: "uppercase",
			lowercase: "lowercase",
			"normal-case": "normal-case",
			capitalize: "capitalize",
		},
		size: {
			sm: "text-sm",
			md: "text-md",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
		},
		validation: {
			default: "",
			success: "text-sm text-green-600 dark:text-green-500",
			error: "text-sm text-red-600 dark:text-red-500",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "base",
		transform: "normal-case",
		validation: "default",
	},
});

export interface TextProps extends Animated.AnimateProps<RNTextProps>, VariantProps<typeof textVariants> {
	ref?: React.LegacyRef<Animated.Text> | undefined;
}

export function Text({ children, variant, validation, transform, size, className, ref, ...props }: TextProps) {
	return (
		<Animated.Text
			ref={ref}
			className={cn(textVariants({ variant, validation, transform, size, className }))}
			{...props}
		>
			{children}
		</Animated.Text>
	);
}

export interface AnimatedTextProps extends Omit<TextProps, "style"> {
	style?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
}

export const AnimatedText = React.forwardRef<Animated.Text, AnimatedTextProps>(
	({ children, variant, className, onPress, style, disabled, ...props }, ref) => {
		return (
			<Animated.Text
				ref={ref}
				className={cn(textVariants({ variant, className }))}
				onPress={onPress}
				disabled={disabled}
				style={style || {}}
				{...props}
			>
				{children}
			</Animated.Text>
		);
	}
);

export default Text;
