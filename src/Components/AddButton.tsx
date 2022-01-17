import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../Utils/constants';

const AddButton = (Props: {onPress: any}) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.roundButton} onPress={Props.onPress}>
        <Text style={{color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.orange,
    alignSelf: 'flex-end',
  },
});

export default AddButton;
