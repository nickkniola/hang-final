import React from 'react';

export default class SelectActivity extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     city: '',
  //     neighborhood: '',
  //     state: '',
  //     date: '',
  //     activityType: '',
  //     preferredActivity: '',
  //     responseLocation: '',
  //     externalGoogleMapsUrl: '',
  //     activityObject: '',
  //     activeView: 'Pairing',
  //     userId: 1
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   // this.handleMenuClick = this.handleMenuClick.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleAccept = this.handleAccept.bind(this);
  // }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // // handleMenuClick(event) {
  // //   this.setState({
  // //     activeView: event.target.textContent
  // //   });
  // // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState({
  //     activeView: 'acceptReject'
  //   });
  //   // GET request to backend server checking if a matching activity exists
  //   const formData = this.state;
  //   fetch('/api/activities', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(formData)
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.activityObject) {
  //         this.setState({
  //           activityObject: data.activityObject,
  //           externalGoogleMapsUrl: data.activityObject.externalGoogleMapsUrl,
  //           activityType: data.activityType
  //         });
  //       } else if (data.responseLocation) {
  //         this.setState({
  //           responseLocation: data.responseLocation,
  //           externalGoogleMapsUrl: data.mapUrl,
  //           activityType: data.activityType,
  //           googlePlacesLink: data.googlePlacesLink
  //         });
  //       }
  //     })
  //     .then(() => {
  //       if (!this.state.responseLocation && !this.state.activityObject) {
  //         // eslint-disable-next-line no-console
  //         console.log('No matching activity found. Please try again.');
  //       }
  //     })
  //     .catch(() => console.error('An unexpected error occurred'));
  // }

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
  //       .then(data => console.log('POST RESPONSE:', data))
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
  //       .then(data => console.log('PUT RESPONSE:', data))
  //       .catch(() => console.error('An unexpected error occurred'));
  //   }
  // }

  render() {
    const activeView = this.props.activeView;
    const activityObject = this.props.activityObject;
    const responseLocation = this.props.responseLocation;
    const activityType = this.props.activityType;
    const externalGoogleMapsUrl = this.props.externalGoogleMapsUrl;
    let date = this.props.activityObject.date;
    let activityAction = 'Eat at';
    let firstName = this.props.activityObject.firstName;
    let location = this.props.activityObject.location;
    let profileImage = this.props.activityObject.profileImage;
    if (this.props.responseLocation) {
      date = this.props.date;
      const year = date.toString().slice(0, 2);
      const month = date.slice(3, 5);
      const day = date.slice(8, 10);
      const activityDate = new Date(`${month} ${day}, ${year} 00:00:00`);
      date = activityDate.toString().slice(0, 15);
      firstName = 'Another User';
      location = this.props.responseLocation.name;
      profileImage = 'https://semantic-ui.com/images/avatar2/large/molly.png';
    }
    if (this.props.activityType === 'Sports') {
      if (this.props.preferredActivity) {
        activityAction = `Play ${this.props.preferredActivity} at`;
      } else {
        activityAction = 'Play at';
      }
    } else if (this.props.activityType === 'Museum') {
      activityAction = 'Visit';
    }
    return (
      <>

        { activeView === 'acceptReject'
          ? <>
              <div className="ui card centered">
              { !activityObject && !responseLocation
                ? <div className="ui placeholder">
                    <div className="content">
                      <div className="ui placeholder">
                        <div className="square image"></div>
                        <div className="ui active inverted dimmer">
                          <div className="ui massive text loader">Loading</div>
                        </div>
                        <div className="header">
                          <div className="line"></div>
                        </div>
                        <div className="paragraph">
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                        <div className="paragraph">
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                : <>
                    <div className="image">
                      <img src={profileImage} />
                    </div>
                    <div className="content">
                      <div className="header">{activityType} with {firstName}</div>
                      <div className="description">
                        {activityAction} <a href={externalGoogleMapsUrl} rel="noreferrer" target="_blank">{location}</a> with <span className="name-text">{firstName}</span> on {date} at 1PM.
                      </div>
                    </div>
                    <div className="extra content">
                      <div className='ui two buttons'>
                        <button className="ui primary button" type="button" onClick={this.props.handleAccept}>
                        Accept
                        </button>
                        <button className="ui red button" type="button" onClick={this.props.handleSubmit}>
                        Reject
                        </button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </>
          : <div>
            <h2 className="ui header secondary-header">
              {activeView === 'Pairing' ? 'Select Activity' : 'Random Activity'}
            </h2>
            <div className="ui segment">
              <form className="ui form" onSubmit={this.props.handleSubmit}>
                <div className="two fields">
                  <div className="field">
                    <label htmlFor="city" >City</label>
                    <input type="text" name="city" id="city" placeholder="ex. Chicago" value={this.props.city} onChange={this.props.handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="neighborhood" >Neighborhood</label>
                    <input type="text" name="neighborhood" id="neighborhood" placeholder="ex. Uptown" value={this.props.neighborhood} onChange={this.props.handleChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="state">State</label>
                  <input type="text" name="state" id="state" placeholder="ex. Illinois" value={this.props.state} onChange={this.props.handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="date">Date</label>
                  <input type="date" name="date" id="date" placeholder="yyyy-mm-dd"
                    value={this.props.date} onChange={this.props.handleChange}
                    min="2021-01-01" max="2030-01-01" />
                </div>

                { activeView === 'Pairing' &&
                  <>
                    <div className="field">
                      <label htmlFor="activityType">Activity Type</label>
                      <select type="menu" name="activityType" id="activityType" value={this.props.activityType} onChange={this.props.handleChange} required >
                        <option value="">Select Activity...</option>
                        <option name="food" value="Food">Food</option>
                        <option name="museum" value="Museum">Museum</option>
                        <option name="sports" value="Sports">Sports</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="preferredActivity" >Preferred Activity</label>
                      <input type="text" name="preferredActivity" id="preferredActivity" placeholder="ex. Tennis" value={this.props.preferredActivity} onChange={this.props.handleChange} />
                    </div>
                  </>
                }

                <button className="ui primary button" type='submit'>
                  {activeView === 'Pairing' ? 'Submit' : 'Randomize'}
                </button>
              </form>
            </div>
          </div>
        }
      </>
    );
  }
}
