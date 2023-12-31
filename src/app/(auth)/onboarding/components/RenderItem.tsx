import { SCREEN_WIDTH } from "@/constants/screen";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { OnboardingData } from "../data";

export default function RenderItem({
	item,
	index,
	x,
}: {
	item: OnboardingData;
	index: number;
	x: SharedValue<number>;
}) {
	const lottieAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					x.value,
					[(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
					[200, 0, -200],
					Extrapolate.CLAMP
				),
			},
		],
	}));
	const circleAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(
					x.value,
					[(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
					[0, 4, 4],
					Extrapolate.CLAMP
				),
			},
		],
	}));

	return (
		<View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
			<View style={styles.circleContainer}>
				<Animated.View
					style={[
						{
							width: SCREEN_WIDTH,
							height: SCREEN_WIDTH,
							backgroundColor: item.backgroundColor,
							borderRadius: SCREEN_WIDTH / 2,
						},
						circleAnimation,
					]}
				/>
			</View>
			<Animated.View style={lottieAnimation}>
				<LottieView
					source={item.animation}
					style={{
						width: SCREEN_WIDTH * 0.9,
						height: SCREEN_WIDTH * 0.9,
					}}
					autoPlay
					loop
				/>
			</Animated.View>
			<Text style={[styles.itemText, { color: item.textColor }]}>{item.text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: 120,
	},
	itemText: {
		textAlign: "center",
		fontSize: 44,
		fontWeight: "bold",
		marginBottom: 10,
		marginHorizontal: 20,
	},
	circleContainer: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "flex-end",
	},
});
