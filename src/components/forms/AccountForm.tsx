import { FormWrapper } from "./Wrapper";
import { FormikErrors, FormikTouched } from "formik";
import { DefaultFormProps } from "../../lib/utils/useMultistepForm";
import Input from "../Input";

type AccountData = {
	email?: string;
	password?: string;
	confirmPassword?: string;
};
export type AccountFormProps = AccountData & DefaultFormProps<AccountData>;
export function AccountForm({
	email,
	password,
	confirmPassword,
	updateField,
	onBlur,
	touched,
	errors,
}: AccountFormProps) {
	return (
		<FormWrapper title="Account information">
			<>
				<Input
					onChangeText={updateField!("email")}
					onBlur={onBlur!("email")}
					value={email}
					autoComplete="email"
					placeholder="email@address.com"
					autoCapitalize={"none"}
					withValidation
					touched={touched?.email}
					error={errors?.email}
					label="Email"
				/>

				<Input
					onChangeText={updateField!("password")}
					onBlur={onBlur!("password")}
					value={password}
					secureTextEntry={true}
					autoComplete="password"
					placeholder="Pass1234"
					autoCapitalize={"none"}
					withValidation
					touched={touched?.password}
					error={errors?.password}
					label="Password"
				/>

				<Input
					onChangeText={updateField!("confirmPassword")}
					onBlur={onBlur!("confirmPassword")}
					value={confirmPassword}
					secureTextEntry={true}
					autoComplete="password"
					placeholder="Pass1234"
					autoCapitalize={"none"}
					withValidation
					touched={touched?.confirmPassword}
					error={errors?.confirmPassword}
					label="Confirm password"
				/>
			</>
		</FormWrapper>
	);
}
