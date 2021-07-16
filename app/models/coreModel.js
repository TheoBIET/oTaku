const pg = require('../client');

class CoreModel {

    static tableName = null;
    #id;

    constructor(data) {
        this.#id = data.id;
    }

    get id() {
        return this.#id;
    }

    static async findAll() {
        try {
            const data = await pg.query(`SELECT * FROM "${this.tableName}"`);
            return data.rows;
        } catch (error) {
            console.error(error);
        }
    }

    static async findOne(id) {
        try {
            const data = await pg.query(`SELECT * FROM "${this.tableName}" WHERE id=$1`, [id]);
            return data.rows[0];
        } catch (error) {
            console.error(error);
        }
    }

    async insert() {
        const tableName = `"${this.constructor.tableName}"`;

        const fieldNames = [];
        const fieldValues = [];
        const fieldIndex = [];

        let index = 1;
        
        for (const propName in this) {
            fieldNames.push(`"${propName}"`);
            fieldValues.push(this[propName]);
            fieldIndex.push(`$${index++}`);
        }

        const preparedQuery = {
            text: `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES(${fieldIndex.join(', ')}) RETURNING *`,
            values: fieldValues
        }

        const newItem = await pg.query(preparedQuery)
        return newItem.rows[0];
    }
    
}

module.exports = CoreModel;