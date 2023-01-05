const Product = require('../models/product');
const asyncForEach = require('../utils/async_foreach');
const constantUtil = require('../utils/constant.util');
const consultaSql = require('../utils/consultaSql.util');
const provider = require('../config/provider');
var Client = require('node-rest-client').Client;

var client = new Client();



module.exports = {

    async findByIdConsulta(req, res, next) {
        console.log(req.params.id_consulta);
        try {

            var sql;
            switch (req.params.id_consulta) {
                case constantUtil.DOM_TIPO_CREDITO:
                   sql = consultaSql.CON_TIPO_CREDITO
                    break;
                case constantUtil.DOM_OFICINAS:
                    sql = consultaSql.CON_OFICINAS
                    break;
                case constantUtil.DOM_ESTADO_CREDITO:
                    sql = consultaSql.CON_ESTADO_CREDITO
                    break;
                case constantUtil.DOM_GENERO:
                    sql = consultaSql.CON_GENERO
                    break;
                case constantUtil.DOM_TIPO_MOTIVO_RECHAZO:
                    sql = consultaSql.CON_TIPO_MOTIVO_RECHAZO
                    break;
            }

           var body = {
                dataSql: [
                   sql
                ]
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };

            client.post(provider.ENDPOINT_LISTA_CONCEPTOS, args, function (data, response) {
                console.log(data);


                return res.status(201).json(data[0].data);
            });        // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body }); 
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: constantUtil.MENSAJE_ERROR,
                success: false,
                error: error
            });
        }
    },

    async findByClasificadorPrefijo(req, res, next) {
        try {

            console.log(req.params.id_clasificador);
            var body = {
                id: req.params.id_clasificador,
                channel: 'CRvhCDDOjTCKA'
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };

            client.post(provider.ENDPOINT_LISTA_CONCEPTOS_PREFIJO, args, function (data, response) {
                // parsed response body as js object
                console.log(data);
                // raw response

                return res.status(201).json(data.rows);
            });        // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body }); 
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByClasificadorOficina(req, res, next) {
        try {
            var body = {
                channel: 'CRvhCDDOjTCKA'
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };

            client.post(provider.ENDPOINT_LISTA_OFICINA, args, function (data, response) {
                // parsed response body as js object
                console.log(data);
                // raw response

                return res.status(201).json(data.rows);
            });        // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByClasificadorTipoPersona(req, res, next) {
        try {
            var body = {
                criterio: ' in(1,5,8,11,18) ',
                id: 1,
                channel: 'CRvhCDDOjTCKA'
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };

            client.post(provider.ENDPOINT_LISTA_TIPO_PERSONA, args, function (data, response) {
                // parsed response body as js object
                console.log(data);
                // raw response

                return res.status(201).json(data.rows);
            });        // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByClasificadorGenero(req, res, next) {
        try {
            var body = {
                criterio: '',
                id: 2,
                channel: 'CRvhCDDOjTCKA'
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };

            client.post(provider.ENDPOINT_LISTA_TIPO_PERSONA, args, function (data, response) {
                // parsed response body as js object
                console.log(data);
                // raw response

                return res.status(201).json(data.rows);
            });        // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByCreditosList(req, res, next) {
        try {

            var sql = `select idpcdridsl id, idpcdrfsol fecha_solicitud, trim(idpcdrcrsl) credito_solicitado,  (Select trim(gbcon.gbcondesc) From gbcon Where  gbcon.gbconpfij = 80 and gbcon.gbconabre = trim(idpcdrcrsl)) as desc_credito_solicitado,  trim(idpcdrcdlg || '') agencia,  (select trim(gbofidesc) from gbofi where gbofinofi = idpcdrcdlg) desc_agencia,   trim(idpcdrtper || '') tipo_persona,  trim(idpcdrgene ||'') genero, idpcdrfrec fecha_Rechazo,   idpcdrfini fecha_inicio,   trim(idpcdrmrec ||'') motivo_rechazo,  (select trim(idpcondesc) from idpcon where idpconpref = 9 and idpconcorr = idpcdrmrec) as desc_motivo_rechazo,  trim(idpcdrorec) otro_motivo_rechazo,  trim(idpcdrstat ||'') estado,  (select trim(idpcondesc)  from idpcon where idpconpref = 10 and idpconcorr = idpcdrstat) desc_estado, trim(idpcdruser) as usuario, trim(idpcdrnomb) as nombre from idpcdr where idpcdruser = '${req.params.id_usuario}' and idpcdrstac = 0 order by 1 desc`;
            var body = {
                dataSql: [
                   sql
                ]
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            console.log(args);
            client.post(provider.ENDPOINT_LISTA_CONCEPTOS, args, function (data, response) {
                console.log(data[0]);


                return res.status(201).json(data[0].data);
            });     // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async findByCategoryAndProductName(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Product.findByCategoryAndProductName(id_category, product_name);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {

        try {
            const { id, fecha_solicitud, credito_solicitado, agencia, genero,fecha_rechazo, estado_solicitado, motivo_rechazo, otro_motivo_rechazo, usuario,nombre } = req.body;
            var sql = '';
            var DATASQL = [];
            if(id=='0'){

            const sql_insert = `insert into idpcdr(idpcdridsl, idpcdrfsol, idpcdrstat,idpcdrcrsl,idpcdrcdlg,idpcdrtper, idpcdrgene,idpcdrfrec,idpcdridop,idpcdrfini, idpcdrmrec,idpcdrorec, idpcdrhora,idpcdrfpro, idpcdrorig, idpcdrstac, idpcdruser, idpcdrnomb)VALUES`;
            const sql_values = `((select max(idpcdridsl)+1 from idpcdr ),'${fecha_solicitud}',${estado_solicitado}, '${credito_solicitado}', ${agencia}, 1, ${genero}, '${fecha_rechazo}',null, null,${motivo_rechazo},'${otro_motivo_rechazo}',current::datetime hour to SECOND , TODAY ,'IDEPRO NET',0,'${usuario}', '${nombre}')`;

            DATASQL.push(sql_insert + sql_values);
            console.log('************************************************');

            sql = sql_insert + sql_values
            }else{
               sql = `update idpcdr set idpcdrfsol = '${fecha_solicitud}', idpcdrstat = ${estado_solicitado},idpcdrcrsl = '${credito_solicitado}',idpcdrcdlg = ${agencia}, idpcdrgene=  ${genero},idpcdrfrec= '${fecha_rechazo}', idpcdrmrec= ${motivo_rechazo},idpcdrorec = '${otro_motivo_rechazo}', idpcdrnomb ='${nombre}' where idpcdridsl = ${id}`;

            }

            
            console.log(req.body);

            var body = {
                dataSql: [
                    sql
                ]
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            client.post(provider.ENDPOINT_LISTA_CONCEPTOS, args, function (data, response) {
                console.log(data);

            
                return res.status(201).json({
                    message: constantUtil.MENSAJE_CORRECTO,
                    error: '',
                    estado: true,
                    data: {}
                });
            });   

        } catch (e) {
            console.error(e);
            res.json({
                mensaje: constantUtil.MENSAJE_ERROR,
                estado: constantUtil.STATUS_NOK,
                data: {}
            });
        }
    },

    async findByCreditosRechazadoDelete(req, res, next) {
        try {
            var sql = `update idpcdr set idpcdrstac = 9 where idpcdridsl = ${req.params.id_credito}`;
            var body = {
                dataSql: [
                   sql
                ]
            }

            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            console.log(args);
            client.post(provider.ENDPOINT_LISTA_CONCEPTOS, args, function (data, response) {
                console.log(data[0]);


                return res.status(201).json({
                    message: constantUtil.MENSAJE_CORRECTO,
                    error: '',
                    estado: true,
                    data: {}
                });
            });   // let axiosPromise = axios.post(provider.ENDPOINT_LISTA_CONCEPTOS, { data: body });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },
}

