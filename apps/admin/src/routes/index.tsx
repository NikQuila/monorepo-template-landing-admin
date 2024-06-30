import { Route, Switch } from 'wouter';
import HomePage from '../pages/home';

const RoutesConfig = () => (
  <Switch>
    <Route path='/' component={HomePage} />
  </Switch>
);

export default RoutesConfig;
