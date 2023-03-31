import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAnimeDataFromStorage = async (): Promise<any[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items
      .map(item => {
        const [, value] = item;
        if (value !== null) {
          return JSON.parse(value);
        }
        return null;
      })
      .filter(item => item !== null);
  } catch (error) {
    console.error('Error getting anime data from AsyncStorage:', error);
    return [];
  }
};

const HistoryListScreen = () => {
  const [historyList, setHistoryList] = useState<any[]>([]);

  useEffect(() => {
    getAnimeDataFromStorage().then(data => setHistoryList(data));
  }, []);

  return (
    <View>
      <Text>List of saved anime:</Text>
      <FlatList
        data={historyList}
        renderItem={({item}) => <Text>{item.title}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default HistoryListScreen;
