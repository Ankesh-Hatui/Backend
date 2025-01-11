import ex from 'express';
import bodyParser from 'body-parser';
import people from './components/DB.js';
import bcrypt from 'bcrypt';

const app=ex();
const port=3000;
let saltingRound=10;

app.use(bodyParser.urlencoded({extended:true}));
app.use(ex.json());

app.get('/',(req,res)=>{
    res.render('index.ejs',{data:'Here I will insert it'});
});

app.get('/register',(req,res)=>{
    res.render('Register.ejs');
});

app.post('/register',async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        bcrypt.hash(password,saltingRound,async(err,Hash)=>{
            let rp=await people.create({
                Name:name,
                Email:email,
                Password:Hash
            });
            res.redirect('/');
        });
        
    }
    catch(err){
        console.log('Error in Registering');
        res.redirect('/');
    }
});

app.get('/login',(req,res)=>{
    res.render('Login.ejs');
});
app.post('/login',async(req,res)=>{
    try{
        let {email,password} = req.body;
        console.log(req.body);
        let rp=await people.find({Email:email});
        
        
        if (rp.length==0){
            res.redirect('/');
        }
        else{
            let storedpw=rp[0].Password;
            bcrypt.compare(password,storedpw,function (err,result){
                if (err){
                    console.log("Here is the bcrypt error",err);
                    res.redirect('/');
                }
                if (result){
                    console.log("Password matched");
                    res.render('index.ejs',{
                        data:'Hare is the data',
                        secret:'I am GOD',
                        loggedin:true});
                }
                else{
                    console.log('Password not matched');
                    res.redirect('/');
                }
            });
              
        }
    }
    catch(err){
        console.log('error in login',err);
    }
});

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});