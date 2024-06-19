
const express = require("express"); // Import the express module
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/Users');
const RegisterUser = require('./Models/Auth');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')

const app = express(); // Create an instance of an Express application

app.use(cors());
app.use(express.json()); // Middleware to parse JSON data from requests

mongoose.connect('mongodb+srv://swamyvaleti999:swamy@cluster0.y4bquho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/createUser', (req, res) => { // Added leading slash to the route path
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let exist = await RegisterUser.findOne({ email });
        if (!exist) {
            return res.status(400).send('user not found');
        }
        if (exist.password !== password) {
            return res.status(400).send('Invalid credentials')
        }

        let payload = {
            user: {
                id: exist.id
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                // console.log(res.json({ token }))
                return res.json({ token })
            })

    } catch (error) {
        console.log(error)
        return res.status(500).send('server errpor')
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try {
        let exist = await RegisterUser.findById(req.user.id);
        if (!exist) {
            return res.status(400).send('user not found')
        }
        res.json(exist)
    } catch (error) {
        console.log(error)
    }
})

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        let exist = await RegisterUser.findOne({ email });
        if (exist) {
            return res.status(400).send('User already exist');
        }

        if (password !== confirmpassword) {
            return res.status(400).send('Passwords are not matching');
        };

        let newUser = new RegisterUser({
            username,
            email,
            password,
            confirmpassword
        });

        await newUser.save();
        res.status(200).send('Registered successsfully');

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
})

app.get('/', (req, res) => {
    UserModel.find({}).then(user => res.json(user)).catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id }).then(user => res.json(user)).catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age }).then(user => res.json(user)).catch(err => res.json(err))
})


app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id }).then(user => res.json(user)).catch(err => res.json(err))

})

app.listen(4001, () => {
    console.log('server is running on port 4001');
});
