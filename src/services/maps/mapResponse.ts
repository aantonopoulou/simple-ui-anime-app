interface Anime {
  id: number;
  title: string;
  trailer: {
    youtube: {
      id: string;
    };
  };
}

interface MappedAnime {
  id: number;
  title: string;
  trailerId: string;
}

export const mapResponse = (anime: Anime): MappedAnime => ({
  id: anime.id,
  title: anime.title,
  trailerId: anime.trailer.youtube.id,
});

// export const mapResponse = (animeList: Anime[]): MappedAnime[] => {
//   // console.log(animeList);
//   return animeList.map(anime => ({
//     id: anime.id,
//     title: anime.title,
//     trailerId: anime.trailer.youtube.id,
//   }));
// };
