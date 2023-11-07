import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import Text from "../Text";
import { POPUP_WIDTH, PopupButton } from "./types";
import { useEffect } from "react";

export interface ButtonProps extends PopupButton {
	style: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
	isOpen: SharedValue<boolean>;
	popupHeight: number;
}

export default function Button({ delay, title, isOpen, popupHeight, icon, onPress, ...props }: ButtonProps) {
	const isLongPressed = useSharedValue(false);

	const buttonAnimation = useAnimatedStyle(() => ({
		width: withSpring(isLongPressed.value ? POPUP_WIDTH : 30 + 16 + 16),
		height: 30 + 16 + 16,
	}));

	const iconAnimation = useAnimatedStyle(() => ({
		// opacity: withTiming(isLongPressed.value ? 0 : 1),
		transform: [
			{
				translateX: isLongPressed.value ? withTiming(POPUP_WIDTH / 2 - 30) : withTiming(0),
			},
		],
	}));

	const buttonTextAnimation = useAnimatedStyle(() => ({
		width: POPUP_WIDTH - (30 + 16 + 16),
		opacity: withTiming(isLongPressed.value ? 1 : 0),
		transform: [
			{
				translateX: isLongPressed.value ? withTiming(-16) : withTiming(25),
			},
		],
	}));

	// button slide in animation from bottom to top with 100ms*index delay if isOpen is true
	const buttonSlideInAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: withDelay(
					350 * delay,
					isOpen.value ? withSpring(0) : withTiming(popupHeight + 102, { duration: 1 })
				),
			},
		],
	}));

	const AnimatedIcon = Animated.createAnimatedComponent(icon);

	// if isopen changes to false set isLongPressed to false
	useDerivedValue(() => {
		if (!isOpen.value) {
			isLongPressed.value = false;
		}
	}, []);

	return (
		<Pressable
			onPress={onPress}
			onLongPress={() => {
				isLongPressed.value = !isLongPressed.value;
			}}
		>
			<Animated.View
				style={[props.style, buttonAnimation, buttonSlideInAnimation]}
				className="relative flex-row items-center justify-center p-4 bg-blue-500 rounded-full"
			>
				<AnimatedIcon style={iconAnimation} strokeWidth={1.5} size={30} className={"text-white absolute"} />
				<Text style={buttonTextAnimation} className="absolute text-white">
					{title}
				</Text>
			</Animated.View>
		</Pressable>
	);
}
