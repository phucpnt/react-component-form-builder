/** @global window */

import React, { Component } from 'react';
import makePropTypesFormBuilder from './make-proptypes-formbuilder';
import PropTypes from 'prop-types'; // eslint-disable-line

export default function makePropBuilder(Com, group = 'defaults') {
  class FormBuilderWidget extends Component {
    getChildContext() {
      return {
        propBuilderGroup: group,
      };
    }
    render() {
      return (<Com {...this.props} />);
    }
  }

  class PropBuilder extends Component {
    getFormPropTypes() {
      const components = window.propBuilderByGroup[group];
      const allPropTypes = components.reduce((accum, com) => {
        const propTypes = com.constructor.propTypes;
        if (propTypes) {
          Object.keys(propTypes).forEach((propName) => {
            if (!accum[propName]) {
              Object.assign(accum, { [propName]: propTypes[propName] });
            }
          });
        }
        return accum;
      }, {});
      return allPropTypes;
    }

    render() {
      const FormBuilder = makePropTypesFormBuilder(FormBuilderWidget);
      return (<FormBuilder {...this.props} getFormPropTypes={this.getFormPropTypes} />);
    }
  }

  PropBuilder.childContextTypes = {
    propBuilderGroup: PropTypes.string,
  };

  PropBuilder.propTypes = {
    pbTransformFields: PropTypes.func,
    pbFormTitle: PropTypes.string,
    uiSchema: PropTypes.any,
  };

  PropBuilder.defaultProps = {
    pbTransformFields: schema => schema,
    pbFormTitle: group,
    uiSchema: {},
  };

  return PropBuilder;
}
