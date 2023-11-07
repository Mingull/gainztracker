import { VariantProps, cva } from "cva";
import { GestureResponderEvent, Modal as RNModal, ModalProps as RNModalProps, View } from "react-native";
import Text from "./Text";
import cn from "../lib/utils/ClassName";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Children, ReactNode } from "react";

export const innerModalVariants = cva("", {
	variants: {
		innerPosition: {
			top: "justify-start",
			center: "justify-center",
			bottom: "justify-end",
		},
		height: {
			default: "min-h-36",
			md: "min-h-56",
			lg: "min-h-96",
			xl: "min-h-[60%]",
			full: "min-h-[70%]",
		},
	},
	defaultVariants: {
		height: "default",
		innerPosition: "top",
	},
});
export const modalVariants = cva("", {
	variants: {
		position: {
			top: "justify-start",
			center: "justify-center",
			bottom: "justify-end",
		},
	},
	defaultVariants: {
		position: "bottom",
	},
});
export interface ModalProps
	extends RNModalProps,
		VariantProps<typeof innerModalVariants>,
		VariantProps<typeof modalVariants> {
	title: string;
	footer?: ReactNode;
	onClose: ((event: GestureResponderEvent) => void) | undefined;
}

export default function Modal({
	title,
	children,
	height,
	footer,
	position,
	innerPosition,
	onClose,
	...props
}: ModalProps) {
	return (
		<RNModal {...props} transparent animationType="slide">
			<View
				className={cn(modalVariants({ position, className: "items-center flex-1" }))}
				style={{ backgroundColor: "rgba(0 0 0 / 0.4)" }}
			>
				<View
					className={cn(
						innerModalVariants({
							height,
							innerPosition,
							className: "bg-white shadow  w-full",
						}),
						{
							"rounded-t-xl": position === "bottom",
							"rounded-b-xl": position === "top",
							"rounded-xl": position === "center",
						}
					)}
				>
					<View className="flex flex-row items-stretch justify-between p-4 border-b rounded-t border-zinc-200">
						<Text
							size={"lg"}
							className="items-center self-start justify-between my-auto font-semibold text-zinc-900 dark:text-white"
						>
							{title}
						</Text>
						<Button
							className="self-start bg-transparent rounded-lg text-md text-zinc-400"
							onPress={onClose}
						>
							<FontAwesomeIcon icon={faClose} size={20} />
						</Button>
					</View>
					<View className="p-4 space-y-6">{children}</View>
					{footer ? (
						<View className="flex-row items-center p-4 space-x-2 border-t rounded-b border-zinc-200 dark:border-zinc-600">
							{footer}
						</View>
					) : null}
				</View>
			</View>
		</RNModal>
	);
}

