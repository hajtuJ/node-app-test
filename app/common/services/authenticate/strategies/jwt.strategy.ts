import passport from 'passport';
import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import {AwilixContainer, asValue} from 'awilix';
import {IUserProvider, UserProviderCredentials} from './../../../../common/services/authenticate/UserProvider';

export const auth = passport.authenticate('jwt', { session: false });

export default () => new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET ?? '',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
    passReqToCallback: true
}, async function (req: any, jwt_payload: any, done: CallableFunction) {

    try {
        const container: AwilixContainer = req.container;
        const UserProvider: IUserProvider = container.resolve('userProvider');
        const credentials: UserProviderCredentials = {name: jwt_payload.name};
        const user = await UserProvider.retriveByCredentials(credentials);

        if (!user) return done(null, jwt_payload);
        container.register({ currentUser: asValue(user) });
        return done(null, user);
        
    } catch (err) {
        return done(err);
    }
});