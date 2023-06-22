import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {Anime} from '../../services/types/types';
import {Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavouritesStore = {
  favourites: Anime[];
  addFavourite: (anime: Anime) => void;
  removeFavourite: (animeId: number) => void;
};

const openAlert = () => {
  Alert.alert('The selected Anime is already in your Favourites list!');
  [
    {
      text: 'OK',
      onPress: () => console.log('OK button clicked'),
    },
  ];
  {
    cancelable: true;
  }
};

const useFavouritesStore = create(
  persist<FavouritesStore>(
    set => ({
      favourites: [],
      addFavourite: anime => {
        set(state => {
          const isAlreadyFavorite = state.favourites.some(
            favAnime => favAnime.mal_id === anime.mal_id,
          );
          if (isAlreadyFavorite) {
            openAlert();
          } else {
            return {favourites: [...state.favourites, anime]};
          }
          return state; // Return the state object if there are no changes
        });
      },
      removeFavourite: animeId =>
        set(state => ({
          favourites: state.favourites.filter(
            anime => anime.mal_id !== animeId,
          ),
        })),
    }),
    {
      name: 'favourites-storage', // Name of the storage
      storage: createJSONStorage(() => AsyncStorage), // Specify the storage mechanism (e.g., AsyncStorage for React Native)
      // serialize: JSON.stringify, // Serialize the state value using JSON.stringify
      // deserialize: JSON.parse, // Deserialize the state value using JSON.parse
    },
  ),
);

export {useFavouritesStore};
