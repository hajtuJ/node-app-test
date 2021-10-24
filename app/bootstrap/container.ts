import {asValue, createContainer, InjectionMode, Lifetime} from "awilix";

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

export default container;
