import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {saveToLocal} from './asyncStorage';

export const cloudStorage = firebase.firestore().collection('anki').doc('test');
export const saveToCloud = (
  key: string,
  user: string,
  folder: string,
  val: object,
) => {
  firebase
    .firestore()
    .collection(user)
    .doc(folder)
    .set(val, {merge: true})
    .catch(e => {
      console.log(e);
    });

  const kanjiValue = JSON.stringify(val);
  saveToLocal(key, kanjiValue);
  //getLocalData();
};

const auth = firebase.auth();
export const handleRegister = (
  name: string,
  pass: string,
  confirmPass: string,
) => {
  if (pass && name && pass === confirmPass) {
    auth
      .createUserWithEmailAndPassword(name, pass)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  } else {
    Alert.alert('Please confirm your password');
  }
};

export const signIn = async (
  email: string,
  pass: string,
  setUser: (o: object) => void,
) => {
  await auth
    .signInWithEmailAndPassword(email, pass)
    .then(userCredential => {
      var e = userCredential.user;
      setUser(e);
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      Alert.alert('Wrong crendentials');
    });
};

export const onAuthChange = (
  isLogged: (b: boolean) => void,
  setUid: (o: object) => void,
) => {
  auth.onAuthStateChanged(u => {
    if (u) {
      isLogged(true);
      setUid(u);
    } else {
      isLogged(false);
    }
  });
};

export const signOut = () => {
  auth
    .signOut()
    .then(function () {
      console.log('LOGGED OUT');
    })
    .catch(function (error) {
      console.log('ERROR LOGGING OUT', error);
    });
};
