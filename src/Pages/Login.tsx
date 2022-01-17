import React, {useState, useContext} from 'react';
import {Text, Alert, StyleSheet, View} from 'react-native';
import Input from '../Components/Input';
import AppButton from '../Components/AppButton';
import ScrollContainer from '../Components/ScrollView';
import {signIn} from '../Storage/firebase';
import {COLORS} from '../Utils/constants';
import UserContext from '../Utils/UserContext';

const Login = ({navigation}: any) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {isAuth, setIsAuth} = useContext(UserContext);

  const handleSignIn = async (m: string, p: string) => {
    if (mail.length > 0 && password.length > 0) {
      await signIn(m, p, setIsAuth).then(e => {
        console.log('USERID', e, isAuth);
      });
    } else {
      Alert.alert('Please check your credentials');
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.main}>
        <Input
          value={mail}
          onChange={(e: string) => {
            setMail(e);
          }}
          placeholder="Mail"
        />
        <Input
          value={password}
          onChange={(e: string) => {
            setPassword(e);
          }}
          password={true}
          placeholder="Password"
        />
        <AppButton title="Login" onPress={() => handleSignIn(mail, password)} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Don't have an account? Please </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate('Signin')}>
              register.
            </Text>
          </View>
        </View>
      </View>
    </ScrollContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.orange,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  text: {
    color: 'white',
  },
  textContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Login;
