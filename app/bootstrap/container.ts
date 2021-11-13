import {asClass, asValue, createContainer, InjectionMode, Lifetime} from "awilix";
import UserProvider from "../common/services/authenticate/UserProvider";

const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

container.loadModules([
    // load models
    [
        'app/models/**/*.ts',
        {
            register: asValue,
            lifetime: Lifetime.SINGLETON
        }
    ]
]);

container.register({
    userProvider: asClass(UserProvider)
});

export default container;
