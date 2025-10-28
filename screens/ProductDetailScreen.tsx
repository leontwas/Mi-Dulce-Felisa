import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../navigation/AppNavigator';

// Lista de productos de ejemplo
const CAKES = [
  {
    id: '1',
    name: 'Torta de Chocolate',
    price: 3500,
    description: 'Deliciosa torta de chocolate con cobertura de ganache. Elaborada con chocolate belga de la más alta calidad, esta torta es el sueño de cualquier amante del chocolate.',
    image: require('../assets/images/chocolate-cake.jpg')
  },
  {
    id: '2',
    name: 'Torta de Vainilla',
    price: 3200,
    description: 'Suave torta de vainilla con crema pastelera. Un clásico reconfortante que combina la suavidad de un bizcocho de vainilla con una cremosa cobertura.',
    image: require('../assets/images/vanilla-cake.jpg')
  },
];

// Eliminar la línea con ProductDetailScreenRouteProp o usarla si es necesario
type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { cakeId } = route.params;
  const { addToCart } = useCart();

  // Encontrar el producto específico
  const cake = CAKES.find(c => c.id === cakeId);

  if (!cake) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={cake.image} style={styles.image} />
     
      <View style={styles.detailsContainer}>
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
            onPress={() => {
              addToCart(cake);
              navigation.navigate('Carrito');
            }}
          >
            <Text style={styles.buttonText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;