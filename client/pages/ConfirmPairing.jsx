import React from 'react';

export default class SelectActivity extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <>
        <div className="ui card centered">
          <div className="image">
            <img src="/images/kristy.png" />
          </div>
          <div className="content">
            <div className="header">Sports with Bob</div>
            <div className="description">
              Play basketball at Sports Center with Bob on Jul 10/3/2021 at 1PM.
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
