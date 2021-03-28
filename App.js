import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './screens/UserList';
import UserCreate from './screens/UserCreate';
import UserDetails from './screens/UserDetails';

const Stack = createStackNavigator();

const renderStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="UserList" options={{ title: 'Users' }} component={UserList} />
    <Stack.Screen name="UserCreate" options={{ title: 'Create User' }} component={UserCreate} />
    <Stack.Screen name="UserDetails" options={{ title: 'User Details' }} component={UserDetails} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      {renderStack()}
    </NavigationContainer>
  );
}
