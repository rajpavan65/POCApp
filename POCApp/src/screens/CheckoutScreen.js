import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Button from '../components/Button';
import api from '../services/api';

const CheckoutScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const totalAmount = (product.price * quantity).toFixed(2);

    const handleConfirmOrder = async () => {
        setLoading(true);
        try {
            const order = await api.createOrder(product.id, quantity);
            navigation.replace('OrderConfirmation', { order: order.order });
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const incrementQuantity = () => setQuantity((q) => q + 1);
    const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Checkout</Text>
                <Text style={styles.subtitle}>Review your order</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Order Summary</Text>

                <View style={styles.productRow}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${parseFloat(product.price).toFixed(2)}</Text>
                </View>

                {product.description && (
                    <Text style={styles.productDescription}>{product.description}</Text>
                )}

                <View style={styles.divider} />

                <View style={styles.quantityRow}>
                    <Text style={styles.label}>Quantity</Text>
                    <View style={styles.quantityControls}>
                        <Text style={styles.quantityButton} onPress={decrementQuantity}>−</Text>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <Text style={styles.quantityButton} onPress={incrementQuantity}>+</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${totalAmount}</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <Button
                    title="Confirm Order"
                    onPress={handleConfirmOrder}
                    loading={loading}
                    variant="secondary"
                    style={styles.confirmButton}
                />

                <Button
                    title="Cancel"
                    onPress={() => navigation.goBack()}
                    variant="outline"
                    style={styles.cancelButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        padding: 24,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        lineHeight: 36,
        fontSize: 20,
        color: '#007AFF',
        fontWeight: '600',
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 20,
        minWidth: 30,
        textAlign: 'center',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#34C759',
    },
    buttons: {
        marginTop: 32,
    },
    confirmButton: {
        marginBottom: 12,
    },
    cancelButton: {},
});

export default CheckoutScreen;
