import { SCREEN_WIDTH } from "@/constants/screen";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
	Extrapolate,
	SharedValue,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingData } from "../data";

export default function Dot({ index, x, data }: { index: number; x: SharedValue<number>; data: OnboardingData[] }) {
	const animatedDot = useAnimatedStyle(() => ({
		width: interpolate(
			x.value,
			[(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
			[10, 20, 10],
			Extrapolate.CLAMP
		),
		opacity: interpolate(
			x.value,
			[(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
			[0.5, 1, 0.5],
			Extrapolate.CLAMP
		),
	}));

	const animatedDotColor = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			x.value,
			data.map((_, index) => index * SCREEN_WIDTH),
			data.map((item) => item.textColor)
		);
		return { backgroundColor };
	});

	return <Animated.View style={[styles.dot, animatedDot, animatedDotColor]} />;
}
const styles = StyleSheet.create({
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "black",
		marginHorizontal: 5,
	},
});
