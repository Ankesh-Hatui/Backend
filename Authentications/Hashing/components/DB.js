import mongoose from "mongoose";
let uri='mongodb://127.0.0.1:27017/';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(`${uri}Test`).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log('Error in connectng to DB',err);
});

const People=new mongoose.Schema({
    id:Number,
    Name:{
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
    }
});

const people=mongoose.model('people',People);

export default people;