import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Colors from '../../res/color';

const CoinsSearch = ({onChange}) => {
  const [query, setQuery] = useState('');

  const handleText = query => {
    setQuery(query);
    if (onChange) onChange(query);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={handleText}
        value={query}
        placeholder="Search Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.blackPearl,
    color: "#fff",
    paddingLeft: 16,
    margin: 6,
    borderRadius: 4,
  }
})

export default CoinsSearch;
