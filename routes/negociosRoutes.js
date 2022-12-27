const NegociosController = require('../controllers/negociosController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/negocio/ideproNetbank/consulta/:id_consulta', passport.authenticate('jwt', {session: false}), NegociosController.findByIdConsulta);
    app.get('/negocio/ideproNetbank/consulta/list/:id_usuario', passport.authenticate('jwt', {session: false}), NegociosController.findByCreditosList);
    app.get('/negocio/ideproNetbank/consulta/delete/:id_credito', passport.authenticate('jwt', {session: false}), NegociosController.findByCreditosRechazadoDelete)
    app.post('/negocio/ideproNetbank/consulta/create', passport.authenticate('jwt', {session: false}), NegociosController.create);
    
}