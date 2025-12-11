import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { MainTabParamList } from '../navigation/AppNavigator';

// Definir tipo para las imágenes de la galería
interface GalleryImage {
    id: string;
    name: string;
    image: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 30) / 2;

// Array con las 64 imágenes
const GALLERY_IMAGES: GalleryImage[] = [
    { id: '1', name: 'Bisnike', image: require('../assets/images/01_Bisnike.png') },
    { id: '2', name: 'Frutilla', image: require('../assets/images/02_Frutilla.png') },
    { id: '3', name: 'Frutilla Y Merengue', image: require('../assets/images/03_FrutillaYMerengue.png') },
    { id: '4', name: 'Anime', image: require('../assets/images/04_Anime.png') },
    { id: '5', name: 'Barbie', image: require('../assets/images/05_Barbie.png') },
    { id: '6', name: 'Bebes Llorones', image: require('../assets/images/06_BebesLlorones.png') },
    { id: '7', name: 'Comunión', image: require('../assets/images/07_Comunion.png') },
    { id: '8', name: 'Estrellas Y Bolas Disco', image: require('../assets/images/08_EstrellasYBolasDisco.png') },
    { id: '9', name: 'Hulk', image: require('../assets/images/09_Hulk.png') },
    { id: '10', name: 'La Granja', image: require('../assets/images/10_LaGranja.png') },
    { id: '11', name: 'Mariposas Y Rosas', image: require('../assets/images/11_MariposasYRosas.png') },
    { id: '12', name: 'Stich', image: require('../assets/images/12_Stich.png') },
    { id: '13', name: 'Blancanieves', image: require('../assets/images/13_Blancanieves.png') },
    { id: '14', name: 'Caperusita', image: require('../assets/images/14_Caperusita.png') },
    { id: '15', name: 'Dollar', image: require('../assets/images/15_Dollar.png') },
    { id: '16', name: 'Fortnite', image: require('../assets/images/16_Fortnite.png') },
    { id: '17', name: 'Hotwheels', image: require('../assets/images/17_Hotwheels.png') },
    { id: '18', name: 'Hotwheels 2', image: require('../assets/images/18_Hotwheels2.png') },
    { id: '19', name: 'Moana', image: require('../assets/images/19_Moana.png') },
    { id: '20', name: 'Mago De Oz', image: require('../assets/images/20_MagoDeOz.png') },
    { id: '21', name: 'Arco Iris', image: require('../assets/images/21_ArcoIris.png') },
    { id: '22', name: 'Boca Junior Pelota', image: require('../assets/images/22_BocaJuniorPelota.png') },
    { id: '23', name: 'Boca Juniors', image: require('../assets/images/23_BocaJuniors.png') },
    { id: '24', name: 'Bomberos', image: require('../assets/images/24_Bomberos.png') },
    { id: '25', name: 'Bus 203', image: require('../assets/images/25_Bus203.png') },
    { id: '26', name: 'Capibaras', image: require('../assets/images/26_Capibaras.png') },
    { id: '27', name: 'Chop Cerveza', image: require('../assets/images/27_ChopCerveza.png') },
    { id: '28', name: 'Cohete Y Planetas', image: require('../assets/images/28_CoheteYPlanetas.png') },
    { id: '29', name: 'Cubo Rubik', image: require('../assets/images/29_CuboRubi.png') },
    { id: '30', name: 'Dinosaurios', image: require('../assets/images/30_Dinosaurios.png') },
    { id: '31', name: 'Flores Y Mariposas', image: require('../assets/images/31_FloresYMariposas.png') },
    { id: '32', name: 'Galletas', image: require('../assets/images/32_Galletas.png') },
    { id: '33', name: 'Galletas 2', image: require('../assets/images/33_Galletas2.png') },
    { id: '34', name: 'Galletas 3', image: require('../assets/images/34_Galletas3.png') },
    { id: '35', name: 'Granja', image: require('../assets/images/35_Granja.png') },
    { id: '36', name: 'Kitty Corazón', image: require('../assets/images/36_KittyCorazon.png') },
    { id: '37', name: 'Libra Baby', image: require('../assets/images/37_LibraBaby.png') },
    { id: '38', name: 'Luli Pampín', image: require('../assets/images/38_LuliPampin.png') },
    { id: '39', name: 'Mariposas', image: require('../assets/images/39_Mariposas.png') },
    { id: '40', name: 'Masha Y Oso', image: require('../assets/images/40_MashaYOso.png') },
    { id: '41', name: 'Mazeta', image: require('../assets/images/41_Mazeta.png') },
    { id: '42', name: 'Minion Nena', image: require('../assets/images/42_MinionNena.png') },
    { id: '43', name: 'Minion Nene', image: require('../assets/images/43_MinionNene.png') },
    { id: '44', name: 'Pokemon', image: require('../assets/images/44_Pokemon.png') },
    { id: '45', name: 'River Plate', image: require('../assets/images/45_RiverPlate.png') },
    { id: '46', name: 'River Plate 2', image: require('../assets/images/46_RiverPlate2.png') },
    { id: '47', name: 'Rueda Ford', image: require('../assets/images/47_RuedaFord.png') },
    { id: '48', name: 'Rugby', image: require('../assets/images/48_Rugby.png') },
    { id: '49', name: 'San Lorenzo', image: require('../assets/images/49_SanLorenzo.png') },
    { id: '50', name: 'San Lorenzo Pelota', image: require('../assets/images/50_SanLorenzoPelota.png') },
    { id: '51', name: 'Spiderman', image: require('../assets/images/51_Spiderman.png') },
    { id: '52', name: 'Unicornios', image: require('../assets/images/52_Unicornios.png') },
    { id: '53', name: 'Up', image: require('../assets/images/53_Up.png') },
    { id: '54', name: 'VW', image: require('../assets/images/54_VW.png') },
    { id: '55', name: 'Camión', image: require('../assets/images/55_Camion.png') },
    { id: '56', name: 'Dulce Y Banana', image: require('../assets/images/56_DulceYBanana.png') },
    { id: '57', name: 'Frutillas Y Dulce', image: require('../assets/images/57_FrutillasYDulce.png') },
    { id: '58', name: 'Traje', image: require('../assets/images/58_Traje.png') },
    { id: '59', name: 'Princesa', image: require('../assets/images/59_Princesa.png') },
    { id: '60', name: 'Cars', image: require('../assets/images/60_Cars.png') },
    { id: '61', name: 'Egresado', image: require('../assets/images/61_Egresado.png') },
    { id: '62', name: 'Frozen', image: require('../assets/images/62_Frozen.png') },
    { id: '63', name: 'Power Ranger', image: require('../assets/images/63_PowerRanger.png') },
    { id: '64', name: 'Barcelona', image: require('../assets/images/64_Barcelona.png') },
];

type GalleryScreenProps = BottomTabScreenProps<MainTabParamList, 'Galería'>;

const GalleryScreen: React.FC<GalleryScreenProps> = ({ navigation }) => {
    const handleImagePress = (imageId: string) => {
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('ImageDetail', { imageId });
        }
    };

    const renderImageItem = ({ item }: { item: GalleryImage }) => (
        <TouchableOpacity
            style={styles.imageCard}
            onPress={() => handleImagePress(item.id)}
            activeOpacity={0.8}
        >
            <Image source={item.image} style={styles.thumbnail} />
            <Text style={styles.imageName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Nuestra Galería</Text>
            </View>

            <FlatList
                data={GALLERY_IMAGES}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 10,
    },
    header: {
        padding: 15,
        backgroundColor: '#FF69B4',
        borderRadius: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    imageCard: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    thumbnail: {
        width: ITEM_WIDTH - 20,
        height: ITEM_WIDTH + 20,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    imageName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
        color: '#333',
    },
});

export default GalleryScreen;
