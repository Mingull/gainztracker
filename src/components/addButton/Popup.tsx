import { Plus } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import { StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Button from "./Button";
import { POPUP_WIDTH, PopupButton } from "./types";

export interface PopupProps extends TouchableWithoutFeedbackProps {
	items: PopupButton[];
}

export default function AddButton({ items, ...props }: PopupProps) {
	const isOpen = useSharedValue(false);

	const popupGap = 10;
	const popupHeight = items.length * (30 + 16 + 16) + (items.length - 1) * popupGap;

	const slideinAnimation = useAnimatedStyle(() => ({
		transform: [
			{ translateY: 0 },
			{
				translateX: isOpen.value ? withTiming(-POPUP_WIDTH + 64) : withTiming(POPUP_WIDTH),
			},
		],
	}));

	const buttonAnimation = useAnimatedStyle(() => ({
		backgroundColor: isOpen.value ? withTiming("rgb(147, 197, 253)") : withTiming("rgb(59, 130, 246)"),
	}));

	const iconAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: isOpen.value ? withSpring("225deg") : withSpring("0deg"),
			},
		],
	}));

	return (
		<View style={{ position: "absolute", bottom: 0, right: 10 }}>
			<TouchableWithoutFeedback
				{...props}
				onPress={() => {
					isOpen.value = !isOpen.value;
				}}
			>
				<View style={{ position: "relative" }}>
					<Animated.View
						style={[buttonAnimation]}
						className="items-center justify-center w-16 h-16 bg-blue-300 rounded-2xl"
					>
						<Animated.View style={[iconAnimation]}>
							<StyledComponent component={Plus} strokeWidth={2.5} size={38} className={"text-zinc-50"} />
						</Animated.View>
					</Animated.View>
					{/* <Animated.View
						style={[
							{
								rowGap: popupGap,
								width: POPUP_WIDTH,
								height: popupHeight,
								transform: [{ translateY: popupHeight }],
							},
							slideinAnimation,
						]}
						className={"absolute justify-center bg-zinc-500 bottom-full mb-2.5 items-end"}
					>
						{items.map((item, i) => (
							<Button
								key={i}
								{...item}
								delay={item.delay}
								isOpen={isOpen}
								style={{ zIndex: i }}
								popupHeight={popupHeight}
							/>
						))}
					</Animated.View> */}
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}
const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
