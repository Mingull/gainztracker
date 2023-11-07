// import { Stack } from "expo-router";
// import { Tabs } from "expo-router/tabs";

// export default function AuthLayout() {
// 	return (
// 		<Stack screenOptions={{ headerShown: false }}>
// 			<Stack.Screen name="login" options={{ title: "Login" }} />
// 			<Stack.Screen name="register" options={{ title: "Register" }} />
// 		</Stack>
// 	);
// }

import { Slot } from "expo-router";

export default function AuthLayout() {
	return <Slot />;
}
