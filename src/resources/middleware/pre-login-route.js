export default class PreLoginRoute{
    run(routingContext, next) {
        let skipRoutes = ['login'];
        if (skipRoutes.indexOf(routingContext.config.route) === -1) {
            this.route = routingContext.config.route;
        }
        return next();
    }
}
