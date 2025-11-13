import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
// Importar pantallas
import AboutScreen from '../screens/AboutScreen';
import CartScreen from '../screens/CartScreen';
import ContactScreen from '../screens/ContactScreen';
import CustomCakeScreen from '../screens/CustomCakeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MoreScreen from '../screens/MoreScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductsScreen from '../screens/ProductsScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Definir tipos para los parámetros de navegación
export type MainTabParamList = {
  Home: undefined;
  Productos: undefined;
  Contacto: undefined;
  Carrito: undefined;
  'Más': undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ProductDetail: { cakeId: string };
  About: undefined;
  CustomCake: undefined;
  Login: undefined;
  Register: undefined;
};

// Tipos de navegación
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Productos':
              iconName = focused ? 'fast-food' : 'fast-food-outline';
              break;
            case 'Contacto':
              iconName = focused ? 'mail' : 'mail-outline';
              break;
            case 'Carrito':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Más':
              iconName = focused ? 'menu' : 'menu-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
      <Tab.Screen name="Contacto" component={ContactScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Más" component={MoreScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Detalle del Producto' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Quiénes Somos' }}
      />
      <Stack.Screen
        name="CustomCake"
        component={CustomCakeScreen}
        options={{ title: 'Crea tu Torta' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Iniciar Sesión' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Registrarse' }}
      />
    </Stack.Navigator>
  );
}