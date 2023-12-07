import { Stack } from "expo-router";

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="[workoutId]"
				getId={({ params }) => String(Date.now())}
				options={{ presentation: "transparentModal", animation: "fade" }}
			/>
		</Stack>
	);
}
