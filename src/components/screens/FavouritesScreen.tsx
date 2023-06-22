import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFavouritesStore} from '../store/FavouritesStore';
import AnimeScreen from './AnimeScreen';

const FavouritesScreen = ({route, navigation}: any) => {
  const {favourites} = useFavouritesStore();
  //const {itemId, otherParam} = route.params;

  useEffect(() => {
    // Fetch the favourites when the component mounts
    // Add any necessary dependencies to the dependency array if needed
    // For example, if you want to refetch favourites when certain values change
    // e.g., userId or any other relevant data
    // fetchFavourites();
  }, []);

  // const onPress = () => {
  //   navigation.navigate('Login');
  // };

  return (
    <View>
      {favourites.map((selectedAnime: any) => (
        // <Text key={selectedAnime.mal_id}>{selectedAnime.title_english}</Text>

        <TouchableOpacity
          key={selectedAnime.mal_id}
          style={styles.button}
          onPress={() =>
            navigation.navigate('SelectedFav', {
              selectedFav: selectedAnime, // Pass the selectedFav object directly
            })
          }>
          <Text style={styles.titles} key={selectedAnime.mal_id}>
            {selectedAnime.title_english}
          </Text>
        </TouchableOpacity>

        // <Pressable
        //   onPress={() => {
        //     navigation.navigate('AnimeScreen');
        //   }}>
        //   {() => (
        //     <Text style={styles.titles} key={selectedAnime.mal_id}>
        //       {selectedAnime.title_english}
        //     </Text>
        //   )}
        // </Pressable>
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
