import React from 'react';
import {StyleSheet,Image, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../Assets/images/logo.png')}
        style={{width: 100, height: 50}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});

export default Header;