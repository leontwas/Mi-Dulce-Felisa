import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../context/CartContext';
import { MainTabParamList } from '../navigation/AppNavigator';
import { Cake } from '../types';

const CAKES: Cake[] = [
  {
    id: '1',
    name: 'Torta de Chocolate',
    price: 3500,
    description: 'Deliciosa torta de chocolate con cobertura de ganache',
    image: require('../assets/images/01_Bisnike.png')
  },
  {
    id: '2',
    name: 'Torta de Vainilla',
    price: 3200,
    description: 'Suave torta de vainilla con crema pastelera',
    image: require('../assets/images/vanilla-cake.jpg')
  },
];

type ProductsScreenProps = BottomTabScreenProps<MainTabParamList, 'Productos'>;

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const { cart, addToCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (cake: Cake) => {
    addToCart(cake);
    
    Alert.alert(
      '✅ Producto agregado',
      `${cake.name} se agregó al carrito`,
      [{ text: 'OK' }]
    );
  };

  const handleViewDetails = (cakeId: string) => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('ProductDetail', { cakeId });
    }
  };

  const renderCakeItem = ({ item }: { item: Cake }) => (
    <View style={styles.cakeCard}>
      <Image source={item.image} style={styles.cakeImage} />
      <Text style={styles.cakeName}>{item.name}</Text>
      <Text style={styles.cakePrice}>$ {item.price}</Text>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleViewDetails(item.id)}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nuestros Productos</Text>
        {totalItems > 0 && (
          <Text style={styles.itemCount}>Items en carrito: {totalItems}</Text>
        )}
      </View>

      <FlatList
        data={CAKES}
        renderItem={renderCakeItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.floatingCartButton}
          onPress={() => navigation.navigate('Carrito')}
        >
          <Text style={styles.cartButtonText}>🛒 ({totalItems})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  header: {
    padding: 15,
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  itemCount: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  cakeCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    alignItems: 'center',
  },
  cakeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  cakeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cakePrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: '#FF69B4',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductsScreen;