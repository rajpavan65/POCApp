import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
);

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
                title: 'Add Product',
                headerBackTitle: 'Back',
            }}
        />
        <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{
                title: 'Checkout',
                headerBackTitle: 'Back',
            }}
        />
        <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
            options={{
                title: 'Order Confirmation',
                headerShown: false,
                gestureEnabled: false,
            }}
        />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const { token, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {token ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
