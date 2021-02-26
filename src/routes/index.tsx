import React from "react";
import { Main } from "../containters/Main";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Edit } from "../containters/Edit";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/edit" exact>
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
};
