import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - 40;

const HomeScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const baseImages: number[] = [
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

  // Duplicar primera imagen al final para loop suave
  const images = [...baseImages, baseImages[0]];

  const socialMedia = [
    { name: 'Instagram', icon: 'logo-instagram', url: 'https://www.instagram.com/mi.dulce.felisa/?fbclid=IwY2xjawN-DXpleHRuA2FlbQIxMABicmlkETF6c2lKMXpYcG1zOVRzVHpSc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHoTtxOQ0iijZdsQX1SwlFeHtk_GC4MNLlgThqofjl2FCnl5Fd9MfSbxnlNOf_aem_Ftt39nMDXKLDHcxrBtLp7A', color: '#E4405F' },
    { name: 'Facebook', icon: 'logo-facebook', url: 'https://facebook.com/midulcefelisa', color: '#1877F2' },
    { name: 'WhatsApp', icon: 'logo-whatsapp', url: 'https://wa.me/5491165579801', color: '#25D366' },
  ];

  const handleSocialPress = (url: string) => {
    Linking.openURL(url).catch(() => { });
  };

  // Función para hacer scroll suave con animación personalizada
  const smoothScrollTo = useCallback((index: number) => {
    const targetX = index * SCREEN_WIDTH;
    scrollViewRef.current?.scrollTo({ x: targetX, animated: true });
  }, []);

  // Auto-scroll del carrusel cada 2 segundos con transición suave
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= images.length - 1) {
          // Cuando llegamos a la imagen duplicada, hacer scroll suave
          smoothScrollTo(nextIndex);

          // Después de la animación, saltar silenciosamente al inicio
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({ x: 0, animated: false });
          }, 600);

          return 0;
        } else {
          smoothScrollTo(nextIndex);
          return nextIndex;
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, smoothScrollTo]);

  const handleNext = () => {
    const nextIndex = currentIndex < baseImages.length - 1 ? currentIndex + 1 : 0;
    smoothScrollTo(nextIndex);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : baseImages.length - 1;
    smoothScrollTo(prevIndex);
    setCurrentIndex(prevIndex);
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex < baseImages.length) {
      setCurrentIndex(roundIndex);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mi Dulce Felisa</Text>

      {/* Carrusel de Imágenes */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.9}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatListContent}
        >
          {images.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={item}
                style={styles.galleryImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>

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

      {/* Footer con ubicación */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerLocation}>📍 Pasaje N°1 4433, Villa Udaondo, Ituzaingó, Provincia de Buenos Aires</Text>
        <Text style={styles.footer}>© 2025 Mi Dulce Felisa - Todos los derechos reservados</Text>
      </View>
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
    marginBottom: 20,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  footerLocation: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialContainer: {
    marginTop: 30,
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