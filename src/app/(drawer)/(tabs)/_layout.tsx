import Navbar from "@/components/Navbar";
import { AddButton, PopupButton } from "@/components/addButton";
import { isSmallDevice } from "@/constants/screen";
import { shadows } from "@/constants/shadows";
import { useUser } from "@/lib/contexts/User.context";
import cn from "@/lib/utils/ClassName";
import { Tabs, router } from "expo-router";
import { Dumbbell, Home, LucideIcon, TabletsIcon, Trophy, Users } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
	SharedValue,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

export default function TabsLayout() {
	const { user, loading } = useUser();
	const currentTabIndex = useSharedValue(0);
	const addButtonShown = useSharedValue(false);

	const pupupItems: PopupButton[] = [
		{
			delay: 1,
			title: "Add Workout",
			icon: Dumbbell,
			onPress: () => {
				addButtonShown.value = false;
				router.replace("/(drawer)/(tabs)/actionButton/workout");
			},
		},
		{
			delay: 0,
			title: "Add Group",
			icon: Users,
			onPress: () => {
				console.log("Add Group");
			},
		},
	];

	return (
		<>
			<GestureHandlerRootView>
				<Navbar user={user} loading={loading} />
			</GestureHandlerRootView>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						position: "absolute",
						height: 70,
						backgroundColor: "#fff",
						paddingHorizontal: isSmallDevice() ? 0 : 100,
						...shadows.default,
					},
				}}
				screenListeners={{
					state: ({ data, type }) => {
						if (type === "state")
							currentTabIndex.value = (data as { state: { index: number } }).state.index;
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						tabBarLabel: "Home",
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<TabIcon
									index={0}
									focused={focused}
									icon={Home}
									label="Home"
									currentTabIndex={currentTabIndex}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="ranking"
					options={{
						tabBarLabel: "Ranking",
						tabBarIcon: ({ focused, size }) => {
							return (
								<TabIcon
									index={2}
									focused={focused}
									icon={Trophy}
									label="Ranking"
									currentTabIndex={currentTabIndex}
								/>
							);
						},
					}}
				/>
				{/* <Tabs.Screen
					name="profile"
					options={{
						tabBarLabel: "Profile",
						tabBarIcon: ({ focused }) => {
							return (
								<View style={{ alignItems: "center", justifyContent: "center", width: 50, height: 50 }}>
									<StyledComponent
										component={User}
										strokeWidth={1.5}
										className={cn({ "text-blue-500": focused, "text-zinc-900": !focused })}
									/>
									<Text
										className={cn("text-xs", {
											"text-blue-500 font-bold": focused,
											"text-zinc-900": !focused,
										})}
									>
										Profile
									</Text>
								</View>
							);
						},
					}}
					// listeners={({ navigation, route }) => ({
					// 	tabPress: (e) => {
					// 		ref.value = getWidth() * 3 + 17.5;
					// 	},
					// })}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						tabBarLabel: "Settings",
						tabBarIcon: ({ focused, size }) => {
							return (
								<View style={{ alignItems: "center", justifyContent: "center", width: 50, height: 50 }}>
									<StyledComponent
										component={Settings}
										strokeWidth={1.5}
										className={cn({ "text-blue-500": focused, "text-zinc-900": !focused })}
									/>
									<Text
										className={cn("text-xs", {
											"text-blue-500 font-bold": focused,
											"text-zinc-900": !focused,
										})}
									>
										Settings
									</Text>
								</View>
							);
						},
					}}
					// listeners={({ navigation, route }) => ({
					// 	tabPress: (e) => {
					// 		ref.value = getWidth() * 4 + 25;
					// 	},
					// })}
				/> */}
			</Tabs>
			<AddButton
				onPress={() => {
					addButtonShown.value = !addButtonShown.value;
				}}
				onLongPress={() => {
					addButtonShown.value = !addButtonShown.value;
				}}
				items={pupupItems}
			/>
			{/* <Animated.View
				style={[
					{
						position: "absolute",
						width: isSmallDevice() ? (SCREEN_WIDTH - 50 * 5) / 3 : (SCREEN_WIDTH - 50 * 5) / 3,
						height: 3,
						bottom: 5,
						left: isSmallDevice() ? (SCREEN_WIDTH - 57.5 * 5) / 3 : (SCREEN_WIDTH - 57.5 * 5) / 3,
						borderRadius: isSmallDevice()
							? (SCREEN_WIDTH - 50 * 5) / 3 / 2
							: (SCREEN_WIDTH - 50 * 5) / 3 / 2 - 200,
					},
					animation,
				]}
				className="bg-blue-500"
			></Animated.View> */}
		</>
	);
}

const TabIcon = ({
	index,
	focused,
	icon,
	label,
	currentTabIndex,
}: {
	index: number;
	focused: boolean;
	icon: LucideIcon;
	label: string;
	currentTabIndex: SharedValue<number>;
}) => {
	const animationBG = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(
				interpolateColor(
					currentTabIndex.value,
					[index - 1, index, index + 1],
					["rgb(255, 255, 255)", "rgb(59, 130, 246)", "rgb(255, 255, 255)"]
				)
			),
		};
	});
	return (
		<View style={{ position: "relative" }}>
			<View
				style={[
					{
						alignItems: "center",
						justifyContent: "center",
						width: 50,
						height: 50,
						zIndex: 2,
					},
				]}
			>
				{/* <Animated.View
					style={[
						{
							alignItems: "center",
							justifyContent: "center",
							padding: 10,
							borderRadius: 25,
						},
						animationBG,
					]}
				> */}
				<StyledComponent
					component={icon}
					strokeWidth={1.5}
					className={cn({ "text-zinc-50": focused, "text-zinc-900": !focused })}
				/>
				{/* </Animated.View> */}
				<Text
					className={cn("text-xs", {
						"text-zinc-50 font-bold": focused,
						"text-zinc-900": !focused,
					})}
				>
					{label}
				</Text>
			</View>
			<Indicator currentTabIndex={currentTabIndex} index={index} />
		</View>
	);
};

const Indicator = ({ currentTabIndex, index }: { index: number; currentTabIndex: SharedValue<number> }) => {
	const INDICATOR_HEIGHT = 55;
	const INDICATOR_WIDTH = 90;

	const animation = useAnimatedStyle(() => {
		return {
			opacity: withSpring(interpolate(currentTabIndex.value, [index - 1, index, index + 1], [0, 1, 0]), {
				damping: 10,
			}),

			transform: [
				{
					translateX: -20,
				},
				{
					translateY: 2.5,
				},
				{
					scale: withSpring(interpolate(currentTabIndex.value, [index - 1, index, index + 1], [0, 1, 0])),
				},
			],
		};
	});

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					width: INDICATOR_WIDTH,
					height: INDICATOR_HEIGHT,
					bottom: 0,
					left: 0,
					opacity: 0,
					zIndex: 1,
				},
				animation,
			]}
			className="bg-blue-500 rounded-md"
		></Animated.View>
	);
};
