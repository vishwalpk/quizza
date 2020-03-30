import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";

interface RoutesProps {}
export default function Routes(props: RoutesProps) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/quiz" component={Quiz}></Route>
        <Route path="/result" component={Result}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </>
  );
}
