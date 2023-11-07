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
			{ translateX: -(POPUP_WIDTH - 64) / 2 },
			{
				translateY: isOpen.value ? withTiming(0) : withTiming(popupHeight + 102),
			},
		],
	}));

	return (
		<TouchableWithoutFeedback
			{...props}
			onPress={() => {
				isOpen.value = !isOpen.value;
			}}
		>
			<View style={{ position: "relative" }}>
				<View className="items-center justify-center w-16 h-16 mb-10 bg-blue-500 rounded-full">
					<StyledComponent component={Plus} strokeWidth={2.5} size={38} className={"text-zinc-50"} />
				</View>

				<Animated.View
					style={[
						{
							rowGap: popupGap,
							width: POPUP_WIDTH,
							height: popupHeight,
							transform: [{ translateY: popupHeight + 102 }],
						},
						slideinAnimation,
					]}
					className={"absolute justify-center bottom-full mb-2.5 items-center"}
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
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
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
