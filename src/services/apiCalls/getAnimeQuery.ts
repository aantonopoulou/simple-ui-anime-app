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

import {useQuery} from 'react-query';
import axios from 'axios';

const getAnimeQuery = (id: number) => {
  return useQuery(['anime', id], async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return response.data;
  });
};

export default getAnimeQuery;
