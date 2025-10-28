import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { RootStackParamList } from '../navigation/AppNavigator';

type ContactScreenProps = NativeStackScreenProps<RootStackParamList, 'Contacto'>;

const ContactScreen: React.FC<ContactScreenProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
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

    if (!message) {
      Alert.alert('Error', 'Por favor, escribe tu mensaje');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    try {
      const response = await fetch('https://formspree.io/f/xovlewpb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Tu mensaje ha sido enviado correctamente');
        // Limpiar formulario
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        const errorMessage = responseData.error || 'Hubo un problema al enviar el mensaje';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar el mensaje. Verifica tu conexión a internet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Contáctanos</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          editable={!isSubmitting}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isSubmitting}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Teléfono (Opcional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={!isSubmitting}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tu Mensaje"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          editable={!isSubmitting}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#FF69B4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#FFD700',
  },
  submitButton: {
    backgroundColor: '#FF69B4',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ContactScreen;