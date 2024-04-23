import passport from "passport";
import github from "passport-github2";
import { userModel } from "../dao/mongoDB/models/user.model.js";
import {cartService, userService} from "../repository/index.js"
import { options } from "../config/config.js";



export const initPassportGit = () => {
    passport.use("github", new github.Strategy(
        {
            clientID: options.client.clientID,
            clientSecret:options.client.clientSecret,
            callbackURL:options.client.callBackUrl
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let { name, email } = profile._json;
                if (email === null) {
                    const emailgit = profile.id + profile.username + "@users.noreply.github.com"
                    const newCart = await createCart()
                    let user = await userService.getUsers(emailgit);
                    user = await userModel.create({ username: emailgit, name: name, email: emailgit, cartId: newCart._id });
                    return done(null, user)
                } else {
                    let user = await userService.getUsers(email);
                    if (!user) {
                        const newCart = await cartService.createCart()
                        user = await userModel.create({ username: email, name: name, email: email, cartId: newCart._id });
                    }
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user)
}); 

passport.deserializeUser((user, done) => {
    done(null, user)
})

