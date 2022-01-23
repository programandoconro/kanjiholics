/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Octicons';
import {confirmDialog} from './confirmDialog';
import {signOut} from '../Storage/firebase';
import {COLORS} from '../Utils/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
import {about} from '../Utils/messages';

const HamburguerMenu = (Props: {message: string}) => {
  const [visible, setVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const openAbout = () => {
    setShowAbout(true);
    hideMenu();
  };
  const closeAbout = () => setShowAbout(false);

  const openInstructions = () => {
    setShowInstructions(true);
    hideMenu();
  };
  const closeInstructions = () => setShowInstructions(false);

  const handleSignOut = () => {
    confirmDialog(signOut, 'Do you really want to logout?');
    hideMenu();
  };
  const LogOutItem = () => {
    return <Text style={{color: COLORS.orange}}>LOGOUT</Text>;
  };
  const AboutItem = () => {
    return <Text style={{color: 'white'}}>About</Text>;
  };
  const InstructionsItem = () => {
    return <Text style={{color: 'white'}}>Instructions</Text>;
  };
  const MenuIcon = () => (
    <TouchableOpacity style={styles.hamburguer} onPress={showMenu}>
      <Icon name="three-bars" size={30} color="#000" />
    </TouchableOpacity>
  );

  const About = () => {
    return (
      <AwesomeAlert
        show={showAbout}
        showProgress={false}
        title="About"
        message={about}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Got it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={closeAbout}
        onConfirmPressed={closeAbout}
      />
    );
  };
  const Instructions = () => {
    return (
      <AwesomeAlert
        show={showInstructions}
        showProgress={false}
        title="Instructions"
        message={Props.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Got it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={closeInstructions}
        onConfirmPressed={closeInstructions}
      />
    );
  };
  return (
    <View style={styles.main}>
      <Menu
        style={styles.menu}
        visible={visible}
        anchor={<MenuIcon />}
        onRequestClose={hideMenu}>
        <MenuDivider />
        <MenuItem style={styles.menuItem} onPress={openInstructions}>
          <InstructionsItem />
        </MenuItem>
        <MenuDivider />
        <MenuItem style={styles.menuItem} onPress={openAbout}>
          <AboutItem />
        </MenuItem>
        <MenuDivider />
        <MenuItem style={styles.menuItem} onPress={handleSignOut}>
          <LogOutItem />
        </MenuItem>
      </Menu>
      <About />
      <Instructions />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    backgroundColor: COLORS.blue,
  },
  item: {
    color: 'white',
  },
  menuItem: {
    alignItems: 'center',
  },
  hamburguer: {
    color: 'white',
    paddingEnd: 20,
  },
});
export default HamburguerMenu;
