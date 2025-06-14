const path = require('path');
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env.development') });
} else {
    require('dotenv').config({ path: path.resolve(__dirname, '.env.production') });
}
const http = require('http');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const models = require('./models/models')

const router = require('./routers/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const sequelize = require('./db');

const PORT = process.env.PORT || 5003;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Middleware с ошибками должен регистрироваться в последнюю очередь!!!
app.use(errorHandler);

app.get(
    '/',
    (req, resp) => {
        resp.status(200).json(
            {
                message: 'Ratingator ready!!!'
            }
        );
    }
)

const server = http.createServer(app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.error(err)
    }
}

start();