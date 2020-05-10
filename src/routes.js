const router = require('express').Router();
const mid = require('./middleware');
const usersctrl = require('./controllers/users');
const itemsctrl = require('./controllers/items');

// Users
router.delete('/users/', mid.deleteUser, mid.auth, usersctrl.delete);
router.post('/users/authenticate', mid.login, usersctrl.login);
router.post('/users/register', mid.createUser, usersctrl.create);
router.put('/users/', mid.updateUser, mid.auth, usersctrl.update);

// Items
router.delete('/items/', mid.deleteItem, mid.auth, itemsctrl.delete);
router.post('/items/', mid.createItem, mid.auth, itemsctrl.create);
router.put('/items/', mid.updateItem, mid.auth, itemsctrl.update);
router.get('/items/', mid.listItems, mid.auth, itemsctrl.list);

module.exports = router;