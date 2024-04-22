import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from './Auth';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { styles } from './Styles';

export const DeviceState = () => {
  const { currentMac } = useAuth();
  const [focoState, setFocoState] = useState(false);
  const [ventiladorState, setVentiladorState] = useState(false);
  const [automatico, setAutomatico] = useState(false);

  useEffect(() => {
    if (currentMac) {
      cargarEstados();
    }
  }, [currentMac])

  const toggleFoco = async () => {
    if (automatico) {
      showMessage({
        message: 'Automatico Activado',
        description: 'Actualmente se encuentra en modo automatico, si desea controlar el foco deshabilite el automatico',
        type: 'danger',
      });
      return;
    }
    setFocoState(!focoState);

    // Envía el estado actualizado al servidor con Axios
    await enviarDatosAlServidor(focoState ? 'lightOFF' : 'lightON');
  };

  const toggleVentilador = async () => {
    if (automatico) {
      showMessage({
        message: 'Automatico Activado',
        description: 'Actualmente se encuentra en modo automatico, si desea controlar el ventilador deshabilite el automatico',
        type: 'danger',
      });
      return;
    }
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

      if (response.status === 200) {
        console.log(`Datos ${estado} enviados al servidor con éxito`);
      } else {
        console.error('Error al enviar datos al servidor:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  const cargarEstados = () => {
    try {
      axios.post("https://ecoserver-zopz.onrender.com/device/sensor", { mac: currentMac })
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

