// import {useQuery} from 'react-query';
// import {client} from '../client/apiClient';
// import {Anime} from '../types/types';
// import axios from 'axios';
// interface Anime {
//   id: number;
//   title: string;
//   trailer: {
//     youtube: {
//       id: string;
//     };
//   };
// }

// import {useQuery} from 'react-query';
// import axios from 'axios';

// const getAnimeQuery = (id: number) => {
//   return useQuery(['anime', id], async () => {
//     const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
//     return response.data;
//   });
// };

// // export default getAnimeQuery;
// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import {View, Text} from 'react-native';

// interface Anime {
//   mal_id: number;
//   title: string;
// }

// const AnimeList: any = () => {
//   const [animeList, setAnimeList] = useState<Anime[]>([]);

//   useEffect(() => {
//     const fetchAnimeList = async () => {
//       const response = await axios.get('https://api.jikan.moe/v4/anime');
//       const data = response.data.data;
//       const animeList = data.map((anime: Anime) => ({
//         mal_id: anime.mal_id,
//         title: anime.title,
//       }));
//       setAnimeList(animeList);
//     };
//     fetchAnimeList();
//   }, []);

//   return (
//     <View>
//       {animeList.map((anime: Anime) => (
//         <Text key={anime.mal_id.toString()}>{anime.title}</Text>
//       ))}
//     </View>
//   );
// };

import axios from 'axios';
import {Anime} from '../types/types';

// interface Anime {
//   id: number;
//   title: string;
//   trailer: string;
// }

const fetchAnimeData = async (): Promise<Anime[]> => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime');
    console.log('response.data = ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime data:', error);
    console.log('Error object:', error.toJSON());
    return [];
  }
};

const fetchData = async () => {
  try {
    const animeList = await fetchAnimeData();
    console.log('Anime List:', animeList);
    return animeList;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

//fetchData();

export default fetchData;
