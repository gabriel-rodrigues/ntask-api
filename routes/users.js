/**
 * Created by gabrielllbsb on 19/01/17.
 */

module.exports = app => {
   const Users = app.db.models.Users;

   app.route("/user")
      .all(app.auth.authenticate())
      .get((req, res) => {
         Users.findById(req.user.id, {
             attributes: ["id", "name", "email"]
         })
         .then(result => {
            if(result) {
                res.json(result);
            }
            else {
              res.sendStatus(404);
            }
         })
         .catch(erro => res.status(412).json({ msg: erro.message }));
    })
      .delete((req, res) => {
      Users.destroy({ where: req.params})
          .then(result => res.sendStatus(204))
          .catch(erro => res.status(412).json({ msg: erro.message }));
    });

    app.post('/users', (req, res) => {
      Users.create(req.body)
          .then(result => res.json(result))
          .catch(erro => res.status(412).json({ msg: erro.message }));
    });
};
