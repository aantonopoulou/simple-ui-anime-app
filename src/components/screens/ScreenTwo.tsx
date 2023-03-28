import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getAnimeYouTubeUrl} from '../apiCalls/apiAnime';

const ScreenTwo = ({animeId}: {animeId: number}) => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  useEffect(() => {
    const fetchAnimeData = async () => {
      const url = await getAnimeYouTubeUrl(animeId);
      setYoutubeUrl(JSON.stringify(url));
    };
    fetchAnimeData();
  }, [animeId]);

  return <Text>{youtubeUrl}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'grey',
  },
});
export default ScreenTwo;
