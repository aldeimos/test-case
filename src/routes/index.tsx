import React from "react";
import { Main } from "../containters/Main";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MutateBook } from "../containters/MutateBook";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route
          path="/add"
          exact
          render={(props) => <MutateBook {...props} />}
        />
        <Route
          path="/edit/:id"
          exact
          render={(props) => <MutateBook {...props} />}
        />
      </Switch>
    </Router>
  );
};
