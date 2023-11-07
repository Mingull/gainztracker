import { VariantProps } from "cva";
import { CSSProperties } from "react";
import { modalWrapperVariants, modalVariants } from "../components/modalify";
import { StyleProp, ViewProps } from "react-native";

export type ModalType = "success" | "error" | "loading" | "blank" | "custom";
export type ModalPosition =
	| "top"
	| "center"
	| "bottom"
	| (VariantProps<typeof modalVariants>["position"] | VariantProps<typeof modalWrapperVariants>["position"]);
export type ModalSize = "default" | "md" | "lg" | "xl" | "full" | VariantProps<typeof modalWrapperVariants>["size"];

export type Renderable = JSX.Element | string | null;

export interface IconTheme {
	primary: string;
	secondary: string;
	color: string;
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
const isFunction = <TValue, TArg>(
	valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === "function";

export const resolveValue = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
	isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

export interface Modal {
	type: ModalType;
	id: string;
	message: ValueOrFunction<Renderable, Modal>;
	icon?: Renderable;
	duration?: number;
	pauseDuration: number;
	position?: ModalPosition;
	size?: ModalSize;

	ariaProps: {
		role: "status" | "alert";
		"aria-live": "assertive" | "off" | "polite";
	};

	style?: StyleProp<ViewProps> | undefined;
	className?: string;
	iconTheme?: IconTheme;

	createdAt: number;
	visible: boolean;
	height?: number;
}

export type ModalOptions = Partial<
	Pick<Modal, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme" | "size">
>;

export type DefaultModalOptions = ModalOptions & {
	[key in ModalType]?: ModalOptions;
};

export interface ModalifyProps {
	position?: ModalPosition;
	modalOptions?: DefaultModalOptions;
	reverseOrder?: boolean;
	gutter?: number;
	containerStyle?: React.CSSProperties;
	containerClassName?: string;
	children?: (modal: Modal) => JSX.Element;
}

export interface ModalWrapperProps extends VariantProps<typeof modalWrapperVariants> {
	id: string;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}
