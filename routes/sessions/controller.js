const Sequelize = require('sequelize');
const { Word, GameSession } = require('../../models');
const serializeGameSession = require('../../serializers/gameSession');
const gameSessionService = require('../../services/game_session_service');

async function CreateSession(req, res) {
  const name = req.body.name;
  const word = await Word.findOne({
    order: Sequelize.fn("RANDOM")
  });
  // select * from words order by random() limit 1;
  const gameSession = await GameSession.create({
    playerName: name,
    playedLetters: "",
    wordId: word.id,
    startedAt: new Date()
  })

  res.json(await serializeGameSession(gameSession));
}

async function PlaySession(req, res) {
  const gameId = req.params.id;
  const letter = req.body.letter;
  const gameSession = await GameSession.findByPk(gameId);

  await gameSessionService.playWordInGameSession(gameSession, letter);

  res.json(await serializeGameSession(gameSession));
}

module.exports = {
  CreateSession,
  PlaySession
}
