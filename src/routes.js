import { App } from './components/app';

export const routes = {
  childRoutes: [ {
    path: '/',
    component: App,
    // childRoutes: [
    //   require('./routes/Calendar'),
    //   require('./routes/Course'),
    //   require('./routes/Grades'),
    //   require('./routes/Messages'),
    //   require('./routes/Profile')
    // ]
  } ]
};