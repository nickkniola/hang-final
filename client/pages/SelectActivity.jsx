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
      externalGoogleMapsUrl: '',
      activityObject: '',
      activeView: 'Pairing',
      userId: 1,
      acceptedActivityObject: '',
      activityFound: true,
      isLoading: null
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

  render() {
    return (
      <div>
        <h2 className="ui header secondary-header">
          Select Activity
        </h2>
        <div className="ui segment">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="two fields">
              <div className="field">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" placeholder="ex. Chicago" value={this.state.city} onChange={this.handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="neighborhood" >Neighborhood</label>
                <input type="text" name="neighborhood" id="neighborhood" placeholder="ex. Uptown" value={this.state.neighborhood} onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input type="text" name="state" id="state" placeholder="ex. Illinois" value={this.state.state} onChange={this.handleChange} required/>
            </div>
            <div className="field">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="date" placeholder="yyyy-mm-dd"
                value={this.state.date} onChange={this.handleChange}
                min="2021-01-01" max="2030-01-01" required />
            </div>
              <>
                <div className="field">
                  <label htmlFor="activityType">Activity Type</label>
                  <select type="menu" name="activityType" id="activityType" value={this.state.activityType} onChange={this.handleChange} required>
                    <option value="">Select Activity...</option>
                    <option name="food" value="Food">Food</option>
                    <option name="museum" value="Museum">Museum</option>
                    <option name="sports" value="Sports">Sports</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="preferredActivity">Preferred Activity</label>
                  <input type="text" name="preferredActivity" id="preferredActivity" placeholder="ex. Tennis" value={this.state.preferredActivity} onChange={this.handleChange} required/>
                </div>
              </>
            <button className="ui primary button" type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
