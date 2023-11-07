import Button from "@/components/Button";
import { AnimatedText } from "@/components/Text";
import { SCREEN_WIDTH } from "@/constants/screen";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, {
	SharedValue,
	interpolateColor,
	useAnimatedStyle,
	withDelay,
	withRepeat,
	withSequence,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { OnboardingData } from "../data";

export default function OnboardingButton({
	data,
	flatListRef,
	flatlistIndex,
	x,
}: {
	data: OnboardingData[];
	flatlistIndex: SharedValue<number>;
	flatListRef: React.RefObject<FlatList<OnboardingData>>;
	x: SharedValue<number>;
}) {
	const buttonAnimation = useAnimatedStyle(() => ({
		width: flatlistIndex.value === data.length - 1 ? withSpring(140) : withSpring(60),
		height: 60,
	}));

	const textAnimation = useAnimatedStyle(() => {
		return {
			opacity: flatlistIndex.value === data.length - 1 ? withTiming(1) : withTiming(0),
			transform: [
				{
					translateX: flatlistIndex.value === data.length - 1 ? withTiming(0) : withTiming(-100),
				},
			],
		};
	});

	const arrowAnimationStyle = useAnimatedStyle(() => {
		return {
			width: 30,
			height: 30,
			opacity: flatlistIndex.value === data.length - 1 ? withTiming(0) : withTiming(1),
			transform: [
				{
					translateX: flatlistIndex.value === data.length - 1 ? withTiming(100) : withTiming(0),
				},
			],
		};
	});

	const animatedColor = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			x.value,
			data.map((_, index) => index * SCREEN_WIDTH),
			data.map((item) => item.textColor)
		),
	}));

	// bounce up animation every 5 seconds
	const bounceUpButton = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: withRepeat(
					withSequence(
						withSpring(0, { damping: 5 }),
						withDelay(1500, withTiming(-15)),
						withSpring(0, { damping: 5 })
					),
					-1
				),
			},
		],
	}));

	const AnimatedIcon = Animated.createAnimatedComponent(ArrowRight);

	return (
		<Button
			onPress={() => {
				if (flatlistIndex.value < data.length - 1) {
					flatListRef.current?.scrollToIndex({ index: flatlistIndex.value + 1 });
				} else {
					router.replace("/(auth)/login");
				}
			}}
			className="p-0"
			invisible
		>
			<Animated.View style={bounceUpButton}>
				<Animated.View style={[styles.container, animatedColor, buttonAnimation]}>
					<AnimatedText style={[styles.textButton, textAnimation]}>Get Started</AnimatedText>
					<AnimatedIcon style={[styles.arrow, arrowAnimationStyle]} color="white" />
				</Animated.View>
			</Animated.View>
		</Button>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	arrow: {
		position: "absolute",
	},
	textButton: { color: "white", fontSize: 16, position: "absolute" },
});
