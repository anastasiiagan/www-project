const router = require('express').Router();
const Recommendation = require('../models/Recommendation');
const {recommendationValidation} = require('../validation');
const verify = require('./verifyToken');

//get all recommendation
router.get('/', verify, async (req, res) => {
    try{
        const recommendations = await Recommendation.find();
        res.send(recommendations);
    } catch(err) {
        res.status(400).send(err);
    }
});

//Post recommendation
router.post('/recommend', verify, async (req, res) => {
    //Validate data
    const {error} = recommendationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if link already in db
    const linkExist = await Recommendation.findOne({link: req.body.link});
    if(linkExist) return res.status(400).send('Link already in database');

    //Create a new recommendation
    const recommendation = new Recommendation({
        link: req.body.link,
        description: req.body.description,
        category: (req.body.category || "all")
    });
    try{
        const savedRecommendation = await recommendation.save();
        res.send({recommendation: recommendation._id});
    } catch(err) {
        res.status(400).send(err);
        //res.json({message: err});
    }
});

//Get a recommendation
router.get('/:recId', verify, async (req,res) => {
    //console.log(req.params.postId);
    try{
        const  recommendation = await Recommendation.findById(req.params.recId);
        res.send(recommendation);
    } catch(err) {
        res.status(400).send(err);
    }
});

//Update a recommendation
router.patch('/like/:recId', verify, async (req,res) => {
    try {
        const  recommendation = await Recommendation.findById(req.params.recId);
        let likesQuantity = recommendation.likes + 1;
        const updatedRec = await Recommendation.updateOne(
            {_id: req.params.recId}, 
            { $set: {likes: likesQuantity}}
        );
        res.send({likes: updatedRec.likes});
    } catch (err) {
        res.status(400).send(err);
    }
});

//Delete recommendation
router.delete('/:recId', async (req, res) => {
    try {
        const removedRec = await Recommendation.remove({_id: req.params.recId});
        res.send(removedRec);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;