import { supabase } from "@/lib/db/supabase";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, StyleProp, ViewStyle, ImageStyle } from "react-native";
import { Skeleton } from "../Skeleton";

export interface AvatarProps {
	url: string | null;
	width?: number;
	height?: number;
	style?: StyleProp<ViewStyle | ImageStyle>;
}

export default function Avatar({ height = 150, width = 150, url, style }: AvatarProps) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (url) downloadImage(url);
	}, [url]);

	async function downloadImage(path: string) {
		setLoading(true);
		try {
			const { data, error } = await supabase.storage.from("avatars").download(path);

			if (error) {
				throw error;
			}

			const fr = new FileReader();
			fr.readAsDataURL(data);
			fr.onload = () => {
				setAvatarUrl(fr.result as string);
			};
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error downloading image: ", error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{avatarUrl && !loading ? (
				<Image
					source={{ uri: avatarUrl }}
					accessibilityLabel="Avatar"
					style={[{ height, width }, styles.avatar, styles.image, style as StyleProp<ImageStyle>]}
				/>
			) : (
				<Skeleton width={width} height={height} circle />
				// <View style={[{ height, width }, styles.avatar, styles.noImage, style]} />
			)}
		</>
	);
}

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 5,
		// overflow: "hidden",
		// maxWidth: "100%",
	},
	image: {
		objectFit: "cover",
		paddingTop: 0,
	},
	noImage: {
		backgroundColor: "#333",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(200, 200, 200)",
		borderRadius: 5,
	},
});
