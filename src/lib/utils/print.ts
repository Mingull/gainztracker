export default function print(args: unknown, ...optArgs: unknown[]) {
	console.log(args, ...optArgs);
}

export function prettyPrint(args: unknown) {
	console.log(JSON.stringify(args, null, 2));
}

export { print };
