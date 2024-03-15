import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Header, Text } from '@rneui/themed';
import { styles } from './Styles';
import { DeviceState } from './DeviceState';
import { DeviceMetrics } from './DeviceMetrics';
import { useAuth } from './Auth';

const Tab = createMaterialTopTabNavigator();

export const Device = () => {
  const { currentMac } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={styles.headerContainer}
        backgroundColor='#866037'
        centerComponent={
          <Text h1 style={styles.textStyled}>Eco-Nido</Text>
        }
      />
      {currentMac ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Estado"
            component={DeviceState}
            options={{
              tabBarStyle: {
                backgroundColor: "#997148",
              },
              tabBarLabelStyle: {
                color: "#fff",
                fontWeight: "bold",
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#D2A579",
              },
            }}
          />
          <Tab.Screen
            name="Metricas"
            component={DeviceMetrics}
            options={{
              tabBarStyle: {
                backgroundColor: "#997148",
              },
              tabBarLabelStyle: {
                color: "#fff",
                fontWeight: "bold",
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#D2A579",
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
