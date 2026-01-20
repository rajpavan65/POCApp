const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
    db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.json(products);
    });
});

// Get single product
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch product' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    });
});

// Add new product (requires authentication)
router.post('/', authMiddleware, (req, res) => {
    const { name, price, description } = req.body;
    const userId = req.user.userId;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    db.run(
        'INSERT INTO products (name, price, description, user_id) VALUES (?, ?, ?, ?)',
        [name, price, description || '', userId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create product' });
            }

            res.status(201).json({
                message: 'Product created successfully',
                product: {
                    id: this.lastID,
                    name,
                    price,
                    description: description || '',
                    user_id: userId
                }
            });
        }
    );
});

// Delete product (requires authentication, only owner)
router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.user_id !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this product' });
        }

        db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete product' });
            }

            res.json({ message: 'Product deleted successfully' });
        });
    });
});

module.exports = router;
