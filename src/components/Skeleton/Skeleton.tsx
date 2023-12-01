import { cn } from "@/lib/utils";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export interface SkeletonProps {
	width?: number | `${number}%` | "auto";
	height?: number | `${number}%` | "auto";
	circle?: boolean;
	style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
	className?: string;
}

export default function Skeleton({ width, height, circle, style, className }: SkeletonProps) {
	const skeletonAnimation = useAnimatedStyle(() => ({
		opacity: withRepeat(
			withSequence(
				withDelay(250, withTiming(1, { duration: 500 })),
				withTiming(0.7),
				withDelay(250, withTiming(1, { duration: 500 }))
			),
			-1
		),
	}));
	if (circle && typeof width === "number")
		return (
			<Animated.View
				style={[{ width, height, borderRadius: width / 2 }, skeletonAnimation, style]}
				className={cn("bg-zinc-500", className)}
			/>
		);

	return (
		<Animated.View
			style={[
				{ width: width ? width : "auto", height: height ? height : "auto", borderRadius: 3 },
				skeletonAnimation,
				style,
			]}
			className={cn("bg-zinc-500", className)}
		/>
	);
}
