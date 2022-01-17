import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TrainingRoom from './Pages/TrainingRoom';
import Login from './Pages/Login';
import Decks from './Pages/Decks';
import Signin from './Pages/Signin';
import {onAuthChange} from './Storage/firebase';
import UserContext from './Utils/UserContext';
import {COLORS} from './Utils/constants';
import HamburguerMenu from './Components/Menu';
import {instructionsDecks, instructionsTraining} from './Utils/messages';

const Stack = createStackNavigator();
const App = () => {
  const [isAuth, setIsAuth] = useState<string>();
  const [user, setUser] = useState<object>();
  const [logging, setLogging] = useState<boolean | null>(null);
  const [document, setDocument] = useState<string>('Default');

  useEffect(() => {
    onAuthChange(setLogging, setUser);
  }, [isAuth]);

  return (
    <NavigationContainer>
      <UserContext.Provider
        value={{isAuth, setIsAuth, user, document, setDocument}}>
        <Stack.Navigator initialRouteName="Login">
          {logging ? (
            <>
              <Stack.Screen
                name="Decks"
                component={Decks}
                options={{
                  headerStyle: {backgroundColor: COLORS.blue},
                  headerTintColor: 'white',
                  title: 'Decks',
                  headerRight: () => (
                    <HamburguerMenu message={instructionsDecks} />
                  ),
                }}
              />
              <Stack.Screen
                name="TrainingRoom"
                component={TrainingRoom}
                options={{
                  headerStyle: {backgroundColor: COLORS.blue},
                  headerTintColor: 'white',
                  title: 'Training Room',
                  headerRight: () => (
                    <HamburguerMenu message={instructionsTraining} />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: 'Login',
                  animationTypeForReplace: user ? 'pop' : 'push',
                  headerStyle: {backgroundColor: COLORS.blue},
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{
                  headerStyle: {backgroundColor: COLORS.blue},
                  title: 'Register',
                  headerTintColor: 'white',
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
