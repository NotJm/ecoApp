import React, { useState } from 'react';
import { ImageBackground, View } from "react-native";
import { Input, Button, Text } from '@rneui/themed';
import { styles } from "./Styles";
import md5 from 'md5';
import { showMessage } from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showQuestion, setShowQuestion] = useState(false); // Estado para mostrar la pregunta secreta

  const handleRegister = async () => {
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      showMessage({
        message: "Las contraseñas no coinciden",
        type: "danger",
      });
      return;
    }

    // Validar la contraseña
    if (!validatePassword(password)) {
      showMessage({
        message: "Contraseña no segura",
        description: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial. Además, debe tener al menos 8 caracteres.",
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
        // Mostrar la pregunta secreta
        setShowQuestion(true);
        // Mostrar mensaje de éxito
        showMessage({
          message: "Registro exitoso",
          description: `¡Bienvenido a Eco-Nido, ${username}!`,
          type: "success",
        });
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

  const validatePassword = (password) => {
    // Use regex to enforce password criteria
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;
    return regex.test(password);
  };

  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text h2 style={styles.textStyled}>Eco-Nido</Text>
        <View style={styles.container}>
          <Input
            label="Nombre de usuario"
            leftIcon={<MaterialCommunityIcons name='account' color="#f0f0f0" size={32} />}
            placeholder="Ingrese el nombre de usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Input
            label="Correo electrónico"
            leftIcon={<MaterialIcons name='email' color="#f0f0f0" size={32} />}
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Input
            label="Contraseña"
            leftIcon={<MaterialIcons name='lock' color="#f0f0f0" size={32} />}
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
            leftIcon={<MaterialIcons name='lock' color="#f0f0f0" size={32} />}
            placeholder="Confirma tu contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.textStyled}
            inputStyle={{ color: '#fff' }}
            labelStyle={styles.textStyled}
          />
          <Button color="#ab8202" onPress={handleRegister}>
          <MaterialIcons name='assignment-ind' color="#f0f0f0" size={26} />
            Registrarse
          </Button>
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
