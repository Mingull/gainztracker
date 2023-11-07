import { FormikErrors, FormikHelpers, FormikTouched, FormikValues, useFormik } from "formik";
import { ReactElement, useState, cloneElement } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export function useMultiStepForm<Values extends FormikValues>(
	steps: FormElement<Values>[],
	{
		initialValues,
		validationSchema,
		onSubmit,
	}: {
		initialValues: Values;
		validationSchema: any;
		onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
	}
) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const formik = useFormik<Values>({
		initialValues: initialValues,
		validationSchema: validationSchema[currentStepIndex],
		onSubmit: onSubmit,
		validateOnChange: true,
		validateOnBlur: true,
		validateOnMount: true,
	});

	function next() {
		setCurrentStepIndex((i) => {
			if (i > steps.length - 1) return i;
			return i + 1;
		});
	}

	function back() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}

	function goTo(index: number) {
		setCurrentStepIndex(index);
	}

	function _renderCurrentStep(step: FormElement<Values>) {
		const Step = cloneElement(step, {
			...formik.values,
			touched: formik.touched,
			errors: formik.errors,
			onBlur: formik.handleBlur,
			updateField: formik.handleChange,
		});
		return Step;
	}
	return {
		formik,
		steps,
		currentStepIndex,
		currentStep: _renderCurrentStep(steps[currentStepIndex]),
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		next,
		back,
		goTo,
	};
}

export type DefaultFormProps<Data extends Object> = {
	touched?: FormikTouched<Data>;
	errors?: FormikErrors<Data>;
	onBlur?: { <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void };
	updateField?: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
};

type FormElement<Data extends Object> = ReactElement<Partial<Data & DefaultFormProps<Data>>>;

export default useMultiStepForm;
