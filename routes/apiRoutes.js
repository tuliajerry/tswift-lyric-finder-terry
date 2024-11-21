const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { searchSong } = require("../services/genius"); 


router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


router.get("/search", async (req, res) => {
    const songTitle = req.query.song; 

   
    if (!songTitle) {
        return res.status(400).send({ error: "Song title is required" });
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
