import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';
import { ExerciseFilters } from '@/types/exercise-filters';
import { MuscleGroup, BodyPart, ExerciseFilters as FilterTypes, muscleToBodyPartMap, ExerciseSource } from '@/types/exercise';

// Updated interface to support arrays of muscle groups and exercise sources
interface ExerciseFilterProps {
    initialFilters: FilterTypes;
    onApplyFilters: (filters: FilterTypes) => void;
    onClose?: () => void;
}

const ExerciseFilter: React.FC<ExerciseFilterProps> = ({
    initialFilters,
    onApplyFilters,
    onClose
}) => {
    const { theme } = useSettings();

    // Updated to store arrays of muscle groups and exercise sources
    const [localFilters, setLocalFilters] = useState<FilterTypes>({
        muscleGroups: initialFilters.muscleGroups || [],
        bodyParts: initialFilters.bodyParts || [],
        sources: initialFilters.sources || [],
        customOnly: initialFilters.customOnly || false,
    });

    // Toggle muscle group filter
    const toggleMuscleGroup = (muscle: MuscleGroup) => {
        setLocalFilters(current => {
            const currentMuscleGroups = current.muscleGroups || [];

            // If already selected, remove it
            if (currentMuscleGroups.includes(muscle)) {
                return {
                    ...current,
                    muscleGroups: currentMuscleGroups.filter(m => m !== muscle)
                };
            }
            // Otherwise add it
            else {
                return {
                    ...current,
                    muscleGroups: [...currentMuscleGroups, muscle]
                };
            }
        });
    };

    // Toggle body part filter
    const toggleBodyPart = (bodyPart: BodyPart) => {
        setLocalFilters(current => {
            const currentBodyParts = current.bodyParts || [];

            // If already selected, remove it
            if (currentBodyParts.includes(bodyPart)) {
                return {
                    ...current,
                    bodyParts: currentBodyParts.filter(bp => bp !== bodyPart)
                };
            }
            // Otherwise add it
            else {
                return {
                    ...current,
                    bodyParts: [...currentBodyParts, bodyPart]
                };
            }
        });
    };

    // Toggle exercise source filter
    const toggleExerciseSource = (source: ExerciseSource) => {
        setLocalFilters(current => {
            const currentSources = current.sources || [];

            // If already selected, remove it
            if (currentSources.includes(source)) {
                return {
                    ...current,
                    sources: currentSources.filter(s => s !== source)
                };
            }
            // Otherwise add it
            else {
                return {
                    ...current,
                    sources: [...currentSources, source]
                };
            }
        });
    };

    // Apply filters
    const applyFilters = () => {
        // Ensure we don't pass empty arrays
        const filtersToApply = { ...localFilters };
        if (filtersToApply.muscleGroups?.length === 0) {
            delete filtersToApply.muscleGroups;
        }
        if (filtersToApply.bodyParts?.length === 0) {
            delete filtersToApply.bodyParts;
        }
        if (filtersToApply.sources?.length === 0) {
            delete filtersToApply.sources;
        }

        // Don't include searchQuery in filter
        delete filtersToApply.searchQuery;

        // Remove customOnly if we're using sources
        if (filtersToApply.sources) {
            delete filtersToApply.customOnly;
        }

        onApplyFilters(filtersToApply);
        onClose?.();
    };

    // Reset filters
    const resetFilters = () => {
        // Don't preserve search query when resetting
        setLocalFilters({});
    };

    // Available exercise sources
    const exerciseSources = [
        {
            id: ExerciseSource.Predefined,
            label: 'Predefined'
        },
        {
            id: ExerciseSource.User,
            label: 'User'
        },
        {
            id: ExerciseSource.Community,
            label: 'Community'
        }
    ];

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
        ]
    };

    // Body parts for high-level selection
    const bodyParts = [
        BodyPart.Arms,
        BodyPart.Chest,
        BodyPart.Back,
        BodyPart.Shoulders,
        BodyPart.Core,
        BodyPart.Legs
    ];

    // Get the count of selected filters for the button
    const getSelectedCount = () => {
        let count = 0;
        if (localFilters.muscleGroups) count += localFilters.muscleGroups.length;
        if (localFilters.bodyParts) count += localFilters.bodyParts.length;
        if (localFilters.sources) count += localFilters.sources.length;
        if (localFilters.customOnly) count++;
        return count;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.DEFAULT }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text.DEFAULT }]}>
                    Filter Exercises
                </Text>
                {onClose && (
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close-outline" size={28} color={theme.colors.text.DEFAULT} />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView style={styles.content}>
                {/* Exercise Types */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Exercise Sources
                        </Text>
                    </View>

                    <View style={styles.muscleButtonsContainer}>
                        {exerciseSources.map(source => (
                            <TouchableOpacity
                                key={source.id}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.sources?.includes(source.id)
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.background.card,
                                        borderColor: theme.colors.border.DEFAULT
                                    }
                                ]}
                                onPress={() => toggleExerciseSource(source.id)}
                            >
                                <Text style={[
                                    styles.muscleButtonText,
                                    {
                                        color: localFilters.sources?.includes(source.id)
                                            ? theme.colors.tertiary.foreground
                                            : theme.colors.text.DEFAULT
                                    }
                                ]}>
                                    {source.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Body Parts Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Body Parts
                        </Text>
                    </View>

                    {/* Body part selection */}
                    <View style={styles.muscleButtonsContainer}>
                        {bodyParts.map(bodyPart => (
                            <TouchableOpacity
                                key={bodyPart}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.bodyParts?.includes(bodyPart)
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.background.card,
                                        borderColor: theme.colors.border.DEFAULT
                                    }
                                ]}
                                onPress={() => toggleBodyPart(bodyPart)}
                            >
                                <Text style={[
                                    styles.muscleButtonText,
                                    {
                                        color: localFilters.bodyParts?.includes(bodyPart)
                                            ? theme.colors.secondary.foreground
                                            : theme.colors.text.DEFAULT
                                    }
                                ]}>
                                    {bodyPart}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Muscle groups */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Muscle Groups
                        </Text>
                    </View>

                    <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                        Upper Body
                    </Text>
                    <View style={styles.muscleButtonsContainer}>
                        {muscleGroups.upper.map(muscle => (
                            <TouchableOpacity
                                key={muscle}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.background.card,
                                        borderColor: theme.colors.border.DEFAULT
                                    }
                                ]}
                                onPress={() => toggleMuscleGroup(muscle)}
                            >
                                <Text style={[
                                    styles.muscleButtonText,
                                    {
                                        color: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.foreground
                                            : theme.colors.text.DEFAULT
                                    }
                                ]}>
                                    {muscle}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                        Core
                    </Text>
                    <View style={styles.muscleButtonsContainer}>
                        {muscleGroups.core.map(muscle => (
                            <TouchableOpacity
                                key={muscle}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.background.card,
                                        borderColor: theme.colors.border.DEFAULT
                                    }
                                ]}
                                onPress={() => toggleMuscleGroup(muscle)}
                            >
                                <Text style={[
                                    styles.muscleButtonText,
                                    {
                                        color: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.foreground
                                            : theme.colors.text.DEFAULT
                                    }
                                ]}>
                                    {muscle}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.groupTitle, { color: theme.colors.text.muted }]}>
                        Lower Body
                    </Text>
                    <View style={styles.muscleButtonsContainer}>
                        {muscleGroups.lower.map(muscle => (
                            <TouchableOpacity
                                key={muscle}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.DEFAULT
                                            : theme.colors.background.card,
                                        borderColor: theme.colors.border.DEFAULT
                                    }
                                ]}
                                onPress={() => toggleMuscleGroup(muscle)}
                            >
                                <Text style={[
                                    styles.muscleButtonText,
                                    {
                                        color: localFilters.muscleGroups?.includes(muscle)
                                            ? theme.colors.primary.foreground
                                            : theme.colors.text.DEFAULT
                                    }
                                ]}>
                                    {muscle}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: theme.colors.border.DEFAULT }]}>
                <TouchableOpacity
                    style={[
                        styles.footerButton,
                        styles.resetButton,
                        { borderColor: theme.colors.border.DEFAULT }
                    ]}
                    onPress={resetFilters}
                >
                    <Text style={[styles.footerButtonText, { color: theme.colors.text.DEFAULT }]}>
                        Reset
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.footerButton,
                        styles.applyButton,
                        { backgroundColor: theme.colors.primary.DEFAULT }
                    ]}
                    onPress={applyFilters}
                >
                    <Text style={[
                        styles.footerButtonText,
                        styles.applyButtonText,
                        { color: theme.colors.primary.foreground }
                    ]}>
                        {getSelectedCount() > 0
                            ? `Apply ${getSelectedCount()} ${getSelectedCount() === 1 ? 'Filter' : 'Filters'}`
                            : 'Apply Filters'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectionHelp: {
        fontSize: 12,
        marginLeft: 8,
        fontStyle: 'italic',
    },
    customToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    customToggleText: {
        marginLeft: 8,
        fontSize: 15,
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
        borderWidth: 1,
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
    resetButton: {
        borderWidth: 1,
        marginRight: 12,
    },
    applyButton: {
        flex: 1,
    },
    footerButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    applyButtonText: {
        fontWeight: '600',
    }
});

export default ExerciseFilter;