const router = require("express").Router();
const axios = require("axios");

router.get("/get-anime-list",async(req,res)=>{
    try {
        const response = await axios.get("https://api.myanimelist.net/v2/anime?q=one&limit=4",{headers:{Authorization:`Bearer ${req.query.access_token}`}});
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;



