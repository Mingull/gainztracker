import { LucideIcon } from "lucide-react-native";
import { Easing } from "react-native-reanimated";

export const POPUP_WIDTH = 185;

export type PopupButton = {
	delay: number;
	title: string;
	icon: LucideIcon;
	onPress: () => void;
};

export const easeIn = Easing.in(Easing.ease);
export const easeOut = Easing.out(Easing.ease);
export const easeInOut = Easing.inOut(Easing.ease);
export const easeOutBack = Easing.out(Easing.back(1.7));
export const easeInBack = Easing.in(Easing.back(1.7));
export const easeInOutBack = Easing.inOut(Easing.back(1.7));
export const easeOutElastic = Easing.out(Easing.elastic(1));
export const easeInElastic = Easing.in(Easing.elastic(1));
export const easeInOutElastic = Easing.inOut(Easing.elastic(1));
export const easeOutBounce = Easing.out(Easing.bounce);
export const easeInBounce = Easing.in(Easing.bounce);
export const easeInOutBounce = Easing.inOut(Easing.bounce);
export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInCubic = Easing.in(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);
export const easeOutQuad = Easing.out(Easing.quad);
export const easeInQuad = Easing.in(Easing.quad);
export const easeInOutQuad = Easing.inOut(Easing.quad);
