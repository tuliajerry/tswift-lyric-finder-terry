const router = require("express").Router();
const { searchSong } = require("../controllers/genius");  


router.get("/search", async (req, res) => {
    const songTitle = req.query.song; 
    if (!songTitle) {
        return res.status(400).render('index', { error: "Song title is required" });  
    }

    try {
        const songData = await searchSong(songTitle); 

        if (songData) {
           
            res.render('index', { song: songData, lyrics: songData.lyrics });
        } else {
           
            res.render('index', { error: 'Song not found' });
        }
    } catch (error) {
        console.error("Error fetching song data:", error);
        res.render('index', { error: 'Something went wrong while searching for the song' });  
    }
});

module.exports = router;
