import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import axios from 'axios';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';

export const ForgotPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        // Verificar si el correo electrónico ya está registrado
        try {
            const emailCheckResponse = await axios.post('https://ecoserver-zopz.onrender.com/userEmail', { email });

            if (emailCheckResponse.status === 200) {
                const { exists } = emailCheckResponse.data;

                if (exists) {
                    // El correo electrónico existe, proceder a enviar el enlace de recuperación
                    const emailResponse = await axios.post('https://ecoserver-zopz.onrender.com/email', { email });

                    if (emailResponse.status === 200) {
                        const result = emailResponse.data;
                        const { status, error, token } = result;
                        if (status) {
                            showMessage({
                                message: 'Recuperación de Contraseña',
                                description: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
                                type: 'success',
                                duration: 5000,
                                onHide: async () => {
                                    await AsyncStorage.setItem('token', token);
                                    navigation.navigate('VerifyToken');
                                },
                            });

                        } else {
                            showMessage({
                                message: 'Error',
                                description: error || 'No se pudo procesar la solicitud. Verifica la dirección de correo electrónico.',
                                type: 'danger',
                                duration: 5000,
                            });
                        }
                    } else {
                        console.error('Error al procesar la solicitud de correo electrónico:', emailResponse);
                    }
                } else {
                    // El correo electrónico no existe
                    showMessage({
                        message: 'Error',
                        description: 'El correo electrónico no está registrado en la página.',
                        type: 'danger',
                        duration: 5000,
                    });
                }
            } else {
                console.error('Error al verificar el correo electrónico:', emailCheckResponse);
            }
        } catch (error) {
            console.error('Error al realizar la verificación:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <Text h2 style={styles.textStyledHome}>Recuperar Contraseña</Text>
                <View style={styles.container}>
                    <Input
                        label="Correo Electrónico"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        inputStyle={styles.textStyled}
                        labelStyle={styles.textStyled}
                    />

                    <Button
                        title="Enviar Enlace de Recuperación"
                        onPress={handleSubmit}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.textStyled, { textDecorationLine: 'underline', marginTop: 10 }]}>
                            Volver a inicio de sesion
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlashMessage position="bottom" />
        </ImageBackground>
    );
};


