// components/ui/FloatingActionButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useSettings } from '@/context/SettingsContext';

interface FloatingActionButtonProps {
    icon: React.ReactNode;
    onPress: () => void;
    position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
    size?: 'sm' | 'md' | 'lg';
    intent?: 'primary' | 'secondary' | 'tertiary';
    style?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    icon,
    onPress,
    position = 'bottomRight',
    size = 'md',
    intent = 'primary',
    style,
    accessibilityLabel = 'Action button',
}) => {
    const { theme } = useSettings();

    // Get size based on prop
    const getSize = (): number => {
        switch (size) {
            case 'sm':
                return 48;
            case 'lg':
                return 64;
            case 'md':
            default:
                return 56;
        }
    };

    // Get background color based on intent
    const getBackgroundColor = (): string => {
        switch (intent) {
            case 'secondary':
                return theme.colors.secondary.DEFAULT;
            case 'tertiary':
                return theme.colors.tertiary.DEFAULT;
            case 'primary':
            default:
                return theme.colors.primary.DEFAULT;
        }
    };

    // Get position styling
    const getPositionStyles = (): ViewStyle => {
        const styles: ViewStyle = { position: 'absolute' };

        switch (position) {
            case 'bottomLeft':
                styles.bottom = 20;
                styles.left = 20;
                break;
            case 'topRight':
                styles.top = 20;
                styles.right = 20;
                break;
            case 'topLeft':
                styles.top = 20;
                styles.left = 20;
                break;
            case 'bottomRight':
            default:
                styles.bottom = 20;
                styles.right = 20;
        }

        return styles;
    };

    const buttonSize = getSize();

    return (
        <TouchableOpacity
            style={[
                styles.fab,
                {
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: buttonSize / 2,
                    backgroundColor: getBackgroundColor(),
                },
                getPositionStyles(),
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
        >
            {icon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
});

export default FloatingActionButton;