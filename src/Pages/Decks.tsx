/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  mergeLocal,
  getLocalItem,
  deleteNestedDeck,
} from '../Storage/asyncStorage';
import AddButton from '../Components/AddButton';
import Input from '../Components/Input';
import ScrollContainer from '../Components/ScrollView';
import confirmDialog from '../Components/confirmDialog';
import {COLORS} from '../Utils/constants';
import UserContext from '../Utils/UserContext';

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

  const handleDeleteDeck = async (deckCode: string, deckName: string) => {
    const deleteDeck = async () => {
      await deleteNestedDeck('DECKS' + '/' + user.uid, deckCode);
      await getLocalItem('DECKS' + '/' + user.uid, setDecks);
    };
    confirmDialog(deleteDeck, `Do you want to delete ${deckName} deck?`);
  };

  const ShowDecks = () => {
    if (decks) {
      const parsedDecks = JSON.parse(decks);
      return Object.keys(parsedDecks).map(d => {
        if (parsedDecks[d]) {
          return (
            <View key={d} style={styles.decks}>
              <Text
                style={{fontSize: 40, color: 'white', textAlign: 'center'}}
                onPress={() => {
                  handleClickDeck();
                  setDocument(parsedDecks[d]);
                }}
                onLongPress={() => handleDeleteDeck(d, parsedDecks[d])}>
                {parsedDecks[d]}
              </Text>
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

        <View style={styles.logout}></View>
      </View>
    </ScrollContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  logout: {
    alignSelf: 'flex-end',
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
