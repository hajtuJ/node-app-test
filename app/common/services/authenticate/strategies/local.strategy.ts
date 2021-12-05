import {Strategy as LocalStrategy} from "passport-local";
import {AwilixContainer, asValue} from 'awilix';
import {IUserProvider, UserProviderCredentials} from './../../../../common/services/authenticate/UserProvider';


export default () => new LocalStrategy({passReqToCallback: true},
    async function(req: any, username: string , password: string, done: CallableFunction) {

        try {
            const container: AwilixContainer = req.container;
            const UserProvider: IUserProvider = container.resolve('userProvider');
            const credentials: UserProviderCredentials = {name: username};
            const user = await UserProvider.retriveByCredentials(credentials);
            if (!user) return done(null, username);
            container.register({ currentUser: asValue(user) });
            return done(null, user);
    }catch (err) {
        return done(err);
    }
});