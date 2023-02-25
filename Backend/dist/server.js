"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const User_1 = __importDefault(require("./routes/User"));
const Admin_1 = __importDefault(require("./routes/Admin"));
dotenv_1.default.config();
class App {
    listen() {
        this.app.listen(config_1.config.server.port, () => {
            Logging_1.default.info(`server is running on port ${config_1.config.server.port}`);
        });
    }
    constructor() {
        this.app = (0, express_1.default)();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.initializeRoute();
        this.listen();
    }
    initializeMiddlewares() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
    }
    initializeErrorHandling() {
        this.app.use(errorHandling_1.default);
    }
    initializeRoute() {
        this.app.use('/api/user', User_1.default);
        this.app.use('/api/admin', Admin_1.default);
    }
    connectToTheDatabase() {
        mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
            .then(() => {
            Logging_1.default.info("connected to base donne");
        })
            .catch((err) => {
            Logging_1.default.error(err);
        });
    }
}
new App;
