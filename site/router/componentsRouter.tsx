import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as Demo from "../pages"
import * as Lead from '../leads'

class ComponentsRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={(() =>
          <Redirect to='/components/home' />
        )} />
        <Route path='/components' exact component={(() =>
          <Redirect to='/components/overview' />
        )} />
        {Object.keys(Lead).map(key => {
          return <Route key={key} exact path={`/components/${key}`} component={Lead[key]} />
        })}
        {Object.keys(Demo).map(key => {
          return <Route key={key} exact path={`/components/${key}`} component={Demo[key]} />
        })}
      </Switch>
    );
  }
}

export default ComponentsRouter;
