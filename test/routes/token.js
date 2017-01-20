describe("Routes: Token", () => {
   const Users = app.db.models.Users;

   describe("POST /token", () => {

     beforeEach(done => {
         // Codigo de pre teste
         Users
            .destroy({ where: {}})
            .then(() => Users.create({
              name: "Gabriel",
              email: "gabriel.rodrigues@apesoftware.com.br",
              password: "12345"
            }))
            .then(done());
     });

     describe("status 200", () => {
       it("returns authenticated user token", done => {
         // Codigo do teste
         request.post("/token")
                .send({
                  email: "gabriel.rodrigues@apesoftware.com.br",
                  password: "12345"
                })
                .expect(200)
                .end((err, res) => {
                  expect(res.body).to.include.keys("token");
                  done(err);
                });
       });
     });

     describe("status 401", () => {
       it("throws error when passpword is incorrect", done => {
         // Codigo do teste
         request.post("/token")
                .send({
                  email: "gabriel.rodrigues@apesoftware.com.br",
                  password: "SENHA_ERRADA"
                })
                .expect(401)
                .end((err, res) => {
                  done(err);
                });
       });

        it("throws error when email not exist", done => {
          // Codigo do test
          request.post('/token')
                 .send({
                   email: "EMAIL_ERRADO",
                   password: "SENHA_ERRADA"
                 })
                 .expect(401)
                 .end((err, res) => {
                   done(err);
                 });
        });

        it("throws error when email and password are blank", done => {
          // Codigo do teste
          request.post("/token")
                 .expect(401)
                 .end((err, res) => {
                   done(err);
                 });
        });

     });

   });

});
