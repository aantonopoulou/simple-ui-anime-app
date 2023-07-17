import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFavouritesStore} from '../store/FavouritesStore';
import AnimeScreen from './AnimeScreen';
import {Anime} from '../../services/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selectedFav: Anime;
      userId: string;
      favorites: Anime[];
    };
  };
}

const FavouritesScreen = ({route, navigation}: ScreenProps) => {
  const {userId, favorites} = route.params;

  console.log('userId_fromFavs=', userId);
  console.log('favourites', favorites);

  // // Function to retrieve favorites for a specific user from AsyncStorage
  // const getFavoritesForUser = async (userId: string) => {
  //   try {
  //     const favoritesData = await AsyncStorage.getItem(`favorites:${userId}`);
  //     if (favoritesData) {
  //       const userFavorites = JSON.parse(favoritesData);
  //       setFavorites(userFavorites);
  //     } else {
  //       setFavorites([]);
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving favorites:', error);
  //   }
  // };

  // useEffect(() => {
  //   const getUserFavorites = async () => {
  //     try {
  //       // Retrieve user-specific favorites from storage using the userId
  //       const userFavorites = await getFavoritesForUser(userId);
  //       console.log('User favorites:', userFavorites);
  //       // ...
  //     } catch (error) {
  //       console.log('Error retrieving user favorites:', error);
  //     }
  //   };

  //   getUserFavorites();
  // }, [userId]);

  // ...

  // const userFavourites = favourites[userId] || [];

  return (
    <View>
      <Text>Favourites:</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.mal_id.toString()}
        renderItem={({item}) => (
          <Text>{item.title_english || item.title_japanese}</Text>
        )}
      />

      {favorites.map((selectedAnime: any) => (
        <TouchableOpacity
          key={selectedAnime.mal_id}
          style={styles.button}
          onPress={() =>
            navigation.navigate('SelectedFav', {
              selectedFav: selectedAnime, // Passing the selectedFav object directly
            })
          }>
          <Text style={styles.titles} key={selectedAnime.mal_id}>
            {selectedAnime.title_english}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  titles: {
    fontSize: 20,
    //fontWeight: 'bold',
  },
  button: {},
});

export default FavouritesScreen;
