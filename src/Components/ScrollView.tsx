import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {COLORS} from '../Utils/constants';

const ScrollContainer = (Props: {
  children: JSX.Element[] | JSX.Element | Element;
}) => {
  return (
    <View style={styles.main}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {Props.children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {},
  main: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
});

export default ScrollContainer;
