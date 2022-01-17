import React, {useState, FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../Components/Input';
import {handleRegister} from '../Storage/firebase';
import AppButton from '../Components/AppButton';
import ScrollContainer from '../Components/ScrollView';

const Signin: FC = () => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
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
        <Input
          value={confirmPassword}
          onChange={(e: string) => {
            setConfirmPassword(e);
          }}
          password={true}
          placeholder="Confirm"
        />
        <AppButton
          title="Register"
          onPress={() => handleRegister(mail, password, confirmPassword)}
        />
      </View>
    </ScrollContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signin;
