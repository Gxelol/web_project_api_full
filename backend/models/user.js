const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const urlPattern = /(https:\/\/|http:\/\/)(w{3}\.)?[/\S]+\/?[^\S]*[#]?$/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: 'URL inválida!',
    },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return emailPattern.test(v);
      },
      message: 'Email inválido!',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 45,
    validate: {
      validator(v) {
        return passwordPattern.test(v);
      },
      message: 'Senha Fraca!',
    },
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email })
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Senha ou e-mail incorreto'));
    }

    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Senha ou e-mail incorreto'));
        }

        return user;
      });
  });

module.exports = mongoose.model('user', userSchema);
