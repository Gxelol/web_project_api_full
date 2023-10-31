const express = require('express');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const auth = require('./middleware/auth');

const { requestLogger, errorLogger } = require('./middleware/logger');
const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2),
      avatar: Joi.string().min(2),
      email: Joi.string().required().min(5),
      password: Joi.string().required().min(5),
    }),
  }),
  createUser,
);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode && !err.message) {
    app.use((err, req, res, next) => {
      const { statusCode = 500, message } = err;
      res.status(statusCode).send({
        message: statusCode === 500 ? 'Ocorreu um erro no servidor' : message,
      });
    });
  }
});

app.listen(PORT, () => {
  console.log(`O App está escutando na porta localhost:${PORT}`);
});
