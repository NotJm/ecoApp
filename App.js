import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from './components/Dashboard';
import { AuthProvider } from './components/Auth';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { VerifyToken } from './components/Token';
import { UpdatePassword } from './components/UpdatePassword';
import { PreDashboard } from './components/PreDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="DashboardLogin" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DashboardLogin" component={PreDashboard} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="VerifyToken" component={VerifyToken} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

