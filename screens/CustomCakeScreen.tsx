import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type CustomCakeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomCake'>;

// Opciones disponibles
const SIZES = [
  { label: '16 cm (15 porciones)', value: '16cm', servings: 15, cm: 16 },
  { label: '18 cm (20 porciones)', value: '18cm', servings: 20, cm: 18 },
  { label: '20 cm (30 porciones)', value: '20cm', servings: 30, cm: 20 },
  { label: '22 cm (40 porciones)', value: '22cm', servings: 40, cm: 22 },
];

const CAKE_TYPES = [
  'Vainilla',
  'Chocolate',
  'Mixto (2 vainilla + 1 chocolate)',
  'Mixto (2 chocolate + 1 vainilla)',
];

const FILLINGS = [
  'Ganache Semi Amargo',
  'Ganache Blanco',
  'Crema Frutos del Bosque',
  'Crema con Frutillas',
  'Crema con Durazno',
  'Crema de Frutilla',
  'Crema Chantilly',
  'Dulce de Leche Chocotorta',
  'Dulce de Leche Solo',
  'Crema Oreo',
  'Crema Moka (café)',
  'Crema Bariloche (mousse chocolate + dulce de leche)',
  'Crema Dos Corazones',
  'Mousse de Chocolate',
];

const EXTRAS = [
  'Chips de Chocolate Blanco',
  'Chips de Chocolate Semi Amargo',
  'Merenguitos',
  'Mantecol',
  'Pedacitos de Chocolate Shot',
];

const FROSTINGS = [
  'Fondant',
  'Crema Chantilly',
  'Buttercream',
  'Ganache',
];

const CustomCakeScreen: React.FC = () => {
  const navigation = useNavigation<CustomCakeScreenNavigationProp>();
  const { user } = useAuth();

  // Estados del formulario
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCakeType, setSelectedCakeType] = useState('');
  const [selectedFillings, setSelectedFillings] = useState<string[]>([]);
  const [selectedFrosting, setSelectedFrosting] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para el calendario de fecha de entrega
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estados para opción de envío/retiro
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Autocompletar datos si el usuario está logueado
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      if (user.address) {
        setDeliveryAddress(user.address);
      }
    }
  }, [user]);

  // Función para manejar el cambio de fecha
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDeliveryDate(selectedDate);
    }
  };

  // Función para formatear la fecha
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'Seleccionar fecha';
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para manejar selecciones múltiples con límite
  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    maxItems: number = 3
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      if (selectedItems.length >= maxItems) {
        Alert.alert('Límite alcanzado', `Solo puedes seleccionar hasta ${maxItems} opciones`);
        return;
      }
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Validación del formulario
  const validateForm = (): boolean => {
    if (!selectedSize) {
      Alert.alert('Error', 'Por favor, selecciona un tamaño');
      return false;
    }
    if (!selectedCakeType) {
      Alert.alert('Error', 'Por favor, selecciona un tipo de biscochuelo');
      return false;
    }
    if (selectedFillings.length === 0) {
      Alert.alert('Error', 'Por favor, selecciona al menos un relleno');
      return false;
    }
    if (selectedFillings.length > 2) {
      Alert.alert('Error', 'Solo puedes seleccionar hasta 2 rellenos');
      return false;
    }
    if (!selectedFrosting) {
      Alert.alert('Error', 'Por favor, selecciona una cobertura');
      return false;
    }
    if (!deliveryDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha de entrega');
      return false;
    }
    // Validar que la fecha no sea en el pasado
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deliveryDate < today) {
      Alert.alert('Error', 'La fecha de entrega no puede ser en el pasado');
      return false;
    }
    if (deliveryOption === 'delivery' && !deliveryAddress) {
      Alert.alert('Error', 'Por favor, ingresa la dirección de entrega');
      return false;
    }
    if (!name) {
      Alert.alert('Error', 'Por favor, ingresa tu nombre');
      return false;
    }
    if (!email) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return false;
    }
    return true;
  };

  // Enviar por WhatsApp
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const sizeData = SIZES.find(s => s.value === selectedSize);

    // Número de WhatsApp de la tienda (formato internacional sin + ni espacios)
    const whatsappNumber = '5491165579801';

    // Formatear el mensaje para WhatsApp
    const whatsappMessage = `
🎂 *SOLICITUD DE TORTA PERSONALIZADA*
======================================

👤 *DATOS DEL CLIENTE:*
• Nombre: ${name}
• Email: ${email}
• Teléfono: ${phone || 'No proporcionado'}

📅 *FECHA DE ENTREGA:*
${deliveryDate ? formatDate(deliveryDate) : 'No especificada'}

🚚 *MODALIDAD DE ENTREGA:*
${deliveryOption === 'delivery' ? '🏠 Envío a domicilio' : '🏪 Retiro en tienda'}
${deliveryOption === 'delivery' ? `📍 Dirección: ${deliveryAddress}` : ''}

🍰 *DETALLES DE LA TORTA:*
• Tamaño: ${sizeData?.cm} cm (${sizeData?.servings} porciones)
• Biscochuelo: ${selectedCakeType}

🥄 *Rellenos (2):*
${selectedFillings.map(f => `  • ${f}`).join('\n')}

🎨 *Cobertura:*
  • ${selectedFrosting}

✨ *Extras:*
${selectedExtras.length > 0
        ? selectedExtras.map(e => `  • ${e}`).join('\n')
        : '  • Ninguno'}

💬 *Mensaje en la torta:* ${message || 'Sin mensaje'}
🎨 *Temática:* ${theme || 'No especificada'}

======================================
¡Espero su presupuesto! 💕
    `.trim();

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);

      if (supported) {
        await Linking.openURL(whatsappUrl);

        // Mostrar mensaje de éxito después de abrir WhatsApp
        Alert.alert(
          '✅ ¡Perfecto!',
          'Se abrió WhatsApp con tu solicitud. Envía el mensaje para que la tienda te pase el presupuesto.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Limpiar formulario
                setSelectedSize('');
                setSelectedCakeType('');
                setSelectedFillings([]);
                setSelectedFrosting('');
                setSelectedExtras([]);
                setMessage('');
                setTheme('');
                setDeliveryDate(undefined);
                setShowDatePicker(false);
                setDeliveryOption('pickup');
                setDeliveryAddress('');
                setName('');
                setEmail('');
                setPhone('');

                // Navegar al inicio
                navigation.navigate('MainTabs', { screen: 'Home' });
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'WhatsApp no disponible',
          'No se pudo abrir WhatsApp. Asegúrate de tener la aplicación instalada.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir WhatsApp. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Ionicons name="create" size={40} color="#FF69B4" />
          <Text style={styles.title}>Crea tu Torta Personalizada</Text>
          <Text style={styles.subtitle}>Diseña la torta de tus sueños</Text>
        </View>

        {/* Tamaños */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="resize" size={20} color="#FF69B4" /> Tamaño
          </Text>
          {SIZES.map((size) => (
            <TouchableOpacity
              key={size.value}
              style={[
                styles.optionButton,
                selectedSize === size.value && styles.optionButtonSelected
              ]}
              onPress={() => setSelectedSize(size.value)}
              disabled={isSubmitting}
            >
              <View style={styles.optionRow}>
                <Text style={[
                  styles.optionText,
                  selectedSize === size.value && styles.optionTextSelected
                ]}>
                  {size.label}
                </Text>
                {selectedSize === size.value && (
                  <Ionicons name="checkmark-circle" size={24} color="#FF69B4" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tipo de Biscochuelo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="layers" size={20} color="#FF69B4" /> Tipo de Biscochuelo
          </Text>
          <View style={styles.chipContainer}>
            {CAKE_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  selectedCakeType === type && styles.chipSelected
                ]}
                onPress={() => setSelectedCakeType(type)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedCakeType === type && styles.chipTextSelected
                  ]}>
                    {type}
                  </Text>
                  {selectedCakeType === type && (
                    <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rellenos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="heart" size={20} color="#FF69B4" /> Rellenos (seleccione 2)
          </Text>
          <View style={styles.chipContainer}>
            {FILLINGS.map((filling) => (
              <TouchableOpacity
                key={filling}
                style={[
                  styles.chip,
                  selectedFillings.includes(filling) && styles.chipSelected
                ]}
                onPress={() => toggleSelection(filling, selectedFillings, setSelectedFillings, 2)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedFillings.includes(filling) && styles.chipTextSelected
                  ]}>
                    {filling}
                  </Text>
                  {selectedFillings.includes(filling) && (
                    <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cobertura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="color-palette" size={20} color="#FF69B4" /> Cobertura *
          </Text>
          <View style={styles.chipContainer}>
            {FROSTINGS.map((frosting) => (
              <TouchableOpacity
                key={frosting}
                style={[
                  styles.chip,
                  selectedFrosting === frosting && styles.chipSelected
                ]}
                onPress={() => setSelectedFrosting(frosting)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedFrosting === frosting && styles.chipTextSelected
                  ]}>
                    {frosting}
                  </Text>
                  {selectedFrosting === frosting && (
                    <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="star" size={20} color="#FF69B4" /> Extras (opcional)
          </Text>
          <View style={styles.chipContainer}>
            {EXTRAS.map((extra) => (
              <TouchableOpacity
                key={extra}
                style={[
                  styles.chip,
                  selectedExtras.includes(extra) && styles.chipSelected
                ]}
                onPress={() => toggleSelection(extra, selectedExtras, setSelectedExtras, 5)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedExtras.includes(extra) && styles.chipTextSelected
                  ]}>
                    {extra}
                  </Text>
                  {selectedExtras.includes(extra) && (
                    <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mensaje de la torta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="text" size={20} color="#FF69B4" /> Mensaje de la torta
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Mensaje en la torta (opcional)"
            value={message}
            onChangeText={setMessage}
            editable={!isSubmitting}
          />
        </View>

        {/* Temática */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="color-wand" size={20} color="#FF69B4" /> Temática
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Temática (ej: cumpleaños infantil, boda, etc.)"
            value={theme}
            onChangeText={setTheme}
            editable={!isSubmitting}
          />
        </View>

        {/* Fecha de Entrega */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="calendar" size={20} color="#FF69B4" /> Fecha de Entrega *
          </Text>
          <TouchableOpacity
            style={[
              styles.datePickerButton,
              deliveryDate && styles.datePickerButtonSelected
            ]}
            onPress={() => setShowDatePicker(true)}
            disabled={isSubmitting}
          >
            <View style={styles.datePickerContent}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={deliveryDate ? "#FF69B4" : "#999"}
              />
              <Text style={[
                styles.datePickerText,
                deliveryDate && styles.datePickerTextSelected
              ]}>
                {formatDate(deliveryDate)}
              </Text>
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={deliveryDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Opción de Envío/Retiro */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="car" size={20} color="#FF69B4" /> Entrega *
          </Text>
          <View style={styles.deliveryOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryOption === 'pickup' && styles.deliveryOptionSelected
              ]}
              onPress={() => setDeliveryOption('pickup')}
              disabled={isSubmitting}
            >
              <Ionicons
                name="storefront"
                size={32}
                color={deliveryOption === 'pickup' ? "#FF69B4" : "#999"}
              />
              <Text style={[
                styles.deliveryOptionText,
                deliveryOption === 'pickup' && styles.deliveryOptionTextSelected
              ]}>
                Retiro en tienda
              </Text>
              {deliveryOption === 'pickup' && (
                <Ionicons name="checkmark-circle" size={24} color="#FF69B4" style={styles.checkmarkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryOption === 'delivery' && styles.deliveryOptionSelected
              ]}
              onPress={() => setDeliveryOption('delivery')}
              disabled={isSubmitting}
            >
              <Ionicons
                name="bicycle"
                size={32}
                color={deliveryOption === 'delivery' ? "#FF69B4" : "#999"}
              />
              <Text style={[
                styles.deliveryOptionText,
                deliveryOption === 'delivery' && styles.deliveryOptionTextSelected
              ]}>
                Envío a domicilio
              </Text>
              {deliveryOption === 'delivery' && (
                <Ionicons name="checkmark-circle" size={24} color="#FF69B4" style={styles.checkmarkIcon} />
              )}
            </TouchableOpacity>
          </View>

          {deliveryOption === 'delivery' && (
            <TextInput
              style={styles.input}
              placeholder="Dirección de entrega *"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              autoCapitalize="words"
              editable={!isSubmitting}
              multiline
            />
          )}
        </View>

        {/* Datos de contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="person" size={20} color="#FF69B4" /> Tus Datos
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo *"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!isSubmitting}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isSubmitting}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono (opcional)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={!isSubmitting}
          />
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          {/* Botón cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              Alert.alert(
                'Cancelar Solicitud',
                '¿Estás seguro que deseas cancelar? Se perderán todos los datos ingresados.',
                [
                  {
                    text: 'No, continuar',
                    style: 'cancel'
                  },
                  {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: () => navigation.navigate('MainTabs', { screen: 'Home' })
                  }
                ]
              );
            }}
            disabled={isSubmitting}
          >
            <Ionicons name="close-circle" size={20} color="#FF6B6B" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          {/* Botón enviar por WhatsApp */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {!isSubmitting && <Ionicons name="logo-whatsapp" size={20} color="#FFF" style={styles.submitIcon} />}
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Abriendo WhatsApp...' : 'Pedir Presupuesto'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          * Campos obligatorios. Nos pondremos en contacto contigo para confirmar los detalles y el precio.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionButtonSelected: {
    borderColor: '#FF69B4',
    backgroundColor: '#FFE4F0',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#FF69B4',
    borderColor: '#FF69B4',
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  chipTextSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 6,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  datePickerButtonSelected: {
    borderColor: '#FF69B4',
    backgroundColor: '#FFE4F0',
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
  datePickerTextSelected: {
    color: '#FF69B4',
    fontWeight: '600',
  },
  deliveryOptionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  deliveryOption: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryOptionSelected: {
    borderColor: '#FF69B4',
    backgroundColor: '#FFE4F0',
  },
  deliveryOptionText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  deliveryOptionTextSelected: {
    color: '#FF69B4',
    fontWeight: '600',
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cancelButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#FF69B4',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitIcon: {
    marginLeft: 10,
  },
  footerNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
});

export default CustomCakeScreen;
