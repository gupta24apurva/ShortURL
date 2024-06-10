const shortid = require("shortid");
const URL=require("../models/url")

async function handleGenerateShortURL(req,res){
    const body=req.body;
    if(!body.url)
        return res.status(400).json({error: 'URL is required'});

    const shortID=shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({id: shortID})
}

async function getRedirectURL(req,res){
    const shortId=req.params.shortid;
    const entry=await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                    timeStamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectURL);
}

async function getAnalytics(req,res){
    const shortId=req.params.shortid;
    const result= await URL.findOne({shortId});
    return res.json(
        {
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        }
    )
}

module.exports={
    handleGenerateShortURL, getRedirectURL,getAnalytics
}