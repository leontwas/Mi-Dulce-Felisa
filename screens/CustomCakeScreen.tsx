import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CakeCustomization {
  size: string;
  flavor: string;
  fillings: string[];
  frostings: string[];
  decorations: string[];
  message: string;
  theme: string;
}

const CustomCakeScreen: React.FC = () => {
  const [customization, setCustomization] = useState<CakeCustomization>({
    size: '',
    flavor: '',
    fillings: [],
    frostings: [],
    decorations: [],
    message: '',
    theme: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sizes = [
    'Pequeña (15cm) - 8-10 porciones',
    'Mediana (20cm) - 15-20 porciones',
    'Grande (25cm) - 25-30 porciones',
    'Extra Grande (30cm) - 35-40 porciones',
  ];
  const flavors = ['Vainilla', 'Chocolate', 'Red Velvet', 'Zanahoria', 'Limón', 'Fresa'];
  const fillings = [
    'Dulce de Leche',
    'Crema Pastelera',
    'Nutella',
    'Mermelada de Fresa',
    'Crema de Chocolate',
    'Crema de Maní',
    'Mouse de Chocolate',
    'Mouse de Limón',
    'Duraznos en Almíbar',
    'Marroc',
    'Crema de Vainilla',
    'Arequipe',
  ];
  const frostings = [
    'Buttercream',
    'Crema Chantilly',
    'Fondant',
    'Ganache de Chocolate',
    'Merengue Suizo',
    'Merengue Italiano',
    'Crema de Mantequilla',
    'Glaseado Real',
    'Cobertura de Chocolate',
    'Crema de Queso',
  ];
  const decorations = [
    'Flores Naturales',
    'Frutas Frescas',
    'Sprinkles',
    'Figuras de Fondant',
    'Chocolate',
    'Rocklets',
    'Perlas Comestibles',
    'Confites',
    'Macarons',
    'Galletas Decoradas',
  ];

  const handleSubmit = async () => {
    if (!customization.size || !customization.flavor) {
      Alert.alert('Error', 'Por favor selecciona al menos el tamaño y sabor de la torta');
      return;
    }

    setIsSubmitting(true);

    // Formatear los datos para el email
    const formData = new FormData();
    formData.append('Asunto', 'Nueva Solicitud de Torta Personalizada');
    formData.append('Tamaño', customization.size);
    formData.append('Sabor', customization.flavor);
    formData.append('Rellenos', customization.fillings.length > 0 ? customization.fillings.join(', ') : 'Ninguno');
    formData.append('Coberturas', customization.frostings.length > 0 ? customization.frostings.join(', ') : 'Ninguna');
    formData.append('Decoraciones', customization.decorations.length > 0 ? customization.decorations.join(', ') : 'Ninguna');
    formData.append('Mensaje en la Torta', customization.message || 'Sin mensaje');
    formData.append('Temática', customization.theme || 'Sin temática específica');

    try {
      const response = await fetch('https://formspree.io/f/xdkynknn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        Alert.alert(
          '¡Solicitud Enviada!',
          'Hemos recibido tu solicitud de torta personalizada. Te contactaremos pronto para confirmar los detalles y el precio.',
          [{ text: 'OK' }]
        );

        // Limpiar formulario
        setCustomization({
          size: '',
          flavor: '',
          fillings: [],
          frostings: [],
          decorations: [],
          message: '',
          theme: '',
        });
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

  const renderOptions = (
    title: string,
    options: string[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedValue === option && styles.optionButtonSelected,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedValue === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMultipleOptions = (
    title: string,
    options: string[],
    selectedValues: string[],
    onToggle: (value: string) => void
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.multipleSelectHint}>Puedes seleccionar varias opciones</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedValues.includes(option) && styles.optionButtonSelected,
            ]}
            onPress={() => onToggle(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedValues.includes(option) && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
            {selectedValues.includes(option) && (
              <Ionicons name="checkmark-circle" size={16} color="#FF69B4" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="color-palette" size={60} color="#FF69B4" />
        <Text style={styles.title}>Crea tu Torta Personalizada</Text>
        <Text style={styles.description}>
          Diseña la torta de tus sueños seleccionando tus opciones favoritas
        </Text>
      </View>

      {renderOptions('Tamaño *', sizes, customization.size, (value) =>
        setCustomization({ ...customization, size: value })
      )}

      {renderOptions('Sabor *', flavors, customization.flavor, (value) =>
        setCustomization({ ...customization, flavor: value })
      )}

      {renderMultipleOptions('Relleno', fillings, customization.fillings, (value) => {
        const newFillings = customization.fillings.includes(value)
          ? customization.fillings.filter((f) => f !== value)
          : [...customization.fillings, value];
        setCustomization({ ...customization, fillings: newFillings });
      })}

      {renderMultipleOptions('Cobertura', frostings, customization.frostings, (value) => {
        const newFrostings = customization.frostings.includes(value)
          ? customization.frostings.filter((f) => f !== value)
          : [...customization.frostings, value];
        setCustomization({ ...customization, frostings: newFrostings });
      })}

      {renderMultipleOptions('Decoración', decorations, customization.decorations, (value) => {
        const newDecorations = customization.decorations.includes(value)
          ? customization.decorations.filter((d) => d !== value)
          : [...customization.decorations, value];
        setCustomization({ ...customization, decorations: newDecorations });
      })}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mensaje en la Torta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Feliz Cumpleaños María"
          value={customization.message}
          onChangeText={(text) => setCustomization({ ...customization, message: text })}
          maxLength={50}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temática</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ej: Princesas, Superhéroes, Unicornios, Elegant, etc..."
          value={customization.theme}
          onChangeText={(text) => setCustomization({ ...customization, theme: text })}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Ionicons name="send" size={20} color="#FFF" style={styles.buttonIcon} />
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#FF69B4" />
        <Text style={styles.infoText}>
          Te contactaremos dentro de 24 horas para confirmar disponibilidad y precio
        </Text>
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
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  multipleSelectHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    gap: 6,
  },
  optionButtonSelected: {
    borderColor: '#FF69B4',
    backgroundColor: '#FFF0F5',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  optionTextSelected: {
    color: '#FF69B4',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    margin: 20,
    marginTop: 30,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    padding: 15,
    margin: 20,
    marginTop: 0,
    borderRadius: 8,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
});

export default CustomCakeScreen;
