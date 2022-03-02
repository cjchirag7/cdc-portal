const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const infValidation = require('../../validations/inf.validation');
const infController = require('../../controllers/inf.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageInfs'), validate(infValidation.createInf), infController.createInf)
  .get(auth('getInfs'), validate(infValidation.getInfs), infController.getInfs);

router
  .route('/:infId')
  .get(auth('getInfs'), validate(infValidation.getInf), infController.getInf)
  .patch(auth('manageInfs'), validate(infValidation.updateInf), infController.updateInf)
  .delete(auth('manageInfs'), validate(infValidation.deleteInf), infController.deleteInf);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Infs
 *   description: Inf management and retrieval
 */

/**
 * @swagger
 * /infs:
 *   post:
 *     summary: Only users can create an inf
 *     description: Only users can create infs.
 *     tags: [Infs]
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
 *               - mode
 *               - branches
 *               - eligCriteria
 *               - testType
 *               - otherRound
 *               - stipend
 *               - isPPO
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
 *               mode:
 *                 type: string
 *                 enum: [physical,virtual]
 *               postingPlace:
 *                 type: string
 *                 description: required only when mode is physical
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
 *               stipend:
 *                 type: number
 *               isPPO:
 *                 type: boolean
 *               ctcDetails:
 *                 type: string
 *                 description: required only when isPPO is true
 *               bondDetail:
 *                 type: string
 *               uploadedDocs:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               gradYear:
 *                 type: number
 *               is2m:
 *                 type: boolean
 *               is6mDual:
 *                 type: boolean
 *               is6mMba:
 *                 type: boolean
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
 *              mode: physical
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
 *              stipend: '2'
 *              isPPO: 'true'
 *              ctcDetails: Lorem ipsum dolor sit amet
 *              createdBy: 6210f93623d75359239b903e
 *              gradYear: '2023'
 *              is2m: 'true'
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Inf'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all infs
 *     description: Admins can retrieve all infs while users can retrieve only their infs.
 *     tags: [Infs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: ObjectId
 *         description: User ID
 *       - in: query
 *         name: is2m
 *         schema:
 *           type: boolean
 *         description: whether 2 month intern offer
 *       - in: query
 *         name: is6mDual
 *         schema:
 *           type: boolean
 *         description: whether 6 month intern offer for dual degree/int. m-tech
 *       - in: query
 *         name: is6mMba
 *         schema:
 *           type: boolean
 *         description: whether 6 month intern offer for m-tech/mba
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
 *         description: Maximum number of infs (default 10)
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
 *                     $ref: '#/components/schemas/summarisedInf'
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
 * /infs/{id}:
 *   get:
 *     summary: Get an inf
 *     description: Both admins and users can get a particular inf by its id
 *     tags: [Infs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inf id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Inf'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a inf
 *     description: Only users can update the infs created by them.
 *     tags: [Infs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inf id
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
 *               mode:
 *                 type: string
 *                 enum: [physical,virtual]
 *               postingPlace:
 *                 type: string
 *                 description: required only when mode is physical
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
 *               stipend:
 *                 type: number
 *               isPPO:
 *                 type: boolean
 *               ctcDetails:
 *                 type: string
 *                 description: required only when isPPO is true
 *               bondDetail:
 *                 type: string
 *               uploadedDocs:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               gradYear:
 *                 type: number
 *               is2m:
 *                 type: boolean
 *               is6mDual:
 *                 type: boolean
 *               is6mMba:
 *                 type: boolean
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
 *                $ref: '#/components/schemas/Inf'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an inf
 *     description: Only users can delete the infs created by them.
 *     tags: [Infs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inf id
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
