import { cn } from "@/lib/utils";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

export interface SkeletonProps {
	width: number;
	height: number;
	circle?: boolean;
	className?: string;
}

export default function Skeleton({ width, height, circle, className }: SkeletonProps) {
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

	return (
		<Animated.View
			style={[{ width, height, opacity: 1, borderRadius: circle ? width / 2 : 3 }, skeletonAnimation]}
			className={cn("bg-zinc-500", className)}
		/>
	);
}
