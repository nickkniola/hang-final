import React from 'react';
import Menu from './pages/Menu';
import SelectActivity from './pages/SelectActivity';
import SelectRandom from './pages/SelectRandom';
import ConfirmPairing from './pages/ConfirmPairing';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className="container">
      <Menu />
      <Switch location={this.props.location}>
          <Route exact path='/pairing/select' component={SelectActivity} />
          <Route exact path='/pairing/confirm' component={ConfirmPairing} />
          <Route exact path='/random/select' component={SelectRandom} />
          <Route exact path='/random/confirm' component={ConfirmPairing} />
          <Route exact path='/matches' component={Matches} />
          <Route exact path='/messages' component={Messages} />
          <Redirect to='/pairing/select' />
      </Switch>
      </div>
    );
  }
}

const Router = withRouter(App);
export default Router;
