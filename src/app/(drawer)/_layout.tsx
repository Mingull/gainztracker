import { Text } from "@/components";
import UserProvider from "@/lib/contexts/User.context";
import cn from "@/lib/utils/ClassName";
import { Drawer } from "expo-router/drawer";
import { User } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WorkoutPage from "./(tabs)/(stack)/home/[workout]";
import WorkoutsProvider from "@/lib/contexts/Workout.context";

export default function Layout() {
	return (
		<>
			<UserProvider>
				<WorkoutsProvider>
					<Drawer screenOptions={{ headerShown: false }}>
						<Drawer.Screen
							name="(tabs)"
							options={{
								drawerLabel: "Home",
								title: "Home",
								headerShown: false,
							}}
						/>
						<Drawer.Screen
							name="profile"
							options={{
								drawerLabel: "Profile",
								drawerIcon: ({ focused }) => {
									return (
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
												width: "100%",
												height: 50,
											}}
										>
											<StyledComponent
												component={User}
												strokeWidth={1.5}
												className={cn({ "text-blue-500": focused, "text-zinc-900": !focused })}
											/>
											<Text
												className={cn("text-md mr-10", {
													"text-blue-500 font-bold": focused,
													"text-zinc-600": !focused,
												})}
											>
												Profile
											</Text>
										</View>
									);
								},
							}}
						/>
						<Drawer.Screen
							name="settings"
							options={{
								drawerLabel: "Settings",
								title: "Settings",
							}}
						/>
					</Drawer>
				</WorkoutsProvider>
			</UserProvider>
		</>
	);
}
