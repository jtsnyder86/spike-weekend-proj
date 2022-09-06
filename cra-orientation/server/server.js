const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));
app.use(fileUpload());

/** ---------- ROUTES ---------- **/
// app.use('/api/movie', movieRouter);
// app.use('/api/genre', genreRouter)
app.post('/upload', (req, res) =>{
    console.log(req.body);
    if(req.files === null){
        return res.sendStatus(400).json({ msg: 'no file uploaded'});
    }

    const file = req.files.file;

    file.mv(`/Users/joshuasnyder/Desktop/Prime-academy/Tier-3/spike-weekend-proj/spike-weekend-proj/cra-orientation/public/upload/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.sendStatus(500)
        }
        res.json({fileName: file.name, filePath: `/upload/${file.name}`});
    });
});

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});