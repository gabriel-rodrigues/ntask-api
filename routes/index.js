/**
 * Created by gabrielllbsb on 19/01/17.
 */
module.exports = app => {
  app.get('/', (req, res) => {
      res.json({ status: "NTask Api" });
  });
};