import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
// Importar pantallas
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import CustomCakeScreen from '../screens/CustomCakeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MoreScreen from '../screens/MoreScreen';
import ImageDetailScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Definir tipos para los parámetros de navegación
export type MainTabParamList = {
  Home: undefined;
  'Galería': undefined;
  'Crea tu Torta': undefined;
  Contacto: undefined;
  'Más': undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ImageDetail: { imageId: string };
  Login: undefined;
  Register: undefined;
  About: undefined;
  CustomCake: undefined;
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
          // Caso especial para "Crea tu Torta" - usar MaterialCommunityIcons
          if (route.name === 'Crea tu Torta') {
            return <MaterialCommunityIcons name="cake-variant" size={size} color={color} />;
          }

          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Galería':
              iconName = focused ? 'images' : 'images-outline';
              break;
            case 'Contacto':
              iconName = focused ? 'mail' : 'mail-outline';
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
      <Tab.Screen name="Galería" component={GalleryScreen} />
      <Tab.Screen name="Crea tu Torta" component={CustomCakeScreen} />
      <Tab.Screen name="Contacto" component={ContactScreen} />
      <Tab.Screen name="Más" component={MoreStackNavigator} />
    </Tab.Navigator>
  );
}

// Stack Navigator para la sección "Más" (permite About, Login, Register con tabs visibles)
const MoreStack = createStackNavigator();

function MoreStackNavigator() {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF69B4',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <MoreStack.Screen
        name="MoreMain"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <MoreStack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: '¿Quiénes Somos?' }}
      />
      <MoreStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Iniciar Sesión' }}
      />
      <MoreStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Registrarse' }}
      />
    </MoreStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF69B4',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
        options={{ title: 'Detalle de la Imagen' }}
      />
    </Stack.Navigator>
  );
}