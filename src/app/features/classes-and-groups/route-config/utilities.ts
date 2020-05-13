
import { navigation, routeToComponentMap } from './route-config';


export function routeToComponentGenerator() {
  const routesArr = Object.keys(routeToComponentMap);

  return routesArr.map(route => {
    return {
      path: route,
      component: routeToComponentMap[route],
      data: {
        next: navigation[route].next,
        previous: navigation[route].previous
      }
    }
  })
}
