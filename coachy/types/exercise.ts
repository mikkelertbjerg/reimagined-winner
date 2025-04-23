// types/exercise.ts

// Define body part categories
export enum BodyPart {
    Arms = "Arms",
    Chest = "Chest",
    Back = "Back",
    Shoulders = "Shoulders",
    Core = "Core",
    Legs = "Legs",
    FullBody = "Full Body"
}

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

// Define exercise source types
export enum ExerciseSource {
    Predefined = "predefined",  // Built-in exercises provided by the app
    User = "user",              // User-created exercises
    Community = "community"     // Exercises shared by other users
}

// Mapping muscle groups to body parts
export const muscleToBodyPartMap: Record<MuscleGroup, BodyPart> = {
    [MuscleGroup.Chest]: BodyPart.Chest,
    [MuscleGroup.Back]: BodyPart.Back,
    [MuscleGroup.Shoulders]: BodyPart.Shoulders,
    [MuscleGroup.Biceps]: BodyPart.Arms,
    [MuscleGroup.Triceps]: BodyPart.Arms,
    [MuscleGroup.Forearms]: BodyPart.Arms,
    [MuscleGroup.Abs]: BodyPart.Core,
    [MuscleGroup.Obliques]: BodyPart.Core,
    [MuscleGroup.LowerBack]: BodyPart.Core,
    [MuscleGroup.Quadriceps]: BodyPart.Legs,
    [MuscleGroup.Hamstrings]: BodyPart.Legs,
    [MuscleGroup.Glutes]: BodyPart.Legs,
    [MuscleGroup.Calves]: BodyPart.Legs,
    [MuscleGroup.FullBody]: BodyPart.FullBody,
};

// Basic exercise model
export interface Exercise {
    id: string;
    name: string;
    description?: string;
    primaryMuscles: MuscleGroup[];
    secondaryMuscles?: MuscleGroup[];
    bodyParts: BodyPart[]; // New field to store body parts
    source: ExerciseSource; // Added source field
    createdBy?: string; // User ID for custom exercises
    variationOf?: string; // ID of the parent exercise if this is a variation
}

// Extended exercise model for display
export interface ExerciseDetails extends Exercise {
    variations?: Exercise[];
    similarExercises?: Exercise[];
}

// Updated filter type for multiple muscle groups and sources
export interface ExerciseFilters {
    muscleGroups?: MuscleGroup[];   // Multiple muscle groups
    bodyParts?: BodyPart[];         // Multiple body parts
    sources?: ExerciseSource[];     // Multiple exercise sources
    searchQuery?: string;
    customOnly?: boolean;           // Legacy field, can be replaced by sources
}