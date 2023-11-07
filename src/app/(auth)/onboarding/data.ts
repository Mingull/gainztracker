import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
	id: number;
	animation: AnimationObject;
	text: string;
	textColor: string;
	backgroundColor: string;
}

const data: OnboardingData[] = [
	{
		id: 1,
		animation: require("../../../assets/onboarding/animation1.json"),
		text: "Track your workout progress",
		textColor: "#004966",
		backgroundColor: "#99e2ff",
	},
	{
		id: 2,
		animation: require("../../../assets/onboarding/animation2.json"),
		text: "Share with your friends",
		textColor: "#660000",
		backgroundColor: "#ff8080",
	},
	{
		id: 3,
		animation: require("../../../assets/onboarding/animation3.json"),
		text: "See who is the best",
		textColor: "#00662a",
		backgroundColor: "#99ffc4",
	},
	// {
	// 	id: 4,
	// 	animation: require("../../../assets/onboarding/animation4.json"),
	// 	text: "en heb kanker",
	// 	textColor: "#2c0066",
	// 	backgroundColor: "#c599ff",
	// },
];

export default data;
