import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import ErrorDialog from './ErrorDialog';

export default class ErrorBoundary extends Component {
  state = {
    networkError: '',
  };

  componentDidMount() {
    // Set axios interceptors
    this.requestInterceptor = Axios.interceptors.request.use((req) => {
      const TIMEOUT_FOR_REQUEST = 10000;
      let source = Axios.CancelToken.source();
      setTimeout(() => {
        source.cancel();
      }, TIMEOUT_FOR_REQUEST);
      req.cancelToken = source.token;
      this.setState({ networkError: '' });
      return req;
    });

    this.responseInterceptor = Axios.interceptors.response.use(
      (res) => res,
      (networkError) => {
        if (
          !networkError?.response?.status ||
          networkError?.response?.status === 500
        ) {
          this.setState({ networkError });
        }
        return Promise.reject(networkError);
      },
    );
  }

  componentWillUnmount() {
    // Remove handlers
    Axios.interceptors.request.eject(this.requestInterceptor);
    Axios.interceptors.response.eject(this.responseInterceptor);
  }

  closeErrorDialog = () => {
    this.setState({ networkError: '' });
  };

  render() {
    // next code block goes here
    return (
      <>
        {this.props.children}
        {!!this.state.networkError && (
          <ErrorDialog
            message={'Sorry, Something went wrong!'}
            close={() => this.closeErrorDialog()}
          />
        )}
      </>
    );
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
