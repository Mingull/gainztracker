import React, { useMemo } from "react";
import { StyleProp, StyleSheet, Text, View, ViewProps } from "react-native";
import { Modal, ModalPosition, Renderable, resolveValue } from "../core/types";
import cn from "../../../lib/utils/ClassName";
import { ModalIcon } from "./modalIcon";

interface ModalBarProps {
	modal: Modal;
	position?: ModalPosition;
	style?: StyleProp<ViewProps> | undefined;
	// children?: (components: { message: Renderable }) => Renderable;
	children?: (components: { icon: Renderable; message: Renderable }) => Renderable;
}

const ModalBarBase = ({
	children,
	className,
	style,
}: {
	children: React.ReactNode;
	className?: string | undefined;
	style?: StyleProp<ViewProps> | undefined;
}) => (
	<View
		className={cn(
			"flex flex-row items-center max-w-sm bg-white pointer-events-auto py-2 px-2.5 rounded-lg",
			className
		)}
		style={style}
	>
		{children}
	</View>
);

const Message = ({ children }: { children: React.ReactNode }) => (
	<View
		style={{
			display: "flex",
			justifyContent: "center",
			marginVertical: 4,
			marginHorizontal: 10,
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: "auto",
		}}
	>
		<Text>{children}</Text>
	</View>
);

// const getAnimationStyle = (position: NonNullable<ModalPosition>, visible: boolean): React.CSSProperties => {
// 	const top = position.includes("top");
// 	const factor = top ? 1 : -1;

// 	// return {
// 	// 	animation: visible
// 	// 		? `${keyframes(enter)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
// 	// 		: `${keyframes(exit)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
// 	// };
// };

export const ModalBar: React.FC<ModalBarProps> = React.memo(({ modal, position, style, children }) => {
	const icon = <ModalIcon modal={modal} />;
	const message = <Message {...modal.ariaProps}>{resolveValue(modal.message, modal)}</Message>;

	return (
		<ModalBarBase className={modal.className} style={{ style: StyleSheet.flatten([modal.style, style]) }}>
			{typeof children === "function" ? (
				<Text>
					{children({
						icon,
						message,
					})}
				</Text>
			) : (
				<>
					{icon}
					{message}
				</>
			)}
		</ModalBarBase>
	);
});
