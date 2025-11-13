import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type MoreScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface MenuOption {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: keyof RootStackParamList;
  description: string;
}

const MoreScreen: React.FC = () => {
  const navigation = useNavigation<MoreScreenNavigationProp>();

  const menuOptions: MenuOption[] = [
    {
      title: 'Quiénes Somos',
      icon: 'information-circle-outline',
      screen: 'About',
      description: 'Conoce nuestra historia',
    },
    {
      title: 'Crea tu Torta',
      icon: 'color-palette-outline',
      screen: 'CustomCake',
      description: 'Personaliza tu torta ideal',
    },
    {
      title: 'Iniciar Sesión',
      icon: 'log-in-outline',
      screen: 'Login',
      description: 'Accede a tu cuenta',
    },
    {
      title: 'Registrarse',
      icon: 'person-add-outline',
      screen: 'Register',
      description: 'Crea una cuenta nueva',
    },
  ];

  const handleOptionPress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Más Opciones</Text>
        <Text style={styles.subtitle}>Explora todas las funcionalidades</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleOptionPress(option.screen)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={option.icon} size={28} color="#FF69B4" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.menuTitle}>{option.title}</Text>
              <Text style={styles.menuDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Mi Dulce Felisa</Text>
        <Text style={styles.footerVersion}>Versión 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#999',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF69B4',
    marginBottom: 5,
  },
  footerVersion: {
    fontSize: 12,
    color: '#999',
  },
});

export default MoreScreen;
