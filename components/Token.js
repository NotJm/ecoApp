import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { styles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SiEgghead } from 'react-icons/si';

export const VerifyToken = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const handleVerifyToken = async () => {
        // Obtener el token almacenado en localStorage
        const storedToken = await AsyncStorage.getItem("token");// Debes reemplazar 'el token almacenado' con la lógica para obtener el token almacenado

        if (storedToken === token) {
            setVerificationResult('Token verificado con éxito');
            showMessage({
                message: 'Éxito',
                description: 'Token verificado con éxito',
                type: 'success',
                duration: 5000,
                onHide: async () => {
                    // Lógica para limpiar el token almacenado
                    await AsyncStorage.clear();
                    navigation.navigate('UpdatePassword');
                }
            });
        } else {
            setVerificationResult('Token no válido');
            showMessage({
                message: 'Error',
                description: 'Token no válido',
                type: 'danger',
            });
        }
    };

    return (
        <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <Text h2 style={styles.textStyledHome}>Verificar Token</Text>
                <View style={styles.container}>
                    <Input
                        label="Ingrese el token:"
                        placeholder="Ingrese el token"
                        value={token}
                        onChangeText={(text) => setToken(text)}
                        inputStyle={styles.textStyled}
                        labelStyle={styles.textStyled}
                    />

                    <Button
                        title="Verificar Token"
                        onPress={handleVerifyToken}
                    />

                    {verificationResult && (
                        <Text style={{ color: verificationResult.includes('éxito') ? 'green' : 'red', marginTop: 10 }}>
                            {verificationResult}
                        </Text>
                    )}
                </View>
            </View>
            <FlashMessage position="bottom" />
        </ImageBackground>
    );
};

