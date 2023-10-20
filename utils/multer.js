import fs from "fs"
import multer from "multer"
import { dirname } from "path"
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    // destino
    destination: function(req, file, cb){
        let uploadPath

        switch (file.fieldname) {
            case 'profile':
                uploadPath = `${__dirname}/public/files/profiles`
                break;
            case 'product':
                uploadPath = `${__dirname}/public/files/products`
                break;
            case 'document':
                uploadPath = `${__dirname}/public/files/documents`
        }

        cb(null, uploadPath)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({
    storage: storage,
    // si se genera error, capturamos
    onError: function(err, next){
        console.log('error', err)
        next()
    }
})

const documentsStorage = multer.diskStorage({
    destination: function(req, file, cb){
        const userId = req.params.uid
        const userPath = `${__dirname}/public/files/users/${userId}`

        cb(null, userPath)
    },
    filename: function(req, file, cb){
        const userId = req.params.uid
        const userPath = `${__dirname}/public/files/users/${userId}`
        const filesFound = fs.readdirSync(userPath)

        const fileFound = filesFound.find((fileNameExists) => {
            return fileNameExists.startsWith(file.fieldname + '-')
        })

        if(fileFound) fs.unlinkSync(path.join(userPath, fileFound))

        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

export const docsUploader = multer({
    storage: documentsStorage,
    // si se genera error, capturamos
    onError: function(err, next){
        console.log('error', err)
        next()
    }
})

