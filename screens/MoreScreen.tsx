import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type MoreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Más'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: MoreScreenNavigationProp;
};

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: keyof RootStackParamList;
  description: string;
}

const MoreScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  const menuItems: MenuItem[] = user
    ? [
        {
          id: '3',
          title: 'Crea tu Torta',
          icon: 'create',
          screen: 'CustomCake',
          description: 'Personaliza tu torta ideal'
        },
        {
          id: '4',
          title: '¿Quiénes Somos?',
          icon: 'information-circle',
          screen: 'About',
          description: 'Conoce nuestra historia'
        },
      ]
    : [
        {
          id: '1',
          title: 'Iniciar Sesión',
          icon: 'log-in',
          screen: 'Login',
          description: 'Accede a tu cuenta'
        },
        {
          id: '2',
          title: 'Registrarse',
          icon: 'person-add',
          screen: 'Register',
          description: 'Crea una cuenta nueva'
        },
        {
          id: '3',
          title: 'Crea tu Torta',
          icon: 'create',
          screen: 'CustomCake',
          description: 'Personaliza tu torta ideal'
        },
        {
          id: '4',
          title: '¿Quiénes Somos?',
          icon: 'information-circle',
          screen: 'About',
          description: 'Conoce nuestra historia'
        },
      ];

  const handleMenuPress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Más Opciones</Text>
        <Text style={styles.headerSubtitle}>
          {user ? `Hola, ${user.name}` : 'Explora más funcionalidades'}
        </Text>
      </View>

      {user && (
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoCard}>
            <Ionicons name="person-circle" size={60} color="#FF69B4" />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              {user.phone && <Text style={styles.userPhone}>📱 {user.phone}</Text>}
              {user.address && <Text style={styles.userAddress}>📍 {user.address}</Text>}
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out" size={24} color="#FFF" />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={28} color="#FF69B4" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Mi Dulce Felisa</Text>
        <Text style={styles.footerSubtext}>Versión 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FF69B4',
    padding: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  userInfoContainer: {
    padding: 15,
    paddingTop: 20,
  },
  userInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  userAddress: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  menuContainer: {
    padding: 15,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
  },
});

export default MoreScreen;
