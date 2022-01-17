import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../Utils/constants';

const AppButton = (Props: {title: string; onPress: () => void}) => {
  const {title, onPress} = Props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.orange,
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  text: {
    color: 'white',
    fontFamily: FONTS.main,
    fontSize: 20,
  },
});

export default AppButton;
