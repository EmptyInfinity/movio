const router = require('express').Router();
const moviesHandler = require('./routes/moviesHandler');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.post('/movies', moviesHandler.save);
router.post('/movies/upload', upload.single('filedata'), moviesHandler.upload);
router.get('/movies', moviesHandler.fetchAll);
router.delete('/movies/:id', moviesHandler.remove);

module.exports = router;
