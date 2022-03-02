const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gradYearValidation = require('../../validations/gradYear.validation');
const gradYearController = require('../../controllers/gradYear.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageGradYear'), validate(gradYearValidation.createGradYear), gradYearController.createGradYear);

router
  .route('/:gradYearId')
  .get(auth('getGradYear'), validate(gradYearValidation.getGradYear), gradYearController.getGradYear)
  .patch(auth('manageGradYear'), validate(gradYearValidation.updateGradYear), gradYearController.updateGradYear);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: gradYear
 *   description: gradYear management and retrieval
 */

/**
 * @swagger
 * /gradYear:
 *   post:
 *     summary: Create a gradYear
 *     description: Only admins can create a gradYear.
 *     tags: [gradYear]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placement:
 *                 type: number
 *               inf2m:
 *                 type: number
 *               inf6m:
 *                 type: number
 *             example:
 *               placement: 2023
 *               inf2m: 2024
 *               inf6m: 2023
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/gradYear'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /gradYear/{id}:
 *   get:
 *     summary: Get a gradYear
 *     description: Get details of a particular gradYear.
 *     tags: [gradYear]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: gradYear id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/gradYear'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a gradYear
 *     description: Only admins can update a gradYear.
 *     tags: [gradYear]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: gradYear id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placement:
 *                 type: number
 *               inf2m:
 *                 type: number
 *               inf6m:
 *                 type: number
 *             example:
 *               placement: 2023
 *               inf2m: 2024
 *               inf6m: 2023
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/gradYear'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
