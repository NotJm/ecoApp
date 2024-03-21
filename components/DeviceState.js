import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from './Auth';
import axios from 'axios';  // Importa Axios

// Asume que 'styles' está definido en './Styles'
import { styles } from './Styles';

export const DeviceState = () => {
  const { currentUser } = useAuth();
  const [focoState, setFocoState] = useState(false);
  const [ventiladorState, setVentiladorState] = useState(false);
  const [automatico, setAutomatico] = useState(false);

  const toggleFoco = async () => {
    setFocoState(!focoState);

    // Envía el estado actualizado al servidor con Axios
    await enviarDatosAlServidor(focoState ? 'lightOFF' : 'lightON');
  };

  const toggleVentilador = async () => {
    setVentiladorState(!ventiladorState);

    // Envía el estado actualizado al servidor con Axios
    await enviarDatosAlServidor(ventiladorState ? 'fanOFF' : 'fanON');
  };

  const toggleAutomatic = async () => {
    setAutomatico(!automatico);
    setFocoState(focoState === false ? true : true);
    setVentiladorState(ventiladorState === true ? false : false);
    await enviarDatosAlServidor(automatico ? "automaticDisabled" : "automaticEnable");
  };

  const enviarDatosAlServidor = async (estado) => {
    try {
      const response = await axios.post(
        'https://ecoserver-zopz.onrender.com/mqtt',
        { state: estado },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.status === 200) {
        console.log(`Datos ${estado === 'lightON' ? 'Encendido' : 'Apagado'} enviados al servidor con éxito`);
      } else {
        console.error('Error al enviar datos al servidor:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  const cargarEstados = () => {
    try {
      const { dispositivo } = currentUser;
      axios.post("https://ecoserver-zopz.onrender.com/device/sensor", { mac: dispositivo })
        .then((response) => {
          const { light, fan, automatic } = response.data;

          setFocoState(light || false);
          setVentiladorState(fan || false);
          setAutomatico(automatic || false);
        });
    } catch (err) {
      console.error(err);
    }
  }

  if (currentUser.dispositivo) {
    cargarEstados();
  }

  return (
    <View style={styles.containerState}>
      <View>
        <TouchableOpacity
          style={[styles.button, automatico ? styles.activeButton : null]}
          onPress={toggleAutomatic}
        >
          <Text style={styles.buttonText}>Automatico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, focoState ? styles.activeButton : null]}
          onPress={toggleFoco}
        >
          <Text style={styles.buttonText}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, ventiladorState ? styles.activeButton : null]}
          onPress={toggleVentilador}
        >
          <Text style={styles.buttonText}>Fan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

