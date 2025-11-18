import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { CustomCakeData } from '../types';

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
  'Red Velvet',
  'Vainilla y Chocolate',
  'Limón',
  'Naranja',
  'Zanahoria',
];

const FILLINGS = [
  'Dulce de Leche',
  'Crema Pastelera',
  'Mousse de Chocolate',
  'Mousse de Frutilla',
  'Crema Chantilly',
  'Mermelada de Frutilla',
  'Mermelada de Durazno',
  'Nutella',
  'Crema de Limón',
  'Crema de Maracuyá',
  'Trufa de Chocolate',
  'Ganache',
];

const FROSTINGS = [
  'Buttercream',
  'Fondant',
  'Crema Chantilly',
  'Merengue Suizo',
  'Ganache de Chocolate',
  'Crema de Mantequilla',
  'Glaseado de Chocolate',
  'Glaseado de Vainilla',
  'Cobertura de Dulce de Leche',
  'Cobertura Espejo',
];

const DECORATIONS = [
  'Flores de Azúcar',
  'Frutas Frescas',
  'Chocolate Rallado',
  'Perlas Comestibles',
  'Mariposas de Oblea',
  'Toppers Personalizados',
  'Rocklets',
  'Confeti de Chocolate',
  'Estrellas Doradas',
  'Figuritas de Fondant',
];

const CustomCakeScreen: React.FC = () => {
  // Estados del formulario
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCakeType, setSelectedCakeType] = useState('');
  const [selectedFillings, setSelectedFillings] = useState<string[]>([]);
  const [selectedFrostings, setSelectedFrostings] = useState<string[]>([]);
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (selectedFrostings.length === 0) {
      Alert.alert('Error', 'Por favor, selecciona al menos una cobertura');
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

  // Enviar formulario
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const sizeData = SIZES.find(s => s.value === selectedSize);

    const customCakeData: CustomCakeData = {
      size: selectedSize,
      servings: sizeData?.servings || 0,
      fillings: selectedFillings,
      frostings: selectedFrostings,
      decorations: selectedDecorations,
      message,
      theme,
      name,
      email,
      phone,
    };

    // Formatear el mensaje para el email
    const emailBody = `
NUEVA SOLICITUD DE TORTA PERSONALIZADA
======================================

DATOS DEL CLIENTE:
------------------
Nombre: ${customCakeData.name}
Email: ${customCakeData.email}
Teléfono: ${customCakeData.phone || 'No proporcionado'}

DETALLES DE LA TORTA:
----------------------
Tamaño: ${sizeData?.cm} cm (${customCakeData.servings} porciones)
Tipo de Biscochuelo: ${selectedCakeType}

Rellenos:
${customCakeData.fillings.map(f => `  • ${f}`).join('\n')}

Coberturas:
${customCakeData.frostings.map(f => `  • ${f}`).join('\n')}

Decoraciones:
${customCakeData.decorations.length > 0
  ? customCakeData.decorations.map(d => `  • ${d}`).join('\n')
  : '  • Ninguna'}

Mensaje en la torta: ${customCakeData.message || 'Sin mensaje'}
Temática: ${customCakeData.theme || 'No especificada'}

======================================
    `;

    try {
      const formData = new FormData();
      formData.append('name', customCakeData.name);
      formData.append('email', customCakeData.email);
      formData.append('phone', customCakeData.phone);
      formData.append('message', emailBody);
      formData.append('_subject', 'Nueva Solicitud de Torta Personalizada');

      const response = await fetch('https://formspree.io/f/xdkynknn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        Alert.alert(
          'Éxito',
          'Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Limpiar formulario
                setSelectedSize('');
                setSelectedCakeType('');
                setSelectedFillings([]);
                setSelectedFrostings([]);
                setSelectedDecorations([]);
                setMessage('');
                setTheme('');
                setName('');
                setEmail('');
                setPhone('');
              }
            }
          ]
        );
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.error || 'Hubo un problema al enviar la solicitud';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar la solicitud. Verifica tu conexión a internet');
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
            <Ionicons name="heart" size={20} color="#FF69B4" /> Rellenos (seleccione hasta 3)
          </Text>
          <View style={styles.chipContainer}>
            {FILLINGS.map((filling) => (
              <TouchableOpacity
                key={filling}
                style={[
                  styles.chip,
                  selectedFillings.includes(filling) && styles.chipSelected
                ]}
                onPress={() => toggleSelection(filling, selectedFillings, setSelectedFillings, 3)}
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

        {/* Coberturas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="color-palette" size={20} color="#FF69B4" /> Coberturas (seleccione hasta 3)
          </Text>
          <View style={styles.chipContainer}>
            {FROSTINGS.map((frosting) => (
              <TouchableOpacity
                key={frosting}
                style={[
                  styles.chip,
                  selectedFrostings.includes(frosting) && styles.chipSelected
                ]}
                onPress={() => toggleSelection(frosting, selectedFrostings, setSelectedFrostings, 3)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedFrostings.includes(frosting) && styles.chipTextSelected
                  ]}>
                    {frosting}
                  </Text>
                  {selectedFrostings.includes(frosting) && (
                    <Ionicons name="checkmark-circle" size={18} color="#FFF" style={styles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Decoraciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="star" size={20} color="#FF69B4" /> Decoraciones (seleccione hasta 3)
          </Text>
          <View style={styles.chipContainer}>
            {DECORATIONS.map((decoration) => (
              <TouchableOpacity
                key={decoration}
                style={[
                  styles.chip,
                  selectedDecorations.includes(decoration) && styles.chipSelected
                ]}
                onPress={() => toggleSelection(decoration, selectedDecorations, setSelectedDecorations, 3)}
                disabled={isSubmitting}
              >
                <View style={styles.chipContent}>
                  <Text style={[
                    styles.chipText,
                    selectedDecorations.includes(decoration) && styles.chipTextSelected
                  ]}>
                    {decoration}
                  </Text>
                  {selectedDecorations.includes(decoration) && (
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

        {/* Botón enviar */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </Text>
          {!isSubmitting && <Ionicons name="send" size={20} color="#FFF" style={styles.submitIcon} />}
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          * Campos obligatorios. Nos pondremos en contacto contigo para confirmar los detalles y el precio.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
  submitButton: {
    backgroundColor: '#FF69B4',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    fontSize: 18,
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
