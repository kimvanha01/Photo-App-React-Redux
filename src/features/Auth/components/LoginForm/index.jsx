import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import './Login.scss';


LoginForm.propTypes = {
    onSubmit: PropTypes.func
};
LoginForm.defaultProps = {
    onSubmit: null
}

function LoginForm(props) {

    const { initialValues } = props;
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('This field is required.'),
        password: Yup.string().required('This field is required.'),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}>

            {formikProps => {
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log('attributes of formik:', { values, errors, touched });

                return (
                    <Form>
                        <FastField
                            name="email"
                            component={InputField}
                            label="Email"
                            placeholder="abc@example.com"
                        />
                        <FastField
                            name="password"
                            component={InputField}
                            label="Password"
                            placeholder="abc123@"
                        />
                        <FormGroup>
                            <Button
                                className="btn-login"
                                type="submit"
                                color="success"
                                block>
                                {isSubmitting && <div className="loader"></div>}
                                Login
                            </Button>

                        </FormGroup>
                        
                    </Form>
                )
            }}
        </Formik>

    );
}

export default LoginForm;