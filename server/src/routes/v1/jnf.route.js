const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jnfValidation = require('../../validations/jnf.validation');
const jnfController = require('../../controllers/jnf.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageJnfs'), validate(jnfValidation.createJnf), jnfController.createJnf)
  .get(auth('getJnfs'), validate(jnfValidation.getJnfs), jnfController.getJnfs);

router
  .route('/:jnfId')
  .get(auth('getJnfs'), validate(jnfValidation.getJnf), jnfController.getJnf)
  .patch(auth('manageJnfs'), validate(jnfValidation.updateJnf), jnfController.updateJnf)
  .delete(auth('manageJnfs'), validate(jnfValidation.deleteJnf), jnfController.deleteJnf);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Jnfs
 *   description: Jnf management and retrieval
 */

/**
 * @swagger
 * /jnfs:
 *   post:
 *     summary: Only users can create a jnf
 *     description: Only users can create jnfs.
 *     tags: [Jnfs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - primaryContact:
 *                 - name
 *                 - email
 *               - comapny:
 *                 - name
 *                 - website
 *                 - category
 *               - jobDesignation
 *               - jobDesc
 *               - postingPlace
 *               - branches
 *               - eligCriteria
 *               - testType
 *               - otherRound
 *               - ctc
 *               - ctcBreakup
 *               - gradYear
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [jnf, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: jnf
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Jnf'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all jnfs
 *     description: Admins can retrieve all jnfs while users can retrieve only their jnfs.
 *     tags: [Jnfs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: ObjectId
 *         description: User ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of jnfs (default 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (default 10)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Jnf'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /jnfs/{id}:
 *   get:
 *     summary: Get a jnf
 *     description: Both admins and users can get a particular jnf by its id
 *     tags: [Jnfs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Jnf id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Jnf'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a jnf
 *     description: Only users can update the jnfs created by them.
 *     tags: [Jnfs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Jnf id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Jnf'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a jnf
 *     description: Only users can delete the jnfs created by them.
 *     tags: [Jnfs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Jnf id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
