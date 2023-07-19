import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Anime} from '../../services/types/types'; // Import the Anime interface or type if you have defined it elsewhere
import {Alert} from 'react-native';

const [textAdd, setTextAdd] = useState('Add to Favorites');
const [textRemove, setTextRemove] = useState('Delete');

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selAnime: Anime;
      userId: string;
    };
  };
}

export const openAlert = () => {
  Alert.alert(
    'Warning',
    'The selected Anime is already in your Favourites list!',
    [
      {
        text: 'OK',
        onPress: () => console.log('Alert OK button clicked'),
      },
    ],
    {
      cancelable: true,
    },
  );
};

// Function to retrieve favorites for a specific user from AsyncStorage
export const getFavoritesForUser = async (userId: string) => {
  try {
    const favoritesData = await AsyncStorage.getItem(`favorites:${userId}`);
    if (favoritesData) {
      return JSON.parse(favoritesData);
    }
    return [];
  } catch (error) {
    console.log('Error retrieving favorites:', error);
    return [];
  }
};

// Function to save favorites for a specific user to AsyncStorage
export const saveFavoritesForUser = async (
  userId: string,
  favorites: Anime[],
) => {
  console.log('BUTTON PRESSED');
  try {
    await AsyncStorage.setItem(
      `favorites:${userId}`,
      JSON.stringify(favorites),
    );
  } catch (error) {
    console.log('Error saving favorites:', error);
  }
};

// Usage in the "Add to Favorites" button handler
export const handleAddToFavourites = async (
  selectedAnime: Anime,
  userId: string,
) => {
  console.log('button AddToFavs pressed');
  if (!selectedAnime) {
    console.log('selectedAnime = ', selectedAnime); // Handle the case where selectedAnime is null
  }
  // Retrieve existing favorites for the user
  const favorites = await getFavoritesForUser(userId);

  // Check if the anime is already in favorites
  const isAlreadyFavorite = favorites.some(
    (favAnime: Anime) => favAnime.mal_id === selectedAnime.mal_id,
  );

  if (isAlreadyFavorite) {
    openAlert();
  } else {
    // Add the new favorite anime to the favorites array
    const updatedFavorites = [...favorites, selectedAnime];

    // Save the updated favorites to AsyncStorage
    await saveFavoritesForUser(userId, updatedFavorites);
    setTextAdd('Added!');
  }
};

export const removeFavoriteForUser = async (
  selectedAnime: Anime,
  userId: any,
) => {
  try {
    const favorites = await getFavoritesForUser(userId);

    // Filter out the selectedAnime from the favorites array
    const updatedFavorites = favorites.filter(
      (favAnime: Anime) => favAnime.mal_id !== selectedAnime.mal_id,
    );

    // Save the updated favorites to AsyncStorage
    await saveFavoritesForUser(userId, updatedFavorites);
  } catch (error) {
    console.log('Error removing favorite:', error);
  }
};

export const handleRemoveFavorite = async (
  selectedAnime: Anime,
  {route, navigation}: ScreenProps,
) => {
  console.log('button RemoveFromFavs pressed');

  // Retrieve the userId from route.params or any other way you have it
  const userId = route.params.userId;

  // Remove the selected anime from the favorites list
  await removeFavoriteForUser(selectedAnime, userId);

  setTextRemove('Deleted!'); // Update the button text or state as needed
};

// Usage in the "Favorites" button handler
export const handleViewFavorites = async (
  userId: string,
  {route, navigation}: ScreenProps,
) => {
  try {
    // Retrieve favorites for the user
    const favorites = await getFavoritesForUser(userId);

    // Navigate to the "Favourites" screen and pass the favorites data as a parameter
    navigation.navigate('Favourites', {userId, favorites});
  } catch (error) {
    console.log('Error retrieving favorites:', error);
  }
};
