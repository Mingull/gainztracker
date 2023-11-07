import { Button, Modal, Text } from "@/components";
import { supabase } from "@/lib/db/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import modal from "@/components/Modalify";

export default function SettingsPage() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			if (user) {
				setUser(user);
			} else {
				modal.error("Error Accessing User");
			}
		});
	}, []);

	const doLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			modal.error("Error Signing Out User: " + error.message);
		}
	};

	return (
		<SafeAreaView className="items-center justify-center flex-1 bg-zinc-200">
			<StatusBar style={"inverted"} />
			<ScrollView>
				<View style={{ padding: 16 }}>
					<Text>{JSON.stringify(user, null, 4)}</Text>
					<Button className="mb-24" onPress={doLogout}>
						<Text className="text-white">Log out</Text>
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	buttonContainer: {
		backgroundColor: "#000968",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		margin: 8,
	},
	buttonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
	textInput: {
		borderColor: "#000968",
		borderRadius: 4,
		borderStyle: "solid",
		borderWidth: 1,
		padding: 12,
		margin: 8,
	},
});
