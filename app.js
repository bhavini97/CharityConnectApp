const express = require('express');
const app = express();
const {syncDB} = require('./models/centralized');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const charityProjectsRoutes = require('./routes/charityProjectsRoutes')
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes');
require('./service/cronScheduler'); 

app.use(cors(
        {
            origin:`http://127.0.0.1:5500`,
            credentials:true
        }
    ));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"views")));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","static","landingPage.html"))
})

app.use('/auth',authRouter);

app.use('/charity',charityRoutes);

app.use('/projects',charityProjectsRoutes);

app.use('/order',orderRoutes);

app.use('/user',userRoutes);

app.use('/admin',adminRoutes)

syncDB().then(() => {
    app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
}).catch(err=>{
    console.error('error while starting server',err);
});
