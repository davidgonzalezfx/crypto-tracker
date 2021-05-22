import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/color';
import CoinsSearch from '../coins/CoinsSearch';

const CoinsScreen = props => {
  const [data, setData] = useState(null);
  const [allCoins, setAllCoins] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    getCoins()
  }, []);

  const getCoins = async () => {
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setData(res.data);
    setAllCoins(res.data);
    setLoading(false);
  };

  const handlePress = coin => props.navigation.navigate('CoinDetail', {coin});

  const handleSearch = query => {
    const coinsFiltered = allCoins.filter(coin => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
    })
    setData(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      <View style={styles.theader}>
        <View style={{flexDirection: 'row', marginLeft: 16}}>
          <Text style={styles.tHeader__name}>Nombre</Text>
          <Text style={styles.theader__price}>Precio</Text>
        </View>
        <Text style={styles.theader__change}>24h%</Text>
      </View>
      {data ? (
        <FlatList
          data={data.slice(0, 20)}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  title: {
    color: '#fff',
    textAlign: 'left',
  },
  btn: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#2d2d2d',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
  theader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#858FA1',
  },
  tHeader__name: {
    marginRight: 16,
    color: '#fff',
  },
  theader__price: {
    color: '#fff',
  },
  theader__change: {
    color: '#fff',
    paddingRight: 16,
  },
});

export default CoinsScreen;
