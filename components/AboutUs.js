import { Button, Header, Text } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { styles } from './Styles';
import { Image, ScrollView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const AboutUs = () => {
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
            <CardAbout />
            <ContactCard />
        </ScrollView>
    );
}

const CardAbout = () => {
    return (
        <View style={styles.containerView}>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title style={styles.textStyled3} h3>Sobre nosotros</Card.Title>
                <Card.Image style={{ padding: 0, marginTop: 10, marginBottom: 10 }} source={require("../assets/wallpaper.jpg")} />
                <Card.Divider />
                <Text style={styles.textStyledMuted}>
                    En Eco-Nido, creemos en la importancia de preservar y fomentar la vida desde su origen más temprano. Nuestra misión es brindar a los clientes herramientas de vanguardia que les permitan participar activamente en el proceso de incubación, ya sea con fines comerciales, educativos o simplemente por el placer de observar el milagro de la vida.
                </Text>
            </Card>

        </View>
    )
}

const ContactCard = () => {
    return (
        <View style={styles.containerView}>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title style={styles.textStyled3}>
                    <MaterialCommunityIcons name="email" size={24} color="white" />
                    {'  '}
                    Contactanos
                </Card.Title>
                <Card.Divider />
                <Text style={styles.textStyled}>
                    Estamos aquí para responder a tus preguntas y atender tus necesidades. No dudes en contactarnos a través de los siguientes canales:
                </Text>
                <Text style={styles.textStyled}>
                    <MaterialCommunityIcons name="email" size={18} color="white" /> {'  '}
                    Correo Electrónico: info@eco-nido.com
                </Text>
                <Text style={styles.textStyled}>
                    <MaterialCommunityIcons name="phone" size={18} color="white" /> {'  '}
                    Teléfono: +123 456 7890
                    {'\n'}
                    
                </Text>
            </Card>
        </View>
    )
}

const SocialMediaCard = () => {
    return (
        <View style={styles.containerView}>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title style={styles.textStyled}>
                    <MaterialCommunityIcons name="facebook" size={24} color="black" />
                    {'  '}
                    Facebook
                </Card.Title>
                <Card.Divider />
                <Text style={styles.textStyled}>
                    ¡Síguenos en Facebook para obtener actualizaciones, eventos y contenido exclusivo!
                </Text>
                <Text style={[styles.textStyled, { textDecorationLine: 'underline' }]}>
                    Facebook: @EcoNidoOficial
                </Text>

                <Card.Divider />

                <Card.Title style={styles.textStyled}>
                    <MaterialCommunityIcons name="instagram" size={24} color="black" />
                    {'  '}
                    Instagram
                </Card.Title>
                <Card.Divider />
                <Text style={styles.textStyled}>
                    ¡Conéctate con nosotros en Instagram para fotos inspiradoras y noticias emocionantes!
                </Text>
                <Text style={[styles.textStyled, { textDecorationLine: 'underline' }]}>
                    Instagram: @eco_nido_oficial
                </Text>

                <Card.Divider />

                <Card.Title style={styles.textStyled}>
                    <MaterialCommunityIcons name="youtube" size={24} color="black" />
                    {'  '}
                    YouTube
                </Card.Title>
                <Card.Divider />
                <Text style={styles.textStyled}>
                    ¡Suscríbete a nuestro canal de YouTube para tutoriales, videos informativos y más!
                </Text>
                <Text style={[styles.textStyled, { textDecorationLine: 'underline' }]}>
                    YouTube: EcoNidoOficial
                </Text>

                <Card.Divider />

                <Card.Title style={styles.textStyled}>
                    <MaterialCommunityIcons name="github" size={24} color="black" />
                    {'  '}
                    GitHub
                </Card.Title>
                <Card.Divider />
                <Text style={styles.textStyled}>
                    ¡Explora nuestro código fuente y contribuye en GitHub para hacer crecer la comunidad!
                </Text>
                <Text style={[styles.textStyled, { textDecorationLine: 'underline' }]}>
                    GitHub: EcoNido
                </Text>
            </Card>
        </View>
    );
};