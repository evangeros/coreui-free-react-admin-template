import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import AuthProvider from "./auth/AuthProvider";
import PropTypes from "prop-types";


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const Json = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;


// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  static propTypes = {
    account: PropTypes.object,
    emailMessages: PropTypes.object,
    error: PropTypes.string,
    graphProfile: PropTypes.object,
    onSignIn: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    onRequestEmailToken: PropTypes.func.isRequired
  };

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login account={this.props.account} {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={(props) => (
                this.props.account ? (<DefaultLayout account={this.props.account} {...props}/>):
                  (<Login {...props}/>)
                )} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default AuthProvider(App);
