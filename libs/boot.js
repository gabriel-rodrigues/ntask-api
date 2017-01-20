/**
 * Created by gabrielllbsb on 19/01/17.
 */

module.exports = (app) => {
  app.db.sequelize.sync().done(() => {
      app.listen(app.get('port'), () => {
          console.log(`NTask API - porta ${app.get("port")}`);
      });
  });
};
