import express from "express";
import {getUser, createUser, updateUser, deleteBlog} from "../controllers/index.js"

const router = express.Router()

import upload from '../middleware/upload.js'

router.get('/',getUser )
router.post('/', upload.array('files'), createUser)
router.patch('/:id', upload.array('files'), updateUser)
router.delete('/:id', deleteBlog)

export default router;