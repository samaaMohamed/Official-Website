import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "globals/routes";
import { ThemeProvider } from "globals/contexts/theme.context";
import { darkThemePonyfill, lightThemePonyfill } from "globals/cssVarsPonyfill";

export default class App extends Component {
  static contextType = ThemeProvider;

  componentDidMount() {
    let { theme } = this.context;

    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");

      lightThemePonyfill();
    } else {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");

      darkThemePonyfill();
    }
  }

  renderSingleRoute = (key, path, component) => (
    <Route key={`route${key}`} exact path={path} component={component} />
  );

  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, index) =>
            this.renderSingleRoute(index, route.path, route.component)
          )}
        </Switch>
      </Router>
    );
  }
}
