import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Cake } from '../types';

// Datos de productos
const CAKES: Cake[] = [
  {
    id: '1',
    name: 'Torta de Chocolate',
    price: 3500,
    description: 'Deliciosa torta de chocolate con cobertura de ganache',
    image: require('../assets/images/chocolate-cake.jpg')
  },
  {
    id: '2',
    name: 'Torta de Vainilla',
    price: 3200,
    description: 'Suave torta de vainilla con crema pastelera',
    image: require('../assets/images/vanilla-cake.jpg')
  },
];

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const { cakeId } = route.params;
  const { addToCart } = useCart();

  const cake = CAKES.find(c => c.id === cakeId);

  if (!cake) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(cake);
    
    Alert.alert(
      '✅ Producto agregado',
      `${cake.name} se agregó al carrito`,
      [
        { text: 'Seguir comprando', onPress: () => navigation.goBack() },
        { 
          text: 'Ver carrito', 
          onPress: () => {
            navigation.navigate('MainTabs', { screen: 'Carrito' });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={cake.image} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{cake.name}</Text>
        <Text style={styles.price}>$ {cake.price}</Text>
        <Text style={styles.description}>{cake.description}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#888',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProductDetailScreen;