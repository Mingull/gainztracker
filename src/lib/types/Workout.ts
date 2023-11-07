export type Workout = {
	id: number;
	name: string;
	exercises: Exercise[];
	createdAt: string;
};

export type Exercise = {
	id: number;
	name: string;
	sets: Set[];
	photos?: string[] | null;
};

export type Set = {
	id: number;
	weight: number;
	reps: number;
};

// turn the types into postgres tables schema

const workouts: Workout[] = [
	{
		id: 1,
		name: "Chest Day",
		exercises: [
			{
				id: 1,
				name: "Bench Press",
				sets: [
					{
						id: 1,
						weight: 135,
						reps: 10,
					},
					{
						id: 2,
						weight: 135,
						reps: 10,
					},
					{
						id: 3,
						weight: 135,
						reps: 10,
					},
				],
			},
			{
				id: 2,
				name: "Incline Bench Press",
				sets: [
					{
						id: 1,
						weight: 135,
						reps: 10,
					},
					{
						id: 2,
						weight: 135,
						reps: 10,
					},
					{
						id: 3,
						weight: 135,
						reps: 10,
					},
				],
			},
		],
		createdAt: new Date().toISOString(),
	},
];
