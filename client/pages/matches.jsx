import React from 'react';

export default class Matches extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="ui grid celled">
        <div className="seven wide column matches-container">
          <h2 className="secondary-header">Matches</h2>
          <div className="ui middle aligned celled list">
            <div className="item">
              <img className="ui avatar image" src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"/>
              <div className="content">
                <div className="header">Helene</div>
              </div>
              <div className="right floated content">
                <button className="ui icon button basic message-button">
                  <i className="comments alternate icon"/>
                </button>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"/>
              <div className="content">
                <div className="header">Stevie</div>
              </div>
              <div className="right floated content">
                <button className="ui icon button basic message-button">
                <i className="comments alternate icon"/>
                </button>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/>
              <div className="content">
                <div className="header">Elliot</div>
              </div>
              <div className="right floated content">
                <button className="ui icon button basic message-button">
                <i className="comments alternate icon"/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="nine wide column">
          <h2 className="secondary-header">Activities</h2>
          <div className="ui divider"></div>
          <div className="ui middle aligned list">
            <div className="item">
              <div className="content">
                <div className="header">Food with Daniel</div>
                <div className="description">
                  Go out to eat at
                  <a>
                    <b> Starbucks </b>
                  </a>
                  on July 14, 2021.
                </div>
              </div>
            </div>
            <br/>
            <div className="item">
              <div className="content">
                <div className="header">Food with Daniel</div>
                <div className="description">
                  Go out to eat at
                  <a>
                    <b> Starbucks </b>
                  </a>
                  on July 14, 2021.
                </div>
              </div>
            </div>
            <br/>
            <div className="item">
              <div className="content">
                <div className="header">Food with Daniel</div>
                <div className="description">
                  Go out to eat at
                  <a>
                    <b> Starbucks </b>
                  </a>
                  on July 14, 2021.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
