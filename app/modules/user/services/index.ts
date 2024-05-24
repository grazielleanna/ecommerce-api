import { UserData, UserLoginData } from "../interfaces/index.js";
import User from "../models/index.js";

export default class UserService {
    public async createUser(requestBody: UserData) {
        const user = await User.create(requestBody);

        return user;
    }

    public async loginUser(requestBody: UserLoginData) {
        const { email, password } = requestBody;

        const user = await User.verifyCredentials(email, password);

        const token = await User.accessTokens.create(user);

        return token;
    }
}