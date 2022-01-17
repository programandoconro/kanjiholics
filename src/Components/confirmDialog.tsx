import {Alert} from 'react-native';

const confirmDialog = (
  onYesFunction: () => void,
  message: string,
  onNoFuntion?: () => void,
) => {
  return Alert.alert('Really?', message, [
    {
      text: 'Yes',
      onPress: () => {
        onYesFunction();
      },
    },
    {
      text: 'No',
      onPress: () => {
        onNoFuntion && onNoFuntion();
      },
    },
  ]);
};

export default confirmDialog;
