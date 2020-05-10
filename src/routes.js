const router = require('express').Router();

// Users
router.delete('users/', () => {});
router.post('users/authenticate', () => {});
router.post('users/register', () => {});
router.put('users/', () => {});

// Items
router.delete('items/', () => {});
router.post('items/create', () => {});
router.put('items/', () => {});
router.get('items/', () => {})