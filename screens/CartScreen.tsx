import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';

declare const window: any;

const CartScreen: React.FC = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const { user } = useAuth();
  const navigation = useNavigation();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };


const handleCheckout = () => {
  // Verificar si el carrito está vacío
  if (cart.length === 0) {
    if (Platform.OS === 'web') {
      window.alert('Agrega productos antes de finalizar la compra');
    } else {
      Alert.alert('Carrito vacío', 'Agrega productos antes de finalizar la compra');
    }
    return;
  }

  // Verificar si el usuario está logueado
  if (!user) {
    if (Platform.OS === 'web') {
      const confirmar = window.confirm('Debes iniciar sesión para finalizar tu compra');
      if (confirmar) {
        const parent = navigation.getParent();
        if (parent) {
          parent.navigate('Login');
        }
      }
    } else {
      Alert.alert(
        'Iniciar sesión',
        'Debes iniciar sesión para finalizar tu compra',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Iniciar sesión',
            onPress: () => {
              const parent = navigation.getParent();
              if (parent) {
                parent.navigate('Login');
              }
            }
          }
        ]
      );
    }
    return;
  }

  // Si hay usuario, proceder con la compra
  if (Platform.OS === 'web') {
    const confirmar = window.confirm(
      `Total a pagar: $${calculateTotal()}\n¿Deseas confirmar tu pedido?`
    );
    if (confirmar) {
      window.alert('Tu pedido ha sido procesado exitosamente');
      clearCart();
    }
  } else {
    Alert.alert(
      'Finalizar compra',
      `Total a pagar: $${calculateTotal()}\n¿Deseas confirmar tu pedido?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert('¡Pedido confirmado!', 'Tu pedido ha sido procesado exitosamente');
            clearCart();
          }
        }
      ]
    );
  }
};

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>$ {item.price} c/u</Text>
        <Text style={styles.subtotal}>Subtotal: $ {item.price * item.quantity}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
     
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListEmptyComponent={
          <Text style={styles.emptyCartText}>Tu carrito está vacío 🛒</Text>
        }
      />
     
      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: $ {calculateTotal()}</Text>
         
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.buttonText}>Vaciar Carrito</Text>
            </TouchableOpacity>
           
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.buttonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF69B4',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartItemDetails: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemPrice: {
    color: '#888',
    fontSize: 14,
  },
  subtotal: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#FF69B4',
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  checkoutButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;