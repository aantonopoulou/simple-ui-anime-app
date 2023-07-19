import React, {useState, useEffect} from 'react';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFavouritesStore} from '../store/FavouritesStore';
import VideoPlayer from '../VideoPlayer';
import axios from 'axios';
import {Anime} from '../../services/types/types';
import Video from 'react-native-video';
//@ts-ignore
import animeLogoSticker from '../logos/animeLogoSticker.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface ScreenProps {
  navigation: any;
  route: {
    params: {
      selAnime: Anime;
      userId: string;
    };
  };
}
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
const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared successfully.');
  } catch (error) {
    console.log('Error clearing data:', error);
  }
};
//clearAllData();

const AnimeScreen = ({navigation, route}: ScreenProps) => {
  const {selAnime, userId} = route.params;
  console.log('userId1:', userId);
  console.log('selAnime1:', selAnime);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [animeData, setAnimeData] = useState([]);
  const [textAdd, setTextAdd] = useState('Add to Favorites');

  const logStoredDataForUser = async (userId: string) => {
    try {
      const data = await AsyncStorage.getItem(`favorites:${userId}`);
      if (data !== null) {
        console.log(`Stored data for user ${userId}:`, JSON.parse(data));
      } else {
        console.log(`No stored data found for user ${userId}.`);
      }
    } catch (error) {
      console.log('Error retrieving stored data:', error);
    }
  };

  logStoredDataForUser(userId);

  const fetchAnimeTitles = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime');
      const animeData = response.data.data;
      const titles = animeData.map((anime: Anime) => ({
        label: anime.title_english || anime.title_japanese,
        value: anime.mal_id.toString(),
      }));
      console.log('value1:', value);
      console.log('titles', titles);
      //console.log('animeData:', animeData);
      setItems(titles);
      setAnimeData(animeData);
      console.log('value2:', value);
    } catch (error) {
      console.log('Error fetching anime titles:', error);
    }
  };

  const fetchSelectedAnimeInfo = async (animeId: string) => {
    console.log(`https://api.jikan.moe/v4/anime/${animeId}`);
    try {
      const selectedAnime = animeData.find(
        (anime: Anime) => anime.mal_id.toString() === value,
      );
      if (selectedAnime) {
        console.log('selectedAnime2=', selectedAnime);
        console.log('value=', value);
        console.log('items=', items);
        setSelectedAnime(selectedAnime);
        setTextAdd('Add to Favorites');
      } else {
        console.log('Anime not found');
      }
    } catch (error) {
      console.log('Error fetching anime info:', error);
    }
  };

  useEffect(() => {
    fetchAnimeTitles();
  }, []);

  // useEffect to handle changes in selAnime prop
  useEffect(() => {
    setSelectedAnime(selAnime);
  }, [selAnime]);

  useEffect(() => {
    // AsyncStorage.getItem('favourites-storage').then(resolvedValue => {
    //   console.log('resolved value of AsyncStorage::::', resolvedValue);
    // });
    if (value) {
      fetchSelectedAnimeInfo(value);
    } else {
      setSelectedAnime(selAnime);
    }
  }, [value, animeData]);

  useEffect(() => {
    console.log('value=', value);
  }, [items]);

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

  // Usage in the "Add to Favorites" button handler
  const handleAddToFavourites = async (selectedAnime: Anime) => {
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

  // Usage in the "Favorites" button handler
  const handleViewFavorites = async () => {
    try {
      // Retrieve favorites for the user
      const favorites = await getFavoritesForUser(userId);

      // Navigate to the "Favourites" screen and pass the favorites data as a parameter
      navigation.navigate('Favourites', {userId, favorites});
    } catch (error) {
      console.log('Error retrieving favorites:', error);
    }
  };

  const renderAnime = (selectedAnime: Anime) => {
    const embedUrl = selectedAnime.trailer?.embed_url;
    const trailerUrl = selectedAnime.trailer.url;
    const youtubeId = selectedAnime.trailer.youtube_id;
    console.log('trailerUrl= ', trailerUrl);
    console.log('EMBEDEDURL= ', embedUrl);
    console.log('youtubeId= ', youtubeId);

    return (
      <View style={{zIndex: -1}}>
        <ScrollView style={styles.scrollView}>
          {/* <Text>{selectedAnime.trailer.url}</Text> */}
          {selectedAnime && (
            <View style={styles.buttonContainer3}>
              <Button
                onPress={() => handleAddToFavourites(selectedAnime)}
                title={textAdd}
              />
            </View>
          )}
          {selectedAnime ? (
            <Text style={styles.animeTitle}>
              {selectedAnime.title_english || selectedAnime.title_japanese}
            </Text>
          ) : (
            <Text>Select a title from the dropdown menu!</Text>
          )}

          <View style={styles.infoContainer2}>
            <Text style={styles.infoText}>Year: {selectedAnime.year}</Text>
            <Text style={styles.infoText}>
              Episodes: {selectedAnime.episodes}
            </Text>
            <Text style={styles.infoText}>Score: {selectedAnime.score}</Text>
          </View>
          <View style={styles.infoContainer1}>
            {trailerUrl && (
              <WebView
                mediaPlaybackRequiresUserAction={true}
                style={styles.webView}
                source={{uri: trailerUrl}}
              />
            )}
            <Text style={styles.synopsis}>
              Description: {selectedAnime.synopsis}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  // const handlePress = () => {
  //   navigation.navigate('History');
  // };
  console.log('userId3:', userId);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnimeScreen', {selectedAnime: null, userId});
              setSelectedAnime(null);
            }}>
            <Image
              source={animeLogoSticker}
              style={[styles.logo, {marginRight: 120}]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleViewFavorites}>
            <View style={styles.button}>
              <FontAwesome name="heart-o" size={20} />
            </View>
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
        <View style={{zIndex: 1}}>
          {value === null ? (
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={itemValue => setValue(itemValue)}
              setItems={setItems}
              placeholder="Search for an anime film or series"
              dropDownContainerStyle={{backgroundColor: '#fff', zIndex: 1}}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                decelerationRate: 'fast',
              }}
            />
          ) : (
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={itemValue => setValue(itemValue)}
                setItems={setItems}
                placeholder={
                  selectedAnime?.title_english
                    ? selectedAnime?.title_english
                    : selectedAnime?.title_japanese
                }
                dropDownContainerStyle={{backgroundColor: '#fff', zIndex: 1}}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  decelerationRate: 'fast',
                }}
              />

              {selectedAnime && renderAnime(selectedAnime)}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 40,
  },
  button: {
    backgroundColor: 'limegreen',
    padding: 10,
    borderRadius: 5,
  },

  infoContainer1: {
    zIndex: -1,
    // flex: 1,
  },
  infoContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoPlayer: {
    width: '100%',
    height: 300, // Set an appropriate height
  },

  image: {
    width: 200,
    height: 200,
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

  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    // justifyContent: 'space-between',
  },
  scrollView: {
    // flexGrow: 1,
    paddingHorizontal: 2,
    paddingVertical: 15,

    zIndex: 2,
  },
  animeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 50,
    color: 'black',
  },
  synopsis: {
    // marginBottom: 8,
    paddingVertical: 5,
  },
  infoText: {
    marginBottom: 8,
  },
  buttonContainer3: {
    // display: 'flex',
    zIndex: 2,
    position: 'absolute',
    width: 150,
    right: 0,
    // bottom: 0,
    // marginTop: 530,
    backgroundColor: 'limegreen',
    //padding: 10,
    borderRadius: 5,
    // alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  webView: {
    height: 200,
  },
  buttonContainer2: {
    bottom: 0,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
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
