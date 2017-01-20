/**
 * Created by gabrielllbsb on 19/01/17.
 */

module.exports = (app) => {
   const env = process.env.NODE_ENV;
   if(env) {
     return require(`./config.${env}.js`);
   }

   return require('./config.development.js');
};
