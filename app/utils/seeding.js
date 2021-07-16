const client = require('../client');
const {MAL} = require('../constants');
const log = require('log-beautify');

(async _ => {
    for(const key in MAL) {
        const obj = MAL[key];
        for(const data of obj.data){
            try {
                await client.query(`INSERT INTO "${obj.tableName}" (label) VALUES ($1)`, [data]);
                log.success(`${data} insert into ${obj.tableName}`)
            } catch (error) {
                log.error(error, `TABLE NAME : ${obj.tableName}`);
                break;
            }
        }
    }
})();