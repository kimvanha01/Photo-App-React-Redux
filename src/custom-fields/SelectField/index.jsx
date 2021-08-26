import React from 'react';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import Select from 'react-select';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    options: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

SelectField.defaultProps = {
    options: [],
    label: '',
    placeholder: '',
    disabled: false,
}


function SelectField(props) {
    const { field, form,
        options, label, placeholder, disabled } = props;
    const { name, value } = field;

    const selectedOption = options.find(option => option.value === value);
    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;  // chua chon thi selectedOption = null con neu chon thi set value = selectOption
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        }
        field.onChange(changeEvent);
    }

    
    const {errors, touched} = form; 
    const showError = errors[name] && touched[name]; 

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange} //phari dat o duoi ...field

                disabled={disabled}
                placeholder={placeholder}
                options={options}
                

                className={showError ? 'is-invalid' : ''}
                />
            <ErrorMessage name={name} component={FormFeedback} /> 
        </FormGroup>
    );
}

export default SelectField;