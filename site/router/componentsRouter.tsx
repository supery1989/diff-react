import * as React from "react";
import { Switch, Route } from "react-router-dom";
import * as Demo from "../pages"

class ComponentsRouter extends React.Component {
  render() {
    return (
      <Switch>
        {Object.keys(Demo).map(key => {
          return <Route key={key} exact path={`/components/${key}`} component={Demo[key]} />
        })}
      </Switch>
    );
  }
}

export default ComponentsRouter;
