/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';

const CheckedCards = () => {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Subscribe to real-time updates
        const unsubscribe = firestore()
          .collection('CheckInItems')
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCheckIns(data);
          });

        // Unsubscribe when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = date => {
    if (!date) {
      return '';
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formattedDate = new Date(date.toDate()).toLocaleDateString(
      undefined,
      options,
    );

    const day = new Date(date.toDate()).getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
        ? 'rd'
        : 'th';

    return formattedDate.replace(/\b\d+\b/, match => match + daySuffix);
  };

  const renderItem = ({item}) => (
    <View style={styles.cardView}>
      <View style={styles.imageView}>
        <ImageBackground source={{uri: item.imageURL}} style={styles.itemImage}>
          <View style={styles.touchable}>
            <Text style={styles.checkinTxt}>Checked In</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.titleName}>{item.title}</Text>
        <Text style={styles.dateTxt}>
        {formatDate(item.createdAt)}
        </Text>
      </View>

      <View style={styles.ownerContainer}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profile}
        />
        <Text style={styles.ownerTitle}>Owner: </Text>
        <Text style={styles.ownerName}>John Doe</Text>
      </View>
    </View>
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Added CheckIns</Text>
        </View>

        {checkIns.length === 0 ? (
          <Text style={styles.noItemText}>No items checked in</Text>
        ) : (
          <FlatList
            data={checkIns}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
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
    shadowOffset: {width: 2, height: 0},
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
  noItemText: {
    fontSize: scale(16),
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: scale(15),
  },
});

export default CheckedCards;
