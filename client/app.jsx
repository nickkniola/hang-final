import React from 'react';
import SelectActivity from './pages/select-activity';
import Menu from './pages/menu';
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
      userId: 1
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
      activeView: 'acceptReject'
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
        if (data.activityObject) {
          this.setState({
            activityObject: data.activityObject,
            externalGoogleMapsUrl: data.activityObject.externalGoogleMapsUrl,
            activityType: data.activityType
          });
        } else if (data.responseLocation) {
          this.setState({
            responseLocation: data.responseLocation,
            externalGoogleMapsUrl: data.mapUrl,
            activityType: data.activityType,
            googlePlacesLink: data.googlePlacesLink
          });
        }
      })
      .then(() => {
        if (!this.state.responseLocation && !this.state.activityObject) {
          // eslint-disable-next-line no-console
          console.log('No matching activity found. Please try again.');
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
        .then(data => console.log('POST RESPONSE:', data))
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
        .then(data => console.log('PUT RESPONSE:', data))
        .catch(() => console.error('An unexpected error occurred'));
    }
  }

  render() {
    return (
      <div className="container">
      <Menu handleMenuClick={this.handleMenuClick} />
      <Switch location={this.props.location}>
          <Route exact path='/pairing' component={props => <SelectActivity handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAccept={this.handleAccept} city={this.state.city} neighborhood={this.state.neighborhood} state={this.state.state} date={this.state.date} activityType={this.state.activityType} preferredActivity={this.state.preferredActivity} responseLocation={this.state.responseLocation} externalGoogleMapsUrl={this.state.externalGoogleMapsUrl} activityObject={this.state.activityObject} activeView={this.state.activeView} userId={this.state.userId} />} />
          <Route exact path='/random' component={props => <SelectActivity handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAccept={this.handleAccept} city={this.state.city} neighborhood={this.state.neighborhood} state={this.state.state} date={this.state.date} activityType={this.state.activityType} preferredActivity={this.state.preferredActivity} responseLocation={this.state.responseLocation} externalGoogleMapsUrl={this.state.externalGoogleMapsUrl} activityObject={this.state.activityObject} activeView={this.state.activeView} userId={this.state.userId} />} />
          {/* <Route exact path='/matches' component={Matches} /> */}
          <Redirect to='/pairing' />
      </Switch>
    </div>
    );
  }
}

// const Router = withRouter(({ location }) => (
//     <div className="container">
//       <Menu />
//       <Switch location={location}>
//           <Route exact path='/pairing' component={SelectActivity} />
//           <Route exact path='/random' component={SelectActivity} />
//           {/* <Route exact path='/matches' component={Matches} /> */}
//           <Redirect to='/pairing' />
//       </Switch>
//     </div>
// ));

const Router = withRouter(App);
export default Router;
