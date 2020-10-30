/**
 * To create pg database conenction pool
*/

const { Pool } = require("pg");
import nodeEnvFile = require("node-env-file");
import { Query } from "src/models/query";
nodeEnvFile(".env");

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_IP,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 5, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    ssl: true
};

const pool = new Pool(config);

export class DB {
    static async query(queryInfo: Query): Promise<any> {
        // to hold undefined values while stringfy json
        const replacer = (_key, value) => typeof value === "undefined" ? null : value;
        let _arguments = "()";
        if (queryInfo.arguments) {
            _arguments = `('${JSON.stringify(queryInfo.arguments, replacer)}'::json)`;
        }
        const query = `select * from ${queryInfo.name} ${_arguments} as info;`;
        console.log(query);
        return pool.query(query)
            .then(response => {
                return response.rows[0].info;
            });
    }
}
