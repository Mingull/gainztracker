import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Modal } from "../core/types";
import { CheckmarkIcon } from "./checkmark";
import { ErrorIcon } from "./error";
import { LoaderIcon } from "./loader";

const StatusWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
	<View style={{ position: "absolute" }}>{children}</View>
);

const IndicatorWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
	<View
		style={{
			position: "relative",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minWidth: 20,
			minHeight: 20,
		}}
	>
		{children}
	</View>
);

export const AnimatedIconWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
	const animation = useAnimatedStyle(() => ({
		transform: [{ scale: withRepeat(withSequence(withTiming(0.6), withTiming(1))) }],
		opacity: withRepeat(withSequence(withTiming(0.4), withTiming(1))),
	}));
	return (
		<Animated.View
			style={[
				{
					position: "relative",
					transform: [{ scale: 0.6 }],
					opacity: 0.4,
					minWidth: 20,
				},
				animation,
			]}
		>
			{children}
		</Animated.View>
	);
};

export const ModalIcon: React.FC<{ modal: Modal }> = ({ modal }) => {
	const { icon, type, iconTheme } = modal;

	if (icon !== undefined) {
		if (typeof icon === "string") {
			return <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>;
		} else {
			return icon;
		}
	}

	if (type === "blank") {
		return null;
	}

	return (
		<IndicatorWrapper>
			<LoaderIcon {...iconTheme} />
			{type !== "loading" && (
				<StatusWrapper>
					{type === "error" ? <ErrorIcon {...iconTheme} /> : <CheckmarkIcon {...iconTheme} />}
				</StatusWrapper>
			)}
		</IndicatorWrapper>
	);
};
