import React from 'react';
import { Button } from 'antd';

export default function App(props) {
  return (
    <div>
      Customize this button: <br/>
      <Button {...props} >Hello</Button>
      <p>
        Check the document on <a href="https://ant.design/components/button/">Antd button</a> for input the value of this component
      </p>
    </div>
  );
}

App.propTypes = Button.propTypes;
App.defaultProps = Button.defaultProps;
