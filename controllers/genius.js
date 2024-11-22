const axios = require("axios");
const cheerio = require("cheerio");
require('dotenv').config(); 

const API_KEY = process.env.GENIUS_API_KEY; 
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

     
      const lyrics = await fetchLyrics(song.url);

     
      return {
        title: song.title,
        artist: song.primary_artist.name,
        album_artwork_url: song.song_art_image_url,
        lyrics: lyrics || "Lyrics not found", 
        url: song.url
      };
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error fetching song data:", error.message);
    return null; 
  }
};


const fetchLyrics = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data); 

    
    const lyrics = $("div[class^='Lyrics__Container']").text().trim();
    return lyrics;
  } catch (error) {
    console.error("Error fetching lyrics:", error.message);
    return null;
  }
};

module.exports = {
  searchSong,
};
