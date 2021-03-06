import React from 'react';
import {Field, reduxForm} from 'redux-form';
// import {connect} from 'react-redux';
// import {createStream} from '../../actions';

class StreamForm extends React.Component {

    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''} `;
        // console.log(formProps.meta);
        // console.log(formProps);
        return (    
            <div className={className}>
                <label>{formProps.label}</label>
                <input 
                {...formProps.input} autoComplete="off"
                // onChange={formProps.input.onChange} 
                // value={formProps.input.value}
                />
                {this.renderError(formProps.meta)}
            </div>   
        );
    }

    renderError = ({error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        // console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter title"/>
                <Field name="description" component={this.renderInput} label="Enter description"/>
                <button className="ui button primary">Submit</button>
            </form>

        );
    };
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        //only ran if user did not enter a title
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'streamForm',
    validate: validate,
})(StreamForm);

export default formWrapped;