import { faDiscord, faFacebookF, faGithub, faGoogle, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { VariantProps } from "cva";
import { TouchableOpacityProps, View } from "react-native";
import Button, { buttonVariants } from "./Button";
import Text from "./Text";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export type SocialBrand = "discord" | "facebook" | "spotify" | "google" | "github";

export interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
	brand: SocialBrand;
}

export default function SocialButton({ brand, ...props }: ButtonProps) {
	return (
		<View className="self-stretch py-1">
			{brand === "discord" ? (
				<Button variant={"socialLogin"} className={"bg-discord"} {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="white"
							icon={faDiscord}
							size={24}
							style={{ justifyContent: "center", display: "flex", alignItems: "center", marginRight: 6 }}
						/>
						<Text variant={"login"} className="">
							Login with Discord
						</Text>
					</View>
				</Button>
			) : brand === "facebook" ? (
				<Button variant={"socialLogin"} className={"bg-facebook"} {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="white"
							icon={faFacebookF}
							size={24}
							style={{
								justifyContent: "center",
								display: "flex",
								alignItems: "center",
								marginRight: 6,
							}}
						/>
						<Text variant={"login"} className="">
							Login with Facebook
						</Text>
					</View>
				</Button>
			) : brand === "github" ? (
				<Button variant={"socialLogin"} className={"bg-github"} {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="white"
							icon={faGithub}
							size={24}
							style={{ justifyContent: "center", display: "flex", alignItems: "center", marginRight: 6 }}
						/>
						<Text variant={"login"} className="">
							Login with GitHub
						</Text>
					</View>
				</Button>
			) : brand === "google" ? (
				<Button variant={"socialLogin"} className={"bg-google"} {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="rgb(63 63 70)"
							icon={faGoogle}
							size={24}
							style={{ justifyContent: "center", display: "flex", alignItems: "center", marginRight: 6 }}
						/>
						<Text variant={"login"} className="text-zinc-700">
							Login with Google
						</Text>
					</View>
				</Button>
			) : brand === "spotify" ? (
				<Button variant={"socialLogin"} className={"bg-spotify"} {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="white"
							icon={faSpotify}
							size={24}
							style={{ justifyContent: "center", display: "flex", alignItems: "center", marginRight: 6 }}
						/>
						<Text variant={"login"} className="">
							Login with Spotify
						</Text>
					</View>
				</Button>
			) : (
				<Button variant={"socialLogin"} className={"bg-zinc-900"} disabled {...props}>
					<View className="flex-row justify-between flex-1">
						<FontAwesomeIcon
							color="white"
							icon={faQuestion}
							size={24}
							style={{ justifyContent: "center", display: "flex", alignItems: "center", marginRight: 6 }}
						/>
						<Text variant={"login"} className="">
							No brand provided
						</Text>
					</View>
				</Button>
			)}
		</View>
	);
}
