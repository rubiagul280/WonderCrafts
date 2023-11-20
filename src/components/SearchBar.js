/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Image, Text} from 'react-native';
import {scale} from 'react-native-size-matters';

const SearchBar = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View>
            <Image
              source={require('../../assets/wondercrafts_logo.png')}
              style={styles.logo}
            />
          </View>

          <View style={styles.arrowContainer}>
            <Image
              source={require('../../assets/profile.png')}
              style={styles.profile}
            />
             <Image
              source={require('../../assets/DownArrow.png')}
              style={styles.arrow}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    width: scale(334),
    height: scale(44),
    top: scale(15),
    backgroundColor: 'white',
    borderRadius: scale(20),
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  logo: {
    width: scale(30),
    height: scale(30),
  },
  profile: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: scale(15),
    height: scale(10),
    marginLeft: scale(10),
  }
});

export default SearchBar;
