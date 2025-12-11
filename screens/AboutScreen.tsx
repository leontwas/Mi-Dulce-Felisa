import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quienes Somos</Text>

      <Image
        source={require('../assets/images/bakery.jpg')}
        style={styles.heroImage}
      />

      <Text style={styles.description}>
        En plena pandemia, nació Mi Dulce Felisa, un emprendimiento dulce y acogedor
        que se especializa en crear deliciosas tortas, panes, facturas y mucho más,
        llevando un toque de amor y calidez a cada bocado.
      </Text>
    </ScrollView>
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
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#FF69B4',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#666',
  },
});

export default AboutScreen;