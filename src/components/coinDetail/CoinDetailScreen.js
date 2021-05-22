import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import CoinMarketItem from './coinMarketItem';
import Colors from '../../res/color';
import Http from '../../libs/http';
import Storage from '../../libs/storage';

const CoinDetailScreen = ({
  route: {
    params: {coin},
  },
  navigation,
}) => {
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    navigation.setOptions({title: coin.symbol});
    getMarkets();
  }, [navigation, coin]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getSymbolIcon = coin =>
    `https://c1.coinlore.com/img/25x25/${coin.nameid}.png`;

  const getSections = () => {
    const sections = [
      {
        title: 'Total MarketCap',
        data: [`${coin.market_cap_usd} usd`],
      },
      {
        title: 'Volume',
        data: [`${coin.volume24} usd`],
      },
      {
        title: 'Change 1h',
        data: [`${coin.percent_change_1h} %`],
      },
    ];
    return sections;
  };

  const getMarkets = async () => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coin.id}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      Alert.alert("Remove favorite", "Are you sure", [
        {
          text: "cancel",
          onPress: () => {
  
          },
          style: "cancel"
        },
        {
          text: "remove",
          onPress: async () => removeFavorite(),
          style: "destructive"
        }
      ])
    }
    else addFavorite();
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`;
      const res = await Storage.instance.get(key);
      console.log('\n\n\n', JSON.parse(res), '\n\n\n');
      if (res) setIsFavorite(true);
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
    }
  };

  const removeFavorite = async () => {
    
    try {
      const key = `favorite-${coin.id}`;
      await Storage.instance.remove(key);
      setIsFavorite(v => !v);
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
    }
  };

  const addFavorite = async () => {
    try {
      const value = JSON.stringify(coin);
      const key = `favorite-${coin.id}`;
      const stored = Storage.instance.store(key, value);

      if (stored) setIsFavorite(v => !v);
    } catch (error) {
      console.log('\n\n\n', error, '\n\n\n');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.imageSymbol}
            source={{uri: getSymbolIcon(coin)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.buttonFavorite,
            isFavorite ? styles.buttonFavoriteRemove : styles.buttonFavoriteAdd,
          ]}>
          <Text style={{color: Colors.white}}>
            {isFavorite ? 'Remove favorites' : 'Add Favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={item => item}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({item}) => (
          <View style={{padding: 8}}>
            <Text style={styles.sectionText}>{item}</Text>
          </View>
        )}
      />

      <Text
        style={{color: '#fff', fontSize: 18, fontWeight: 'bold', padding: 8}}>
        Markets
      </Text>

      <FlatList
        style={{padding: 16, maxHeight: 100}}
        horizontal
        data={markets.slice(0, 5)}
        keyExtractor={(item, idx) => idx}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  imageSymbol: {
    width: 40,
    height: 40,
  },
  section: {
    maxHeight: 310,
  },
  sectionTitle: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
    paddingTop: 16,
    paddingBottom: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionText: {
    color: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    fontSize: 12,
  },
  buttonFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  buttonFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  buttonFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
