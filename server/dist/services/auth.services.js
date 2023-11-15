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
exports.jwtDecode = exports.getGoogleOAuthTokens = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: '40371381493-jgkjo26qsn0qbrna3be9iab89mgq90do.apps.googleusercontent.com',
    NEXT_PUBLIC_SERVER_ENDPOINT: 'http://localhost:1337',
    NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL: 'http://localhost:1337/api/sessions/oauth/google',
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: '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'
};
function getGoogleOAuthTokens({ code }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://oauth2.googleapis.com/token';
            const values = {
                code,
                client_id: config.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                client_secret: config.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                redirect_uri: config.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
                grant_type: 'authorization_code'
            };
            const res = yield axios_1.default.post(url, querystring_1.default.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            return res.data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.getGoogleOAuthTokens = getGoogleOAuthTokens;
function jwtDecode(token) {
    return jsonwebtoken_1.default.decode(token);
}
exports.jwtDecode = jwtDecode;
