const express = require("express")
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('./userSchema')
const jwt = require('jsonwebtoken');

const jwt_SECRET = 'hgguhf'


// middleware
app.use(express.json());
app.use(cors());


// DataBase
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect("mongodb://0.0.0.0:27017", options)
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));


// collection
const User = mongoose.model("MERNproj2");




// API
// app.post('/post', async (req, res) => {

//     const { name } = req.body;
//     try {
//         if (name === "keval") {
//             res.send({ status: "success" })
//         }
//         else {
//             res.send({ status: "err" })
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// })


// reg API
app.post('/reg', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(422).json({ error: 'Email Already Exist' })
        }
        else {
            await User.create({
                name,
                email,
                password
            })
            res.send({ status: 'success' })

        }

    }
    catch (error) {
        console.log(error);
    }
})


// login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const exist = await User.findOne({ email })

        if (!exist) {
            return res.json({ error: 'User not Found' })
        }
        if ((password === exist.password)) {
            const token = jwt.sign({ email: exist.email }, jwt_SECRET);
            if (res.status(201)) {
                return res.json({ status: 'ok', data: token });
            }
            else {
                return res.json({ error: 'error' })
            }
        }

        return res.json({ status: 'error', error: 'invalid password' });


    } catch (error) {
        console.log(error);
    }
})



// getUserData
app.post('/home', async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, jwt_SECRET);
        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                return res.json({ status: 'ok', data: data });
            })
            .catch((err) => {
                return res.json({ status: 'err', data: err });
            })

    } catch (error) {
        console.log(error);
    }
})

// Server
app.listen(5000, () => console.log('listening on 5000'));
