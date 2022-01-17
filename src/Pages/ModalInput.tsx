import React, {useState, useContext} from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import {saveToCloud} from '../Storage/firebase';
import Input from '../Components/Input';
import UserContext from '../Utils/UserContext';
import AddButton from '../Components/AddButton';
import ScrollContainer from '../Components/ScrollView';
import {COLORS} from '../Utils/constants';

interface ModalInput {
  id: 0;
  kanji: string;
  reading: string;
  meaning: string;
  anki: number;
}

const ModalInput = (Props: {setModal: (val: boolean) => void}) => {
  const [kanji, setkanki] = useState<ModalInput>({
    id: 0,
    kanji: '',
    reading: '',
    meaning: '',
    anki: 100,
  });
  const {user, document} = useContext(UserContext);

  const handleAddKanji = () => {
    if (kanji.kanji && kanji.reading && kanji.meaning) {
      const randomKey =
        String(Math.random() + ' ').substring(2, 10) +
        (Math.random() + ' ').substring(2, 10);

      saveToCloud(
        user.uid + '/' + document + '/' + randomKey,
        user.uid,
        document,
        {
          [randomKey]: {
            kanji: kanji.kanji,
            reading: kanji.reading,
            meaning: kanji.meaning,
          },
        },
      );
      Props.setModal(false);
    } else Alert.alert('Kanji, hiragana and meaning cannot be empty');
  };
  return (
    <ScrollContainer>
      <View style={styles.main}>
        <Input
          placeholder="漢字"
          value={kanji.kanji}
          onChange={(e: string) => {
            setkanki({...kanji, kanji: e});
          }}
        />
        <Input
          placeholder="ひらがな"
          value={kanji.reading}
          onChange={(e: string) => {
            setkanki({...kanji, reading: e});
          }}
        />
        <Input
          placeholder="Meaning"
          value={kanji.meaning}
          onChange={(e: string) => {
            setkanki({...kanji, meaning: e});
          }}
        />
        <View style={styles.addButton}>
          <AddButton onPress={handleAddKanji} />
        </View>
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            bottom: 0,
          }}>
          <Button
            title="Close"
            onPress={() => {
              Props.setModal(false);
            }}
            color={COLORS.blue}
          />
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
  addButton: {
    alignSelf: 'flex-end',
  },
});
export default ModalInput;
