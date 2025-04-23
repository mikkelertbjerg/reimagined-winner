// app/(tabs)/exercises/index.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';
import { Exercise } from '@/types/exercise';
import { ExerciseService } from '@/services/ExerciseService';
import { Ionicons } from '@expo/vector-icons';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import SearchBar from '@/components/ui/SearchBar';
import ExerciseCard from '@/components/exercise/ExerciseCard';
import ExerciseFilter from '@/components/exercise/ExerciseFilter';
import { ExerciseFilters } from '@/types/exercise-filters';

const ExercisesScreen = () => {
    const { theme } = useSettings();

    // State
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<ExerciseFilters>({});
    const [showFilters, setShowFilters] = useState(false);

    // Load exercises on mount
    useEffect(() => {
        loadExercises();
    }, []);

    // Filter exercises when search query or filters change
    useEffect(() => {
        applyFilters();
    }, [exercises, searchQuery, filters]);

    // Load exercises from service
    const loadExercises = async () => {
        try {
            setLoading(true);
            const data = await ExerciseService.getExercises();
            setExercises(data);
            setFilteredExercises(data);
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

    // Apply filters and search query
    const applyFilters = () => {
        let result = [...exercises];

        // Apply search query (from the search bar)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(exercise =>
                exercise.name.toLowerCase().includes(query) ||
                exercise.description?.toLowerCase().includes(query) ||
                exercise.primaryMuscles?.some(muscle =>
                    muscle.toLowerCase().includes(query)
                ) ||
                exercise.secondaryMuscles?.some(muscle =>
                    muscle.toLowerCase().includes(query)
                )
            );
        }

        // Apply muscle groups filter (now supports multiple selections)
        if (filters.muscleGroups && filters.muscleGroups.length > 0) {
            result = result.filter(exercise => {
                // Get all muscles for this exercise
                const allMuscles = [
                    ...exercise.primaryMuscles,
                    ...(exercise.secondaryMuscles || [])
                ];

                // Check if any of the selected muscle groups are in this exercise
                return filters.muscleGroups!.some(muscleGroup =>
                    allMuscles.includes(muscleGroup)
                );
            });
        }

        // Apply body parts filter (supports multiple selections)
        if (filters.bodyParts && filters.bodyParts.length > 0) {
            result = result.filter(exercise => {
                // Check if any of the selected body parts are in this exercise
                return filters.bodyParts!.some(bodyPart =>
                    exercise.bodyParts.includes(bodyPart)
                );
            });
        }

        // Apply exercise sources filter (supports multiple selections)
        if (filters.sources && filters.sources.length > 0) {
            result = result.filter(exercise => {
                // If source is defined on the exercise, filter by it
                return filters.sources!.includes(exercise.source);
            });
        }

        setFilteredExercises(result);
    };

    // Handle search query change
    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    // Handle filter application
    const handleApplyFilters = (newFilters: ExerciseFilters) => {
        setFilters(newFilters);
        setShowFilters(false);
    };

    // Handle FAB press for adding a new exercise
    const handleAddExercise = () => {
        Alert.alert("Coming Soon", "Creating new exercises will be available soon!");
    };


    // Check if any filters are active
    const hasActiveFilters = () => {
        return (
            (filters.muscleGroups && filters.muscleGroups.length > 0) ||
            (filters.bodyParts && filters.bodyParts.length > 0) ||
            (filters.sources && filters.sources.length > 0) ||
            filters.customOnly
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
            {/* Header with search bar */}
            <View style={styles.header}>
                <SearchBar
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    showFilterIcon={true}
                    filterBadge={hasActiveFilters()}
                    onFilterPress={() => setShowFilters(true)}
                    style={styles.searchBar}
                />
            </View>

            {/* Exercise list */}
            <FlatList
                data={filteredExercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
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
                            {searchQuery || hasActiveFilters()
                                ? 'No exercises match your search or filters'
                                : 'No exercises found'
                            }
                        </Text>
                    </View>
                }
            />

            {/* Filter modal */}
            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowFilters(false)}
            >
                <ExerciseFilter
                    initialFilters={filters}
                    onApplyFilters={handleApplyFilters}
                    onClose={() => setShowFilters(false)}
                />
            </Modal>

            {/* FAB */}
            <FloatingActionButton
                icon={<Ionicons name="add" size={24} color={theme.colors.primary.foreground} />}
                onPress={handleAddExercise}
                accessibilityLabel="Add new exercise"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchBar: {
        marginBottom: 8,
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
        paddingTop: 0,
    },
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default ExercisesScreen;