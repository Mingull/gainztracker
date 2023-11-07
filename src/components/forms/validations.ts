import * as Yup from "yup";

export default [
	Yup.object()
		.shape({
			email: Yup.string().email("Invalid email address").required("Email is required"),
			password: Yup.string()
				.min(8, "Password must at least contain 8 characters")
				.max(25, "Password cannot be longer than 25 characters")
				.required("Password is required"),
			confirmPassword: Yup.string()
				.min(8, "Confirm password must at least contain 8 characters")
				.max(25, "Confirm password cannot be longer than 25 characters")
				.oneOf([Yup.ref("password"), undefined], "Passwords must match")
				.required("Confirm password is required"),
		})
		.defined(),
	Yup.object()
		.shape({
			firstName: Yup.string().min(3, "First name must contain at least 3 characters").required("First name is required"),
			lastName: Yup.string().min(3, "Last name must contain at least 3 characters").required("Last name is required"),
			username: Yup.string()
				.min(3, "Username must contain at least 3 characters")
				.required("Username is required"),
		})
		.defined(),
];
