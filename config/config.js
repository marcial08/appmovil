const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
    'host': '10.0.1.81',
    'port': 5432,
    'database': 'db_movil',
    'user': 'postgres',
    'password': 'gestion159'
};

const db = pgp(databaseConfig);

module.exports = db;