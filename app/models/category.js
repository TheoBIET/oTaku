const CoreModel = require("./coreModel");

class Category extends CoreModel {
    
    static tableName = 'category'

    constructor(obj) {
        super(obj);
        this.mal_id = obj.mal_id;
        this.label = obj.label;
    }

}

module.exports = Category;