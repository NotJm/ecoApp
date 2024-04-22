import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { styles } from './Styles';
import axios from 'axios';
import md5 from 'md5';
import { showMessage } from 'react-native-flash-message';
import { useAuth } from './Auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Login = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      showMessage({
        message: 'Advertencia',
        description: 'Por favor, ingresa tu nombre de usuario y contraseña.',
        type: 'warning',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://ecoserver-zopz.onrender.com/user/login',
        {
          username: username,
          password: md5(password),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      );

      const { status, permisos, dispositivo } = response.data;

      if (status) {
        showMessage({
          message: 'Éxito',
          description: 'Inicio de sesión exitoso.',
          type: 'success',
        });
        login({ username: username, permisos: permisos }, dispositivo);
        navigation.navigate('Dashboard');
      } else {
        showMessage({
          message: 'Error',
          description: 'Usuario o contraseña incorrecta.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error en Axios:', error);
      showMessage({
        message: 'Error',
        description: 'Hubo un error al intentar iniciar sesión.',
        type: 'danger',
      });
    }
  };

  return (
    <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text h2 style={styles.textStyledHome}>Eco-Nido</Text>
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
          <Text style={styles.helperText}>Nunca compartas tu nombre de usuario y contraseña con nadie</Text>
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
          <Button color="#ab8202" onPress={handleLogin} >
            <MaterialCommunityIcons name='login' color="#f0f0f0" size={26} />
            Iniciar Sesion
          </Button>
          <Text style={styles.textStyled}>
            ¿No tienes una cuenta?{' '}
            <Text
              style={{ color: '#fff', textDecorationLine: 'underline' }}
              onPress={() => navigation.navigate('Register')}>
              Regístrate aquí
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

