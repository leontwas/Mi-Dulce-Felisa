import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - 40; // 20px padding a cada lado

const HomeScreen: React.FC = () => {
  const images: number[] = [
    require('../assets/images/01_Bisnike.png'),
    require('../assets/images/02_Frutilla.png'),
    require('../assets/images/03_FrutillaYMerengue.png'),
    require('../assets/images/04_Anime.png'), 
    require('../assets/images/05_Barbie.png'),
    require('../assets/images/06_BebesLlorones.png'),
    require('../assets/images/07_Comunion.png'),
    require('../assets/images/08_EstrellasYBolasDisco.png'),
    require('../assets/images/09_Hulk.png'),
    require('../assets/images/10_LaGranja.png'),
    require('../assets/images/11_MariposasYRosas.png'),
    require('../assets/images/12_Stich.png'),
    require('../assets/images/13_Blancanieves.png'),
    require('../assets/images/14_Caperusita.png'),
    require('../assets/images/15_Dollar.png'),
    require('../assets/images/16_Fortnite.png'),
    require('../assets/images/17_Hotwheels.png'),
    require('../assets/images/18_Hotwheels2.png'),
    require('../assets/images/19_Moana.png'),
    require('../assets/images/20_MagoDeOz.png'),
    require('../assets/images/21_ArcoIris.png'),
    require('../assets/images/22_BocaJuniorPelota.png'),
    require('../assets/images/23_BocaJuniors.png'),
    require('../assets/images/24_Bomberos.png'),
    require('../assets/images/25_Bus203.png'),
    require('../assets/images/26_Capibaras.png'),
    require('../assets/images/27_ChopCerveza.png'),
    require('../assets/images/28_CoheteYPlanetas.png'),
    require('../assets/images/29_CuboRubi.png'),
    require('../assets/images/30_Dinosaurios.png'),
    require('../assets/images/31_FloresYMariposas.png'),
    require('../assets/images/32_Galletas.png'),
    require('../assets/images/33_Galletas2.png'),
    require('../assets/images/34_Galletas3.png'),
    require('../assets/images/35_Granja.png'),
    require('../assets/images/36_KittyCorazon.png'),
    require('../assets/images/37_LibraBaby.png'),
    require('../assets/images/38_LuliPampin.png'),
    require('../assets/images/39_Mariposas.png'),
    require('../assets/images/40_MashaYOso.png'),
    require('../assets/images/41_Mazeta.png'),
    require('../assets/images/42_MinionNena.png'),
    require('../assets/images/43_MinionNene.png'),
    require('../assets/images/44_Pokemon.png'),
    require('../assets/images/45_RiverPlate.png'),
    require('../assets/images/46_RiverPlate2.png'),
    require('../assets/images/47_RuedaFord.png'),
    require('../assets/images/48_Rugby.png'),
    require('../assets/images/49_SanLorenzo.png'),
    require('../assets/images/50_SanLorenzoPelota.png'),
    require('../assets/images/51_Spiderman.png'),
    require('../assets/images/52_Unicornios.png'),
    require('../assets/images/53_Up.png'),
    require('../assets/images/54_VW.png'),
    require('../assets/images/55_Camion.png'),
    require('../assets/images/56_DulceYBanana.png'),
    require('../assets/images/57_FrutillasYDulce.png'),
    require('../assets/images/58_Traje.png'),
  ];
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Dulce Felisa</Text>
     
      {/* Carrusel de Imágenes */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }: { item: number }) => (
            <View style={styles.imageContainer}>
              <Image
                source={item}
                style={styles.galleryImage}
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>
      
      {/* Imagen adicional entre carrusel y mapa */}
      <Image
        source={require('../assets/images/Mi_dulce.jpg')} 
        style={styles.middleImage}
        resizeMode="cover"
      />
      
      <Text style={styles.title2}>Encontranos acá 📍</Text>
      
      {/* Mapa de ubicación */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.60973, 
          longitude: -58.70009,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: -34.60973,
            longitude: -58.70009,
          }}
          title="Mi Dulce Felisa"
          description="Pastelería artesanal"
        />
      </MapView>
      
      <Text style={styles.addressText}>
        Pasaje N°1 4433, Villa Udaondo, Ituzaingó, Provincia de Buenos Aires
      </Text>
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
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FF69B4',
    bottom: -20,
  },
  carouselContainer: {
    height: CAROUSEL_HEIGHT,
    marginBottom: 20,
    backgroundColor: '#f5f5f5', // Fondo opcional para ver mejor el contenedor
  },
  flatListContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  galleryImage: {
    width: CAROUSEL_ITEM_WIDTH,
    height: CAROUSEL_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  middleImage: {
    width: '90%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: -30,
  },
  map: {
    height: 300,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  addressText: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: 'black', 
    textAlign: 'center',
    top: -20, 
    marginTop: 5,
  }
});

export default HomeScreen;