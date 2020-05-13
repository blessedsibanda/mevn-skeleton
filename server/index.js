const path = require('path');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const passportJwt = require('./middlewares/passportJwt')();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(compress());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passportJwt.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use(errorHandler);
app.listen(8000, () => {
	console.log('Server listening on port 8000');
});
