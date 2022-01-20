/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  Modal,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {getLocalData, deleteItemLocal} from '../Storage/asyncStorage';
import ModalInput from './ModalInput';
import AddButton from '../Components/AddButton';
import UserContext from '../Utils/UserContext';
import {COLORS} from '../Utils/constants';
import ScrollContainer from '../Components/ScrollView';
import confirmDialog from '../Components/confirmDialog';

const TrainingRoom = () => {
  const [kanji, setKanji] = useState<object>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);
  const {document, user} = useContext(UserContext);
  const [index, setIndex] = useState<number>(0);
  const [indexes, setIndexes] = useState<any>([]);

  const l = Object.keys(kanji).length;
  const path: string = user.uid + '/' + document;
  const getKanjis = async () => {
    const k = await getLocalData(path);
    var nums = Array.from(Array(Object.keys(k).length).keys());
    var ranNums = [];
    var i = nums.length;
    var j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(nums[j]);
      nums.splice(j, 1);
    }
    setIndexes(ranNums);
    setKanji(k);
  };

  useEffect(() => {
    getKanjis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible, path]);

  const [showDelete, setShowDelete] = useState(false);
  const ShowKanjis = () => {
    const k = indexes[index];
    const key = Object.keys(kanji)[k];
    const value = Object.values(kanji)[k];

    const onShowDelete = () => {
      setShowDelete(true);
    };
    const deleteKanji = () => {
      setShowDelete(false);
      deleteItemLocal(key);
      getKanjis();
    };

    const handleClickDeleteKanji = () => {
      confirmDialog(deleteKanji, 'Do you want to delete this kanji?', () =>
        setShowDelete(false),
      );
    };

    const DeleteKanjiButton = () => {
      if (showDelete) {
        return (
          <View style={styles.deleteButton}>
            <Button title="DEL" color="red" onPress={handleClickDeleteKanji} />
          </View>
        );
      }
      return <></>;
    };

    if (kanji && l && key) {
      return (
        <>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            onLongPress={onShowDelete}
            onPress={() => setShowDelete(false)}
            style={{fontSize: 80, textAlign: 'center', color: 'white'}}>
            {key && key.startsWith(path) && value[key.slice(-16)].kanji}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{fontSize: 30, textAlign: 'center', color: 'white'}}>
            {viewAnswer &&
              key &&
              key.startsWith(path) &&
              value[key.slice(-16)].reading}
          </Text>
          <DeleteKanjiButton />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{textAlign: 'center', color: 'white'}}>
            {viewAnswer &&
              key &&
              key.startsWith(path) &&
              value[key.slice(-16)].meaning}
          </Text>
        </>
      );
    } else {
      return <Text />;
    }
  };
  const ModalView = () => {
    return (
      <AddButton
        onPress={() => {
          setModalVisible(true);
        }}
      />
    );
  };
  const ShowButtons = () => {
    const handleShow = () => {
      setViewAnswer(true);
    };
    const handleNext = () => {
      if (index >= Number(l) - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      setViewAnswer(false);
    };
    if (viewAnswer) {
      return (
        <View style={styles.nextShowButton}>
          <Button title="Next" onPress={handleNext} color={COLORS.orange} />
        </View>
      );
    } else {
      return (
        <View style={styles.nextShowButton}>
          <Button title="Show" onPress={handleShow} color={COLORS.orange} />
        </View>
      );
    }
  };
  return (
    <ScrollContainer>
      <TouchableOpacity
        onPress={() => {
          showDelete && setShowDelete(false);
        }}
        activeOpacity={1}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <ModalView />
          <Modal visible={modalVisible}>
            <ModalInput setModal={setModalVisible} />
          </Modal>
          <ShowKanjis />
          <ShowButtons />
        </ScrollView>
      </TouchableOpacity>
    </ScrollContainer>
  );
};
const styles = StyleSheet.create({
  nextShowButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.blue,
    width: 60,
  },
  deleteButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.orange,
  },
});
export default TrainingRoom;
