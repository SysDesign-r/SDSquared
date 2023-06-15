const pg = require('pg');
const connectionString = 'postgres://xdalqkwi:fL2y8nj80ocuJZvDG07Ds7m-h4LlmyCm@fanny.db.elephantsql.com/xdalqkwi';
const client = new pg.Client({ connectionString });
client.connect();

const Controller = {

  getRandom: async (req, res, next) => {
    try {
      const randomId = [Math.floor(Math.random()*10)];
      const response = await client.query(
        'SELECT prompt FROM Prompts WHERE id = $1', randomId
      );
      res.locals.data = response.rows[0];
      return next();
    } catch (err) {
      return next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const value = [req.id]
      const response = await client.query(
        'SELECT prompt FROM Prompts WHERE id = $1', value
      );
      res.locals.data = response;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  save: async (req, res, next) => {
    try {
      const saved = req.body;
      const values = [saved.state, saved.userId, saved.promptId]
      const response = await client.query(
        'INSERT INTO Saved (state, userId, promptId) VALUES ($1, $2, $3)', values
      );
      res.locals.data = response;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const saved = req.body;
      console.log('req.body', saved)
      const values = [saved.id, saved.password]
      const response = await client.query(
        'INSERT INTO Users (id, password) VALUES ($1, $2)', values
      );
      res.locals.data = response
      console.log('in createUser')
      return next();
    } catch (err) {
      return next(err);
    }
  } 
}

module.exports = Controller;