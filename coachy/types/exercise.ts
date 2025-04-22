// Save to: coachy/types/exercise.ts

// Define muscle groups
export enum MuscleGroup {
    // Upper body
    Chest = "Chest",
    Back = "Back",
    Shoulders = "Shoulders",
    Biceps = "Biceps",
    Triceps = "Triceps",
    Forearms = "Forearms",

    // Core
    Abs = "Abs",
    Obliques = "Obliques",
    LowerBack = "Lower Back",

    // Lower body
    Quadriceps = "Quadriceps",
    Hamstrings = "Hamstrings",
    Glutes = "Glutes",
    Calves = "Calves",

    // Full body
    FullBody = "Full Body",
}

// Basic exercise model
export interface Exercise {
    id: string;
    name: string;
    description?: string;
    primaryMuscles: MuscleGroup[];
    secondaryMuscles?: MuscleGroup[];
    isCustom?: boolean;
    createdBy?: string; // User ID for custom exercises
    variationOf?: string; // ID of the parent exercise if this is a variation
}

// Extended exercise model for display
export interface ExerciseDetails extends Exercise {
    variations?: Exercise[];
    similarExercises?: Exercise[];
}

// Type for exercise filters
export interface ExerciseFilters {
    muscleGroup?: MuscleGroup;
    searchQuery?: string;
    customOnly?: boolean;
}