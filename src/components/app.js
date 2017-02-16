import React from 'react';
import Helmet from 'react-helmet';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {displayMessage} from '../actions';

import Layout from './Layout';
import style from './app.css';

export class _App extends React.Component {

  static defaultProps = { message: '' };
  static propTypes = {
    message: React.PropTypes.string.isRequired,
    displayMessage: React.PropTypes.func.isRequired
  };

  render = () => {
    return (
      <div className={style.app}>
        <Helmet
          title="React Starter!"
          htmlAttributes={{lang: "en"}}
          meta={[
            {charset: "utf-8" },
            {name: "description", content: "Awesome react starter"},
            {"http-equiv": "x-ua-compatible", content: "ie=edge"},
            {name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"},
          ]}
          link={[{rel: "icon", href: require('../../assets/img/favicon.png'), type: 'image/png', sizes: '32x32' }]} />

        <Layout {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({message: state.message });
const mapDispatchToProps = dispatch => bindActionCreators({displayMessage},dispatch);
export const App = connect(mapStateToProps,mapDispatchToProps)(_App);
