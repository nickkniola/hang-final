import React from 'react';

export default class SelectActivity extends React.Component {
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
      activityObject: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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
        if (data[0]) {
          this.setState({
            activityObject: data[0]
          });
        } else if (data.business_status) {
          this.setState({
            responseLocation: data
          });
        }
      })
      .then(() => {
        if (!this.state.responseLocation && !this.state.activityObject) {
          console.log('No matching activity found. Please try again.');
          return;
        }
        let activityAction = 'Eat at';
        let firstName = this.state.activityObject.firstName;
        let location = this.state.activityObject.location;
        if (this.state.responseLocation) {
          firstName = 'Another User';
          location = this.state.responseLocation.name;
        }
        if (this.state.activityType === 'Sports') {
          activityAction = `Play ${this.state.preferredActivity} at`;
        } else if (this.state.activityType === 'Museum') {
          activityAction = 'Visit';
        }
        console.log(`${this.state.activityType} with ${firstName}. ${activityAction} ${location} on ${this.state.date} at 1PM.`);
      })
      .catch(() => console.error('An unexpected error occurred'));
  }

  render() {
    return (
      <>
        <div className="ui menu">
          <a className="item">
            <img src="/images/hang_logo.png"></img>
          </a>
          <a className="item">
            Pairing
          </a>
          <a className="item">
            Random
          </a>
        </div>
        <h2 className="ui header secondary-header">Select the Activity</h2>
        <div className="ui segment">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="two fields">
              <div className="field">
                <label htmlFor="city" >City</label>
                <input type="text" name="city" id="city" placeholder="ex. Chicago" value={this.state.city} onChange={this.handleChange} />
              </div>
              <div className="field">
                <label htmlFor="neighborhood" >Neighborhood</label>
                <input type="text" name="neighborhood" id="neighborhood" placeholder="ex. Uptown" value={this.state.neighborhood} onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input type="text" name="state" id="state" placeholder="ex. Illinois" value={this.state.state} onChange={this.handleChange} />
            </div>
            <div className="field">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="date" placeholder="yyyy-mm-dd"
                value={this.state.date} onChange={this.handleChange}
                min="2021-01-01" max="2030-01-01" />
            </div>
            <div className="field">
              <label htmlFor="activityType">Activity Type</label>
              <select type="menu" name="activityType" id="activityType" value={this.state.activityType} onChange={this.handleChange} required >
                <option value="">Select Activity...</option>
                <option name="food" value="Food">Food</option>
                <option name="museum" value="Museum">Museum</option>
                <option name="sports" value="Sports">Sports</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="preferredActivity" >Preferred Activity</label>
              <input type="text" name="preferredActivity" id="preferredActivity" placeholder="ex. Tennis" value={this.state.preferredActivity} onChange={this.handleChange} />
            </div>
            <button className="ui primary button" type='submit'>Submit</button>
          </form>
        </div>

      </>
    );
  }
}
