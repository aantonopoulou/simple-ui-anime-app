// AsyncStorage is used to store data locally on the device
import AsyncStorage from '@react-native-async-storage/async-storage';

// We import the axios package, which is a promise-based HTTP client for JavaScript.
import axios from 'axios';

// We also define a constant called API_URL, which holds the base URL for the Jikan API:
const API_URL = 'https://api.jikan.moe/v4';
// const apiUrl = 'https://api.jikan.moe/v4/anime';
const storageKey = 'youtubeVideoUrl';

// Next, we define an interface called 'Anime', which represents the shape of the data
//we expect to receive from the Jikan API:
interface Anime {
  youtube_url: string | null;
}
// The youtube_url property is a string that holds the URL for the anime's YouTube trailer.

// We then export a function called 'getAnime', which accepts an 'id' parameter (the ID of
// the anime we want to retrieve) and returns a Promise that resolves to an Anime object:
const getAnimeYouTubeUrl = async (animeId: number): Promise<Anime> => {
  // Make a request to the Jikan API using axios
  try {
    const response = await axios.get(`${API_URL}/anime/${animeId}`);
    // Check if the response status is not 200 (i.e. an error occurred)
    if (response.status !== 200) {
      throw new Error('Failed to get anime');
    }
    // Return the youtube_url property of the response data
    const videoUrl: Anime = {
      youtube_url: response.data.youtube_url,
    };
    // Store the video URL in AsyncStorage for future use
    await AsyncStorage.setItem(storageKey, JSON.stringify(videoUrl));
    return videoUrl;
  } catch (error) {
    console.error(error);
    return {youtube_url: null};
  }
};
// Inside the getAnime function, we use the axios.get method to make a GET request to the
// Jikan API with the id parameter included in the URL.
// We then check if the response status is not 200 (which indicates an error), and throw an
// error if necessary. If the response status is 200, we return the youtube_url property of
// the response data.

// In our React Native component file, we import the getAnime function and use the useState hook
// to define a state variable called youtubeUrl, which will hold the YouTube URL for the anime.

// We use the useEffect hook to fetch the anime data when the component mounts. Inside the
//useEffect function, we define an async function called fetchAnime that calls the getAnime
//function with an id of 1 (in this example).

// We then use a try-catch block to handle any errors that may occur during the API call.
// If the call is successful, we set the youtubeUrl state variable to the value returned by the
// getAnime function.

// Finally, we render a Text component that displays the youtubeUrl state variable inside a
// View component.
export default getAnimeYouTubeUrl;
