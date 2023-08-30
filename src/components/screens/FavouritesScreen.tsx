import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFavouritesStore} from '../store/FavouritesStore';
import AnimeScreen from './AnimeScreen';
import {Anime} from '../../services/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import animeLogoSticker from '../logos/animeLogoSticker.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selAnime: Anime;
      userId: string;
      favorites: Anime[];
    };
  };
}

const FavouritesScreen = ({route, navigation}: ScreenProps) => {
  const {userId, favorites: initialFavorites, selAnime} = route.params;
  const [selectedAnime, setSelectedAnime] = useState<any>(selAnime || null);
  const [favorites, setFavorites] = useState<Anime[]>(initialFavorites);

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

  // Function to retrieve favorites for a specific user from AsyncStorage
  const getFavoritesForUser = async (userId: string) => {
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
  const saveFavoritesForUser = async (userId: string, favorites: Anime[]) => {
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

  const removeFavoriteForUser = async (
    userId: string,
    selectedAnime: Anime,
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

  const handleRemoveFavorite = async (selectedAnime: Anime) => {
    console.log('button RemoveFromFavs pressed');

    // Retrieve the userId from route.params or any other way you have it
    const userId = route.params.userId;

    // Remove the selected anime from the favorites list
    await removeFavoriteForUser(userId, selectedAnime);
    // Retrieve updated favorites after removal
    const updatedFavorites = await getFavoritesForUser(userId);
    // Update the state with the updated favorites
    setFavorites(updatedFavorites);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AnimeScreen', {selectedAnime: null, userId});
            setSelectedAnime(null);
          }}>
          <Image
            source={animeLogoSticker}
            style={[styles.logo, {marginRight: 180}]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.button}>
            <MaterialCommunityIcons name="account-cog" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.button}>
            <AntDesign name="logout" size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'black',
            marginVertical: 16,
          }}>
          Favourites
        </Text>
      </View>
      {/* <FlatList
        data={favorites}
        keyExtractor={item => item?.mal_id.toString()}
        renderItem={({item}) => (
          <Text>{item?.title_english || item?.title_japanese}</Text>
        )}
      /> */}
      {/* <View style={styles.container}> */}
      <ScrollView>
        {favorites.map((selectedFav: Anime) => (
          <View style={styles.itemContainer} key={selectedFav?.mal_id}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                console.log('SelectedFav fromFavs pressed!', selectedFav);
                navigation.navigate('AnimeScreen', {
                  selAnime: selectedFav, // Passing the selectedFav object directly
                  userId: userId,
                });
              }}>
              <Text style={styles.titles}>
                {selectedFav?.title_english || selectedFav?.title_japanese}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemoveFavorite(selectedFav)}>
              <Text style={styles.deleteButtonText}>delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* </View> */}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  titles: {
    fontSize: 16,
    //fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'limegreen',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logo: {
    width: 70,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    // justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginBottom: 16,
    height: 60,
  },
  item: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'limegreen',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FavouritesScreen;
