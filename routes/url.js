const express=require('express');
const {handleGenerateShortURL, getRedirectURL, getAnalytics} =require("../controllers/url")

const router=express.Router();

router.post('/',handleGenerateShortURL)
router.get('/:shortid',getRedirectURL)
router.get('/analytics/:shortid',getAnalytics)

module.exports=router;