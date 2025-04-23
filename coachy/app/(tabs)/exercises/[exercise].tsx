import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';
import { Exercise } from '@/types/exercise';
import { ExerciseService } from '@/services/ExerciseService';

const ExerciseScreen = () => {
    const { exercise: exerciseId } = useLocalSearchParams<{ exercise: string }>();
    const { theme } = useSettings();

    // State
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);

    // Load exercise data
    useEffect(() => {
        loadExercise();
    }, [exerciseId]);

    // Load exercise from service
    const loadExercise = async () => {
        if (!exerciseId) return;

        try {
            setLoading(true);
            const data = await ExerciseService.getExerciseById(exerciseId);
            setExercise(data);
        } catch (error) {
            console.error('Failed to load exercise:', error);
        } finally {
            setLoading(false);
        }
    };

    // Render loading state
    if (loading) {
        return (
            <SafeAreaView style={[
                styles.container,
                { backgroundColor: theme.colors.background.DEFAULT }
            ]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
                    <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
                        Loading exercise...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    // Exercise not found
    if (!exercise) {
        return (
            <SafeAreaView style={[
                styles.container,
                { backgroundColor: theme.colors.background.DEFAULT }
            ]}>
                <View style={styles.notFoundContainer}>
                    <Text style={[styles.notFoundText, { color: theme.colors.text.DEFAULT }]}>
                        Exercise not found
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: theme.colors.background.DEFAULT }
        ]}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Exercise Header */}
                <View style={styles.header}>
                    <Text style={[styles.exerciseName, { color: theme.colors.text.DEFAULT }]}>
                        {exercise.name}
                    </Text>

                    {/* Muscle groups */}
                    <View style={styles.muscleGroups}>
                        {exercise.primaryMuscles.map((muscle, index) => (
                            <View
                                key={`primary-${index}`}
                                style={[
                                    styles.muscleBadge,
                                    { backgroundColor: theme.colors.primary.DEFAULT }
                                ]}
                            >
                                <Text style={[
                                    styles.muscleBadgeText,
                                    { color: theme.colors.primary.foreground }
                                ]}>
                                    {muscle}
                                </Text>
                            </View>
                        ))}

                        {exercise.secondaryMuscles?.map((muscle, index) => (
                            <View
                                key={`secondary-${index}`}
                                style={[
                                    styles.muscleBadge,
                                    {
                                        backgroundColor: 'transparent',
                                        borderColor: theme.colors.primary.DEFAULT,
                                        borderWidth: 1
                                    }
                                ]}
                            >
                                <Text style={[
                                    styles.muscleBadgeText,
                                    { color: theme.colors.primary.DEFAULT }
                                ]}>
                                    {muscle}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Description */}
                {exercise.description ? (
                    <View style={[
                        styles.section,
                        { backgroundColor: theme.colors.background.card, borderColor: theme.colors.border.DEFAULT }
                    ]}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Description
                        </Text>
                        <Text style={[styles.description, { color: theme.colors.text.DEFAULT }]}>
                            {exercise.description}
                        </Text>
                    </View>
                ) : (
                    <View style={[
                        styles.section,
                        { backgroundColor: theme.colors.background.card, borderColor: theme.colors.border.DEFAULT }
                    ]}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                            Description
                        </Text>
                        <Text style={[styles.emptyText, { color: theme.colors.text.muted }]}>
                            No description available
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
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
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    exerciseName: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    muscleGroups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    muscleBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    muscleBadgeText: {
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
    emptyText: {
        fontSize: 14,
        fontStyle: 'italic',
    }
});

export default ExerciseScreen;