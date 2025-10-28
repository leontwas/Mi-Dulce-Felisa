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
        Mi Dulce Felisa nació de la pasión por la repostería artesanal. 
        Fundada en 2015, nuestra misión es crear los postres más deliciosos 
        y memorables para cada ocasión especial.
      </Text>
      
      <Text style={styles.subtitle}>Nuestra Historia</Text>
      <Text style={styles.paragraph}>
        Todo comenzó en la cocina de nuestra fundadora, quien desde niña 
        soñaba con crear los pasteles más deliciosos. Con recetas familiares 
        transmitidas por generaciones y un amor incondicional por la repostería, 
        Mi Dulce Felisa se convirtió en realidad.
      </Text>
      
      <Text style={styles.subtitle}>Nuestro Compromiso</Text>
      <Text style={styles.paragraph}>
        Nos dedicamos a utilizar los ingredientes más frescos y de la más alta 
        calidad. Cada torta es preparada con dedicación, cariño y atención 
        al más mínimo detalle.
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