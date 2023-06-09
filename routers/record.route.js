import { Router } from 'express';

import GetAllRecordsAction from '../actions/record/GetAllRecordsAction.js';
import CreateRecordAction from '../actions/record/CreateRecordAction.js';
import GetRecordAction from '../actions/record/GetRecordAction.js';
import DeleteRecordAction from '../actions/record/DeleteRecordAction.js';
import UpdateRecordAction from '../actions/record/UpdateRecordAction.js';

import auth from '../middlewares/auth.middleware.js';

const router = new Router();

const getAllRecordsAction = new GetAllRecordsAction();
const createRecordAction = new CreateRecordAction();
const getRecordAction = new GetRecordAction();
const deleteRecordAction = new DeleteRecordAction();
const updateRecordAction = new UpdateRecordAction();

router.get('/', auth, getAllRecordsAction.run);
router.post('/create', auth, createRecordAction.run);
router.get('/:id', auth, getRecordAction.run);
router.delete('/:id', auth, deleteRecordAction.run);
router.put('/update/:id', auth, updateRecordAction.run);

export default router;
