const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// GET ALL users
const getAllUsers = function (req, res) {
    console.log(req.utils.capitalize())
    const users = JSON.parse(fs.readFileSync(req.dbs.users, 'utf-8'));
    res.json(users);
}

// GET User byID
const getUsersByID = function (req, res) {
    const users = JSON.parse(fs.readFileSync(req.dbs.users, 'utf-8'));
    res.json(users.find((u) => {
        return u.ID === req.params.ID;
    }));
}

// CREATE user
const createUsers = function (req, res) {
    const users = JSON.parse(fs.readFileSync('./SRC/routers/users/users.json', 'utf-8'));

    if (!!users.find(u => u.email === req.body.email)) {
        res.status(400).send('email already exist');
    } else {
        const newUser = { ...req.body, ID: uuidv4() };
        users.push(newUser);
        fs.writeFileSync('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
        res.send(newUser);
    }
}

// UPDATE user by ID
const editUserbyID = function (req, res) {
    const users = JSON.parse(fs.readFileSync('./SRC/routers/users/users.json', 'utf-8'));
    let userByID = users.find(u => u.ID === req.params.ID);
    userByID = { ...userByID, ...req.body };

    indexUsers = users.findIndex((u => u.ID == userByID.ID));
    users[indexUsers] = userByID;
    fs.writeFileSync('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
    res.json(users[indexUsers]);
}

// DELETE user
const deleteUserByID = function (req, res) {
    let users = JSON.parse(fs.readFileSync('./SRC/routers/users/users.json', 'utf-8'));
    users = users.filter(u => u.ID !== req.params.ID);
    fs.writeFileSync('./SRC/routers/users/users.json', JSON.stringify(users), 'utf-8');
    res.send(`the User with ID:${req.params.ID} was deleted`);
}

module.exports = {
    getAllUsers,
    getUsersByID,
    createUsers,
    editUserbyID,
    deleteUserByID
}