import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - 40;

const HomeScreen: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

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

  const socialMedia = [
    { name: 'Instagram', icon: 'logo-instagram', url: 'https://www.instagram.com/mi.dulce.felisa/?fbclid=IwY2xjawN-DXpleHRuA2FlbQIxMABicmlkETF6c2lKMXpYcG1zOVRzVHpSc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHoTtxOQ0iijZdsQX1SwlFeHtk_GC4MNLlgThqofjl2FCnl5Fd9MfSbxnlNOf_aem_Ftt39nMDXKLDHcxrBtLp7A', color: '#E4405F' },
    { name: 'Facebook', icon: 'logo-facebook', url: 'https://facebook.com/midulcefelisa', color: '#1877F2' },
    { name: 'WhatsApp', icon: 'logo-whatsapp', url: 'https://wa.me/5491122334455', color: '#25D366' },
    { name: 'YouTube', icon: 'logo-youtube', url: 'https://youtube.com/@midulcefelisa', color: '#FF0000' },
    { name: 'Telegram', icon: 'send', url: 'https://t.me/midulcefelisa', color: '#0088cc' },
  ];

  const handleSocialPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Error al abrir el enlace:", err));
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    scrollToIndex(prevIndex);
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Dulce Felisa</Text>
     
      {/* Slide de Imágenes */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
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
        
        {/* Flecha Izquierda */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.leftArrow]}
          onPress={handlePrev}
        >
          <Ionicons name="chevron-back" size={30} color="#FF69B4" />
        </TouchableOpacity>

        {/* Flecha Derecha */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.rightArrow]}
          onPress={handleNext}
        >
          <Ionicons name="chevron-forward" size={30} color="#FF69B4" />
        </TouchableOpacity>
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

      {/* Redes Sociales */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialTitle}>Seguinos en nuestras redes 💕</Text>
        <View style={styles.socialIconsContainer}>
          {socialMedia.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialButton, { backgroundColor: social.color }]}
              onPress={() => handleSocialPress(social.url)}
            >
              <Ionicons name={social.icon as any} size={28} color="#FFF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.footer}>© 2025 Mi Dulce Felisa - Todos los derechos reservados</Text>
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
    backgroundColor: '#f5f5f5',
    position: 'relative',
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
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
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
  },
  socialContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF69B4',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
});

export default HomeScreen;