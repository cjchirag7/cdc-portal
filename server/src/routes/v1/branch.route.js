const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const branchValidation = require('../../validations/branch.validation');
const branchController = require('../../controllers/branch.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBranches'), validate(branchValidation.createBranch), branchController.createBranch)
  .get(auth('getBranches'), validate(branchValidation.getBranches), branchController.getBranches);

router
  .route('/:branchId')
  .get(auth('getBranches'), validate(branchValidation.getBranch), branchController.getBranch)
  .patch(auth('manageBranches'), validate(branchValidation.updateBranch), branchController.updateBranch)
  .delete(auth('manageBranches'), validate(branchValidation.deleteBranch), branchController.deleteBranch);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management and retrieval
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a branch
 *     description: Only admins can create other branches.
 *     tags: [Branches]
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
 *               - courseType
 *               - courseStruct
 *             properties:
 *               name:
 *                 type: string
 *                 description: name and courseType collectively should be unique
 *               courseType:
 *                 type: string
 *               courseStruct:
 *                 type: string
 *             example:
 *               name: fake branch
 *               courseType: B Tech
 *               courseStruct: www.example.com
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Branch'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBranch'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all branches
 *     description: Both users and admins can retrieve all branches.
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseType
 *         schema:
 *           type: string
 *         description: Course type of Branch
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
 *                     $ref: '#/components/schemas/Branch'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get a branch
 *     description: Get details of a particular branch.
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Branch'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a branch
 *     description: Only admins can update a branch.
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name and courseType collectively should be unique
 *               courseType:
 *                 type: string
 *               courseStruct:
 *                 type: string
 *             example:
 *               name: fake branch
 *               courseType: B Tech
 *               courseStruct: www.example.com
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Branch'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBranch'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a branch
 *     description: Only admins can delete a branch.
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch id
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
