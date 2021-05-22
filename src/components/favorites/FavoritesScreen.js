import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/color';
import CoinsItem from '../coins/CoinsItem';
import Storage from '../../libs/storage';

const FavoritesScreen = props => {
  const [favoritesList, setFavoriteList] = useState([]);

  useEffect(() => {
    getFavorites();
    props.navigation.addListener('focus', getFavorites);
    return () => {
      props.navigation.removeListener('focus', getFavorites);
    }
  }, []);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const favorites = await Storage.instance.multiGet(
        allKeys.filter(key => key.includes('favorite-')),
      );
      if (favorites) setFavoriteList(favorites.map(el => JSON.parse(el[1])));
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
    }
  };

  const handlePress = coin => props.navigation.navigate('CoinDetail', {coin});

  return (
    <View style={styles.container}>
      {!favoritesList ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favoritesList}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});
export default FavoritesScreen;
