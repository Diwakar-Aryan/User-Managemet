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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = require("../services/auth.services");
const method_1 = require("../databases/mongo/method");
const jwt_utils_1 = require("../utils/jwt.utils");
class AuthController {
    constructor() {
        this.googleOauth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //get the code from qs
                const code = req.query.code;
                //get the id and access token with code
                const { id_token, access_token } = yield (0, auth_services_1.getGoogleOAuthTokens)({ code });
                //get user with token
                const googleUser = (0, auth_services_1.jwtDecode)(id_token) || {};
                if (!googleUser && !googleUser.email_verified) {
                    return res.status(403).send("Google account is not verified");
                }
                //upsert the user
                const user = yield (0, method_1.findAndUpdateuser)({ user_email: googleUser.email }, {
                    user_type: "Google",
                    user_email: googleUser.email,
                    user_name: googleUser.name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    expiry: new Date(),
                }, "user");
                //create a session
                //   const session = await createSession(
                //     user._id,
                //     req.get("user-agent") || ""
                //   );
                //create access and refresh token
                const access_jwt_token = (0, jwt_utils_1.signJwt)(Object.assign({}, user), { expiresIn: 15 });
                //set cookies
                res.cookie("accessToken", access_jwt_token, {
                    maxAge: 90000,
                    httpOnly: true,
                    domain: "localhost",
                    path: "/",
                    sameSite: "lax",
                    secure: false,
                });
                //redirect back to client
                res.redirect('http://localhost:4200');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = AuthController;
