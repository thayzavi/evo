import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import LocaisScreen from './Screens/LocaisScreen';

const Tab =  createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Chat') {
              iconName = 'chat';
            } else if (route.name == 'Locais') {
              iconName = 'place';
            }
             return <MaterialIcons name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Bem-Vindo'}}/>
          <Tab.Screen name="Chat" component={ChatScreen} options={{title: 'Chat com Evo'}}/>
          <Tab.Screen name="Locais" component={LocaisScreen} options={{title: 'Locais de Apoio'}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
} 

