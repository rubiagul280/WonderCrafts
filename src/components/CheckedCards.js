/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {scale} from 'react-native-size-matters';

const CheckedCards = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Added CheckIns</Text>
        </View>

        <View style={styles.cardView}>
          <View style={styles.imageView}>
            <ImageBackground
              source={require('../../assets/ParisHd.jpg')}
              style={styles.itemImage}>
              <View style={styles.touchable}>
                <Text style={styles.checkinTxt}>Checked In</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.titleName}>CheckIn Name</Text>
            <Text style={styles.dateTxt}>12th November, 2023</Text>
          </View>

          <View style={styles.ownerContainer}>
            <Image source={require('../../assets/profile.png')} style={styles.profile}/>
            <Text style={styles.ownerTitle}>Owner: </Text>
            <Text style={styles.ownerName}>John Doe</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(40),
    marginBottom: scale(40),
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: scale(24),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '500',
  },
  cardView: {
    width: scale(334),
    height: scale(324),
    backgroundColor: 'white',
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(15),
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 7,
  },
  imageView: {
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  itemImage: {
    width: scale(294),
    height: scale(160),
  },
  touchable: {
    width: scale(90),
    height: scale(32),
    backgroundColor: '#7B5AFF',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: scale(15),
    marginTop: scale(15),
    marginRight: scale(15),
  },
  checkinTxt: {
    fontSize: scale(14),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
  nameContainer: {
    alignSelf: 'flex-start',
    marginLeft: scale(20),
    marginTop: scale(10),
  },
  titleName: {
    fontSize: scale(20),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '500',
  },
  dateTxt: {
    fontSize: scale(16),
    color: '#718096',
    fontFamily: 'Roboto Flex',
    fontWeight: '400',
    marginTop: scale(8),
  },
  ownerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  profile: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
  },
  ownerTitle: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto Flex',
    fontWeight: '500',
    marginLeft: scale(10),
  },
  ownerName: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
});

export default CheckedCards;
