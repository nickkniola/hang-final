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

  getName() {
    let name = 'Another User';
    if (this.state.result.activityObject) {
      name = this.state.result.activityObject.firstName;
    }
    return name;
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
    return (
      <>
        <div className="ui card centered">
          <div className="image">
            <img src="/images/kristy.png" />
          </div>
          <div className="content">
            <div className="header">{activity} with {name}</div>
            <div className="description">
              Play basketball at Sports Center with {name} on Jul 10/3/2021 at 1PM.
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
