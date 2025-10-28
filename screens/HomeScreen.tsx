import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen: React.FC = () => {
  // Tipar el array de imágenes
  const images: number[] = [
    require('../assets/images/cake1.jpg'),
    require('../assets/images/cake2.jpg'),
    require('../assets/images/cake3.jpg'),
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Dulce Felisa</Text>
     
      {/* Carrusel de Imágenes */}
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: number }) => (
          <Image
            source={item}
            style={styles.galleryImage}
          />
        )}
      />

      {/* Mapa de ubicación */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.6037, // Coordenadas de ejemplo (Buenos Aires)
          longitude: -58.3816,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: -34.6037,
            longitude: -58.3816,
          }}
          title="Mi Dulce Felisa"
          description="Pastelería artesanal"
        />
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FF69B4',
  },
  galleryImage: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    marginHorizontal: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  map: {
    height: 300,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;