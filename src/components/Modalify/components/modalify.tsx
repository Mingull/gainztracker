import { cva } from "cva";
import { Pressable, Modal as RNModal, View } from "react-native";
import cn from "../../../lib/utils/ClassName";
import Text from "../../Text";
import { ModalWrapperProps, ModalifyProps, resolveValue } from "../core/types";
import { useModalify } from "../core/useModalify";
import { ModalBar } from "./modalbar";
import { modal } from "../core/modal";

export const modalWrapperVariants = cva("", {
	variants: {
		position: {
			top: "justify-start",
			center: "justify-center",
			bottom: "justify-end",
		},
		size: {
			default: "min-h-36",
			md: "min-h-56",
			lg: "min-h-96",
			xl: "min-h-[60%]",
			full: "min-h-[70%]",
		},
	},
	defaultVariants: {
		size: "default",
		position: "top",
	},
});

const ModalWrapper = ({ id, size, position, style, className, children }: ModalWrapperProps) => {
	return (
		<View
			className={cn(
				modalWrapperVariants({
					size,
					position,
					className: "bg-white shadow w-full rounded-lg",
				}),
				{
					"rounded-t-xl": position === "bottom",
					"rounded-b-xl": position === "top",
					"rounded-xl": position === "center",
				},
				className,
				style
			)}
		>
			<View className="p-4 space-y-6">{children}</View>
		</View>
	);
};

export const modalVariants = cva("items-center flex-1 px-2", {
	variants: {
		position: {
			top: "justify-start",
			center: "justify-center",
			bottom: "justify-end",
		},
	},
	defaultVariants: {
		position: "center",
	},
});
// export interface ModalProps
// 	extends RNModalProps,
// 		VariantProps<typeof innerModalVariants>,
// 		VariantProps<typeof modalVariants> {
// 	title: string;
// 	footer?: ReactNode;
// 	onClose: ((event: GestureResponderEvent) => void) | undefined;
// }

export const Modalify: React.FC<ModalifyProps> = ({ children, modalOptions, position, ...props }) => {
	const { modals, handlers } = useModalify(modalOptions);

	return modals.length > 0 ? (
		<RNModal
			{...props}
			transparent
			animationType="fade"
			onRequestClose={() => {
				modals.forEach((m) => {
					console.log("dismiss", m.id);
					modal.dismiss(m.id);
				});
			}}
		>
			<View className={cn(modalVariants({ position }))} style={{ backgroundColor: "rgba(0 0 0 / 0.3)", gap: 4 }}>
				{modals.map((modal) => {
					return (
						<ModalWrapper id={modal.id} key={modal.id} size={modal.size} position={modal.position}>
							{modal.type === "custom" ? (
								<Text>{resolveValue(modal.message, modal)}</Text>
							) : children ? (
								children(modal)
							) : (
								<ModalBar modal={modal} />
							)}
						</ModalWrapper>
					);
				})}
			</View>
		</RNModal>
	) : null;
};
// export const Modalify: React.FC<ModalifyProps> = ({ children, modalOptions, position, ...props }) => {
// 	const { modals } = useModalify(modalOptions);
// 	console.log(modals);
// 	return modals.length > 0 ? (
// 		<RNModal {...props} transparent animationType="slide">
// 			<View className={cn(position, "items-center flex-1")} style={{ backgroundColor: "rgba(0 0 0 / 0.4)" }}>
// 				{modals.map((modal) => {
// 					return (
// 						<View
// 							className={cn(
// 								innerModalVariants({
// 									height,
// 									innerPosition,
// 									className: "bg-white shadow  w-full",
// 								}),
// 								{
// 									"rounded-t-xl": position === "bottom",
// 									"rounded-b-xl": position === "top",
// 									"rounded-xl": position === "center",
// 								}
// 							)}
// 						>
// 							<View className="flex flex-row items-stretch justify-between p-4 border-b rounded-t border-zinc-200">
// 								<Text
// 									size={"lg"}
// 									className="items-center self-start justify-between my-auto font-semibold text-zinc-900 dark:text-white"
// 								>
// 									{title}
// 								</Text>
// 								<Button
// 									className="self-start bg-transparent rounded-lg text-md text-zinc-400"
// 									onPress={onClose}
// 								>
// 									<FontAwesomeIcon icon={faClose} size={20} />
// 								</Button>
// 							</View>
// 							<View className="p-4 space-y-6">{children}</View>
// 							{footer ? (
// 								<View className="flex-row items-center p-4 space-x-2 border-t rounded-b border-zinc-200 dark:border-zinc-600">
// 									{footer}
// 								</View>
// 							) : null}
// 						</View>
// 					);
// 				})}
// 			</View>
// 		</RNModal>
// 	) : null;
// };
