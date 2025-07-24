// pages/_error.js
import { Component } from 'react';

class ErrorPage extends Component {
  static async getInitialProps({ res, err }) {
    // Default status code is 500
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    // If it's a 500 error, transform it to 410
    if (statusCode === 500) {
      if (res) {
        res.statusCode = 410;
      }
    }

    return { statusCode };
  }

  render() {
    return (
      <div>
        <h1>{this.props.statusCode}</h1>
        <p>
          {this.props.statusCode === 410
            ? 'This resource is no longer available.'
            : 'An error occurred.'}
        </p>
      </div>
    );
  }
}

export default ErrorPage;
