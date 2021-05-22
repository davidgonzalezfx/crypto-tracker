import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../res/color';

const CoinsItem = ({ item, onPress }) => {
  const getItemImage = () => {
    if (item.percent_change_24h > 0) return require('../../assets/arrow_up.png');
    else return require('../../assets/arrow_down.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            color: item.percent_change_24h > 0 ? "#16C798" : "#D45555",
            fontSize: 12,
          }}>{`${item.percent_change_24h} %`}</Text>
        <Image style={styles.arrow} source={getItemImage()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#858FA1',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  arrow: {
    width: 22,
    height: 22,
    marginTop: -2,
    marginLeft: 10,
  },
});

CoinsItem.propTypes = {};

export default CoinsItem;
