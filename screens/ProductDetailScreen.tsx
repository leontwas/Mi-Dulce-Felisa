import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

// Definir tipo para las imágenes de la galería
interface GalleryImage {
  id: string;
  name: string;
  description: string;
  image: any;
}

// Array con las 64 imágenes
const GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', name: 'Bisnike', description: 'Torta temática de Bisnike con decoración personalizada', image: require('../assets/images/01_Bisnike.png') },
  { id: '2', name: 'Frutilla', description: 'Deliciosa torta de frutillas con crema', image: require('../assets/images/02_Frutilla.png') },
  { id: '3', name: 'Frutilla Y Merengue', description: 'Combinación perfecta de frutillas y merengue', image: require('../assets/images/03_FrutillaYMerengue.png') },
  { id: '4', name: 'Anime', description: 'Torta temática de anime con diseño único', image: require('../assets/images/04_Anime.png') },
  { id: '5', name: 'Barbie', description: 'Torta de Barbie para las princesas de la casa', image: require('../assets/images/05_Barbie.png') },
  { id: '6', name: 'Bebes Llorones', description: 'Torta de Bebes Llorones con detalles especiales', image: require('../assets/images/06_BebesLlorones.png') },
  { id: '7', name: 'Comunión', description: 'Torta elegante para comunión', image: require('../assets/images/07_Comunion.png') },
  { id: '8', name: 'Estrellas Y Bolas Disco', description: 'Torta brillante con estrellas y bolas disco', image: require('../assets/images/08_EstrellasYBolasDisco.png') },
  { id: '9', name: 'Hulk', description: 'Torta del increíble Hulk', image: require('../assets/images/09_Hulk.png') },
  { id: '10', name: 'La Granja', description: 'Torta temática de la granja', image: require('../assets/images/10_LaGranja.png') },
  { id: '11', name: 'Mariposas Y Rosas', description: 'Delicada torta con mariposas y rosas', image: require('../assets/images/11_MariposasYRosas.png') },
  { id: '12', name: 'Stich', description: 'Torta del adorable Stich', image: require('../assets/images/12_Stich.png') },
  { id: '13', name: 'Blancanieves', description: 'Torta de Blancanieves y los siete enanitos', image: require('../assets/images/13_Blancanieves.png') },
  { id: '14', name: 'Caperusita', description: 'Torta de Caperucita Roja', image: require('../assets/images/14_Caperusita.png') },
  { id: '15', name: 'Dollar', description: 'Torta temática de dólares', image: require('../assets/images/15_Dollar.png') },
  { id: '16', name: 'Fortnite', description: 'Torta de Fortnite para gamers', image: require('../assets/images/16_Fortnite.png') },
  { id: '17', name: 'Hotwheels', description: 'Torta de Hotwheels con autos', image: require('../assets/images/17_Hotwheels.png') },
  { id: '18', name: 'Hotwheels 2', description: 'Otra versión de torta Hotwheels', image: require('../assets/images/18_Hotwheels2.png') },
  { id: '19', name: 'Moana', description: 'Torta de la princesa Moana', image: require('../assets/images/19_Moana.png') },
  { id: '20', name: 'Mago De Oz', description: 'Torta mágica del Mago de Oz', image: require('../assets/images/20_MagoDeOz.png') },
  { id: '21', name: 'Arco Iris', description: 'Colorida torta arcoíris', image: require('../assets/images/21_ArcoIris.png') },
  { id: '22', name: 'Boca Junior Pelota', description: 'Torta de Boca Juniors en forma de pelota', image: require('../assets/images/22_BocaJuniorPelota.png') },
  { id: '23', name: 'Boca Juniors', description: 'Torta para fanáticos de Boca Juniors', image: require('../assets/images/23_BocaJuniors.png') },
  { id: '24', name: 'Bomberos', description: 'Torta temática de bomberos', image: require('../assets/images/24_Bomberos.png') },
  { id: '25', name: 'Bus 203', description: 'Torta en forma de bus', image: require('../assets/images/25_Bus203.png') },
  { id: '26', name: 'Capibaras', description: 'Torta con adorables capibaras', image: require('../assets/images/26_Capibaras.png') },
  { id: '27', name: 'Chop Cerveza', description: 'Torta en forma de chop de cerveza', image: require('../assets/images/27_ChopCerveza.png') },
  { id: '28', name: 'Cohete Y Planetas', description: 'Torta espacial con cohete y planetas', image: require('../assets/images/28_CoheteYPlanetas.png') },
  { id: '29', name: 'Cubo Rubik', description: 'Torta en forma de cubo Rubik', image: require('../assets/images/29_CuboRubi.png') },
  { id: '30', name: 'Dinosaurios', description: 'Torta jurásica con dinosaurios', image: require('../assets/images/30_Dinosaurios.png') },
  { id: '31', name: 'Flores Y Mariposas', description: 'Elegante torta con flores y mariposas', image: require('../assets/images/31_FloresYMariposas.png') },
  { id: '32', name: 'Galletas', description: 'Torta decorada con galletas', image: require('../assets/images/32_Galletas.png') },
  { id: '33', name: 'Galletas 2', description: 'Otra versión de torta con galletas', image: require('../assets/images/33_Galletas2.png') },
  { id: '34', name: 'Galletas 3', description: 'Tercera versión de torta con galletas', image: require('../assets/images/34_Galletas3.png') },
  { id: '35', name: 'Granja', description: 'Torta de la granja con animales', image: require('../assets/images/35_Granja.png') },
  { id: '36', name: 'Kitty Corazón', description: 'Torta de Hello Kitty con corazón', image: require('../assets/images/36_KittyCorazon.png') },
  { id: '37', name: 'Libra Baby', description: 'Torta para baby shower de Libra', image: require('../assets/images/37_LibraBaby.png') },
  { id: '38', name: 'Luli Pampín', description: 'Torta de Luli Pampín', image: require('../assets/images/38_LuliPampin.png') },
  { id: '39', name: 'Mariposas', description: 'Hermosa torta con mariposas', image: require('../assets/images/39_Mariposas.png') },
  { id: '40', name: 'Masha Y Oso', description: 'Torta de Masha y el Oso', image: require('../assets/images/40_MashaYOso.png') },
  { id: '41', name: 'Mazeta', description: 'Torta en forma de maceta', image: require('../assets/images/41_Mazeta.png') },
  { id: '42', name: 'Minion Nena', description: 'Torta de Minion para nenas', image: require('../assets/images/42_MinionNena.png') },
  { id: '43', name: 'Minion Nene', description: 'Torta de Minion para nenes', image: require('../assets/images/43_MinionNene.png') },
  { id: '44', name: 'Pokemon', description: 'Torta de Pokemon', image: require('../assets/images/44_Pokemon.png') },
  { id: '45', name: 'River Plate', description: 'Torta para fanáticos de River', image: require('../assets/images/45_RiverPlate.png') },
  { id: '46', name: 'River Plate 2', description: 'Otra versión de torta de River', image: require('../assets/images/46_RiverPlate2.png') },
  { id: '47', name: 'Rueda Ford', description: 'Torta en forma de rueda Ford', image: require('../assets/images/47_RuedaFord.png') },
  { id: '48', name: 'Rugby', description: 'Torta de rugby', image: require('../assets/images/48_Rugby.png') },
  { id: '49', name: 'San Lorenzo', description: 'Torta de San Lorenzo', image: require('../assets/images/49_SanLorenzo.png') },
  { id: '50', name: 'San Lorenzo Pelota', description: 'Torta de San Lorenzo en forma de pelota', image: require('../assets/images/50_SanLorenzoPelota.png') },
  { id: '51', name: 'Spiderman', description: 'Torta del Hombre Araña', image: require('../assets/images/51_Spiderman.png') },
  { id: '52', name: 'Unicornios', description: 'Mágica torta de unicornios', image: require('../assets/images/52_Unicornios.png') },
  { id: '53', name: 'Up', description: 'Torta de la película Up', image: require('../assets/images/53_Up.png') },
  { id: '54', name: 'VW', description: 'Torta en forma de Volkswagen', image: require('../assets/images/54_VW.png') },
  { id: '55', name: 'Camión', description: 'Torta en forma de camión', image: require('../assets/images/55_Camion.png') },
  { id: '56', name: 'Dulce Y Banana', description: 'Torta de dulce y banana', image: require('../assets/images/56_DulceYBanana.png') },
  { id: '57', name: 'Frutillas Y Dulce', description: 'Torta de frutillas y dulce', image: require('../assets/images/57_FrutillasYDulce.png') },
  { id: '58', name: 'Traje', description: 'Elegante torta en forma de traje', image: require('../assets/images/58_Traje.png') },
  { id: '59', name: 'Princesa', description: 'Torta de princesa', image: require('../assets/images/59_Princesa.png') },
  { id: '60', name: 'Cars', description: 'Torta de Cars de Disney', image: require('../assets/images/60_Cars.png') },
  { id: '61', name: 'Egresado', description: 'Torta para egresados', image: require('../assets/images/61_Egresado.png') },
  { id: '62', name: 'Frozen', description: 'Torta de Frozen', image: require('../assets/images/62_Frozen.png') },
  { id: '63', name: 'Power Ranger', description: 'Torta de Power Rangers', image: require('../assets/images/63_PowerRanger.png') },
  { id: '64', name: 'Barcelona', description: 'Torta para fanáticos del Barcelona', image: require('../assets/images/64_Barcelona.png') },
];

type ImageDetailScreenRouteProp = RouteProp<RootStackParamList, 'ImageDetail'>;
type ImageDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImageDetail'>;

const ImageDetailScreen: React.FC = () => {
  const route = useRoute<ImageDetailScreenRouteProp>();
  const navigation = useNavigation<ImageDetailScreenNavigationProp>();
  const { imageId } = route.params;

  const galleryImage = GALLERY_IMAGES.find(img => img.id === imageId);

  if (!galleryImage) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Imagen no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={galleryImage.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{galleryImage.name}</Text>
        <Text style={styles.description}>{galleryImage.description}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver a la Galería</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 490,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ImageDetailScreen;