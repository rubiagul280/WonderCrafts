/* eslint-disable prettier/prettier */

import React from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import styles from './Styles';
import SearchBar from '../components/SearchBar';
import AddCheckinCard from '../components/AddCheckinCard';
import CheckedCards from '../components/CheckedCards';
const CheckinScreen = () => {
  const CheckinScreenData = [
    {
      id: 1,
      component: (
        <>
          <SearchBar />
        </>
      ),
    },
    {
      id: 2,
      component: (
        <>
          <AddCheckinCard />
        </>
      ),
    },
    {
      id: 3,
      component: (
        <>
          <CheckedCards />
        </>
      ),
    },
  ];

  const renderItem = ({item}) => {
    return <View key={item.id}>{item.component}</View>;
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#F8F8F8"
          barStyle="dark-content"
          translucent={false}
        />

        <FlatList
          data={CheckinScreenData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={1}
          windowSize={2}
          style={styles.flatListStyle}
        />
      </View>
    </>
  );
};

export default CheckinScreen;
