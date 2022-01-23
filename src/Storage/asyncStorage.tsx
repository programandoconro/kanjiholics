import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocal = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
export const mergeLocal = async (key: string, value: string) => {
  await AsyncStorage.mergeItem(key, value).catch(e => {
    console.log(e);
  });
};

export const deleteNestedDeck = async (item: string, target: string) => {
  const deck = await AsyncStorage.getItem(item);
  await AsyncStorage.removeItem(item);
  deck &&
    Object.entries(JSON.parse(deck)).forEach(([key, value]) => {
      if (key === target) {
        mergeLocal(item, JSON.stringify({[key]: ''}));
      } else if (value) {
        mergeLocal(item, JSON.stringify({[key]: value}));
      }
    });
};

export const editNestedDeck = async (
  item: string,
  target: string,
  newDeck: string,
  oldDeck: string,
) => {
  const deck = await AsyncStorage.getItem(item);
  await AsyncStorage.removeItem(item);
  deck &&
    Object.entries(JSON.parse(deck)).forEach(([key, value]) => {
      if (key === target) {
        mergeLocal(item, JSON.stringify({[key]: newDeck}));
      } else if (value) {
        mergeLocal(item, JSON.stringify({[key]: value}));
      }
    });
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    result.forEach(async value => {
      if (!value[0].startsWith('DECKS')) {
        const a = value[0].split('/');
        if (a[1] === oldDeck) {
          const newKey = value[0].replace(a[1] + '/', newDeck + '/');
          saveToLocal(newKey, value[1]);
          AsyncStorage.removeItem(value[0]);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getLocalItem = async (key: string, setDecks: any) => {
  // await AsyncStorage.clear();
  const result = await AsyncStorage.getItem(key);
  setDecks(result);
};

export const getItemLocal = async (key: string) => {
  // await AsyncStorage.clear();
  const result = await AsyncStorage.getItem(key);
  console.log(result);
};
export const getLocalData = async (path: string) => {
  const allKeys = await AsyncStorage.getAllKeys();
  const result: any = {};
  try {
    const storage = await AsyncStorage.multiGet(allKeys);
    storage.map(e => {
      if (!e[0].startsWith('DECKS') && e[0].startsWith(path)) {
        result[e[0]] = e[1];
      }
    });
  } catch (e) {
    console.log(e);
  }
  for (let i in result) {
    result[i] = JSON.parse(result[i]);
  }
  return result;
};

export const deleteItemLocal = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    console.log('KEYS', result);
  } catch (error) {
    console.error(error);
  }
};
