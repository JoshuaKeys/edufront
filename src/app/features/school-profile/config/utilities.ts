import { routeToComponentMap, navigation } from './nav-rules';
import { Routes } from '@angular/router';

interface subRouter {
  path: string;
  component?: any;
  redirectTo?: string;
  pathMatch?: string;
  data?: {
    next: any;
    previous: any;
  }
}

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
  // arrRoute.push({ path: '', redirectTo: 'name'});

  // console.log('@@', arrRoute);
  return arrRoute;
}
