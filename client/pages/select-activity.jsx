import React from 'react';

export default function SelectActivity(props) {
  return (
    <>
      <h2 className="ui header">Select Activity</h2>
      <div className="ui segment">
        <form className="ui form">
          <div className="two fields">
            <div className="field">
              <label>City</label>
              <input type="text" fluid placeholder="ex. Chicago" />
            </div>
            <div className="field">
              <label>Neighborhood</label>
              <input type="text" fluid placeholder="ex. Uptown" />
            </div>
          </div>
          <div className="field">
            <label>State</label>
            <input type="text" fluid placeholder="ex. Illinois"></input>
          </div>

          <div className="field">
            <label>Date</label>
            <input type="date" id="start" placeholder="yyyy-mm-dd" name="dateInput"
              value="2020-01-01"
              min="2021-01-01" max="2030-01-01" />
          </div>
          <div className="ui compact menu">
            <div className="ui simple dropdown item">
              Dropdown
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">Food</div>
                <div className="item">Museum</div>
                <div className="item">Sports</div>
              </div>
            </div>
          </div>
          <button className="ui primary button" type='submit'>Submit</button>
        </form>
      </div>

    </>
  );
}
