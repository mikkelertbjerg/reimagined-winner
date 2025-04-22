import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import { Exercise, MuscleGroup } from '@/types/exercise';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseCardProps {
    exercise: Exercise;
    compact?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, compact = false }) => {
    const { theme } = useSettings();
    const router = useRouter();

    const handlePress = () => {
        router.push(`/exercises/${exercise.id}`);
    };

    // Get icon based on primary muscle group
    const getMuscleIcon = (muscleGroup: MuscleGroup): string => {
        switch (muscleGroup) {
            case MuscleGroup.Shoulders:
                return 'barbell-outline';
            case MuscleGroup.Biceps:
            case MuscleGroup.Triceps:
            case MuscleGroup.Forearms:
                return 'arm-outline';
            case MuscleGroup.Chest:
            case MuscleGroup.Abs:
            case MuscleGroup.Obliques:
                return 'fitness-outline';
            case MuscleGroup.Back:
            case MuscleGroup.LowerBack:
            case MuscleGroup.Quadriceps:
            case MuscleGroup.Hamstrings:
            case MuscleGroup.Glutes:
            case MuscleGroup.Calves:
            case MuscleGroup.FullBody:
                return 'body-outline';
            default:
                return 'barbell-outline';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.DEFAULT,
                },
                compact ? styles.compactContainer : null
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {/* Icon based on muscle group */}
                <View style={[
                    styles.iconContainer,
                    { backgroundColor: theme.colors.primary.DEFAULT }
                ]}>
                    <Ionicons
                        name={getMuscleIcon(exercise.primaryMuscles[0]) as any}
                        size={compact ? 18 : 24}
                        color={theme.colors.primary.foreground}
                    />
                </View>

                {/* Exercise details */}
                <View style={styles.details}>
                    <Text
                        style={[
                            styles.name,
                            { color: theme.colors.text.DEFAULT },
                            compact ? styles.compactName : null
                        ]}
                        numberOfLines={compact ? 1 : 2}
                    >
                        {exercise.name}
                        {exercise.isCustom && (
                            <Text style={[styles.customBadge, { color: theme.colors.primary.DEFAULT }]}>
                                {" "}(Custom)
                            </Text>
                        )}
                    </Text>

                    {!compact && exercise.description && (
                        <Text
                            style={[styles.description, { color: theme.colors.text.muted }]}
                            numberOfLines={2}
                        >
                            {exercise.description}
                        </Text>
                    )}

                    <View style={styles.muscleGroups}>
                        {exercise.primaryMuscles.map((muscle, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.muscleBadge,
                                    { backgroundColor: theme.colors.primary.DEFAULT }
                                ]}
                            >
                                <Text style={[
                                    styles.muscleBadgeText,
                                    { color: theme.colors.primary.foreground },
                                    compact ? styles.compactBadgeText : null
                                ]}>
                                    {muscle}
                                </Text>
                            </View>
                        ))}

                        {!compact && exercise.secondaryMuscles?.map((muscle, index) => (
                            <View
                                key={index}
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

                {/* Arrow icon */}
                <View style={styles.arrow}>
                    <Ionicons
                        name="chevron-forward"
                        size={compact ? 16 : 20}
                        color={theme.colors.text.muted}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        overflow: 'hidden',
    },
    compactContainer: {
        marginBottom: 8,
    },
    content: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    compactName: {
        fontSize: 14,
        marginBottom: 2,
    },
    customBadge: {
        fontWeight: '500',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    muscleGroups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    muscleBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 4,
    },
    muscleBadgeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    compactBadgeText: {
        fontSize: 10,
    },
    arrow: {
        marginLeft: 8,
    }
});

export default ExerciseCard;