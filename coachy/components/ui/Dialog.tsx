import React, { ReactNode } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { useSettings } from '@/context/SettingsContext';
import Button from '@/components/ui/Button';

interface DialogProps {
    visible: boolean;
    title: string;
    message: string;
    buttons: {
        text: string;
        onPress: () => void;
        intent?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
        variant?: 'default' | 'outline' | 'ghost';
    }[];
    onDismiss?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
    visible,
    title,
    message,
    buttons,
    onDismiss,
}) => {
    const { theme } = useSettings();

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <TouchableWithoutFeedback onPress={onDismiss}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={[
                            styles.dialogContainer,
                            {
                                backgroundColor: theme.colors.background.card,
                                borderColor: theme.colors.border.DEFAULT,
                                borderWidth: 1,
                                borderRadius: theme.radii.lg,
                            }
                        ]}>
                            <View style={styles.header}>
                                <Text style={[
                                    styles.title,
                                    { color: theme.colors.text.DEFAULT }
                                ]}>
                                    {title}
                                </Text>
                            </View>

                            <View style={styles.content}>
                                <Text style={[
                                    styles.message,
                                    { color: theme.colors.text.DEFAULT }
                                ]}>
                                    {message}
                                </Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                {buttons.map((button, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.buttonWrapper,
                                            { marginLeft: index > 0 ? theme.spacing[2] : 0 }
                                        ]}
                                    >
                                        <Button
                                            intent={button.intent || 'primary'}
                                            variant={button.variant || (index === 0 ? 'outline' : 'default')}
                                            onPress={() => {
                                                button.onPress();
                                            }}
                                            fullWidth
                                        >
                                            {button.text}
                                        </Button>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        width: Dimensions.get('window').width * 0.85,
        maxWidth: 400,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    content: {
        marginBottom: 24,
    },
    message: {
        fontSize: 16,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonWrapper: {
        flex: 1,
    }
});

export default Dialog;