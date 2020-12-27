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
      responseLocation: ''
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
    // GET request to backend server checking if matching activity exists
    fetch('/api/activities')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(() => console.error('An unexpected error occurred'));
    // then fetch to Google Places API
    const city = this.state.city.replaceAll(' ', '+');
    const neighborhood = this.state.neighborhood.replaceAll(' ', '+');
    const state = this.state.state.replaceAll(' ', '+');
    const preferredActivity = this.state.preferredActivity.replaceAll(' ', '+');
    const requestSearchText = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${preferredActivity}+${this.state.activityType}+in+${neighborhood}+${city}+${state}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // fetch(proxyUrl + requestSearchText)
    //   .then(response => response.json())
    //   .then(data => {
    //     const arr = data.results;
    //     for (let i = 0; i < arr.length - 1; i++) {
    //       const location = arr[i];
    //       if (location.business_status === 'OPERATIONAL' && location.rating >= 4) {
    //         this.setState({
    //           responseLocation: location
    //         });
    //       }
    //     }

    //   })
    //   .catch(() => console.error('An unexpected error occurred'));
  }

  render() {
    return (
      <>
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
                <option name="food" value="food">Food</option>
                <option name="museum" value="museum">Museum</option>
                <option name="sports" value="sports">Sports</option>
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
