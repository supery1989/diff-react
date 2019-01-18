import * as React from "react";
import { Switch, Route } from "react-router-dom";
import * as Demo from "../pages";

class ComponentsRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/components/alert" component={Demo.Alert} />
        <Route exact path="/components/layout" component={Demo.Layout} />
        <Route exact path="/components/icon" component={Demo.Icon} />
        <Route exact path="/components/button" component={Demo.Button} />
        <Route exact path="/components/loading" component={Demo.Loading} />
        <Route exact path="/components/toast" component={Demo.Toast} />
        <Route exact path="/components/notification" component={Demo.Notification} />
        <Route exact path="/components/transition" component={Demo.Transition} />
        <Route exact path="/components/backtop" component={Demo.BackTop} />
        <Route exact path="/components/popup" component={Demo.Popup} />
      </Switch>
    );
  }
}

export default ComponentsRouter;
