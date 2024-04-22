import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { styles } from './Styles';
import { useAuth } from './Auth';

const TemperatureWidget = ({ temperatura, tempColor, state }) => (
    <View style={styles.widgetContainer}>
        <Text style={styles.label}>Temperatura: {state ? "Optima" : "Fuera de Rango"}</Text>
        <CircularProgress
            value={temperatura}
            maxValue={100}
            radius={80}
            activeStrokeWidth={10}
            activeStrokeColor={tempColor}
            duration={1000}
            title={`${temperatura} °C`}
            titleColor={'black'}
            titleStyle={styles.titleProgress}
        />
    </View>
);

const HumidityWidget = ({ humedad, humColor, state }) => (
    <View style={styles.widgetContainer}>
        <Text style={styles.label}>Humedad: {state ? "Optima": "Fuera de Rango"}</Text>
        <CircularProgress
            value={humedad}
            maxValue={100}
            radius={80}
            activeStrokeWidth={10}
            activeStrokeColor={humColor}
            duration={1000}
            title={`${humedad}%`}
            titleColor={'black'}
            titleStyle={styles.titleProgress}
        />
    </View>
);

const AirQualityWidget = ({ mq, quality, nameIcon, colorIcon, mqColor }) => {

    return (
        <View style={styles.widgetContainer}>
            <Text style={styles.label}>Calidad del Aire: {quality}</Text>
            <CircularProgress
                value={mq}
                maxValue={100}
                radius={80}
                activeStrokeWidth={10}
                activeStrokeColor={mqColor}
                duration={1000}
                title={
                    <>
                        <Text style={styles.textStyled}>{mq}</Text>
                        <MaterialIcons name="co2" color="#fff" size={24} />
                    </>
                }
                titleColor={'black'}
                titleStyle={styles.titleProgress}
            />
        </View>
    )
};

export const DeviceMetrics = () => {
    const [temperatureSate, setTemperatureState] = useState(false);
    const [humidityState, setHumidityState] = useState(false);
    const [humColor, setHumColor] = useState('');
    const [tempColor, setTempColor] = useState('');
    const [mqColor, setMqColor] = useState('');
    const [nameIcon, setNameIcon] = useState('');
    const [colorIcon, setColorIcon] = useState('');

    const [sensorData, setSensorData] = useState({
        temperatura: 0,
        humedad: 0,
        mq: 0,
        quality: ""
    });
    const { currentMac } = useAuth();

    useEffect(() => {
        const cargarDatosSensor = async () => {
            try {
                const respuesta = await axios.post('https://ecoserver-zopz.onrender.com/device/sensor', {
                    mac: currentMac
                });

                const { mq, temperatura, humedad } = respuesta.data;

                // Mq conditions
                if (mq >= 0 && mq < 500) {
                    setMqColor("#7CFC00");
                    setNameIcon('check-box');
                    setColorIcon('#7CFC00');
                } else if (mq >= 500 && mq < 800) {
                    setMqColor("#99CC33");
                    setNameIcon('check-box');
                    setColorIcon('#99cc33');
                } else if (mq >= 800 && mq < 1200) {
                    setMqColor("#FFCC00");
                    setNameIcon('info');
                    setColorIcon('##ffcc00');
                } else {
                    setMqColor("#CC3300");
                    setNameIcon('error');
                    setColorIcon('#cc3300');
                }

                // Temperature conditions
                if (temperatura >= 38.3) {
                    setTemperatureState(false);
                    setTempColor("#CC3000");
                } else if (temperatura < 37) {
                    setTemperatureState(true);
                    setTempColor("#7CFC00");
                } else {
                    setTemperatureState(true);
                    setTempColor("#99CC33");
                }

                if (humedad >= 40 && humedad <= 50) {
                    setHumidityState(true);
                    setHumColor("#7CFC00");
                } else {
                    setHumidityState(false);
                    setHumColor("#CC3000");
                }

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
        <ScrollView style={styles.containerView2}>
            <TemperatureWidget temperatura={sensorData.temperatura} tempColor={tempColor} state={temperatureSate}/>
            <HumidityWidget humedad={sensorData.humedad} humColor={humColor} state={humidityState}/>
            <AirQualityWidget mq={sensorData.mq} quality={sensorData.quality} nameIcon={nameIcon} colorIcon={colorIcon} mqColor={mqColor} />
        </ScrollView>
    );
};
