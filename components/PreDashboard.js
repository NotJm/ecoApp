import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Login } from './Login';
const Tabs = createMaterialBottomTabNavigator();

export const PreDashboard = () => {
    return (
      <Tabs.Navigator
        initialRouteName='Login'
        inactiveColor='#e5e5e5'
        activeColor='#000'
        sceneAnimationEnabled={true}
        activeIndicatorStyle={{ backgroundColor: '#edeaea' }}
        barStyle={{ backgroundColor: '#dddcdc' }}
      >
        <Tabs.Screen
          name='Login'
          component={Login}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="origin" color="#000" size={26} />
            ),
          }}
        />
  
        {/* <Tabs.Screen
          name='Incubadoras'
          component={Catalogo}
          options={{
            tabBarLabel: 'Incubadoras',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="device" color="#000" size={26} />
            ),
          }}
        /> */}
      </Tabs.Navigator>
    )
  }