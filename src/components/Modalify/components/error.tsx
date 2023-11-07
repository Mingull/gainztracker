import Animated, { Keyframe, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";

export interface ErrorTheme extends React.PropsWithChildren {
	primary?: string;
	secondary?: string;
}

const DEFAULT_SECONDARY_COLOR = "#fff";
const DEFAULT_PRIMARY_COLOR = "#ff4b4b";

export const ErrorIcon: React.FC<ErrorTheme> = ({
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

	const firstLineAnimation = new Keyframe({
		from: {
			transform: [{ scale: 0 }],
			opacity: 0,
		},
		to: { transform: [{ scale: 1 }], opacity: 1 },
	})
		.duration(150)
		.delay(150);

	const secondLineAnimation = new Keyframe({
		from: {
			transform: [{ rotate: "90deg" }, { scale: 0 }],
			opacity: 0,
		},
		to: { transform: [{ rotate: "90deg" }, { scale: 1 }], opacity: 1 },
	})
		.duration(150)
		.delay(180);

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
						position: "absolute",
						borderRadius: 3,
						opacity: 0,
						backgroundColor: secondary,
						bottom: 9,
						left: 4,
						height: 2,
						width: 12,
					},
				]}
			/>
			<Animated.View
				style={[
					{
						position: "absolute",
						borderRadius: 3,
						opacity: 0,
						backgroundColor: secondary,
						bottom: 9,
						left: 4,
						height: 2,
						width: 12,
						transform: [{ rotate: "90deg" }],
					},
				]}
			/>
			{children}
		</Animated.View>
	);
};
