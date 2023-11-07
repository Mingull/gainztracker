import { FormWrapper } from "./Wrapper";
import { FormikErrors, FormikTouched } from "formik";
import { DefaultFormProps } from "../../lib/utils/useMultistepForm";
import Input from "../Input";

type UserData = {
	username?: string;
	firstName?: string;
	lastName?: string;
};
export type UserFormProps = UserData & DefaultFormProps<UserData>;
export function UserForm({ username, firstName, lastName, updateField, onBlur, touched, errors }: UserFormProps) {
	return (
		<FormWrapper title="User Info">
			<>
				<Input
					onChangeText={updateField!("username")}
					onBlur={onBlur!("username")}
					value={username}
					autoComplete="username"
					placeholder="JohnDoe69"
					autoCapitalize={"none"}
					withValidation
					touched={touched?.username}
					error={errors?.username}
					label="Username"
				/>

				<Input
					onChangeText={updateField!("firstName")}
					onBlur={onBlur!("firstName")}
					value={firstName}
					autoComplete="given-name"
					placeholder="John"
					autoCapitalize="none"
					withValidation
					touched={touched?.firstName}
					error={errors?.firstName}
					label="firstName"
				/>

				<Input
					onChangeText={updateField!("lastName")}
					onBlur={onBlur!("lastName")}
					value={lastName}
					autoComplete="family-name"
					placeholder="Doe"
					autoCapitalize={"none"}
					withValidation
					touched={touched?.lastName}
					error={errors?.lastName}
					label="lastName"
				/>
			</>
		</FormWrapper>
	);
}
