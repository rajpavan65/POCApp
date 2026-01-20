import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';

const OrderConfirmationScreen = ({ route, navigation }) => {
    const { order } = route.params;

    const handleBackToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.successIcon}>
                <Text style={styles.checkmark}>✓</Text>
            </View>

            <Text style={styles.title}>Order Placed!</Text>
            <Text style={styles.subtitle}>Your order has been successfully placed</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Order Details</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Order ID</Text>
                    <Text style={styles.value}>#{order.id}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Product</Text>
                    <Text style={styles.value}>{order.productName}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Quantity</Text>
                    <Text style={styles.value}>{order.quantity}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>${parseFloat(order.totalAmount).toFixed(2)}</Text>
                </View>
            </View>

            <Button
                title="Back to Home"
                onPress={handleBackToHome}
                style={styles.button}
            />
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
        alignItems: 'center',
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#34C759',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 24,
    },
    checkmark: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 32,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: '100%',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#34C759',
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#34C759',
    },
    button: {
        width: '100%',
        marginTop: 32,
    },
});

export default OrderConfirmationScreen;
