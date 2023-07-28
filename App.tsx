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

import {NavigationContainer} from '@react-navigation/native';
import SignUp from './src/screens/SignUp';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    const socket = io('http://10.0.2.2:5000');
    console.log('Socket created');

    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('data', data => {
      console.log('data is triggered ');
      setData(data);
    });
    // Listen for the 'server-event' from the server
    socket.on('server-event', data => {
      console.log('Received data from the server:', data);
      setData(data);
    });

    // Emit 'client-event' to request data from the server
    socket.emit('client-event', {message: 'Hello from the client!'});
  }, []);

  const renderBottomDrawer = () => {
    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login">
            {props => <Login {...props} setLogin={setIsLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen name="SignUp" component={SignUp} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="List">
              {props => <ListAPI {...props} data={Data} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  };

  const printData = () => {
    for (const obj of Data) {
      console.log(obj);
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

type LoginProps = PropsWithChildren<{
  setLogin: (value: boolean) => void;
}>;

export default App;
