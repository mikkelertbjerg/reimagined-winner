// Save to: coachy/services/ExerciseService.ts
import { Exercise, MuscleGroup } from '@/types/exercise';

// Mock data for exercises
const MOCK_EXERCISES: Exercise[] = [
    {
        id: '1',
        name: 'Bench Press',
        description: 'A compound exercise that primarily targets the chest muscles, with secondary emphasis on the shoulders and triceps.',
        primaryMuscles: [MuscleGroup.Chest],
        secondaryMuscles: [MuscleGroup.Shoulders, MuscleGroup.Triceps],
    },
    {
        id: '2',
        name: 'Squat',
        description: 'A compound lower body exercise that primarily targets the quadriceps, with secondary emphasis on the hamstrings and glutes.',
        primaryMuscles: [MuscleGroup.Quadriceps],
        secondaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Glutes],
    },
    {
        id: '3',
        name: 'Deadlift',
        description: 'A compound full-body exercise that primarily targets the lower back, with secondary emphasis on the hamstrings, glutes, and traps.',
        primaryMuscles: [MuscleGroup.LowerBack],
        secondaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Glutes],
    },
    {
        id: '4',
        name: 'Pull-up',
        description: 'A compound upper body exercise that primarily targets the back muscles, with secondary emphasis on the biceps and shoulders.',
        primaryMuscles: [MuscleGroup.Back],
        secondaryMuscles: [MuscleGroup.Biceps, MuscleGroup.Shoulders],
    },
    {
        id: '5',
        name: 'Dumbbell Shoulder Press',
        description: 'A compound upper body exercise that primarily targets the shoulder muscles, with secondary emphasis on the triceps.',
        primaryMuscles: [MuscleGroup.Shoulders],
        secondaryMuscles: [MuscleGroup.Triceps],
    },
    {
        id: '6',
        name: 'Barbell Curl',
        description: 'An isolation exercise that primarily targets the biceps muscles.',
        primaryMuscles: [MuscleGroup.Biceps],
        secondaryMuscles: [MuscleGroup.Forearms],
    },
    {
        id: '7',
        name: 'Tricep Pushdown',
        description: 'An isolation exercise that primarily targets the triceps muscles.',
        primaryMuscles: [MuscleGroup.Triceps],
    },
    {
        id: '8',
        name: 'Leg Press',
        description: 'A compound lower body exercise that primarily targets the quadriceps, with secondary emphasis on the hamstrings and glutes.',
        primaryMuscles: [MuscleGroup.Quadriceps],
        secondaryMuscles: [MuscleGroup.Hamstrings, MuscleGroup.Glutes],
        variationOf: '2', // Variation of Squat
    },
    {
        id: '9',
        name: 'Incline Bench Press',
        description: 'A variation of the bench press that puts more emphasis on the upper chest.',
        primaryMuscles: [MuscleGroup.Chest],
        secondaryMuscles: [MuscleGroup.Shoulders, MuscleGroup.Triceps],
        variationOf: '1', // Variation of Bench Press
    },
    {
        id: '10',
        name: 'Crunches',
        description: 'An isolation exercise that primarily targets the abdominal muscles.',
        primaryMuscles: [MuscleGroup.Abs],
    },
];

/**
 * Service for managing exercises
 * This mimics API calls to a backend service
 */
export class ExerciseService {
    /**
     * Get all exercises
     * Simulates: GET /api/exercises
     */
    static async getExercises(): Promise<Exercise[]> {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            // Return mock exercises
            return [...MOCK_EXERCISES];
        } catch (error) {
            console.error('Error fetching exercises:', error);
            throw new Error('Failed to fetch exercises');
        }
    }

    /**
     * Get an exercise by ID
     * Simulates: GET /api/exercises/{id}
     */
    static async getExerciseById(id: string): Promise<Exercise | null> {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 200));

            // Find the exercise by ID
            const exercise = MOCK_EXERCISES.find(ex => ex.id === id);

            // If not found, return null
            if (!exercise) {
                return null;
            }

            return exercise;
        } catch (error) {
            console.error(`Error fetching exercise with id ${id}:`, error);
            throw new Error('Failed to fetch exercise');
        }
    }
}