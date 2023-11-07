export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			exercises: {
				Row: {
					id: number;
					name: string;
					photos: string[] | null;
					workout_id: number;
				};
				Insert: {
					id?: number;
					name: string;
					photos?: string[] | null;
					workout_id: number;
				};
				Update: {
					id?: number;
					name?: string;
					photos?: string[] | null;
					workout_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: "exercises_workout_id_fkey";
						columns: ["workout_id"];
						isOneToOne: false;
						referencedRelation: "workouts";
						referencedColumns: ["id"];
					}
				];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string | null;
					first_name: string | null;
					id: string;
					last_name: string | null;
					updated_at: string | null;
					username: string | null;
					website: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string | null;
					first_name?: string | null;
					id: string;
					last_name?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string | null;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			sets: {
				Row: {
					exercise_id: number;
					id: number;
					reps: number;
					weight: number;
				};
				Insert: {
					exercise_id: number;
					id?: number;
					reps: number;
					weight: number;
				};
				Update: {
					exercise_id?: number;
					id?: number;
					reps?: number;
					weight?: number;
				};
				Relationships: [
					{
						foreignKeyName: "sets_exercise_id_fkey";
						columns: ["exercise_id"];
						isOneToOne: false;
						referencedRelation: "exercises";
						referencedColumns: ["id"];
					}
				];
			};
			workouts: {
				Row: {
					created_at: string;
					id: number;
					name: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					name: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					name?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "workouts_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
