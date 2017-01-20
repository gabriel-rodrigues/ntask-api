/**
 * Created by gabrielllbsb on 19/01/17.
 */

module.exports = app => {

    const Tasks = app.db.models.Tasks;


  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
        Tasks.findAll({ where: { user_id: req.user.id }})
          .then(result => res.json({ tasks: result}))
          .catch(erro => res.status(412).json({msg: erro.message}));
      })
    .post((req, res) => {
        req.body.user_id = req.user.id;

        Tasks.create(req.body)
          .then(result => res.json(result))
          .catch(erro => res.status(412).json({ msg: erro.message}));
      });

  app.route("/tasks/:id")
     .all(app.auth.authenticate())
    .get((req, res) => {
        Tasks.findOne({ where: { id: req.params.id, user_id: req.user.id }})
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
    .put((req, res) => {
        Tasks.update(req.body, { where: { id: req.params.id, user_id: req.user.id }})
          .then(result => res.sendStatus(204))
          .catch(erro => res.status(412).json({ msg: erro.message }));
      })
    .delete((req, res) => {
        Tasks.destroy({ where:  { id: req.params.id, user_id: req.user.id }})
          .then(result => res.sendStatus(204))
          .catch(erro => res.status(412).json({msg: erro.message}));
      });
};
