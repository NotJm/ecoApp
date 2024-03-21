import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Login } from './Login';
import { Catalogo } from './Catalogo';
const Tabs = createMaterialBottomTabNavigator();

export const PreDashboard = () => {
    return (
      <Tabs.Navigator
        initialRouteName='Login'
        inactiveColor='#f7bb03'
        activeColor='#f9d058'
        sceneAnimationEnabled={true}
        activeIndicatorStyle={{ backgroundColor: '#363636' }}
        barStyle={{ backgroundColor: '#1d1d1d' }}
      >
        <Tabs.Screen
          name='Login'
          component={Login}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="origin" color="#f7bb03" size={26} />
            ),
          }}
        />
  
        <Tabs.Screen
          name='Incubadoras'
          component={Catalogo}
          options={{
            tabBarLabel: 'Incubadoras',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="devices" color="#f7bb0e" size={26} />
            ),
          }}
        />
      </Tabs.Navigator>
    )
  }