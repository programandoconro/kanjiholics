import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../Utils/constants';

const Input = (Props: {
  value: string;
  onChange: any;
  password?: boolean;
  placeholder?: string;
}) => {
  const {value, onChange, password, placeholder} = Props;

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      style={styles.inputInput}
      secureTextEntry={password}
      placeholder={placeholder}
      placeholderTextColor={COLORS.blue}
    />
  );
};

const styles = StyleSheet.create({
  inputInput: {
    margin: 12,
    backgroundColor: COLORS.grey,
    fontSize: 20,
    width: 250,
    fontFamily: FONTS.main,
    color: 'black',
  },
});

export default Input;
