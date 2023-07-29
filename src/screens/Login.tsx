import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  InputHTMLAttributes,
} from 'react';
import {UserContext} from '../../App';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {io} from 'socket.io-client';

type Person = {
  email: string;
  password: string;
};

function Login() {
  const {setIsLoggedIn, isLoggedIn, getSocket} = useContext(UserContext);
  const [isSendLoginData, setIsSendLoginData] = useState<Function>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendLoginData = (data: Person) => {
    getSocket.emit('sendLoginData', data, () => {
      console.log('sent this data', data);
    });
  };

  useEffect(() => {}, [getSocket]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Login pressed')}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            console.log('Login Pressed');
            const user: Person = {
              email: email,
              password: password,
            };
            sendLoginData(user);
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('pressed');
        }}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            setIsLoggedIn(true);
          }}>
          Sign As Guest
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
