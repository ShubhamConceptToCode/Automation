const User = require('../Model/userModel');
const Card = require('../Model/cardModel');

exports.getUserData = async (req, res) => {
    try{
    
    const user = await User.findOne({ customerId : req.body.customer_id });
    res.status(200).send({
        status: 'success',
        body: user
     })
    }
    catch(err){
        console.log(err.message, "getting error form getData");
        res.status(404).send({ 
            status: '404 Not Found',
            message: err.message });
    }
}

exports.getCardData= async (req, res) => {
    try{
    console.log("this is body", req.body.customer_id);
    const card = await Card.findOne({customer:req.body.customer_id});
    console.log("this is card",card);
    res.status(200).send({
        status: 'success',
        body:card
    });
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            status : 'error',
            message:err.message})
    }
}