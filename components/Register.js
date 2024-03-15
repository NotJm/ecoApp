import React, { useState } from 'react';
import { ImageBackground, View } from "react-native";
import { Input, Button, Text } from '@rneui/themed';
import { styles } from "./Styles";
import md5 from 'md5';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import axios from 'axios';

export const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      showMessage({
        message: "Las contraseñas no coinciden",
        type: "danger",
      });
      return;
    }

    // Construir el objeto de datos a enviar
    const data = {
      username: username,
      password: md5(password),
      email: email,
      dispositivo: "",
      domicilio: {
        estado: "",
        municipio: "",
        colonia: "",
        codigoPosta: "",
        telefono: ""
      },
      permisos: false
    };

    try {
      const response = await axios.post('https://ecoserver-zopz.onrender.com/user', data);

      if (response.status === 200) {
        showMessage({
          message: "Registro exitoso",
          description: `¡Bienvenido a Eco-Nido, ${username}!`,
          type: "success",
        });
        navigation.navigate("Login");
      } else {
        showMessage({
          message: "Error en el registro",
          description: "Usuario ya existe o información incorrecta.",
          type: "danger",
        });
        console.error('Error en la solicitud:', response.statusText);
        console.log('Contenido de la respuesta:', response.data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

      showMessage({
        message: "Error",
        description: "Hubo un error al intentar registrarse. Por favor, inténtalo nuevamente.",
        type: "danger",
      });
    }
  };


  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text h2 style={styles.textStyled}>Eco-Nido</Text>
        <View style={styles.container}>
          <Input
            label="Nombre de usuario"
            placeholder="Ingrese el nombre de usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Input
            label="Correo electrónico"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Input
            label="Confirmar contraseña"
            placeholder="Confirma tu contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Button title="Registrarse" onPress={handleRegister} />
          <Text style={styles.textStyled}>
            ¿Ya tienes una cuenta?{' '}
            <Text
              style={{ color: '#fff', textDecorationLine: 'underline' }}
              onPress={() => navigation.navigate("Login")}
            >
              Inicia sesión aquí
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
