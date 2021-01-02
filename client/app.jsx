import React from 'react';
import Menu from './pages/menu';
import SelectActivity from './pages/SelectActivity';
import SelectRandom from './pages/SelectRandom';
import ConfirmPairing from './pages/ConfirmPairing';
import Matches from './pages/matches';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      neighborhood: '',
      state: '',
      date: '',
      activityType: '',
      preferredActivity: '',
      responseLocation: '',
      externalGoogleMapsUrl: '',
      activityObject: '',
      activeView: 'Pairing',
      userId: 1,
      acceptedActivityObject: '',
      activityFound: true,
      isLoading: null
    };
  }

  // handleAccept() {
  //   const formData = this.state;
  //   if (this.state.responseLocation) {
  //     fetch('/api/activity', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     })
  //       .then(response => response.json())
  //       .then(data => this.setState({ acceptedActivityObject: data, activeView: 'Matches' }))
  //       .catch(() => console.error('An unexpected error occurred'));
  //   } else if (this.state.activityObject) {
  //     fetch(`/api/activities/${this.state.activityObject.activityId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     })
  //       .then(response => response.json())
  //       .then(data => this.setState({ acceptedActivityObject: data, activeView: 'Matches' }))
  //       .catch(() => console.error('An unexpected error occurred'));
  //   }
  // }

  render() {
    return (
      <div className="container">
      <Menu handleMenuClick={this.handleMenuClick} />
      <Switch location={this.props.location}>
          <Route exact path='/pairing/select' component={SelectActivity} />
          <Route exact path='/pairing/confirm' component={ConfirmPairing} />
          <Route exact path='/random/select' component={SelectRandom} />
          <Route exact path='/random/confirm' component={ConfirmPairing} />
          <Route exact path='/matches' component={Matches} />
          <Redirect to='/pairing/select' />
      </Switch>
      </div>
    );
  }
}

const Router = withRouter(App);
export default Router;
