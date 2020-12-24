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
      preferredActivity: ''
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
    // const requestSearchText = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.preferredActivity}+${this.state.activityType}+in+${this.state.neighborhood}+${this.state.city}+${this.state.state}${process.env.GOOGLE_PLACES_API_KEY}`;
  }

  render() {
    return (
      <>
        <h2 className="ui header secondary-header">Select the Activity</h2>
        <div className="ui segment">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="two fields">
              <div className="field">
                <label>City</label>
                <input type="text" name="city" placeholder="ex. Chicago" value={this.state.city} onChange={this.handleChange} />
              </div>
              <div className="field">
                <label>Neighborhood</label>
                <input type="text" name="neighborhood" placeholder="ex. Uptown" value={this.state.neighborhood} onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label>State</label>
              <input type="text" name="state" placeholder="ex. Illinois" value={this.state.state} onChange={this.handleChange} />
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" name="date" id="start" placeholder="yyyy-mm-dd"
                value={this.state.date} onChange={this.handleChange}
                min="2021-01-01" max="2030-01-01" />
            </div>
            <div className="field">
              <label>Activity Type</label>
                  <select type="menu" name="activityType" value={this.state.activityType} onChange={this.handleChange} >
                    <option name="food" value="food">Food</option>
                    <option name="museum" value="museum">Museum</option>
                    <option name="sports" value="sports">Sports</option>
                  </select>
            </div>
            <div className="field">
              <label>Preferred Activity</label>
              <input type="text" name="preferredActivity" placeholder="ex. Tennis" value={this.state.preferredActivity} onChange={this.handleChange} />
            </div>
            <button className="ui primary button" type='submit'>Submit</button>
          </form>
        </div>

      </>
    );
  }
}
