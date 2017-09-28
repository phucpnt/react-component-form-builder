import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default function App(props) {
  return (
    <div>
      Customize this button: <br/>
      <Button {...props}>{props.text}</Button>
      <p>
        Check the document on <a href="https://ant.design/components/button/">Antd button</a> for input the value of this component
      </p>
    </div>
  );
}

App.propTypes = Object.assign({}, Button.propTypes, {
  text: PropTypes.string,
});
App.defaultProps = Object.assign({}, Button.defaultProps, {
  text: 'Customize me :)',
});
