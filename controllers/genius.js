const axios = require("axios");
require('dotenv').config(); 

const API_KEY = process.env.OxsYae5i3dufQpVRieZcQwT19iScI5fezXJf9V1DcRZfsxRL7f4hSnsG9gm_T0om;  
const BASE_URL = "https://api.genius.com";


const searchSong = async (songTitle) => {
  try {
    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      params: { q: songTitle },
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const hits = searchResponse.data.response.hits;
    if (hits.length > 0) {
      const song = hits[0].result;

     
      const lyricsResponse = await axios.get(song.url);
      const lyrics = extractLyricsFromPage(lyricsResponse.data);

      return {
        title: song.title,
        artist: song.primary_artist.name,
        lyrics: lyrics,
        album_artwork_url: song.song_art_image_url, 
      };
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error fetching song data:", error);
    return null; 
  }
};


const extractLyricsFromPage = (html) => {
  const regex = /<div class="lyrics">[\s\S]*?<p>([\s\S]*?)<\/p>/;
  const match = html.match(regex);
  if (match && match[1]) {
    return match[1].replace(/<br\s*\/?>/g, "\n"); 
  } else {
    return "Lyrics not found";
  }
};

module.exports = {
  searchSong,
};

