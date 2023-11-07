import React from "react";
import { ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";

export interface LoaderTheme extends React.PropsWithChildren {
	color?: string;
}

const DEFAULT_COLOR = "#2ea8ff";

export const LoaderIcon: React.FC<LoaderTheme> = ({ children, color = DEFAULT_COLOR }) => {
	const Comp = Animated.createAnimatedComponent(ActivityIndicator);
	return <Comp color={color}>{children}</Comp>;
};
