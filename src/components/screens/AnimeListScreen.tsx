import React, {useState} from 'react';
import getAnimeQuery from '../../services/apiCalls/getAnimeQuery';
import {mapResponse} from '../../services/maps/mapResponse';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {useQueryClient} from 'react-query';

const AnimeListScreen = () => {
  const [animeNumber, setAnimeNumber] = useState('');
  // call the getAnimeQuery to fetch the data for an anime with ID 1
  const {data, isLoading, isError} = getAnimeQuery(Number(animeNumber));

  if (!animeNumber) {
    return (
      <View style={styles.container}>
        <Text>Please enter an anime number:</Text>
        <TextInput
          style={styles.input}
          value={animeNumber}
          onChangeText={setAnimeNumber}
          keyboardType="numeric"
          //onSubmitEditing={() => {}}
        />
      </View>
    );
  }

  // if (!data) {
  //   return <Text>Loading anime data...</Text>;
  // }
  if (isLoading) {
    return <Text>Loading anime data...</Text>;
  }

  if (isError || !data) {
    return <Text>Error loading anime data</Text>;
  }

  // get the trailer object from the anime data
  const trailer = data.data?.trailer;
  const youtubeId = trailer?.youtube_id;
  const imageUrl = trailer?.images?.image_url;
  const embedUrl = trailer?.embed_url;
  const url = trailer?.url;
  console.log({embedUrl});
  console.log({url});
  console.log({imageUrl});
  // let Image_Http_URL = {uri: imageUrl};
  // display the embed URL for the trailer
  const errorMessage = 'Sorry, the video cannot be played.';

  if (!embedUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    // <Text>{url}</Text>

    <WebView
      source={{uri: embedUrl}}
      style={{height: 200, resizeMode: 'stretch', margin: 5}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    padding: 10,
    marginBottom: 10,
  },
});
export default AnimeListScreen;
