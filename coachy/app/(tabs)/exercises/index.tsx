import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';
import { Exercise } from '@/types/exercise';
import { ExerciseService } from '@/services/ExerciseService';
import { Ionicons } from '@expo/vector-icons';

const ExercisesScreen = () => {
    const { theme } = useSettings();

    // State
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Load exercises on mount
    useEffect(() => {
        loadExercises();
    }, []);

    // Load exercises from service
    const loadExercises = async () => {
        try {
            setLoading(true);
            const data = await ExerciseService.getExercises();
            setExercises(data);
        } catch (error) {
            console.error('Failed to load exercises:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle refresh (pull to refresh)
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            const data = await ExerciseService.getExercises();
            setExercises(data);
        } catch (error) {
            console.error('Failed to refresh exercises:', error);
        } finally {
            setRefreshing(false);
        }
    };

    // Handle FAB press for adding a new exercise
    const handleAddExercise = () => {
        Alert.alert("Coming Soon", "Creating new exercises will be available soon!");
    };

    // Render exercise item
    const renderExerciseItem = ({ item }: { item: Exercise }) => {
        return (
            <View style={[
                styles.exerciseCard,
                { backgroundColor: theme.colors.background.card, borderColor: theme.colors.border.DEFAULT }
            ]}>
                <Text style={[styles.exerciseName, { color: theme.colors.text.DEFAULT }]}>
                    {item.name}
                </Text>

                <View style={styles.muscleGroups}>
                    {item.primaryMuscles.map((muscle, index) => (
                        <View key={index} style={[
                            styles.muscleBadge,
                            { backgroundColor: theme.colors.primary.DEFAULT }
                        ]}>
                            <Text style={[styles.muscleBadgeText, { color: theme.colors.primary.foreground }]}>
                                {muscle}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    // Render loading state
    if (loading && !refreshing) {
        return (
            <SafeAreaView style={[
                styles.container,
                { backgroundColor: theme.colors.background.DEFAULT }
            ]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary.DEFAULT} />
                    <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
                        Loading exercises...
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
            <FlatList
                data={exercises}
                keyExtractor={item => item.id}
                renderItem={renderExerciseItem}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[theme.colors.primary.DEFAULT]}
                        tintColor={theme.colors.primary.DEFAULT}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.colors.text.muted }]}>
                            No exercises found
                        </Text>
                    </View>
                }
            />

            {/* Floating Action Button (FAB) */}
            <TouchableOpacity
                style={[
                    styles.fab,
                    { backgroundColor: theme.colors.primary.DEFAULT }
                ]}
                onPress={handleAddExercise}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={24} color={theme.colors.primary.foreground} />
            </TouchableOpacity>
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
    listContent: {
        padding: 16,
    },
    exerciseCard: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: '600',
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
        marginRight: 6,
        marginBottom: 4,
    },
    muscleBadgeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        right: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});

export default ExercisesScreen;