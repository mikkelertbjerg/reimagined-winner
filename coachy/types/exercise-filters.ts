import { BodyPart, ExerciseSource, MuscleGroup } from "./exercise";


export interface ExerciseFilters {
    muscleGroups?: MuscleGroup[];   // Multiple muscle groups
    bodyParts?: BodyPart[];         // Multiple body parts
    sources?: ExerciseSource[];     // Multiple exercise sources
    searchQuery?: string;
    customOnly?: boolean;           // Legacy field, can be replaced by sources
}