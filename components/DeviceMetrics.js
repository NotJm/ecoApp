import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';
import { styles } from './Styles';
import { useAuth } from './Auth';

const TemperatureWidget = ({ temperatura }) => (
    <View style={styles.widgetContainer}>
        <Text style={styles.label}>Temperatura</Text>
        <CircularProgress
            value={temperatura}
            maxValue={100}
            radius={80}
            activeStrokeWidth={10}
            activeStrokeColor={'green'}
            duration={1000}
            title={`${temperatura} °C`}
            titleColor={'black'}
            titleStyle={styles.titleProgress}
        />
    </View>
);

const HumidityWidget = ({ humedad }) => (
    <View style={styles.widgetContainer}>
        <Text style={styles.label}>Humedad</Text>
        <CircularProgress
            value={humedad}
            maxValue={100}
            radius={80}
            activeStrokeWidth={10}
            activeStrokeColor={'blue'}
            duration={1000}
            title={`${humedad}%`}
            titleColor={'black'}
            titleStyle={styles.titleProgress}
        />
    </View>
);

const AirQualityWidget = ({ mq }) => (
    <View style={styles.widgetContainer}>
        <Text style={styles.label}>Calidad del Aire</Text>
        <CircularProgress
            value={mq}
            maxValue={100}
            radius={80}
            activeStrokeWidth={10}
            activeStrokeColor={'red'}
            duration={1000}
            title={`${mq} mq`}
            titleColor={'black'}
            titleStyle={styles.titleProgress}
        />
    </View>
);

export const DeviceMetrics = () => {
    const [sensorData, setSensorData] = useState({
        temperatura: 0,
        humedad: 0,
        mq: 0
    });
    const { currentMac } = useAuth();

    useEffect(() => {
        const cargarDatosSensor = async () => {
            try {
                const respuesta = await axios.post('https://ecoserver-zopz.onrender.com/device/sensor', {
                    mac: currentMac // Ajusta con el nombre de tu sensor específico
                });
                setSensorData(respuesta.data);
             } catch (error) {
                console.error('Error al obtener datos del sensor:', error.message);
                console.error('Error detallado:', error.response ? error.response.data : 'No hay respuesta del servidor');
            }
        };

        // Cargar datos iniciales
        cargarDatosSensor();

        // Establecer intervalo para actualizar los datos cada 1000 ms (1 segundo)
        const intervalId = setInterval(() => {
            cargarDatosSensor();
        }, 1000);

        // Limpiar intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ScrollView style={styles.containerView}>
            <TemperatureWidget temperatura={sensorData.temperatura} />
            <HumidityWidget humedad={sensorData.humedad} />
            <AirQualityWidget mq={sensorData.mq} />
        </ScrollView>
    );
};
