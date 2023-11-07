import { Button, Text } from "@/components";
import cn from "@/lib/utils/ClassName";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { VariantProps, cva } from "cva";
import { GestureResponderEvent, ModalProps as RNModalProps, View } from "react-native";

export const modalVariants = cva("", {
	variants: {
		place: {
			top: "justify-start",
			center: "justify-center",
			bottom: "justify-end",
		},
		height: {
			default: "h-36",
			md: "h-56",
			lg: "h-96",
			xl: "h-[60%]",
			full: "h-[70%]",
		},
	},
	defaultVariants: {
		height: "full",
		place: "top",
	},
});

export interface ModalProps extends RNModalProps, VariantProps<typeof modalVariants> {
	title: string;
	onClose: ((event: GestureResponderEvent) => void) | undefined;
}

export default function Modal({ height, place, onClose, ...props }: ModalProps) {
	return (
		<View className="items-center justify-end flex-1" style={{ backgroundColor: "rgba(0 0 0 / 0.4)" }}>
			<View className={cn(modalVariants({ height, place, className: "bg-white shadow rounded-t-xl w-full" }))}>
				<View className="flex flex-row items-stretch justify-between p-4 border-b rounded-t border-zinc-200">
					<Text
						size={"lg"}
						className="items-center self-start justify-between my-auto font-semibold text-zinc-900 dark:text-white"
					>
						Email confirmation
					</Text>
					<Button className="self-start bg-transparent rounded-lg text-md text-zinc-400" onPress={onClose}>
						<FontAwesomeIcon icon={faClose} size={20} />
					</Button>
				</View>
				<View className="p-4 space-y-6">
					<Text>Check your email for a confirmation link</Text>
				</View>
				<View className="flex-row items-center p-4 space-x-2 border-t rounded-b border-zinc-200 dark:border-zinc-600">
					<Button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						<Text className="text-white">I accept</Text>
					</Button>
					<Button className="bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
						<Text className="text-zinc-500">Decline</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}
