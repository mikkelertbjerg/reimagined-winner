// Save to: coachy/components/exercises/ExerciseFilters.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';
import { MuscleGroup, ExerciseFilters as FilterTypes } from '@/types/exercise';

interface ExerciseFiltersProps {
    initialFilters: FilterTypes;
    onApplyFilters: (filters: FilterTypes) => void;
    onClose?: () => void;
}

const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
    initialFilters,
    onApplyFilters,
    onClose
}) => {
    const { theme } = useSettings();

    // Local state for filters (apply on save)
    const [localFilters, setLocalFilters] = useState<FilterTypes>({ ...initialFilters });

    // Toggle muscle group filter
    const toggleMuscleGroup = (muscle: MuscleGroup) => {
        setLocalFilters(current => ({
            ...current,
            muscleGroup: current.muscleGroup === muscle ? undefined : muscle
        }));
    };

    // Toggle custom only filter
    const toggleCustomOnly = () => {
        setLocalFilters(current => ({
            ...current,
            customOnly: !current.customOnly
        }));
    };

    // Search query change
    const handleSearchChange = (text: string) => {
        setLocalFilters(current => ({
            ...current,
            searchQuery: text.length > 0 ? text : undefined
        }));
    };

    // Apply filters
    const applyFilters = () => {
        onApplyFilters(localFilters);
        onClose?.();
    };

    // Reset filters
    const resetFilters = () => {
        const resetFiltersObj: FilterTypes = {};
        setLocalFilters(resetFiltersObj);
        onApplyFilters(resetFiltersObj);
        onClose?.();
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
                {/* Search input */}
                <View style={[
                    styles.searchContainer,
                    {
                        backgroundColor: theme.colors.background.card,
                        borderColor: theme.colors.border.DEFAULT
                    }
                ]}>
                    <Ionicons name="search-outline" size={20} color={theme.colors.text.muted} />
                    <TextInput
                        style={[styles.searchInput, { color: theme.colors.text.DEFAULT }]}
                        placeholder="Search exercises..."
                        placeholderTextColor={theme.colors.text.muted}
                        value={localFilters.searchQuery || ''}
                        onChangeText={handleSearchChange}
                    />
                    {localFilters.searchQuery && (
                        <TouchableOpacity
                            onPress={() => handleSearchChange('')}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        >
                            <Ionicons name="close-circle" size={18} color={theme.colors.text.muted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Custom exercises toggle */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Exercise Type
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.customToggle,
                            {
                                backgroundColor: localFilters.customOnly
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.background.card,
                                borderColor: theme.colors.border.DEFAULT
                            }
                        ]}
                        onPress={toggleCustomOnly}
                    >
                        <Ionicons
                            name={localFilters.customOnly ? "checkmark-circle" : "ellipse-outline"}
                            size={20}
                            color={localFilters.customOnly
                                ? theme.colors.primary.foreground
                                : theme.colors.text.muted
                            }
                        />
                        <Text style={[
                            styles.customToggleText,
                            {
                                color: localFilters.customOnly
                                    ? theme.colors.primary.foreground
                                    : theme.colors.text.DEFAULT
                            }
                        ]}>
                            Show only my custom exercises
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Muscle groups */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Muscle Groups
                    </Text>

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
                                        backgroundColor: localFilters.muscleGroup === muscle
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
                                        color: localFilters.muscleGroup === muscle
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
                                        backgroundColor: localFilters.muscleGroup === muscle
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
                                        color: localFilters.muscleGroup === muscle
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
                                        backgroundColor: localFilters.muscleGroup === muscle
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
                                        color: localFilters.muscleGroup === muscle
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
                        Full Body
                    </Text>
                    <View style={styles.muscleButtonsContainer}>
                        {muscleGroups.full.map(muscle => (
                            <TouchableOpacity
                                key={muscle}
                                style={[
                                    styles.muscleButton,
                                    {
                                        backgroundColor: localFilters.muscleGroup === muscle
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
                                        color: localFilters.muscleGroup === muscle
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
                        Apply Filters
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 46,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        marginLeft: 8,
        fontSize: 16,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
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

export default ExerciseFilters;