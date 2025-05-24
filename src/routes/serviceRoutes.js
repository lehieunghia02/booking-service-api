const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API manage services
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter services by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', (req, res) => {
  
  res.status(200).json([]);
});

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get detail of a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of service
 *     responses:
 *       200:
 *         description: Service detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
router.get('/:id', (req, res) => {
 
  res.status(200).json({});
});

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *                 description: Service name
 *               description:
 *                 type: string
 *                 description: Service description
 *               price:
 *                 type: number
 *                 description: Service price
 *               duration:
 *                 type: number
 *                 description: Service duration (minutes)
 *               image:
 *                 type: string
 *                 description: Service image URL
 *               category:
 *                 type: string
 *                 description: Service category
 *               isActive:
 *                 type: boolean
 *                 description: Service active status
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid data
 */
router.post('/', (req, res) => {

  res.status(201).json({});
});

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update service information
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Service name
 *               description:
 *                 type: string
 *                 description: Service description
 *               price:
 *                 type: number
 *                 description: Service price
 *               duration:
 *                 type: number
 *                 description: Service duration (minutes)
 *               image:
 *                 type: string
 *                 description: Service image URL
 *               category:
 *                 type: string
 *                 description: Service category
 *               isActive:
 *                 type: boolean
 *                 description: Service active status
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.put('/:id', (req, res) => {
 
  res.status(200).json({});
});

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of service
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.delete('/:id', (req, res) => {
 
  res.status(200).json({ message: 'Service deleted' });
});

module.exports = router; 