const CoreModel = require("./coreModel");

class Studio extends CoreModel {
    
    static tableName = 'studio'

    constructor(obj) {
        super(obj);
        this.mal_id = obj.mal_id;
        this.label = obj.label;
    }

}

module.exports = Studio;