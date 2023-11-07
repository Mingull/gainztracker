import { Provider } from "@supabase/supabase-js";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Linking, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, SocialButton, Text } from "@/components";
import { supabase } from "@/lib/db/supabase";
import * as Yup from "yup";
import { Formik } from "formik";

const validSchema = Yup.object()
	.shape({
		email: Yup.string().email("Invalid email address").required("Email is required"),
		password: Yup.string()
			.min(8, "Password must at least contain 8 characters")
			.max(25, "Password cannot be longer than 25 characters")
			.required("Password is required"),
	})
	.defined();

export default function LoginPage() {
	async function signIn(values: Yup.InferType<typeof validSchema>) {
		const { error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});

		if (error) Alert.alert(error.message);
	}

	async function signInWith(provider: Provider) {
		const { error, data } = await supabase.auth.signInWithOAuth({
			provider,
		});

		if (error) Alert.alert(error.message);
		Linking.openURL(data.url!).catch((err) => console.error("An error occurred: ", err));
	}

	return (
		<ScrollView keyboardShouldPersistTaps="always">
			<SafeAreaView className="flex-1 p-3 mx-2">
				<View className="mt-12 mb-4">
					<Text size={"3xl"} className="font-bold text-zinc-700">
						Welcome
					</Text>
					<Text size={"md"}>Login with your account</Text>
				</View>

				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validSchema}
					onSubmit={(values) => {
						console.log(values);
						signIn(values);
					}}
				>
					{({
						values,
						errors,
						touched,
						isValid,
						handleChange,
						handleSubmit,
						handleBlur,
						/* and other goodies */
					}) => (
						<View className="space-y-5">
							<>
								<Input
									onChangeText={handleChange("email")}
									onBlur={handleBlur("email")}
									value={values.email}
									autoComplete="email"
									placeholder="email@address.com"
									autoCapitalize={"none"}
									label="Email"
									withValidation
									error={errors.email}
									touched={touched.email}
								/>
								<Input
									onChangeText={handleChange("password")}
									onBlur={handleBlur("password")}
									value={values.password}
									secureTextEntry={true}
									autoComplete="password"
									placeholder="Password"
									autoCapitalize={"none"}
									label="Password"
									withValidation
									error={errors.email}
									touched={touched.email}
								/>
							</>

							<View className="self-stretch">
								<Button variant={"login"} disabled={!isValid} onPress={() => handleSubmit()}>
									<Text variant={"login"}>Login</Text>
								</Button>
							</View>
						</View>
					)}
				</Formik>

				<View>
					<Text className="text-zinc-700">
						Have no account?{" "}
						<Link href={"/(auth)/register"} className="text-blue-400">
							Create one
						</Link>
					</Text>
				</View>

				<View className="flex-row items-center my-5">
					<View className="flex-1 h-[3px] bg-zinc-300 rounded-l" />
					<View>
						<Text className="w-10 px-1 py-1 text-center border-2 rounded-full border-zinc-300">Or</Text>
					</View>
					<View className="flex-1 h-[3px] bg-zinc-300 rounded-r" />
				</View>

				<View className="space-y-2">
					<SocialButton onPress={() => signInWith("discord")} brand="discord" disabled />
					<SocialButton onPress={() => signInWith("spotify")} brand="spotify" disabled />
					<SocialButton onPress={() => signInWith("google")} brand="google" disabled />
					<SocialButton onPress={() => signInWith("facebook")} brand="facebook" disabled />
					<SocialButton onPress={() => signInWith("github")} brand="github" disabled />
				</View>

				{/* <View className="self-stretch my-1">
				<Button
					variant={"social login"}
					className="bg-spotify"
					disabled={loading}
					onPress={() => signInWith("spotify")}
				>
					<FontAwesomeIcon color="white" icon={faSpotify} size={24} />
					<Text variant={"login"} transform={"uppercase"}>
						Login with Spotify
					</Text>
				</Button>
			</View> */}
			</SafeAreaView>
		</ScrollView>
	);
}
