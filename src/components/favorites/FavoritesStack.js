import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/color';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
