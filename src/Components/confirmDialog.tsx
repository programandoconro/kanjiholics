import {Alert} from 'react-native';

export const confirmDialog = (
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

export const editDeleteDialog = (
  onEditFunction: () => void,
  message: string,
  onDeleteFuntion: () => void,
) => {
  return Alert.alert('Really?', message, [
    {
      text: 'Edit',
      onPress: () => {
        onEditFunction();
      },
    },
    {
      text: 'Delete',
      onPress: () => {
        onDeleteFuntion();
      },
    },
    {
      text: 'Cancel',
      onPress: () => {},
    },
  ]);
};
