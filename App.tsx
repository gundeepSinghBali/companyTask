/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/Login';
import ListAPI from './src/screens/ListAPI';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import {io} from 'socket.io-client';
import {axios} from 'react-native-axios';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from './src/screens/SignUp';
function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    const socket = io('http://localhost:5000');
    console.log('Socket created');

    socket.on('connect', () => {
      console.log('socket connected');
    });
    // Listen for the 'server-event' from the server
    socket.on('server-event', data => {
      console.log('Received data from the server:', data);
      setData(data);
      console.log(Data);
    });

    // Emit 'client-event' to request data from the server
    socket.emit('client-event', {message: 'Hello from the client!'});

    fetchHomepageData();
  }, []);

  const renderBottomDrawer = () => {
    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="SignUp" component={SignUp} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="List" component={ListAPI} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainAppContainer}>
      {renderBottomDrawer()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
  },
});

export default App;
