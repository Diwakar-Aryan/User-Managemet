"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const configs_1 = __importDefault(require("../../configs"));
class MongoClientClass {
    constructor() {
        this.uri = "mongodb+srv://diwakarAryan:Aryan123@cluster0.u6mz1dv.mongodb.net/?retryWrites=true&w=majority";
        this.configs = configs_1.default.initialize();
    }
    static initialize() {
        if (!this.mongoClient) {
            this.mongoClient = new MongoClientClass();
        }
        return this.mongoClient;
    }
    initializeMongoConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { mongo_uri } = this.configs.MongoConfigDetails;
                this.client = new mongodb_1.MongoClient(mongo_uri, {
                    serverApi: {
                        version: mongodb_1.ServerApiVersion.v1,
                        strict: true,
                        deprecationErrors: true,
                    },
                });
                // Connect the client to the server
                yield this.client.connect();
                // Send a ping to confirm a successful connection
                yield this.client.db("admin").command({ ping: 1 });
                console.log("Pinged your db. You successfully connected to MongoDB!");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    collection(collection_name) {
        let { mongo_db_name } = this.configs.MongoConfigDetails;
        return this.client.db(mongo_db_name).collection(collection_name);
    }
}
exports.default = MongoClientClass;
