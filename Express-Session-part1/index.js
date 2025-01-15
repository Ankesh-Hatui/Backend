import ex from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const app=ex();
const port=3000;

app.use(session({
    secret:'ssh,it is secret',
    resave:false,
    saveUninitialized:false
}));

app.get('/set-session',(req,res)=>{
    req.session.username='Ankesh';
    res.send('<h1>You have created session</h1>');
});

app.get('/get-session',(req,res)=>{
    if (req.session.username){
        res.send(`<h1>Hello, ${req.sessionID}</h1>`);
    }
});
app.listen(port);