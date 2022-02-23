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
 *               - company:
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
 *               id:
 *                 type: string
 *               primaryContact:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 name:
 *                   type: string
 *                 designation:
 *                   type: string
 *                 phone:
 *                   type: string
 *               secondaryContact:
 *                 - id:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   name:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   phone:
 *                     type: string
 *               company:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 website:
 *                   type: string
 *                   format: uri
 *                 category:
 *                   type: string
 *               jobDesignation:
 *                 type: string
 *               jobDesc:
 *                 type: string
 *               postingPlace:
 *                 type: string
 *               branches:
 *                 - branch:
 *                     type: string
 *               skillsRequired:
 *                 - type: string
 *               eligCriteria:
 *                 type: string
 *               resume:
 *                 type: boolean
 *               testType:
 *                 type: string
 *               otherRound:
 *                 - type: string
 *               totalRounds:
 *                 type: number
 *               offerRange:
 *                 type: string
 *               ctc:
 *                 type: number
 *               ctcBreakup:
 *                 type: string
 *               bondDetail:
 *                 type: string
 *               uploadedDocs:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               gradYear:
 *                 type: number
 *             example:
 *              primaryContact:
 *                name: lorem
 *                email: example@gmail.com
 *                designation: HR
 *              secondaryContact:
 *              - name: lorem
 *                email: example@gmail.com
 *              company:
 *                name: Test Company
 *                website: https://www.test-company.com
 *                category: Software / IT
 *              jobDesignation: SDE
 *              jobDesc: Lorem ipsum dolor sit amet consectetur adipisicing elit.     Expedita, consequuntur.
 *              postingPlace: Delhi
 *              branches:
 *              - branch: 621455620b0f1e2418e49c2e
 *              - branch: 62146dcf767f815e9484ac26
 *              skillsRequired:
 *              - C,C++
 *              eligCriteria: Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequatur, possimus.
 *              resume: 'true'
 *              testType: Technical
 *              otherRound:
 *              - GD
 *              totalRounds: '3'
 *              ctc: '25'
 *              ctcBreakup: Lorem ipsum dolor sit amet
 *              createdBy: 6210f93623d75359239b903e
 *              gradYear: '2023'
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Jnf'
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
 *                     $ref: '#/components/schemas/summarisedJnf'
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
 *               id:
 *                 type: string
 *               primaryContact:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 name:
 *                   type: string
 *                 designation:
 *                   type: string
 *                 phone:
 *                   type: string
 *               secondaryContact:
 *                 - id:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   name:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   phone:
 *                     type: string
 *               company:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 website:
 *                   type: string
 *                   format: uri
 *                 category:
 *                   type: string
 *               jobDesignation:
 *                 type: string
 *               jobDesc:
 *                 type: string
 *               postingPlace:
 *                 type: string
 *               branches:
 *                 - branch:
 *                     type: string
 *               skillsRequired:
 *                 type: string
 *               eligCriteria:
 *                 type: string
 *               resume:
 *                 type: boolean
 *               testType:
 *                 type: string
 *               otherRound:
 *                 - type: string
 *               totalRounds:
 *                 type: number
 *               offerRange:
 *                 type: string
 *               ctc:
 *                 type: number
 *               ctcBreakup:
 *                 type: string
 *               bondDetail:
 *                 type: string
 *               uploadedDocs:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               gradYear:
 *                 type: number
 *             example:
 *               primaryContact:
 *                 name: lorem
 *                 email: example2@gmail.com
 *                 designation: HR
 *               jobDesignation: Developer
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
