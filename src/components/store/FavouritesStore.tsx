import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {Anime} from '../../services/types/types';
import {Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState, useEffect} from 'react';

// type FavouritesStore = {
//   favourites: Anime[];
//   addFavourite: (anime: Anime, userId: string) => void;
//   removeFavourite: (animeId: number, userId: string) => void;
// };
const openAlert = () => {
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
export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selectedAnime: any;
      userId: string;
    };
  };
}

export interface FavouritesStore {
  favourites: Anime[];
  addFavourite: (anime: Anime) => void;
  //removeFavourite: (animeId: number) => void;
}

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
      removeFavourite: (animeId: number) =>
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

// const useFavouritesStore = (): FavouritesStore => {
//   const [favourites, setFavourites] = useState<Anime[]>([]);

//   useEffect(() => {
//     loadFavourites();
//   }, []);

//   const addFavourite = (anime: Anime) => {
//     setFavourites(prevFavourites => [...prevFavourites, anime]);
//     saveFavourites([...favourites, anime]);
//   };

//   const loadFavourites = async () => {
//     try {
//       const storedFavourites = await AsyncStorage.getItem('favourites');
//       if (storedFavourites) {
//         const parsedFavourites: Anime[] = JSON.parse(storedFavourites);
//         setFavourites(parsedFavourites);
//       }
//     } catch (error) {
//       console.log('Error loading favourites:', error);
//     }
//   };

//   const saveFavourites = async (updatedFavourites: Anime[]) => {
//     try {
//       const serializedFavourites = JSON.stringify(updatedFavourites);
//       await AsyncStorage.setItem('favourites', serializedFavourites);
//     } catch (error) {
//       console.log('Error saving favourites:', error);
//     }
//   };

//   return {
//     favourites,
//     addFavourite,
//     //removeFavourite,
//   };
// };

export {useFavouritesStore};
