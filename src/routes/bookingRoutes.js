const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - userId
 *         - serviceId
 *         - date
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: ID automatically created by MongoDB
 *         userId:
 *           type: string
 *           description: ID of the user who booked
 *         serviceId:
 *           type: string
 *           description: ID of the service booked
 *         date:
 *           type: string
 *           format: date-time
 *           description: Booking date
 *         status:
 *           type: string
 *           description: Booking status
 *           enum: [pending, confirmed, cancelled, completed]
 *         notes:
 *           type: string
 *           description: Booking notes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Booking creation time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Latest booking update time
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API manage bookings
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
  *     summary: Create new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - date
 *             properties:
 *               serviceId:
 *                 type: string
 *                 description: ID of service
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Booking date
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', (req, res) => {
  // Logic để tạo booking
  res.status(201).json({ message: 'Booking created' });
});

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get list of bookings of user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *         description: Filter bookings by status
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter bookings from date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter bookings to date
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get('/', (req, res) => {
  // Logic để lấy danh sách booking
  res.status(200).json([]);
});

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get detail of a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of booking
 *     responses:
 *       200:
 *         description: Booking detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.get('/:id', (req, res) => {
  // Logic để lấy chi tiết booking
  res.status(200).json({});
});

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update booking information
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Booking date
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.put('/:id', (req, res) => {
  // Logic để cập nhật booking
  res.status(200).json({});
});

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled, completed]
 *                 description: New status of booking
 *     responses:
 *       200:
 *         description: Booking status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.patch('/:id/status', (req, res) => {
  // Logic để cập nhật trạng thái booking
  res.status(200).json({});
});

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of booking
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete('/:id', (req, res) => {
  // Logic để xóa booking
  res.status(200).json({ message: 'Booking deleted' });
});

module.exports = router;
