import React from 'react';
import Menu from './pages/menu';
// import SelectActivity from './pages/select-activity';
import SelectActivity from './pages/SelectActivity';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleMenuClick(event) {
    this.setState({
      activeView: event.target.textContent
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    // GET request to backend server checking if a matching activity exists
    const formData = this.state;
    fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false
        });
        if (data.activityObject) {
          this.setState({
            activityObject: data.activityObject,
            externalGoogleMapsUrl: data.activityObject.externalGoogleMapsUrl,
            activityType: data.activityType,
            activityFound: true
          });
        } else if (data.responseLocation) {
          this.setState({
            responseLocation: data.responseLocation,
            externalGoogleMapsUrl: data.mapUrl,
            activityType: data.activityType,
            googlePlacesLink: data.googlePlacesLink,
            activityFound: true
          });
        }
      })
      .then(() => {
        if (!this.state.responseLocation && !this.state.activityObject) {
          // eslint-disable-next-line no-console
          this.setState({
            city: '',
            neighborhood: '',
            state: '',
            date: '',
            activityType: '',
            preferredActivity: '',
            responseLocation: '',
            externalGoogleMapsUrl: '',
            activityObject: '',
            userId: 1,
            acceptedActivityObject: '',
            activityFound: false,
            isLoading: null
          });
        }
      })
      .catch(() => console.error('An unexpected error occurred'));
  }

  handleAccept() {
    const formData = this.state;
    if (this.state.responseLocation) {
      fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => this.setState({ acceptedActivityObject: data, activeView: 'Matches' }))
        .catch(() => console.error('An unexpected error occurred'));
    } else if (this.state.activityObject) {
      fetch(`/api/activities/${this.state.activityObject.activityId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => this.setState({ acceptedActivityObject: data, activeView: 'Matches' }))
        .catch(() => console.error('An unexpected error occurred'));
    }
  }

  render() {
    return (
      <div className="container">
      <Menu handleMenuClick={this.handleMenuClick} />
      <Switch location={this.props.location}>
          {/* <Route exact path='/pairing' render={props => <SelectActivity handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAccept={this.handleAccept} city={this.state.city} neighborhood={this.state.neighborhood} state={this.state.state} date={this.state.date} activityType={this.state.activityType} preferredActivity={this.state.preferredActivity} responseLocation={this.state.responseLocation} externalGoogleMapsUrl={this.state.externalGoogleMapsUrl} activityObject={this.state.activityObject} activeView={this.state.activeView} userId={this.state.userId} activityFound={this.state.activityFound} isLoading={this.state.isLoading} />} />
          <Route exact path='/random' render={props => <SelectActivity handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAccept={this.handleAccept} city={this.state.city} neighborhood={this.state.neighborhood} state={this.state.state} date={this.state.date} activityType={this.state.activityType} preferredActivity={this.state.preferredActivity} responseLocation={this.state.responseLocation} externalGoogleMapsUrl={this.state.externalGoogleMapsUrl} activityObject={this.state.activityObject} activeView={this.state.activeView} userId={this.state.userId} activityFound={this.state.activityFound} isLoading={this.state.isLoading} />} /> */}
          <Route exact path='/pairing/select' render={props => <SelectActivity/> }></Route>
          <Route exact path='/matches' component={Matches} />
          <Redirect to='/pairing' />
      </Switch>
      </div>
    );
  }
}

const Router = withRouter(App);
export default Router;
