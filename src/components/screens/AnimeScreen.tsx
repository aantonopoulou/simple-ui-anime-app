import React, {useState, useEffect} from 'react';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFavouritesStore} from '../store/FavouritesStore';
import VideoPlayer from '../VideoPlayer';
import axios from 'axios';
import {Anime} from '../../services/types/types';
import Video from 'react-native-video';

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selectedAnime: any; // Add the selectedAnime property
    };
  };
}

const AnimeScreen = ({navigation, route}: ScreenProps) => {
  // const {selectedAnime} = route.params || {};
  // useEffect(() => {
  //   if (selectedAnime) {
  //     // Fetch anime info or perform other operations with selectedFav
  //     console.log('selectedFav:', selectedAnime);
  //   }
  // }, [selectedAnime]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]); // Explicitly set the type to any[]

  const [value, setValue] = useState<string | null>(null);
  const [animeInfo, setAnimeInfo] = useState<any>(null);
  const [animeList, setAnimeList] = useState([]);
  const {favourites, addFavourite} = useFavouritesStore();

  useEffect(() => {
    fetchAnimeTitles();
  }, []);

  const fetchAnimeTitles = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime');
      const animeList = response.data.data;
      const titles = animeList.map((anime: Anime) => ({
        label: anime.title_english,
        value: anime.mal_id.toString(),
      }));
      console.log('titles', titles);
      //console.log('animeList:', animeList);
      setItems(titles);
      setAnimeList(animeList);
    } catch (error) {
      console.log('Error fetching anime titles:', error);
    }
  };

  const fetchAnimeInfo = async (animeId: string) => {
    console.log(`https://api.jikan.moe/v4/anime/${animeId}`);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeId}`,
      );
      const selectedAnime = response.data.data;
      setAnimeInfo(selectedAnime);
    } catch (error) {
      console.log('Error fetching anime info:', error);
    }
  };

  const handleValueChange = (itemValue: string | null) => {
    if (itemValue === value) {
      setValue(null);
      setOpen(false);
    } else {
      setValue(itemValue);
      setOpen(false);
      if (itemValue) {
        fetchAnimeInfo(itemValue);
        console.log(itemValue);
      }
    }
  };

  useEffect(() => {
    if (value) {
      fetchAnimeInfo(value);
    } else {
      setAnimeInfo(null);
    }
  }, [value]);

  const renderAnime = (selectedAnime: Anime) => {
    const embedUrl = selectedAnime.trailer?.embed_url;
    const trailerUrl = selectedAnime.trailer.url;
    const youtubeId = selectedAnime.trailer.youtube_id;
    console.log('trailerUrl= ', trailerUrl);
    console.log('EMBEDEDURL= ', embedUrl);
    console.log('youtubeId= ', youtubeId);

    const handleAddToFavourites = () => {
      console.log('Adding anime to favourites 1:', selectedAnime.title_english);
      addFavourite(selectedAnime);
      console.log('Adding anime to favourites 2:', selectedAnime.title_english);
    };

    return (
      <View style={{zIndex: -1}}>
        <Text>{selectedAnime.trailer.url}</Text>
        <Text style={styles.animeTitle}>{selectedAnime.title_english}</Text>
        <ScrollView style={styles.infoContainer1}>
          {trailerUrl && (
            <WebView
              mediaPlaybackRequiresUserAction={true}
              //style={{marginTop: 20, width: 320, height: 230}}
              //javaScriptEnabled={true}
              // domStorageEnabled={true}
              // mediaPlaybackRequiresUserAction={true}
              //androidLayerType="hardware"
              //mixedContentMode="always"
              style={{
                height: 240,
                // width: 320,
                // alignSelf: 'center',
                // alignContent: 'center',
              }}
              //javaScriptEnabled={true}
              source={{uri: trailerUrl}}
            />
          )}
        </ScrollView>
        <ScrollView style={styles.infoContainer2}>
          <Text>Synopsis: {selectedAnime.synopsis}</Text>
          <Text>Year: {selectedAnime.year}</Text>
          <Text>Episodes: {selectedAnime.episodes}</Text>
          <Text>Score: {selectedAnime.score}</Text>
          {/* <View>
            <Text style={{paddingTop: 15, fontStyle: 'italic'}}>
              Do you want to add this anime to your Favourite List?
            </Text>
          </View> */}
        </ScrollView>
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            //bottom: 0,
            flex: 1,
            alignSelf: 'flex-end',
            bottom: 5,
          }}>
          <Button title="Add to Favourites" onPress={handleAddToFavourites} />
        </View>
      </View>
    );
  };
  // const handlePress = () => {
  //   navigation.navigate('History');
  // };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="See your Favourites here!"
            onPress={() => navigation.navigate('Favourites')}
          />
          <Button
            title="Go to Login page"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={itemValue => setValue(itemValue)}
          setItems={setItems}
          onChangeValue={itemValue => handleValueChange(itemValue)}
          dropDownContainerStyle={{backgroundColor: '#fff', zIndex: 1}}
        />
        {animeInfo && renderAnime(animeInfo)}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {},
  infoContainer1: {
    zIndex: -1,
  },
  infoContainer2: {
    zIndex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoPlayer: {
    width: '100%',
    height: 300, // Set an appropriate height
  },
  animeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 15,
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AnimeScreen;
