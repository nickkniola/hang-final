import React from 'react';
import Menu from './pages/Menu';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import SelectActivity from './pages/SelectActivity';
import SelectRandom from './pages/SelectRandom';
import ConfirmPairing from './pages/ConfirmPairing';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import AppContext from './pages/app-context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setUserData = this.setUserData.bind(this);
  }

  setUserData(data) {
    this.setState(data);
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.setUserData(data);
  }

  render() {
    return (
      <div className="container">
        <AppContext.Provider value={this.state}>
        <Menu />
          <Switch location={this.props.location}>
            <Route exact path='/main' component={Main} />
            <Route exact path='/signup' component={SignUp} />
            {this.state && <>
            <Route exact path='/pairing/select' component={SelectActivity} />
            <Route exact path='/pairing/confirm' component={ConfirmPairing} />
            <Route exact path='/random/select' component={SelectRandom} />
            <Route exact path='/random/confirm' component={ConfirmPairing} />
            <Route exact path='/matches' component={Matches} />
            <Route exact path='/messages' component={Messages} />
            </>
            }
            <Redirect to='/main' />
          </Switch>
        </AppContext.Provider>
      </div>
    );
  }
}

const Router = withRouter(App);
export default Router;
