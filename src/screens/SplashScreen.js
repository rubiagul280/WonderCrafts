/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Checkin');
    }, 2000);
  }, [navigation]);

  return (
    <>
        <View style={styles.container}>
          <Image
            source={require('../../assets/wondercrafts_logo.png')}
            style={styles.logo}
          />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 90,
    alignItems: 'center',
  },
});

export default Splash;
