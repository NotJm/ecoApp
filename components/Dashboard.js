import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// React native components
import { Home } from './Home';
import { AboutUs } from './AboutUs';
import { Device } from './Device';
// My components
const Tabs = createMaterialBottomTabNavigator();


export const Dashboard = () => {
    return (
        <Tabs.Navigator
            initialRouteName='Home'
            inactiveColor='#D2A579'
            activeColor='#fff'
            sceneAnimationEnabled={true}
            activeIndicatorStyle={{backgroundColor:'#997148'}}
            barStyle={{ backgroundColor: '#866037' }}
        >
            <Tabs.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color="#F0F0F0" size={26} />
                    ),
                  }}
            />
            <Tabs.Screen
                name='About Us'
                component={AboutUs}
                options={{
                    tabBarLabel: 'About Us',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account-heart" color="#F0F0F0" size={26} />
                    ),
                  }}
            />
            <Tabs.Screen
                name='EcoNido'
                component={Device}
                options={{
                    tabBarLabel: 'EcoNido',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="devices" color="#F0F0F0" size={26} />
                    ),
                  }}
            />
            
        </Tabs.Navigator>
    );
}