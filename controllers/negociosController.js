const Product = require('../models/product');
const Negocio = require('../models/negocio');
const asyncForEach = require('../utils/async_foreach');
const provider = require('../config/provider');
var Client = require('node-rest-client').Client;

var client = new Client();



module.exports = {

    async findByClasificador(req, res, next) {
        try {
            console.log('ya estoy find');
             console.log(req.params.id_clasificador);
            var body = {
                id: req.params.id_clasificador,
                channel: 'CRvhCDDOjTCKA'
            }
        
            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            
            client.post(provider.ENDPOINT_LISTA_CONCEPTOS, args, function (data, response) {
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
                id:1,
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
                criterio:'',
                id:2,
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
    
    async findByCreditosRechazadoList(req, res, next) {
        try {
            var body = {
                usuario: req.params.usuario,
                channel: 'CRvhCDDOjTCKA'
            }
        
            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            
            client.post(provider.ENDPOINT_LISTA_CREDITO_RECHAZADO, args, function (data, response) {
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
            var DATASQL = [];
            
            const { id, fecha_solicitud,credito_solicitado,agencia,tipo_persona,genero,fecha_rechazo,fecha_inicio, motivo_rechazo, otro_motivo_rechazo,usuario } = req.body;
           // const sql_insert = `INSERT INTO products( name,description,price,image1,image2,image3,id_category,created_at,updated_at)VALUES`;
           // const sql_values = `(${fecha_solicitud}, ${fecha_rechazo}, ${fecha_inicio}, ${motivo_rechazo}, ${tipo_persona}, ${genero}, ${otro_motivo_rechazo}) RETURNING id`;

           // DATASQL.push(sql_insert + sql_values);
           console.log('************************************************');
           console.log(req.body);
           var body = {
            channel: 'CRvhCDDOjTCKA',
            id:0, 
            fecha_solicitud: fecha_solicitud,
            credito_solicitado: credito_solicitado,
            agencia: agencia,
            tipo_persona: tipo_persona,
            genero: genero,
            estado_solicitado: 1,
            fecha_rechazo: fecha_rechazo,
            fecha_inicio: fecha_inicio,
            motivo_rechazo: motivo_rechazo,
            otro_motivo_rechazo: otro_motivo_rechazo,
            usuario: usuario
        }
        var args = {
            data: body,
            headers: { "Content-Type": "application/json" }
        };
        
        client.post(provider.ENDPOINT_CREAR_CREDITO_RECHAZADO, args, function (data, response) {
            // parsed response body as js object
            console.log(data);
            // raw response

            return res.status(201).json(data);
        });

        } catch (e) {
            console.error(e);
            res.json({
                mensaje: constantUtil.MENSAJE_ERROR,
                estado: constantUtil.STATUS_NOK,
                data: {}
            });
        }

        console.log(`Producto llego vvv`, fecha_rechazo);
        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto no tiene imagen',
                success: false
            });
        }
        else {
            try {

                const data = await Product.create(product); // ALMACENANDO LA INFORMACION
                product.id = data.id;

                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                            if (inserts == 0) { // IMAGEN 1
                                product.image1 = url;
                            }
                            else if (inserts == 1) { // IMAGEN 2
                                product.image2 = url;
                            }
                            else if (inserts == 2) { // IMAGEN 3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product);
                        inserts = inserts + 1;

                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            });
                        }

                    });
                }
                start();
            }
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }

    },

    async findByCreditosRechazadoDelete(req, res, next) {
        try {
            var body = {
                id: req.params.id,
                channel: 'CRvhCDDOjTCKA'
            }
        
            var args = {
                data: body,
                headers: { "Content-Type": "application/json" }
            };
            
            client.post(provider.ENDPOINT_CREAR_CREDITO_RECHAZADO, args, function (data, response) {
                // parsed response body as js object
                console.log(data);
                // raw response

                return res.status(201).json(data);
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
}