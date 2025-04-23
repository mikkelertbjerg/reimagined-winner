// components/ui/SearchBar.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    onFilterPress?: () => void;
    showFilterIcon?: boolean;
    filterBadge?: boolean;
    style?: StyleProp<ViewStyle>;
    autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    value,
    onChangeText,
    onClear,
    onFilterPress,
    showFilterIcon = false,
    filterBadge = false,
    style,
    autoFocus = false,
}) => {
    const { theme } = useSettings();

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.colors.background.card,
                borderColor: theme.colors.border.DEFAULT,
            },
            style
        ]}>
            <Ionicons
                name="search-outline"
                size={20}
                color={theme.colors.text.muted}
                style={styles.searchIcon}
            />

            <TextInput
                style={[
                    styles.input,
                    { color: theme.colors.text.DEFAULT }
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.text.muted}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                clearButtonMode="never" // We use our own clear button
                autoFocus={autoFocus}
            />

            {value.length > 0 && (
                <TouchableOpacity
                    onPress={handleClear}
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                    <Ionicons
                        name="close-circle"
                        size={18}
                        color={theme.colors.text.muted}
                    />
                </TouchableOpacity>
            )}

            {showFilterIcon && (
                <>
                    <View style={[
                        styles.divider,
                        { backgroundColor: theme.colors.border.DEFAULT }
                    ]} />

                    <TouchableOpacity
                        onPress={onFilterPress}
                        style={styles.filterButton}
                    >
                        <Ionicons
                            name="options-outline"
                            size={20}
                            color={filterBadge ? theme.colors.primary.DEFAULT : theme.colors.text.muted}
                        />

                        {filterBadge && (
                            <View style={[
                                styles.badge,
                                { backgroundColor: theme.colors.primary.DEFAULT }
                            ]} />
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    divider: {
        width: 1,
        height: '60%',
        marginHorizontal: 8,
    },
    filterButton: {
        padding: 4,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        top: 2,
        right: 2,
    }
});

export default SearchBar;