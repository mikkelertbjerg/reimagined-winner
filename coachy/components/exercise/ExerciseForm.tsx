// Save to: coachy/components/exercises/ExerciseForm.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';
import { Exercise, MuscleGroup } from '@/types/exercise';
import InputField from '@/components/ui/InputField';
import { ExerciseService } from '@/services/ExerciseService';

interface ExerciseFormProps {
    exerciseId?: string; // If provided, we're editing an existing exercise
    onSaved?: (exercise: Exercise) => void;
    onClose?: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
    exerciseId,
    onSaved,
    onClose
}) => {
    const { theme } = useSettings();
    const router = useRouter();

    // State
    const isEditing = !!exerciseId;
    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [primaryMuscles, setPrimaryMuscles] = useState<MuscleGroup[]>([]);
    const [secondaryMuscles, setSecondaryMuscles] = useState<MuscleGroup[]>([]);
    const [existingExercise, setExistingExercise] = useState<Exercise | null>(null);

    // Form validation
    const [nameError, setNameError] = useState('');
    const [primaryMuscleError, setPrimaryMuscleError] = useState('');

    // Load exercise data if editing
    useEffect(() => {
        const loadExerciseData = async () => {
            if (!exerciseId) return;

            try {
                setLoading(true);
                const exercise = await ExerciseService.getExerciseById(exerciseId);

                if (exercise) {
                    setExistingExercise(exercise);
                    setName(exercise.name);
                    setDescription(exercise.description || '');
                    setPrimaryMuscles(exercise.primaryMuscles);
                    setSecondaryMuscles(exercise.secondaryMuscles || []);
                }
            } catch (error) {
                console.error('Error loading exercise:', error);
                Alert.alert('Error', 'Failed to load exercise data');
                onClose?.();
            } finally {
                setLoading(false);
            }
        };

        loadExerciseData();
    }, [exerciseId]);

    // Validate form
    const validateForm = (): boolean => {
        let isValid = true;

        // Validate name
        if (!name.trim()) {
            setNameError('Exercise name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        // Validate primary muscles
        if (primaryMuscles.length === 0) {
            setPrimaryMuscleError('At least one primary muscle group is required');
            isValid = false;
        } else {
            setPrimaryMuscleError('');
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);

            // In a real app, this would update or create with the service API
            // For now, we'll just simulate it with a timeout
            await new Promise(resolve => setTimeout(resolve, 500));

            const exerciseData = {
                id: isEditing && existingExercise ? existingExercise.id : Date.now().toString(),
                name,
                description: description.trim() || undefined,
                primaryMuscles,
                secondaryMuscles: secondaryMuscles.length > 0 ? secondaryMuscles : undefined,
                isCustom: true,
            };

            // Call onSaved with the exercise data
            onSaved?.(exerciseData);

            Alert.alert(
                'Success',
                isEditing ? 'Exercise updated successfully' : 'Exercise added successfully'
            );

            // Close the form
            onClose?.();
        } catch (error) {
            console.error('Error saving exercise:', error);
            Alert.alert('Error', 'Failed to save exercise. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Toggle a muscle group selection
    const toggleMuscle = (muscle: MuscleGroup, isPrimary: boolean) => {
        if (isPrimary) {
            // Handle primary muscle toggle
            if (primaryMuscles.includes(muscle)) {
                setPrimaryMuscles(current => current.filter(m => m !== muscle));
            } else {
                setPrimaryMuscles(current => [...current, muscle]);
                // If it was in secondary, remove it
                if (secondaryMuscles.includes(muscle)) {
                    setSecondaryMuscles(current => current.filter(m => m !== muscle));
                }
            }
        } else {
            // Handle secondary muscle toggle
            if (secondaryMuscles.includes(muscle)) {
                setSecondaryMuscles(current => current.filter(m => m !== muscle));
            } else {
                // If it was in primary, don't add it
                if (!primaryMuscles.includes(muscle)) {
                    setSecondaryMuscles(current => [...current, muscle]);
                }
            }
        }
    };

    // Group muscle groups by body part
    const muscleGroups = {
        upper: [
            MuscleGroup.Chest,
            MuscleGroup.Back,
            MuscleGroup.Shoulders,
            MuscleGroup.Biceps,
            MuscleGroup.Triceps,
            MuscleGroup.Forearms
        ],
        core: [
            MuscleGroup.Abs,
            MuscleGroup.Obliques,
            MuscleGroup.LowerBack
        ],
        lower: [
            MuscleGroup.Quadriceps,
            MuscleGroup.Hamstrings,
            MuscleGroup.Glutes,
            MuscleGroup.Calves
        ],
        full: [
            MuscleGroup.FullBody
        ]
    };

    // Get button style based on selection state
    const getMuscleButtonStyle = (muscle: MuscleGroup) => {
        if (primaryMuscles.includes(muscle)) {
            return {
                backgroundColor: theme.colors.primary.DEFAULT,
                borderColor: theme.colors.primary.DEFAULT,
                color: theme.colors.primary.foreground
            };
        } else if (secondaryMuscles.includes(muscle)) {
            return {
                backgroundColor: 'transparent',
                borderColor: theme.colors.primary.DEFAULT,
                color: theme.colors.primary.DEFAULT
            };
        } else {
            return {
                backgroundColor: theme.colors.background.card,
                borderColor: theme.colors.border.DEFAULT,
                color: theme.colors.text.DEFAULT
            };
        }
    };

    // Loading state
    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.DEFAULT }]}>
                <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
                <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
                    Loading exercise data...
                </Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={[styles.container, { backgroundColor: theme.colors.background.DEFAULT }]}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text.DEFAULT }]}>
                        {isEditing ? 'Edit Exercise' : 'Add New Exercise'}
                    </Text>
                    {onClose && (
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close-outline" size={28} color={theme.colors.text.DEFAULT} />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView style={styles.content}>
                    {/* Exercise Name */}
                    <View style={styles.inputContainer}>
                        <InputField
                            label="Exercise Name"
                            placeholder="Enter exercise name"
                            value={name}
                            onChangeText={setName}
                            error={nameError}
                            autoCapitalize="words"
                        />
                    </View>

                    {/* Exercise Description */}
                    <View style={styles.inputContainer}>
                        <InputField
                            label="Description (Optional)"
                            placeholder="Enter a description of the exercise"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            style={styles.descriptionInput}
                        />
                    </View>

                    {/* Muscle Selection */}
                    <View style={styles.muscleSelectionContainer}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Muscle Groups
                        </Text>

                        {primaryMuscleError ? (
                            <Text style={[styles.errorText, { color: theme.colors.destructive.DEFAULT }]}>
                                {primaryMuscleError}
                            </Text>
                        ) : null}

                        <View style={styles.muscleSelectionLegend}>
                            <View style={styles.legendItem}>
                                <View style={[
                                    styles.legendDot,
                                    { backgroundColor: theme.colors.primary.DEFAULT }
                                ]} />
                                <Text style={[styles.legendText, { color: theme.colors.text.DEFAULT }]}>
                                    Primary
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[
                                    styles.legendOutlineDot,
                                    { borderColor: theme.colors.primary.DEFAULT }
                                ]} />
                                <Text style={[styles.legendText, { color: theme.colors.text.DEFAULT }]}>
                                    Secondary
                                </Text>
                            </View>
                            <Text style={[styles.legendHelp, { color: theme.colors.text.muted }]}>
                                Tap once for primary, twice for secondary
                            </Text>
                        </View>

                        {/* Upper Body */}
                        <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                            Upper Body
                        </Text>
                        <View style={styles.muscleButtonsContainer}>
                            {muscleGroups.upper.map(muscle => {
                                const buttonStyle = getMuscleButtonStyle(muscle);
                                return (
                                    <TouchableOpacity
                                        key={muscle}
                                        style={[
                                            styles.muscleButton,
                                            {
                                                backgroundColor: buttonStyle.backgroundColor,
                                                borderColor: buttonStyle.borderColor,
                                                borderWidth: 1,
                                            }
                                        ]}
                                        onPress={() => {
                                            const isPrimary = !primaryMuscles.includes(muscle) &&
                                                !secondaryMuscles.includes(muscle);
                                            toggleMuscle(muscle, isPrimary);
                                        }}
                                    >
                                        <Text style={[
                                            styles.muscleButtonText,
                                            { color: buttonStyle.color }
                                        ]}>
                                            {muscle}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Core */}
                        <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                            Core
                        </Text>
                        <View style={styles.muscleButtonsContainer}>
                            {muscleGroups.core.map(muscle => {
                                const buttonStyle = getMuscleButtonStyle(muscle);
                                return (
                                    <TouchableOpacity
                                        key={muscle}
                                        style={[
                                            styles.muscleButton,
                                            {
                                                backgroundColor: buttonStyle.backgroundColor,
                                                borderColor: buttonStyle.borderColor,
                                                borderWidth: 1,
                                            }
                                        ]}
                                        onPress={() => {
                                            const isPrimary = !primaryMuscles.includes(muscle) &&
                                                !secondaryMuscles.includes(muscle);
                                            toggleMuscle(muscle, isPrimary);
                                        }}
                                    >
                                        <Text style={[
                                            styles.muscleButtonText,
                                            { color: buttonStyle.color }
                                        ]}>
                                            {muscle}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Lower Body */}
                        <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                            Lower Body
                        </Text>
                        <View style={styles.muscleButtonsContainer}>
                            {muscleGroups.lower.map(muscle => {
                                const buttonStyle = getMuscleButtonStyle(muscle);
                                return (
                                    <TouchableOpacity
                                        key={muscle}
                                        style={[
                                            styles.muscleButton,
                                            {
                                                backgroundColor: buttonStyle.backgroundColor,
                                                borderColor: buttonStyle.borderColor,
                                                borderWidth: 1,
                                            }
                                        ]}
                                        onPress={() => {
                                            const isPrimary = !primaryMuscles.includes(muscle) &&
                                                !secondaryMuscles.includes(muscle);
                                            toggleMuscle(muscle, isPrimary);
                                        }}
                                    >
                                        <Text style={[
                                            styles.muscleButtonText,
                                            { color: buttonStyle.color }
                                        ]}>
                                            {muscle}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Full Body */}
                        <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                            Full Body
                        </Text>
                        <View style={styles.muscleButtonsContainer}>
                            {muscleGroups.full.map(muscle => {
                                const buttonStyle = getMuscleButtonStyle(muscle);
                                return (
                                    <TouchableOpacity
                                        key={muscle}
                                        style={[
                                            styles.muscleButton,
                                            {
                                                backgroundColor: buttonStyle.backgroundColor,
                                                borderColor: buttonStyle.borderColor,
                                                borderWidth: 1,
                                            }
                                        ]}
                                        onPress={() => {
                                            const isPrimary = !primaryMuscles.includes(muscle) &&
                                                !secondaryMuscles.includes(muscle);
                                            toggleMuscle(muscle, isPrimary);
                                        }}
                                    >
                                        <Text style={[
                                            styles.muscleButtonText,
                                            { color: buttonStyle.color }
                                        ]}>
                                            {muscle}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View style={[styles.footer, { borderTopColor: theme.colors.border.DEFAULT }]}>
                        <TouchableOpacity
                            style={[styles.footerButton, styles.cancelButton, { borderColor: theme.colors.border.DEFAULT }]}
                            onPress={onClose}
                            disabled={submitting}
                        >
                            <Text style={[styles.footerButtonText, { color: theme.colors.text.DEFAULT }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.footerButton,
                                styles.saveButton,
                                { backgroundColor: theme.colors.primary.DEFAULT }
                            ]}
                            onPress={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <ActivityIndicator size="small" color={theme.colors.primary.foreground} />
                            ) : (
                                <Text style={[
                                    styles.footerButtonText,
                                    styles.saveButtonText,
                                    { color: theme.colors.primary.foreground }
                                ]}>
                                    {isEditing ? 'Update Exercise' : 'Add Exercise'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    muscleSelectionContainer: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    errorText: {
        fontSize: 14,
        marginBottom: 8,
    },
    muscleSelectionLegend: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendOutlineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        marginRight: 4,
    },
    legendText: {
        fontSize: 12,
    },
    legendHelp: {
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: 4,
    },
    groupTitle: {
        fontSize: 14,
        marginBottom: 8,
        marginTop: 8,
    },
    muscleButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    muscleButton: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    muscleButtonText: {
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
    },
    footerButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        borderWidth: 1,
        marginRight: 12,
    },
    saveButton: {
        flex: 1,
    },
    footerButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    saveButtonText: {
        fontWeight: '600',
    }
});

export default ExerciseForm;