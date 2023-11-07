import { View } from "react-native";
import Animated, { Keyframe, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";

export interface CheckmarkTheme extends React.PropsWithChildren {
	primary?: string;
	secondary?: string;
}

const DEFAULT_SECONDARY_COLOR = "#fff";
const DEFAULT_PRIMARY_COLOR = "#61d345";

export const CheckmarkIcon: React.FC<CheckmarkTheme> = ({
	children,
	primary = DEFAULT_PRIMARY_COLOR,
	secondary = DEFAULT_SECONDARY_COLOR,
}) => {
	const circleAnimation = new Keyframe({
		from: {
			transform: [{ rotate: "45deg" }],
			opacity: 0,
		},
		to: {
			transform: [{ rotate: "45deg" }],
			opacity: 1,
		},
	})
		.duration(300)
		.delay(100);

	const checkmarkAnimation = new Keyframe({
		0: {
			height: 0,
			width: 0,
			opacity: 0,
		},
		40: {
			height: 0,
			width: 6,
			opacity: 1,
		},
		100: {
			height: 10,
			width: 6,
			opacity: 1,
		},
	})
		.duration(200)
		.delay(200);
	return (
		<Animated.View
			style={[
				{
					width: 20,
					opacity: 0,
					height: 20,
					borderRadius: 10,
					backgroundColor: primary,
					position: "relative",
					transform: [{ rotate: "45deg" }],
				},
			]}
			entering={circleAnimation}
		>
			<Animated.View
				style={[
					{
						opacity: 0,
						position: "absolute",
						borderRightWidth: 2,
						borderBottomWidth: 2,
						borderColor: `${secondary || "#fff"}`,
						bottom: 6,
						left: 6,
						height: 10,
						width: 6,
					},
				]}
				entering={checkmarkAnimation}
			/>
			{children}
		</Animated.View>
	);
};
