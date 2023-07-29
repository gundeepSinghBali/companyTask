/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect, useContext, createContext} from 'react';
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
export type SocketType = Socket | null;
import {NavigationContainer} from '@react-navigation/native';
import SignUp from './src/screens/SignUp';
export const UserContext = createContext('Default');
function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Data, setData] = useState([{}]);
  const [getSocket, setSocket] = useState<SocketType>(null);

  useEffect(() => {
    const socket = io('http://10.0.2.2:5000');
    console.log('Socket created');

    setSocket(socket);
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

    socket.on('isLoginValid', data => {
      console.log(data);
    });

    socket.on('allowLogin', () => {
      console.log('access allowed');
      setIsLoggedIn(true);
    });

    // Emit 'client-event' to request data from the server
    socket.emit('client-event', {message: 'Hello from the client!'});
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
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, getSocket}}>
      <SafeAreaView style={styles.mainAppContainer}>
        {renderBottomDrawer()}
      </SafeAreaView>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
  },
});

export default App;
