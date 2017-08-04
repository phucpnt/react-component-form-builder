import React, { Component } from 'react';
import { render } from 'react-dom';

// import './inject-react';
// import './inject-preact';

import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import asap from 'asap';

import './proptype-wrapper';
import mapPropTypesToJsonSchema from './map-prop-types2json-schema';
import SchemaFieldTab from './rjsf-schema-field-tab';

const css = require('./formframe.css').toString();

export default function makePropTypesFormBuilder(Com) {
  class PropTypesFormBuilder extends Component {
    constructor(props) {
      super(props);
      this.itemContainer = null;
      this.showForm = this.showForm.bind(this);
      this.state = Object.assign({}, props);
      delete (this.state.ref);
    }

    componentDidUpdate() {
      render(<Com {...this.state} />, this.itemContainer);
    }
    componentDidMount() {
      render(<Com {...this.state} />, this.itemContainer);
      asap(() => {
        this.showForm(this.props.uiSchema);
      });
    }

    renderToFrame() {
      const frame = this.itemContainer.contentDocument;
      let container = frame.getElementById('container');
      if (!container) {
        container = frame.createElement('div');
        container.id = 'container';
        frame.body.appendChild(container);
      }
      render(<Com {...this.state} />, container);
    }

    render() {
      return (<div id="react-component-formbuilder">
        <div style={{ marginLeft: '420px' }}
          className="component-container" ref={(container) => { this.itemContainer = container; }}></div>
        <div style={{ position: 'fixed', width: '30%', maxWidth: '420px', left: 0, top: 0, bottom: 0 }}
          className="form-container">
          <iframe ref={(container) => { this.formContainer = container; }}
            style={{ border: 0, width: '100%', height: '100%' }}></iframe>
        </div>
      </div>);
    }

    showForm(customUISchema = null) {
      const iframeDoc = this.formContainer.contentDocument;
      let container = iframeDoc.getElementById('container');
      if (!container) {
        const style = iframeDoc.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(iframeDoc.createTextNode(css));
        }
        iframeDoc.head.appendChild(style);
        container = iframeDoc.createElement('div');
        container.id = 'container';
        container.className = 'container-fluid';
        iframeDoc.body.appendChild(container);
      }

      const formSchema = {
        title: this.props.pbFormTitle,
        type: 'object',
        properties: mapPropTypesToJsonSchema(this.props.getFormPropTypes()),
      };

      // TODO: expose maps between the props & field value
      const formData = Object.keys(formSchema.properties)
        .reduce((accum, key) => Object.assign(accum, { [key]: this.props.formData[key] }), {});
      let uiSchema;
      if (!customUISchema) {
        uiSchema = Object.keys(formSchema.properties).reduce((accum, key) => {
          if (formSchema.properties[key].type === 'boolean') {
            return Object.assign(accum, { [key]: { 'ui:widget': 'select' } });
          }
          return accum;
        }, {});
      } else {
        uiSchema = customUISchema;
      }

      // uiSchema = Object.assign({}, uiSchema, customUISchema);

      // const containerId = `prop-builder-form---${this.props.formId}`;
      // let container = document.getElementById(containerId);
      // if (!container) {
      //   container = document.createElement('div');
      //   container.id = `prop-builder-form---${this.props.formId}`;
      //   container.className = 'container-fluid';
      //   document.body.appendChild(container);
      // }

      // if (container.firstChild) {
      //   container.removeChild(container.firstChild);
      // }

      const handleSubmit = (data) => {
        console.log('>>> submit', data);
        if (data.errors.length === 0) {
          this.setState(data.formData);
          this.forceUpdate();
          console.log(this.state);
        }
      };

      render(<Form
        fields={{ SchemaField: SchemaFieldTab }}
        schema={formSchema} formData={formData} uiSchema={uiSchema} onSubmit={handleSubmit} />, container);
    }
  }

  PropTypesFormBuilder.propTypes = {
    pbTransformFields: PropTypes.func,
    pbFormTitle: PropTypes.string,
    uiSchema: PropTypes.any,
    formId: PropTypes.string,
    getFormPropTypes: PropTypes.func,
    formData: PropTypes.object,
  };

  PropTypesFormBuilder.defaultProps = {
    pbTransformFields: schema => schema,
    pbFormTitle: 'Customize Component',
    formId: 'formId',
    uiSchema: {},
    formData: {},
  };

  return PropTypesFormBuilder;
}
