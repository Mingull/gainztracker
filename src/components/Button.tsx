import { cva, VariantProps } from "cva";
import React from "react";
import {
	TouchableOpacity,
	TouchableOpacityProps,
	StyleProp,
	ViewStyle,
	StyleSheet,
	TouchableHighlight,
	TouchableWithoutFeedback,
} from "react-native";
import Text from "./Text";
import cn from "../lib/utils/ClassName";
import Animated from "react-native-reanimated";
import { TouchableWithoutFeedbackProps } from "react-native/Libraries/Components/Touchable/TouchableWithoutFeedback";

export const buttonVariants = cva("py-2.5 px-3", {
	variants: {
		variant: {
			default: "bg-zinc-900",
			login: "bg-zinc-700 px-5 py-3 flex items-center space-x-4",
			socialLogin: "flex flex-row px-5 py-3 shadow",
		},
		wrap: {
			true: "p-0 stretch",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded-lg",
		},
		invisible: {
			true: "bg-transparent",
			false: "bg-zinc-900",
		},
	},
	defaultVariants: {
		variant: "default",
		rounded: false,
		invisible: false,
		wrap: false,
	},
});

export interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
	title?: string;
}

export function Button({
	title,
	children,
	variant,
	rounded,
	invisible,
	wrap,
	className,
	onPress,
	disabled,
	...props
}: ButtonProps) {
	if (!title)
		return (
			<TouchableOpacity
				className={cn(buttonVariants({ variant, rounded, invisible, wrap, className }))}
				onPress={onPress}
				disabled={disabled}
				{...props}
			>
				{children}
			</TouchableOpacity>
		);

	return (
		<TouchableOpacity className={cn(buttonVariants({ variant }))} onPress={onPress} disabled={disabled} {...props}>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
}

export interface AnimatedButtonProps
	extends VariantProps<typeof buttonVariants>,
		Animated.AnimateProps<TouchableWithoutFeedbackProps> {
	animation?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}

export const AnimatedButton = React.forwardRef<TouchableWithoutFeedback, AnimatedButtonProps>(
	({ children, variant, rounded, className, onPress, animation, disabled, ...props }, ref) => {
		const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

		return (
			<AnimatedTouchable ref={ref} onPress={onPress} disabled={disabled} {...props}>
				<Animated.View
					className={cn(buttonVariants({ variant, rounded, className }), "p-0")}
					style={animation || {}}
				>
					{children}
				</Animated.View>
			</AnimatedTouchable>
		);
	}
);

export default Button;
