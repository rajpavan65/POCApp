import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ title, onPress, loading, disabled, style, variant = 'primary' }) => {
    const buttonStyles = [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'outline' && styles.buttonOutline,
        disabled && styles.buttonDisabled,
        style,
    ];

    const textStyles = [
        styles.text,
        variant === 'secondary' && styles.textSecondary,
        variant === 'outline' && styles.textOutline,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? '#007AFF' : '#fff'} />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    buttonSecondary: {
        backgroundColor: '#34C759',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textSecondary: {
        color: '#fff',
    },
    textOutline: {
        color: '#007AFF',
    },
});

export default Button;
