import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress, selected }) => {
    return (
        <TouchableOpacity
            style={[styles.card, selected && styles.cardSelected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {product.description || 'No description available'}
                </Text>
                <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
            </View>
            {selected && (
                <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f8ff',
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#007AFF',
    },
    checkmark: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    checkmarkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductCard;
