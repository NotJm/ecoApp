import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import axios from 'axios';
import md5 from 'md5';
import { useNavigation } from '@react-navigation/native'; // Asegúrate de importar esto
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { styles } from './Styles';

export const UpdatePassword = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      showMessage({
        message: 'Error',
        description: 'Las contraseñas no coinciden. Por favor, verifica las contraseñas.',
        type: 'danger',
        duration: 5000,
      });
      return;
    }

    // Construir el objeto de datos a enviar
    const data = {
      username: username,
      newPassword: md5(newPassword),
    };

    try {
      // Hacer la solicitud al servidor para actualizar la contraseña
      const response = await axios.post('https://ecoserver-zopz.onrender.com/updatePassword', data);

      // Verificar si la solicitud fue exitosa
      if (response.data.success) {
        // Realizar acciones según la respuesta del servidor
        showMessage({
          message: 'Contraseña Actualizada',
          description: 'La contraseña se ha actualizado exitosamente.',
          type: 'success',
          duration: 5000,
          onHide: () => {
            navigation.navigate('Login');
          },
        });
      } else {
        showMessage({
          message: 'Error',
          description: 'Usuario no encontrado. Verifica el nombre de usuario.',
          type: 'danger',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text h2 style={styles.textStyledHome}>Cambiar Contraseña</Text>
        <View style={styles.container}>
          <Input
            label="Nombre de Usuario"
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            inputStyle={styles.textStyled}
            labelStyle={styles.textStyled}
          />

          <Input
            label="Nueva Contraseña"
            placeholder="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            inputStyle={styles.textStyled}
            labelStyle={styles.textStyled}
          />

          <Input
            label="Confirmar Contraseña"
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            inputStyle={styles.textStyled}
            labelStyle={styles.textStyled}
          />

          <Button
            title="Cambiar Contraseña"
            onPress={handleSubmit}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Volver al Inicio de sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage position="bottom" />
    </ImageBackground>
  );
};

