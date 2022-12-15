const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const assert = require('assert');
var ActiveDirectory = require('activedirectory');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }
    },

    async findDeliveryMen(req, res, next) {
        try {
            const data = await User.findDeliveryMen();
            console.log(`Repartidores: ${data}`);
            return res.status(201).json(data);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los repartidores'
            });
        }
    },

    async getAdminsNotificationTokens(req, res, next) {
        try {
            const data = await User.getAdminsNotificationTokens();
            let tokens = [];


            data.forEach(d => {
                tokens.push(d.notification_token);
            });

            console.log('Tokens de admin:', tokens);
            return res.status(201).json(tokens);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los repartidores'
            });
        }
    },

    async register(req, res, next) {
        try {

            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesion',
                data: data.id
            });

        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async registerWithImage(req, res, next) {
        try {

            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${user}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = null//await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            const data = await User.create(user);

            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesion',
                data: data.id
            });

        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async update(req, res, next) {
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente'
            });

        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            });
        }
    },

    async updateNotificationToken(req, res, next) {
        try {

            const body = req.body;
            console.log('Datos enviados del usuario: ', body);

            await User.updateNotificationToken(body.id, body.notification_token);

            return res.status(201).json({
                success: true,
                message: 'El token de notificaciones se ha almacenado correctamente'
            });

        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            });
        }
    },

    async login(req, res, next) {
       

            //***********LDAP************ */

            const username = req.body.username;
            const password = req.body.password;

            try {
             
                var config = {
                    url: 'ldap://idepro.org',
                    baseDN: 'dc=idepro,dc=org',
                    username: username + '@idepro.org',
                    password: password
                }
                var ad = new ActiveDirectory(config);



                // Find user by a sAMAccountName
                var ad = new ActiveDirectory(config);
                ad.findUser(username, async function (err, response) {
                    if (err) {
                        return res.status(501).json({
                            estado: false,
                            message: 'Usuario o contraseña es incorrecto',
                            data: null
                        });
                    }

                    if (!response) {
                        console.log(`Error: ${response}`);
                        return res.status(501).json({
                            estado: false,
                            message: 'Usuario o contraseña es incorrecto',
                            data: null
                        });
                      
                    } else {
                      
                        const usuario= response;
                        console.log(`USUARIO DE LDAP ${usuario}`);
                        if (!await User.findByEmail(usuario.userPrincipalName)) {
                            
                            // CREACION USUARIO / ROL
                            const usuarioModel = {
                                email: usuario.mail,
                                name: usuario.displayName,
                                lastname: '',
                                phone: '',
                                image: '',
                                password: req.body.password,
                                created_at: new Date(),
                                updated_at: new Date()
                            }

                            const data = await User.create(usuarioModel);
                            await Rol.create(data.id, 1);

                            const token = jwt.sign({ id: data.id, email: data.email }, keys.secretOrKey, {
                                // expiresIn: (60*60*24) // 1 HORA
                                // expiresIn: (60 * 3) // 2 MINUTO
                            });
                            const usuarioModel_ = {
                                id: data.id,
                                nombre: usuario.displayName,
                                email: usuario.mail,
                                documentoIdentidad: null,
                                cargo: usuario.description,
                                oficina: null,
                                telefono: null,
                                usuario: usuario.sAMAccountName,
                                session_token: `JWT ${token}`,
                                roles: 'OFN'
                            }
                           
                            // await User.updateToken(myUser.id, `JWT ${token}`);

                            console.log(`USUARIO ENVIADO SERVICIO AUTENTIFICACION ${usuarioModel_}`);

                            return res.status(201).json({
                                estado: true,
                                data: usuarioModel_,
                                message: 'El usuario ha sido autenticado'
                            });
                        } else {
                            
                            const data = await User.findByEmail(usuario.userPrincipalName);
                            const token = jwt.sign({ id: data.id, email: data.email }, keys.secretOrKey, {
                                // expiresIn: (60*60*24) // 1 HORA
                                // expiresIn: (60 * 3) // 2 MINUTO
                            });
                            const usuarioModel = {
                                id: data.id,
                                nombre: usuario.displayName,
                                email: usuario.mail,
                                documentoIdentidad: null,
                                cargo: usuario.description,
                                oficina: null,
                                telefono: null,
                                usuario: usuario.sAMAccountName,
                                session_token: `JWT ${token}`,
                                roles: 'OFN'
                            }

                            await User.updateToken(data.id, `JWT ${token}`);

                            console.log(`USUARIO ENVIADO ${usuarioModel}`);

                            return res.status(201).json({
                                estado: true,
                                data: usuarioModel,
                                message: 'El usuario ha sido autenticado'
                            });
                        }
                    } 
                });



            }
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    success: false,
                    message: 'Error al momento de hacer login',
                    error: error
                });
            }
            //***********LDAP************ */      
    },

    async logout(req, res, next) {

        try {
            const id = req.body.id;
            await User.updateToken(id, null);
            return res.status(201).json({
                estado: true,
                message: 'La sesion del usuario se ha cerrado correctamente'
            });
        }
        catch (e) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                estado: false,
                message: 'Error al momento de cerrar sesion',
                error: error
            });
        }
    },


}; 
