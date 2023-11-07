import { Button, Text } from "@/components";
import modal from "@/components/Modalify";
import { AccountForm } from "@/components/forms/AccountForm";
import { UserForm } from "@/components/forms/UserForm";
import FormValidations from "@/components/forms/validations";
import { supabase } from "@/lib/db/supabase";
import { useMultiStepForm } from "@/lib/utils/useMultistepForm";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};
const INITIAL_DATA: FormData = {
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function RegisterPage() {
	// async function signUp(values: Yup.InferType<typeof validSchema>) {
	// 	const modalId = modal.loading("Loading", { duration: Infinity, position: "center" });
	// 	const { error } = await supabase.auth.signUp({
	// 		email: values.email,
	// 		password: values.password,
	// 	});

	// 	if (error) modal.error(error.message, { id: modalId, duration: 5000 });
	// 	else modal.success("Check your email for a confirmation link", { id: modalId, duration: 5000 });
	// }

	const { formik, steps, currentStepIndex, currentStep, isFirstStep, isLastStep, next, back } =
		useMultiStepForm<FormData>([<AccountForm />, <UserForm />], {
			initialValues: INITIAL_DATA,
			validationSchema: FormValidations,
			onSubmit: async (values, actions) => {
				if (!isLastStep) {
					next();
					actions.setTouched({});
					actions.setSubmitting(false);
				} else {
					const modalId = modal.loading("Loading", { duration: Infinity, position: "center" });
					const { error } = await supabase.auth.signUp({
						email: values.email,
						password: values.password,
						options: {
							data: {
								first_name: values.firstName,
								last_name: values.lastName,
								username: values.username,
							},
						},
					});

					if (error) modal.error(error.message, { id: modalId, duration: 5000 });
					else modal.success("Check your email for a confirmation link", { id: modalId, duration: 5000 });
				}
			},
		});

	return (
		<ScrollView keyboardShouldPersistTaps="always">
			<SafeAreaView className="flex-1 p-2 mx-2">
				<View className="mt-12 mb-4">
					<Text size={"3xl"} className="font-bold text-zinc-700">
						Create account
					</Text>
					<Text size={"md"}>Fill in the form to create a account</Text>
				</View>

				<View className="relative">
					<Text className="absolute top-2 right-2">
						{currentStepIndex + 1}/{steps.length}
					</Text>

					<View className="space-y-5">
						{currentStep}
						<View className="flex-row gap-x-2">
							{!isFirstStep && (
								<Button className="flex-1" variant={"default"} onPress={() => back()}>
									<Text variant={"login"} transform={"uppercase"}>
										back
									</Text>
								</Button>
							)}
							<Button
								variant={"login"}
								className="flex-1"
								// disabled={!formik.isValid}
								onPress={() => formik.handleSubmit()}
							>
								<Text variant={"login"} transform={"uppercase"}>
									{isLastStep ? "Register" : "next"}
								</Text>
							</Button>
						</View>
					</View>
				</View>

				{/* <Formik
					initialValues={{ email: "", password: "", confirmPassword: "" }}
					validationSchema={validSchema}
					onSubmit={(values) => {
						console.log(values);
						signUp(values);
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
						
					 }) => ( 
						<View className="space-y-5">
							<>
								<Input
									onChangeText={handleChange("email")}
									onBlur={handleBlur("email")}
									value={values.email}
									textContentType="emailAddress"
									placeholder="email@address.com"
									autoCapitalize={"none"}
									withValidation
									touched={touched.email}
									error={errors.email}
									label="Email"
								/>

								<Input
									onChangeText={handleChange("password")}
									onBlur={handleBlur("password")}
									value={values.password}
									secureTextEntry={true}
									textContentType="newPassword"
									placeholder="Pass1234"
									autoCapitalize={"none"}
									withValidation
									touched={touched.password}
									error={errors.password}
									label="Password"
								/>

								<Input
									onChangeText={handleChange("confirmPassword")}
									onBlur={handleBlur("confirmPassword")}
									value={values.confirmPassword}
									secureTextEntry={true}
									textContentType="newPassword"
									placeholder="Pass1234"
									autoCapitalize={"none"}
									withValidation
									touched={touched.confirmPassword}
									error={errors.confirmPassword}
									label="Confirm password"
								/>
							</>
							<Button variant={"login"} disabled={!isValid} onPress={() => handleSubmit()}>
								<Text variant={"login"} transform={"uppercase"}>
									Login
								</Text>
							</Button>
						</View> 
					 )} 
				 </Formik>  */}

				<View>
					<Text className="text-zinc-700">
						Already have an account?{" "}
						<Link href={"/(auth)/login"} className="text-blue-400">
							Login
						</Link>
					</Text>
				</View>

				{/* <SocialButton brand="discord" disabled />
				<SocialButton brand="spotify" disabled />
				<SocialButton brand="google" disabled />
				<SocialButton brand="facebook" disabled />
				<SocialButton brand="github" disabled />

				<View className="self-stretch my-1">
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
				{/* <Modal
					title="Email confirmation"
					visible={isModalOpen}
					height={"default"}
					position={"center"}
					onClose={() => setIsModalOpen(false)}
					onRequestClose={() => setIsModalOpen(false)}
					footer={
						<Button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							<Text className="text-white">I accept</Text>
						</Button>
					}
				>
					<Text>Check your email for a confirmation link</Text>
				</Modal> */}
			</SafeAreaView>
		</ScrollView>
	);
}
