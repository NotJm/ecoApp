import { Header, Text } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { styles } from './Styles';
import { ScrollView, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const Home = () => {
    return (
        <ScrollView>
            <Header
                containerStyle={styles.headerContainer}
                backgroundColor='#1d1d1d'
                centerComponent={
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <MaterialIcons name='egg' color="#f7bb0e" size={64} />
                        <Text h1 style={[styles.textStyled2, { marginTop: 8 }]}>Eco-Nido</Text>
                    </View>
                }>
            </Header>
            <CardEcoNido />
        </ScrollView>
    );
}

const CardEcoNido = () => {
    return (
        <View style={styles.containerView}>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title style={styles.textStyled3} h3>Empoderando</Card.Title>
                <Card.Image style={{ padding: 0, marginTop: 10, marginBottom: 10 }} source={require("../assets/wallpaper.jpg")} />
                <Card.Divider />
                <Text style={styles.textStyledCardItalic}>
                    "Del Huevo a la Plenitud: Tu Compañero Confiable en la Incubación de Huevos de Gallinas"
                </Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Card.Image style={{ padding: 0, marginTop: 10, marginBottom: 10 }} source={require("../assets/wallpaper2.jpg")} />
                <Card.Divider />
                <Text style={styles.textStyledCardItalic}>
                    "Guiándote desde la Eclosión hasta la Madurez: Acompañándote en la Incubación Exitosa de Huevos de Gallina"
                </Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Card.Image style={{ padding: 0, marginTop: 10, marginBottom: 10 }} source={require("../assets/wallpaper3.jpg")} />
                <Card.Divider />
                <Text style={styles.textStyledCardItalic}>
                    "Desde la Eclosión hasta la Plenitud: Tu Fiel Aliado en el Arte de Incubar Huevos de Gallina"
                </Text>
            </Card>
        </View>
    )
}



