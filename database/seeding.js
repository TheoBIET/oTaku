require("dotenv").config();
const { Client } = require("pg");
const { MAL } = require("../app/constants");
const log = require("log-beautify");

const client = new Client(process.env.DATABASE_URL);
client.connect((_) => log.success(`Database connected`));

(async (_) => {
    for (const key in MAL.seeding) {
        const obj = MAL.seeding[key];
        for (const data of obj.data) {
            try {
                await client.query(
                    `INSERT INTO "${obj.tableName}" (label) VALUES ($1)`,
                    [data]
                );
                log.success(`${data} insert into ${obj.tableName}`);
            } catch (error) {
                log.error(error, `TABLE NAME : ${obj.tableName}`);
                break;
            }
        }
    }
    client.end();
})();
