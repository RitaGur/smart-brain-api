import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage, HandleApiCall } from './controllers/image.js';

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
        },
    ]
}

app.get('/', (request, response) => {
    response.send(database.users);
})

app.post('/signin', (request, response) => { handleSignin(request, response, db, bcrypt) })

app.post('/register', (request, response) => { handleRegister(request, response, db, bcrypt) })

app.get('/profile/:id', (request, response) => { handleProfileGet(request, response, db) })

app.put('/image', (request, response) => { handleImage(request, response, db) })

app.post('/imageurl', (request, response) => { HandleApiCall(request, response) })

app.listen(3001, () => {
    console.log('app is running on port 3001')
})