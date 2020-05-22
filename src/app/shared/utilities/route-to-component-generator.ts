export function routeToComponentGenerator(routeToCompMap, navigation) {
  const routesArr = Object.keys(routeToCompMap);

  return routesArr.map(route => {
    return {
      path: route,
      component: routeToCompMap[route],
      data: {
        next: navigation[route].next,
        previous: navigation[route].previous
      }
    }
  })
}
