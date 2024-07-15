const express = require('express')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const crypto = require('crypto')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function (err, btyes) {
            const fn = btyes.toString('hex') + path.extname(file.originalname)
            cb(null, fn)

        })
    }
})

const upload = multer({ storage: storage })

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/uploadkr', upload.single('image'), (req, res) => {
    console.log(req.file);
    // res.redirect('/')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})