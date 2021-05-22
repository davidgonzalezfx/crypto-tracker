import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('\n\n\nStore error:\n', error, '\n\n\n');
      throw Error(error)
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('\n\n\nGet error:\n', error, '\n\n\n');
      throw Error(error)
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys()
    } catch (error) {
      console.log('\n\n\ngetAllKeys error:\n', error, '\n\n\n');
      throw Error(error)
    }
  }

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys)
    } catch (error) {
      console.log('\n\n\nmultiGet error:\n', error, '\n\n\n');
      throw Error(error)
    }
  }

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('\n\n\nRemove error:\n', error, '\n\n\n');
      throw Error(error)
    }
  };
}

export default Storage