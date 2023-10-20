import { Router } from "express"
const router = new Router()
import SessionController from '../controllers/sessionController.js'
const sessionController = new SessionController()
import { uploader, docsUploader } from "../utils/multer.js"
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import fs from "fs"

router.get('/premium/:uid', sessionController.updateRoleController)

router.get('/:uid', (req, res) => {
    res.render('uploadFiles', {})
})

router.post('/:uid', uploader.fields([
        {name: 'profiles', maxCount: 1}, 
        {name: 'products', maxCount: 1}, 
        {name: 'documents', maxCount: 1}
    ]), (req, res) => {
    res.send({message: 'Files uploaded successfully'})
})

router.get('/:uid/documents', (req, res) => {
    const uid = req.params.uid
    const userPath = `${__dirname}/public/files/users/${uid}`
    const folderFound = fs.existsSync(userPath)
    
    res.render('uploadDocuments', {uid, folderFound})
})

router.post('/:uid/documents', docsUploader.fields([
    {name: 'dni', maxCount: 1},
    {name: 'address', maxCount: 1},
    {name: 'accountStatus', maxCount: 1},
]), (req, res) => {
    res.send({message: 'Documents uploaded successfully'})
} )

export default router