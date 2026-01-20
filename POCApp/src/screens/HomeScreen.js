import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { user, logout } = useAuth();

    const fetchProducts = async () => {
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch products');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(selectedProduct?.id === product.id ? null : product);
    };

    const handleCheckout = () => {
        if (!selectedProduct) {
            Alert.alert('Select Product', 'Please select a product to checkout');
            return;
        }
        navigation.navigate('Checkout', { product: selectedProduct });
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout },
            ]
        );
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products yet</Text>
            <Text style={styles.emptySubtext}>Add your first product to get started</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {user?.name || 'User'}!</Text>
                    <Text style={styles.subtitle}>Browse and order products</Text>
                </View>
                <Text style={styles.logoutLink} onPress={handleLogout}>
                    Logout
                </Text>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        selected={selectedProduct?.id === item.id}
                        onPress={() => handleProductSelect(item)}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={!loading && renderEmpty()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            <View style={styles.bottomButtons}>
                <Button
                    title="Add Product"
                    onPress={() => navigation.navigate('AddProduct')}
                    variant="outline"
                    style={styles.addButton}
                />
                <Button
                    title="Checkout"
                    onPress={handleCheckout}
                    disabled={!selectedProduct}
                    style={styles.checkoutButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    logoutLink: {
        color: '#FF3B30',
        fontSize: 14,
        fontWeight: '600',
    },
    listContent: {
        padding: 20,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    bottomButtons: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    addButton: {
        flex: 1,
        marginRight: 12,
    },
    checkoutButton: {
        flex: 1,
    },
});

export default HomeScreen;
