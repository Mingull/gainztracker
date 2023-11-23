export default function formatDateTime(data: Date) {
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "2-digit",
		hour: "numeric",
		minute: "2-digit",
	};

	const currentYear = new Date().getFullYear();
	const dataYear = data.getFullYear();

	if (dataYear !== currentYear) {
		options.year = "2-digit";
	}

	return Intl.DateTimeFormat(undefined, options).format(data);
}
