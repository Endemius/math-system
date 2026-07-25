import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import './App.css';
import './assets/style/main.scss'
import customTheme from "./configuration/theme";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import {useEffect} from "react";
import cookie from "./tools/cookie";
import {ThemeProvider} from "@emotion/react";

function App() {
  useEffect(() => {
    if (!cookie.get('locale')) cookie.set('locale', 'ru');
  }, [])

  return (
        <CookiesProvider>
          <Router>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Router>
        </CookiesProvider>
  );
}

export default App;
