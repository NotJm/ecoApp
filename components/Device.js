import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Header, Text } from '@rneui/themed';
import { styles } from './Styles';
import { DeviceState } from './DeviceState';
import { DeviceMetrics } from './DeviceMetrics';
import { useAuth } from './Auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

export const Device = () => {
  const { currentMac } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={styles.headerContainer}
        backgroundColor='#1d1d1d'
        centerComponent={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MaterialIcons name='egg' color="#f7bb0e" size={64} />
            <Text h1 style={[styles.textStyled2, { marginTop: 8 }]}>Eco-Nido</Text>
          </View>
        }>
      </Header>
      {currentMac ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Estado"
            component={DeviceState}
            options={{
              tabBarStyle: {
                backgroundColor: "#1d1d1d",
              },
              tabBarLabelStyle: {
                color: "#fff",
                fontWeight: "bold",
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#f0f0f0",
              },
            }}
          />
          <Tab.Screen
            name="Metricas"
            component={DeviceMetrics}
            options={{
              tabBarStyle: {
                backgroundColor: "#1d1d1d",
              },
              tabBarLabelStyle: {
                color: "#fff",
                fontWeight: "bold",
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#f0f0f0",
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6D5033' }}>
          <Text h2 style={[styles.textStyled, { textAlign: 'center' }]}>
            No tienes dispositivo asignado
          </Text>
        </View>
      )}
    </View>
  );
};
