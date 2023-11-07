import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { OnboardingData } from "../data";
import Dot from "./Dot";

export default function Pagination({ data, x }: { data: OnboardingData[]; x: SharedValue<number> }) {
	return (
		<View style={styles.paginationContainer}>
			{data.map((_, index) => (
				<Dot index={index} x={x} data={data} key={index} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	paginationContainer: {
		flexDirection: "row",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		left: "30%",
		transform: [{ translateX: -70 }],
	},
});
