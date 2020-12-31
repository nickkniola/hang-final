import React from 'react';
import { Redirect } from 'react-router-dom';

export default class SelectActivity extends React.Component {
  render() {
    const activeView = this.props.activeView;
    const activityObject = this.props.activityObject;
    const responseLocation = this.props.responseLocation;
    const activityType = this.props.activityType;
    const externalGoogleMapsUrl = this.props.externalGoogleMapsUrl;
    const activityFound = this.props.activityFound;
    const isLoading = this.props.isLoading;
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
    if (this.props.activeView === 'Matches') {
      return <Redirect to='/matches'/>;
    }
    return (
      <>
        { activityFound === false
          ? <>
              <div className="ui red header secondary-header ">No Activity Found. Please Try Again.</div>
              <div className="ui divider"></div>
            </>
          : <> </>
        }
        { activityObject || responseLocation || isLoading
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
