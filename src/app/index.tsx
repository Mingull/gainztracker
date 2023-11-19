import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "@/lib/db/supabase";
import { Text, View } from "react-native";
// import "react-native-url-polyfill/auto";

export default function App() {
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				router.replace("/(drawer)/(tabs)/home/");
			} else {
				// console.log("no user");
			}
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				router.replace("/(drawer)/(tabs)/home/");
			} else {
				// console.log("no user");
				router.replace("/(auth)/onboarding");
			}
		});
	}, []);

	return (
		<View>
			<Text>hello</Text>
		</View>
	);
}
