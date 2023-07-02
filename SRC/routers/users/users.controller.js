import fs from 'node:fs/promises'
import {HttpError} from '../../utils/httpError.js';
import {v4 as uuid} from "uuid";

// GET ALL users
const getAllUsers = async function (req, res) {
    try {
        console.log(req.utils.capitalize())
        const users = JSON.parse(await fs.readFile(req.dbs.users, 'utf-8'));
        res.json(users);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// GET User byID
const getUsersByID = async function (req, res) {
    try {
        const users = JSON.parse(await fs.readFile(req.dbs.users, 'utf-8'));
        res.json(users.find((u) => {
            return u.ID === req.params.ID;
        }));
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// CREATE user
const createUsers = async function (req, res) {
    try {
        const users = JSON.parse(await fs.readFile('./SRC/routers/users/users.json', 'utf-8'));
    
        if (!!users.find(u => u.email === req.body.email)) {
            throw new HttpError ('email already exist', 400)
        } else {
            const newUser = { ...req.body, ID: uuid()};
            users.push(newUser);
            await fs.writeFile('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
            res.send(newUser);
        }
        
    } catch (err) {
        res.status(404).send(err.message)
    }
}

// UPDATE user by ID
const editUserbyID = async function (req, res) {
    try {
        const users = JSON.parse(await fs.readFile('./SRC/routers/users/users.json', 'utf-8'));
        let userByID = users.find(u => u.ID === req.params.ID);
        if (!userByID) {
            throw new HttpError ('user not exist', 404)
        } else {
            userByID = { ...userByID, ...req.body };
            const indexUsers = users.findIndex((u => u.ID == userByID.ID));
            users[indexUsers] = userByID;
            await fs.writeFile('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
            res.json(users[indexUsers]);
        }
    } catch (err) {
        res.status(404).send(err.message)
    }
}

// DELETE user
const deleteUserByID = async function (req, res) {
    try {
        let users = JSON.parse(await fs.readFile('./SRC/routers/users/users.json', 'utf-8'));
        users = users.filter(u => u.ID !== req.params.ID);
        await fs.writeFile('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
        res.send(`the User with ID:${req.params.ID} was deleted`);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

export {
    getAllUsers,
    getUsersByID,
    createUsers,
    editUserbyID,
    deleteUserByID
};