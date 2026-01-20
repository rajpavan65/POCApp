const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Create order (checkout)
router.post('/', authMiddleware, (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    // Get product details
    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const totalAmount = product.price * quantity;

        // Create order
        db.run(
            'INSERT INTO orders (user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?)',
            [userId, productId, quantity, totalAmount],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create order' });
                }

                res.status(201).json({
                    message: 'Order placed successfully',
                    order: {
                        id: this.lastID,
                        productId,
                        productName: product.name,
                        quantity,
                        totalAmount,
                        status: 'placed'
                    }
                });
            }
        );
    });
});

// Get user orders
router.get('/', authMiddleware, (req, res) => {
    const userId = req.user.userId;

    db.all(
        `SELECT orders.*, products.name as product_name, products.description as product_description
     FROM orders 
     JOIN products ON orders.product_id = products.id 
     WHERE orders.user_id = ?
     ORDER BY orders.created_at DESC`,
        [userId],
        (err, orders) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch orders' });
            }
            res.json(orders);
        }
    );
});

// Get single order
router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    db.get(
        `SELECT orders.*, products.name as product_name, products.description as product_description
     FROM orders 
     JOIN products ON orders.product_id = products.id 
     WHERE orders.id = ? AND orders.user_id = ?`,
        [id, userId],
        (err, order) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json(order);
        }
    );
});

module.exports = router;
