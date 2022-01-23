/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {
  mergeLocal,
  getLocalItem,
  editNestedDeck,
  deleteNestedDeck,
} from '../Storage/asyncStorage';
import AddButton from '../Components/AddButton';
import Input from '../Components/Input';
import ScrollContainer from '../Components/ScrollView';
import {COLORS} from '../Utils/constants';
import UserContext from '../Utils/UserContext';
import {TextInput} from 'react-native-gesture-handler';
import {confirmDialog, editDeleteDialog} from '../Components/confirmDialog';

const Decks = ({navigation}: any) => {
  const [deck, setDeck] = useState<string>('');
  const [decks, setDecks] = useState<string>('');
  const {setDocument, user} = useContext(UserContext);

  const handleCreateDeck = (e: string) => {
    setDeck(e);
  };

  const handleClickDeck = () => {
    navigation.navigate('TrainingRoom');
  };

  const handleAddButton = () => {
    deck.length > 0 && setDocument(deck);
    deck.length > 0 &&
      mergeLocal(
        'DECKS' + '/' + user.uid,
        JSON.stringify({[user.uid + deck]: deck}),
      );
    navigation.navigate('TrainingRoom');
    setDeck('');
    getLocalItem('DECKS' + '/' + user.uid, setDecks);
  };

  useEffect(() => {
    user && getLocalItem('DECKS' + '/' + user.uid, setDecks);
  }, [user]);

  const [inputArray, setInputArray] = useState<boolean[]>([false]);
  const handleEditDeck = async (
    deckCode: string,
    key: number,
    name: string,
  ) => {
    const editDeck = async () => {
      const newInputs = [...inputArray];
      newInputs[key] = true;
      setInputArray(newInputs);
    };
    const deleteDeck = async () => {
      await deleteNestedDeck('DECKS' + '/' + user.uid, deckCode);
      await getLocalItem('DECKS' + '/' + user.uid, setDecks);
    };

    const confirmDelete = () => {
      confirmDialog(deleteDeck, `Do you really want to delete ${name} deck?`);
    };
    editDeleteDialog(
      editDeck,
      'You can edit or delete this deck',
      confirmDelete,
    );
  };

  const [newDeckName, setNewDeckName] = useState('');

  const onSetNewDeckName = async (deckCode: string, oldName: string) => {
    if (newDeckName.length > 0) {
      setInputArray([false]);
      await editNestedDeck(
        'DECKS' + '/' + user.uid,
        deckCode,
        newDeckName,
        oldName,
      );
      await getLocalItem('DECKS' + '/' + user.uid, setDecks);
      setNewDeckName('');
      console.log(oldName);
    } else {
      Alert.alert('Cannot be empty');
    }
  };

  const ShowDecks = () => {
    if (decks) {
      const parsedDecks = JSON.parse(decks);
      return Object.keys(parsedDecks).map((d, key) => {
        if (parsedDecks[d]) {
          return (
            <View key={d} style={styles.decks}>
              {inputArray[key] ? (
                <View>
                  <TextInput
                    onChangeText={e => setNewDeckName(e)}
                    placeholder={parsedDecks[d]}
                    style={{backgroundColor: COLORS.grey}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Button
                      title="set"
                      onPress={() => onSetNewDeckName(d, parsedDecks[d])}
                      color={COLORS.blue}
                    />
                    <Button
                      title="cancel"
                      onPress={() => {
                        setInputArray([false]);
                      }}
                      color={COLORS.blue}
                    />
                  </View>
                </View>
              ) : (
                <Text
                  style={{fontSize: 40, color: 'white', textAlign: 'center'}}
                  onPress={() => {
                    handleClickDeck();
                    setDocument(parsedDecks[d]);
                  }}
                  onLongPress={() => {
                    handleEditDeck(d, key, parsedDecks[d]);
                  }}>
                  {parsedDecks[d]}
                </Text>
              )}
            </View>
          );
        }
      });
    } else {
      return <Text />;
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.main}>
        <View style={styles.input}>
          <Input
            value={deck}
            onChange={handleCreateDeck}
            placeholder="New Deck"
          />
          <View style={styles.add}>
            <AddButton onPress={handleAddButton} />
          </View>
        </View>
        <View>{ShowDecks()}</View>
      </View>
    </ScrollContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  add: {
    alignSelf: 'flex-end',
  },
  decks: {
    alignSelf: 'center',
    backgroundColor: COLORS.blue,
    width: 250,
    flex: 1,
    flexDirection: 'column',
    borderColor: COLORS.grey,
    borderRightWidth: 2,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 2,
    borderRadius: 1,
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default Decks;
