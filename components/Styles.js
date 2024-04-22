import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerView: {
        backgroundColor: '#161616'
    },
    containerView2: {
        backgroundColor: '#232323'
    },
    dashboardBackground: {
        backgroundColor: '#866037'
    },
    dashboardText: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold'
    },
    textStyled3: {
        fontFamily: 'Roboto',
        color: '#f7bb0e',
        fontWeight: 'bold'
    },
    textStyled2: {
        fontFamily: 'Roboto',
        color: '#f7bb0e',
        fontWeight: 'bold'
    },
    textStyled: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold'
    },
    textStyledHome: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textStyledMuted: {
        fontFamily: 'Roboto',
        color: '#fff',
        textAlign: 'justify',
        fontWeight: 'bold'
    },
    textStyledCardItalic: {
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    dropdown: {
        backgroundColor: '#866037',
        fontFamily: 'Roboto',
        color: '#fff',
        fontWeight: 'bold'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
    },
    helperText: {
        color: 'white',
        marginBottom: 10,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardContainer: {
        backgroundColor: '#232323',
        borderWidth: 2,
        borderColor: "#fff"

    },
    swiper: {
        height: '100%', // O ajusta la altura según tus necesidades
        margin: 0,
        padding: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        backgroundColor: '#AC8358',
        borderRadius: 2,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    widgetContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#fff"
    },
    containerState: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232323',
    },
    button: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35,
    },
    activeButton: {
        backgroundColor: '#008f39', // Cambia el color cuando está activo
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    titleProgress : {
        fontSize: 18,
        color: "#fff",
    },
    labelSmall : {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#fff"
    }
})
