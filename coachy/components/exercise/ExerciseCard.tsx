// components/exercise/ExerciseCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import { Exercise, MuscleGroup } from '@/types/exercise';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseCardProps {
    exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
    const { theme } = useSettings();
    const router = useRouter();

    const handlePress = () => {
        router.push(`/exercises/${exercise.id}`);
    };

    // Combine primary and secondary muscles, limited to 3 total
    const primaryMuscles = exercise.primaryMuscles || [];
    const secondaryMuscles = exercise.secondaryMuscles || [];

    // Determine which muscles to display with priority to primary muscles
    const displayMuscles: { muscle: MuscleGroup; isPrimary: boolean }[] = [
        ...primaryMuscles.map(muscle => ({ muscle, isPrimary: true })),
        ...secondaryMuscles.map(muscle => ({ muscle, isPrimary: false }))
    ].slice(0, 3);

    // Calculate if we're hiding muscles due to the limit
    const hiddenCount = (primaryMuscles.length + secondaryMuscles.length) - displayMuscles.length;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.DEFAULT,
                }
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {/* Exercise name and custom badge */}
                <View style={styles.nameContainer}>
                    <Text style={[styles.name, { color: theme.colors.text.DEFAULT }]} numberOfLines={1}>
                        {exercise.name}
                    </Text>
                </View>

                {/* Muscle groups - limited to 3 tags */}
                <View style={styles.muscleGroups}>
                    {displayMuscles.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.muscleBadge,
                                item.isPrimary
                                    ? { backgroundColor: theme.colors.primary.DEFAULT }
                                    : {
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderColor: theme.colors.primary.DEFAULT
                                    }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.muscleBadgeText,
                                    {
                                        color: item.isPrimary
                                            ? theme.colors.primary.foreground
                                            : theme.colors.primary.DEFAULT
                                    }
                                ]}
                            >
                                {item.muscle}
                            </Text>
                        </View>
                    ))}

                    {/* Display "+X more" badge if we have hidden muscles */}
                    {hiddenCount > 0 && (
                        <View
                            style={[
                                styles.muscleBadge,
                                {
                                    backgroundColor: theme.colors.background.DEFAULT,
                                    borderColor: theme.colors.border.strong,
                                    borderWidth: 1
                                }
                            ]}
                        >
                            <Text style={[styles.muscleBadgeText, { color: theme.colors.text.muted }]}>
                                +{hiddenCount} more
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Chevron */}
            <Ionicons
                name="chevron-forward"
                size={16}
                color={theme.colors.text.muted}
                style={styles.chevron}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 10,
        paddingRight: 32, // Make room for the chevron
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    customBadge: {
        fontSize: 12,
        fontWeight: '500',
        fontStyle: 'italic',
        marginLeft: 4,
    },
    muscleGroups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    muscleBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 4,
    },
    muscleBadgeText: {
        fontSize: 10,
        fontWeight: '500',
    },
    chevron: {
        position: 'absolute',
        right: 12,
        top: '50%',
        marginTop: -8,
    }
});

export default ExerciseCard;