const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.deleteCardById = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail(() => {
      throw new Error('Cartão não encontrado');
    })
    .then((card) => {
      if (card.owner.valueOf() === req.user._id) {
        res.send({ card });
        return Card.findByIdAndRemove(cardId);
      }

      throw new Error('Você não tem permissão para deletar esse cartão');
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};
