import { supabase } from "@/lib/db/supabase";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import modal from "../Modalify";
import Text from "../Text";
import Avatar, { AvatarProps } from "./Avatar";

export interface UpdateProps extends AvatarProps {
	onUpload: (filePath: string) => void;
}

export default function Update({ width = 150, height = 150, url, onUpload }: UpdateProps) {
	const [uploading, setUploading] = useState(false);

	async function uploadAvatar() {
		console.log("uploading");
		try {
			setUploading(true);

			// const { assets: file, canceled } = await DocumentPicker.getDocumentAsync({ type: "image/*" });
			const { assets: file, canceled } = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
				allowsMultipleSelection: false,
			});

			if (canceled) throw new Error("Cancelled");

			console.log(JSON.stringify(file, null, 4));
			// const photo = {
			// 	uri: file?.[0].uri,
			// 	type: file?.[0].mimeType,
			// 	name: file?.[0].name,
			// };
			const photo = {
				uri: file[0].uri,
				type: file[0].type!,
				name: file[0].uri.substring(file[0].uri.lastIndexOf("/") + 1, file[0].uri.length),
			};

			const formData = new FormData();
			formData.append("file", photo as unknown as Blob);

			// const fileExt = file[0].name.split(".").pop();
			const fileExt = file[0].uri.split(".").pop();
			const filePath = `${Math.random()}.${fileExt}`;

			console.log("photo", photo);
			console.log("formData", formData.getAll("file")[0]);
			console.log("filePath", filePath);

			return;
			const { error } = await supabase.storage.from("avatars").upload(filePath, formData);

			if (error) {
				throw error;
			}

			onUpload(filePath);
		} catch (error) {
			console.log(error);
			// if (error instanceof DocumentPickerCanceledResult) {
			// 	console.warn("cancelled");
			// 	// User cancelled the picker, exit any dialogs or menus and move on
			// } else if (isInProgress(error)) {
			// 	console.warn("multiple pickers were opened, only the last will be considered");
			// } else
			// modal.error((error as Error).message, { duration: 1000 });
		} finally {
			setUploading(false);
		}
	}

	return (
		<Pressable
			style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
			onPress={uploadAvatar}
			disabled={uploading}
		>
			<Avatar url={url} width={150} height={150} />
		</Pressable>
	);
}
