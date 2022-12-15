const NegociosController = require('../controllers/negociosController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/negocios/clasificadores/findByClasificador/:id_clasificador', passport.authenticate('jwt', {session: false}), NegociosController.findByClasificador);
    app.get('/negocios/clasificadores/findByClasificadorPrefijo/:id_clasificador', passport.authenticate('jwt', {session: false}), NegociosController.findByClasificadorPrefijo);
    app.get('/negocios/clasificadores/findByClasificadorOficina', passport.authenticate('jwt', {session: false}), NegociosController.findByClasificadorOficina);
    app.get('/negocios/clasificadores/findByClasificadorTipoPersona', passport.authenticate('jwt', {session: false}), NegociosController.findByClasificadorTipoPersona);
    app.get('/negocios/clasificadores/findByClasificadorGenero', passport.authenticate('jwt', {session: false}), NegociosController.findByClasificadorGenero);
    app.get('/negocios/creditoRechazado/findByCreditosRechazadoList/:usuario', passport.authenticate('jwt', {session: false}), NegociosController.findByCreditosRechazadoList);
    app.get('/negocios/creditoRechazado/findByCreditosRechazadoDelete/:id', passport.authenticate('jwt', {session: false}), NegociosController.findByCreditosRechazadoDelete)
    app.post('/negocios/creditoRechazado/create', passport.authenticate('jwt', {session: false}), NegociosController.create);
    
}