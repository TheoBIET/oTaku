require("dotenv").config();
const log = require("log-beautify");
const { Role } = require("../app/models");
const { roleSeeding } = require("../app/constants");

const seeding = {
    async init() {
        try {
            await seeding.seedRoles();
        } catch (err) {
            log.error(err);
        }
    },

    async seedRoles() {
        log.info("Seeding Roles...");
        let i;
        for (i = 0; i < roleSeeding.length; i++) {
            await Role.create(roleSeeding[i]);
        }
        log.success(`Roles seeding is done! ${i} roles created!`);
    },
};

seeding.init();
