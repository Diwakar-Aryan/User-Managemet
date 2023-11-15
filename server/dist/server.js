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
const app_1 = __importDefault(require("./app"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const setup_1 = __importDefault(require("./databases/mongo/setup"));
// import { findOne, insertOne } from "./databases/mongo/method";
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield setup_1.default.initialize().initializeMongoConnection();
            // await findOne("testConnect");
            let userData = {
                user_name: "diw",
                user_email: "diwa@gmail.com",
                password: "Asd",
                created_at: new Date(),
                updated_at: new Date(),
                expiry: new Date(),
            };
            // await insertOne("user", userData);
            const app = new app_1.default([new auth_routes_1.default()]);
            yield app.listen();
        }
        catch (error) {
            console.log(`Errored out in server ${error}`);
        }
    });
}
startServer();
