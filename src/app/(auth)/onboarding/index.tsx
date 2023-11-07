import React from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import Button from "./components/Button";
import Pagination from "./components/Pagination";
import RenderItem from "./components/RenderItem";
import data, { OnboardingData } from "./data";

export default function OnboardingPage() {
	const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
	const x = useSharedValue(0);
	const flatlistIndex = useSharedValue(0);

	const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems[0].index !== null) {
			flatlistIndex.value = viewableItems[0].index;
		}
	};

	const onScroll = useAnimatedScrollHandler({
		onScroll: (e) => {
			x.value = e.contentOffset.x;
		},
	});

	return (
		<View style={styles.container}>
			<Animated.FlatList
				ref={flatListRef as unknown as React.RefObject<Animated.FlatList<OnboardingData>>}
				onScroll={onScroll}
				data={data}
				renderItem={({ item, index }) => {
					return <RenderItem item={item} index={index} x={x} />;
				}}
				keyExtractor={(item) => item.id.toString()}
				scrollEventThrottle={16}
				horizontal={true}
				bounces={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					minimumViewTime: 300,
					viewAreaCoveragePercentThreshold: 10,
				}}
			/>
			<View style={styles.bottomContainer}>
				<Pagination data={data} x={x} />
				<Button data={data} flatlistIndex={flatlistIndex} flatListRef={flatListRef} x={x} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 30,
		paddingVertical: 30,
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
	},
});
