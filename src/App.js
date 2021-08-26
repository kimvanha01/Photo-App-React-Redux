import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import './App.scss';
import Header from "./components/Header";
import NotFound from "./components/NotFound";

//Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/photos" />
            
            <Route path="/photos" component={Photo} />  {/* match.url trong Photo*/}
            <Route component={NotFound} />
          </Switch>

        </Router>
      </Suspense>
    </div>
  );
}

export default App;
