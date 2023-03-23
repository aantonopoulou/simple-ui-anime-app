import {useQuery} from 'react-query';
import axios from 'axios';
import {ApiArray} from '../screens/HomeScreen';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0';

const getPosts = async () => {
  try {
    const response = await axios.get<ApiArray>(postsUrl);
    console.log('client getPosts response', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    console.log(`error from getPosts response with status ${error?.status}`);
    console.log(error?.bodystring ? error?.bodystring : error);

    throw error;
  }
};

export const useGetPosts = () => {
  const {isLoading, data} = useQuery(['posts'], getPosts);
  //console.log('Data: ', JSON.stringify(data));
  return {data, isLoading};
};

// https://api.jikan.moe/v4/anime
// https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0';

// const getPostsQuery = () => {
//   const query = useQuery(
//     async () => {
//       const response = await axios.get(postsUrl);
//     },
//     {
//       onSuccess: () => {
//         console.log('onSuccess');
//       },
//       onError: () => {
//         console.log('onError');
//         return {
//           statusCode: 1,
//           errorCode: '',
//           errorDescription: '',
//           responseData: undefined,
//         }
//       },
//     },
//   );
//   return query;
// };

// export default getPostsQuery;
