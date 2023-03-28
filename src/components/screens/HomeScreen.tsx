// import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
// import VideoPlayer from '../VideoPlayer';
// import getAnimeYouTubeUrl from '../apiCalls/apiAnime';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const storageKey = 'youtubeVideoUrl';

// const HomeScreen = () => {
//   const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);

//   const getAnimeData = async () => {
//     try {
//       const animeDataString = await AsyncStorage.getItem(storageKey);
//       if (animeDataString !== null) {
//         const animeData = JSON.parse(animeDataString);
//         setYoutubeUrl(animeData.youtube_url);
//       } else {
//         const animeData = await getAnimeYouTubeUrl(1);
//         setYoutubeUrl(animeData.youtube_url);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getAnimeData();
//   }, []);

//   return (
//     <View>
//       {youtubeUrl ? (
//         <VideoPlayer videoUrl={youtubeUrl} />
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

interface Anime {
  youtube_url: string;
}

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime');
        const data = await response.json();
        console.log('DATA:', data); // Log the API response to the console
        const youtubeUrls = data.data.map((anime: Anime) => anime.youtube_url);
        setAnimeList(youtubeUrls);
      } catch (error) {
        console.error('ERROR:', error);
      }
    };

    fetchAnimeList();
  }, []);

  return (
    <View>
      {animeList &&
        animeList.map(url => {
          console.log(url); // Log each URL to the console
          return <Text>{url}</Text>;
        })}
    </View>
  );
};

export default AnimeList;
