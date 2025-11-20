import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartItem, Order } from '../types';

const CartScreen: React.FC = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };


// Función para enviar notificación al vendedor
const sendVendorNotification = async (orderId: string, orderData: Order) => {
  try {
    const emailBody = `
NUEVA ORDEN DE COMPRA
=====================

NÚMERO DE ORDEN: #${orderId}

DATOS DEL CLIENTE:
------------------
Nombre: ${orderData.userName}
Email: ${orderData.userEmail}
ID Usuario: ${orderData.userId}

DETALLES DEL PEDIDO:
--------------------
${orderData.items.map((item: any) =>
  `• ${item.name} x${item.quantity} - $${item.price} c/u = $${item.price * item.quantity}`
).join('\n')}

TOTAL: $${orderData.total}

Método de Pago: ${orderData.paymentMethod}
Estado: ${orderData.status}
Fecha: ${orderData.createdAt.toLocaleString('es-AR')}

=====================
    `;

    const formData = new FormData();
    formData.append('name', 'Sistema Mi Dulce Felisa');
    formData.append('email', orderData.userEmail);
    formData.append('message', emailBody);
    formData.append('_subject', `Nueva Orden #${orderId} - $${orderData.total}`);

    await fetch('https://formspree.io/f/xdkynknn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData as any
    });
  } catch {
    // Error silencioso
  }
};

const handleCheckout = async () => {
  // Verificar si el carrito está vacío
  if (cart.length === 0) {
    Alert.alert('Carrito vacío', 'Agrega productos antes de finalizar la compra');
    return;
  }

  // Verificar si el usuario está logueado
  if (!user) {
    setIsProcessing(false);
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
    return;
  }

  setIsProcessing(true);

  try {
    const total = calculateTotal();

    // Crear descripción del pedido para MercadoPago
    const description = cart.map(item =>
      `${item.name} x${item.quantity}`
    ).join(', ');

    // Crear orden en Firebase (sin el campo image que causa problemas)
    const itemsForFirebase = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description
    }));

    const orderData: Order = {
      userId: user?.id || 'unknown',
      userName: user?.name || 'Usuario',
      userEmail: user?.email || '',
      items: itemsForFirebase as any,
      total: total,
      status: 'pending',
      paymentMethod: 'MercadoPago',
      createdAt: new Date(),
    };

    // Agregar timeout para detectar problemas de conexión
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: Firebase no responde después de 10 segundos')), 10000)
    );

    const addDocPromise = addDoc(collection(db, 'orders'), orderData);

    const docRef = await Promise.race([addDocPromise, timeoutPromise]) as any;

    // Enviar notificación al vendedor
    await sendVendorNotification(docRef.id, orderData);

    // Link de cobro de MercadoPago para Mi Dulce Felisa
    const mercadopagoUrl = 'https://link.mercadopago.com.ar/midulcefelisa';

    // Mostrar confirmación y opciones de pago
    Alert.alert(
      '✅ ¡Pedido Creado!',
      `Pedido #${docRef.id.substring(0, 8)}\nTotal a pagar: $${total}\n\nProductos:\n${description}\n\n¿Cómo querés pagar?`,
      [
        {
          text: 'Abrir MercadoPago',
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(mercadopagoUrl);
              if (supported) {
                await Linking.openURL(mercadopagoUrl);

                // Mostrar instrucciones después de abrir MercadoPago
                setTimeout(() => {
                  Alert.alert(
                    '💰 Instrucciones de Pago',
                    `En MercadoPago, ingresá el monto a pagar:\n\n💵 TOTAL: $${total}\n\n⚠️ Importante:\n• Si sos el dueño de la cuenta, NO podrás pagarte a vos mismo\n• Compartí el link con quien vaya a pagar\n• O usá otra cuenta de MercadoPago`,
                    [
                      {
                        text: 'Entendido',
                        onPress: () => {
                          // Mostrar mensaje de confirmación de notificación al vendedor
                          Alert.alert(
                            '✅ Notificación Enviada',
                            `Hemos enviado una notificación al vendedor con tu pedido #${docRef.id.substring(0, 8)}.\n\nEl vendedor se pondrá en contacto contigo pronto para coordinar la entrega.\n\n¡Gracias por tu compra!`,
                            [
                              {
                                text: 'OK',
                                onPress: () => {
                                  clearCart();
                                  setIsProcessing(false);
                                }
                              }
                            ]
                          );
                        }
                      }
                    ]
                  );
                }, 1000);
              } else {
                Alert.alert('Error', 'No se pudo abrir MercadoPago');
                clearCart();
                setIsProcessing(false);
              }
            } catch {
              Alert.alert('Error', 'No se pudo abrir el link de pago');
              clearCart();
              setIsProcessing(false);
            }
          }
        },
        {
          text: 'Copiar Link',
          onPress: () => {
            Alert.alert(
              '📋 Link de Pago',
              `Link: ${mercadopagoUrl}\n\nTotal a pagar: $${total}\nProductos: ${description}\n\nCopiá este link y envialo a quien vaya a pagar.\n\n⚠️ Quien pague debe ingresar el monto manualmente en MercadoPago.`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // Mostrar mensaje de confirmación de notificación al vendedor
                    Alert.alert(
                      '✅ Notificación Enviada',
                      `Hemos enviado una notificación al vendedor con tu pedido #${docRef.id.substring(0, 8)}.\n\nEl vendedor se pondrá en contacto contigo pronto para coordinar la entrega.\n\n¡Gracias por tu compra!`,
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            clearCart();
                            setIsProcessing(false);
                          }
                        }
                      ]
                    );
                  }
                }
              ]
            );
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            // Mostrar mensaje de confirmación de notificación al vendedor
            Alert.alert(
              '✅ Notificación Enviada',
              `Hemos enviado una notificación al vendedor con tu pedido #${docRef.id.substring(0, 8)}.\n\nEl vendedor se pondrá en contacto contigo pronto para coordinar la entrega y el pago.\n\n¡Gracias por tu compra!`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    clearCart();
                    setIsProcessing(false);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  } catch (error: any) {
    Alert.alert(
      'Error al procesar pedido',
      `No se pudo crear tu pedido.\n\nDetalle: ${error?.message || error?.code || 'Error desconocido'}\n\nPor favor verifica tu conexión a internet e intenta nuevamente.`,
      [
        {
          text: 'OK'
        }
      ]
    );
    setIsProcessing(false);
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
              style={[styles.checkoutButton, isProcessing && styles.buttonDisabled]}
              onPress={handleCheckout}
              disabled={isProcessing}
            >
              <Text style={styles.buttonText}>
                {isProcessing ? 'Procesando...' : 'Pagar con MercadoPago'}
              </Text>
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
  buttonDisabled: {
    backgroundColor: '#CCC',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;