import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Anime} from '../../services/types/types';
import {useFavouritesStore} from '../store/FavouritesStore';

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selectedFav: Anime;
    };
  };
}

const SelectedFavScreen = ({navigation, route}: ScreenProps) => {
  const {selectedFav} = route.params || {};
  const {removeFavourite} = useFavouritesStore();

  const renderAnime = (selectedAnime: Anime) => {
    const trailerUrl = selectedAnime.trailer?.url;

    return (
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.animeTitle}>{selectedAnime.title_english}</Text>
        {trailerUrl && (
          <WebView
            mediaPlaybackRequiresUserAction={true}
            source={{uri: trailerUrl}}
            style={{
              height: 240,
              // width: 320,
              // alignSelf: 'center',
              // alignContent: 'center',
            }}
          />
        )}
        <Text>Synopsis: {selectedAnime.synopsis}</Text>
        <Text>Year: {selectedAnime.year}</Text>
        <Text>Episodes: {selectedAnime.episodes}</Text>
        <Text>Score: {selectedAnime.score}</Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Return to Search Anime engine"
          onPress={() => navigation.navigate('AnimeScreen')}
        />
        <Pressable
          //style={() => styles.button}
          onPress={() => {
            removeFavourite(selectedFav.mal_id);
            navigation.navigate('Favourites');
            {
              selectedFav && renderAnime(selectedFav);
            }
          }}>
          <Text style={styles.button}>Delete Anime from favourites</Text>
        </Pressable>
      </View>

      {selectedFav && renderAnime(selectedFav)}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 11,
    fontFamily: 'vincHand',
    backgroundColor: 'red',
    margin: 1,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    fontFamily: 'Montserrat',
  },
  animeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 15,
  },
  infoContainer: {
    padding: 16,
  },
});

export default SelectedFavScreen;
