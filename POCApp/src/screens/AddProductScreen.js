import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const AddProductScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddProduct = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            await api.addProduct(name, parseFloat(price), description);
            Alert.alert(
                'Success',
                'Product added successfully!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add New Product</Text>
                    <Text style={styles.subtitle}>Fill in the product details</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Product Name"
                        placeholder="Enter product name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        error={errors.name}
                    />

                    <Input
                        label="Price ($)"
                        placeholder="Enter price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="decimal-pad"
                        error={errors.price}
                    />

                    <Input
                        label="Description (Optional)"
                        placeholder="Enter product description"
                        value={description}
                        onChangeText={setDescription}
                        autoCapitalize="sentences"
                    />

                    <Button
                        title="Add Product"
                        onPress={handleAddProduct}
                        loading={loading}
                        variant="secondary"
                        style={styles.button}
                    />

                    <Button
                        title="Cancel"
                        onPress={() => navigation.goBack()}
                        variant="outline"
                        style={styles.cancelButton}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    header: {
        marginTop: 20,
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    form: {
        flex: 1,
    },
    button: {
        marginTop: 16,
    },
    cancelButton: {
        marginTop: 12,
    },
});

export default AddProductScreen;
