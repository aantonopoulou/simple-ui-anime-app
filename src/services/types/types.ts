export interface Anime {
  mal_id: number;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  type: string;
  episodes: number | null;
  score: number | null;
  start_date: string | null;
  end_date: string | null;
  members: number;
  rated: string | null;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  source: string;
  season: string | null;
  year: number | null;
}
