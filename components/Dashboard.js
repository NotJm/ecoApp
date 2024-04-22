import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// React native components
import { Home } from './Home';
import { AboutUs } from './AboutUs';
import { Device } from './Device';
import { Catalogo } from './Catalogo';
// My components
const Tabs = createMaterialBottomTabNavigator();


export const Dashboard = () => {
    return (
        <Tabs.Navigator
            initialRouteName='Home'
            inactiveColor='#f7bb0e'
            activeColor='#f9d058'
            sceneAnimationEnabled
            activeIndicatorStyle={{backgroundColor:'#363636'}}
            barStyle={{ backgroundColor: '#1d1d1d' }}
        >
            <Tabs.Screen
                name='Inicio'
                component={Home}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color="#f7bb0e" size={26} />
                    ),
                  }}
            />
            <Tabs.Screen
                name='Quienes somos'
                component={AboutUs}
                options={{
                    tabBarLabel: 'Quienes somos',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account-heart" color="#f7bb0e" size={26} />
                    ),
                  }}
            />
            <Tabs.Screen
                name='Incubadoras'
                component={Catalogo}
                options={{
                    tabBarLabel: 'Incubadoras',
                    tabBarIcon: ({ color }) => (
                      <MaterialIcons name="shopping-cart" color="#f7bb0e" size={26} />
                    ),
                  }}
            />
            <Tabs.Screen
                name='EcoNido'
                component={Device}
                options={{
                    tabBarLabel: 'EcoNido',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="devices" color="#f7bb0e" size={26} />
                    ),
                  }}
            />
            
        </Tabs.Navigator>
    );
}