import React from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}


function InputField(props) {
    // Lấy dữ liệu của Control Bind vào UI Control ( Input)
    const { field, form, // cua formik
    type, label, placeholder, disabled  // cua minh custom
    } = props;
    // const{name, value, onChange, onBlur} = field; // 4 thu quan trong cua 1 control
    const{name} = field; 

    const {errors, touched} = form; //error va touched cua form
    const showError = errors[name] && touched[name]; //khi có lỗi và ta đã touch vào control này thì ta show error
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Input 
            id={name}
            // name={name}         // === ...field
            // value= {value}
            // onChange={onChange}
            // onBlur={onBlur}
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            invalid={showError}
            />

        {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>}  chỉ show khi thằng trước nó có invalid */}
        {/* của formik */}
        <ErrorMessage name={name} component={FormFeedback} /> 
        
        </FormGroup>
    );
}

export default InputField;