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
exports.findAndUpdateuser = exports.insertOne = exports.findOne = void 0;
const setup_1 = __importDefault(require("./setup"));
let mongoClient = setup_1.default.initialize();
function findOne(collection_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = mongoClient.collection(collection_name);
            let data = yield collection.find({}).toArray();
            return data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.findOne = findOne;
function insertOne(collection_name, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = mongoClient.collection(collection_name);
            collection.insertOne(params);
        }
        catch (error) {
        }
    });
}
exports.insertOne = insertOne;
function findAndUpdateuser(filter, update, collection_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = mongoClient.collection(collection_name);
            return yield collection.findOneAndUpdate(filter, update, { upsert: true });
        }
        catch (error) {
        }
    });
}
exports.findAndUpdateuser = findAndUpdateuser;
