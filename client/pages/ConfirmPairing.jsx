import React from 'react';
import { Redirect } from 'react-router';

export default class ConfirmPairing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      result: null
    };
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const fields = ['city', 'neighborhood', 'state', 'date', 'activityType', 'preferredActivity'];
    const formData = { userId: 2 };
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const value = params.get(field);
      formData[field] = value;
    }
    fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => this.setState({ result: data, isLoading: false }));
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

  getName() {
    let name = 'Another User';
    if (this.state.result.activityObject) {
      name = this.state.result.activityObject.firstName;
    }
    return name;
  }

  getActivityAction() {
    let activityAction = 'Eat at';
    if (this.state.result.activityType === 'Sports') {
      if (this.state.result.preferredActivity) {
        activityAction = `Play ${this.state.result.preferredActivity} at`;
      } else {
        activityAction = 'Play at';
      }
    } else if (this.state.result.activityType === 'Museum') {
      activityAction = 'Visit';
    }
    return activityAction;
  }

  getLocation() {
    let location = '';
    if (this.state.result.activityObject) {
      location = this.state.result.activityObject.location;
    } else if (this.state.result.responseLocation) {
      location = this.state.result.responseLocation.name;
    }
    return location;
  }

  getExternalGoogleMapsUrl() {
    let url = '/';
    if (this.state.result.activityObject) {
      url = this.state.result.activityObject.externalGoogleMapsUrl;
    } else if (this.state.result.responseLocation) {
      // url = this.state.result.mapUrl;
      url = 'test';
    }
    return url;
  }

  getDate() {
    // let date = this.state.result.activityObject.date;
    // if (this.state.result.responseLocation) {
    //   date = this.state.date;
    //   const year = date.toString().slice(0, 2);
    //   const month = date.slice(3, 5);
    //   const day = date.slice(8, 10);
    //   const activityDate = new Date(`${month} ${day}, ${year} 00:00:00`);
    //   date = activityDate.toString().slice(0, 15);
    //   firstName = 'Another User';
    //   location = this.props.responseLocation.name;
    //   profileImage = 'https://semantic-ui.com/images/avatar2/large/molly.png';
    // }
    return '01/01/2021';
  }

  render() {
    if (this.state.isLoading === true) {
      return 'loading';
    }
    if (!this.state.result.activityObject && !this.state.result.responseLocation) {
      return <Redirect to={ '/pairing/select' + this.props.location.search + '&error=true'} />;
    }
    const activity = this.state.result.activityType;
    const name = this.getName();
    const activityAction = this.getActivityAction();
    const locationName = this.getLocation();
    const externalGoogleMapsUrl = this.getExternalGoogleMapsUrl();
    const date = this.getDate();
    return (
      <>
        <div className="ui card centered">
          <div className="image">
            <img src="/images/kristy.png" />
          </div>
          <div className="content">
            <div className="header">{activity} with {name}</div>
            <div className="description">
              {activityAction} <a href={externalGoogleMapsUrl} rel="noreferrer" target="_blank">{locationName}</a> with <span className="name-text">{name}</span> on {date} at 1PM.
            </div>
          </div>
          <div className="extra content">
            <div className='ui two buttons'>
              <button className="ui primary button" type="button" onClick={this.handleAccept}>
                Accept
              </button>
              <button className="ui red button" type="button" onClick={this.handleSubmit}>
                Reject
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
