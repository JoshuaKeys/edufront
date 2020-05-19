import { routeToComponentMap, navigation } from './nav-rules';

export function routeToComponentGenerator() {
  const routesArr = Object.keys(routeToComponentMap);

  const arrRoute = routesArr.map(route => {
    return {
      path: route,
      component: routeToComponentMap[route],
      data: {
        next: navigation[route].next,
        previous: navigation[route].previous
      }
    }
  });
  arrRoute.unshift({ path: '', redirectTo: 'name', pathMatch: 'full'});
  return arrRoute;
}
