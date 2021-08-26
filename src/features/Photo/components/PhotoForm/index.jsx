import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import { Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { FastField, Form, Formik } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';
import './index.scss';


PhotoForm.propTypes = {
    onSubmit: PropTypes.func
};
PhotoForm.defaultProps = {
    onSubmit: null
}

function PhotoForm(props) {
    // const initialValues = {
    //     title: '',   // không bao giờ sài undefind vì nếu chọn control sẽ thành uncontrol
    //     // name:'' // thêm trường name
    //     categoryId: null,
    //     photo: ''
    // }
    const { initialValues, isAddMode } = props; // nhan initialValues tu thang cha
    // Định nghĩa 1 schema để validate object initialValues bằng Yup ( Formik đã tích hợp sẵn hàm isValid của Yup)
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required.'),

        categoryId: Yup.number().required('This field is required.').nullable(), //cho phép giá trị bị set null báo lỗi

        photo: Yup.string().required('This field is required.'),
        // photo: Yup.string().when('categoryId', {
        //     is: 1,
        //     then: Yup.string().required('This field is required.'),
        //     otherwise: Yup.string().notRequired(),
        //   })
    })

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}>

            {formikProps => {
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log({ values, errors, touched });


                return (
                    <Form>
                        {/* COntrol */}
                        <FastField   //giống boo, sẽ chỉ re-render lại khi tác động tới field của nó   //trong trường hợp các form lặp lặp với những field khác trong form thì dùng fastfield, còn nếu phụ thuộc lẫn nhau thì dùng field
                            //props cua Fastfield
                            name="title"
                            component={InputField}

                            //nhung thu ta truyen vao InputField
                            label="Title"
                            placeholder="Eg: Wow nature..."
                        />
                        {/* <FastField   //Control Name
                            //props cua Fastfield
                            name="name" 
                            component={InputField} 

                            //nhung thu ta truyen vao InputField
                            label="name"
                            placeholder="Eg: Wow nature..."
                        /> */}
                        {/* <FormGroup>   === Fastfield ở trên
                            <Label for="titleId">Title</Label>
                            <Input name="title" id="titleId" placeholder="Eg: Wow nature..." />
                        </FormGroup> */}

                        <FastField
                            name="categoryId"
                            component={SelectField}

                            label="Category"
                            placeholder="What's your photo category?"
                            options={PHOTO_CATEGORY_OPTIONS}
                        />
                        {/* <FormGroup>
                            <Label for="categoryId">Category</Label>
                            <Select
                                name="categoryId"
                                id="categoryId"
                                placeholder="What's your photo category?"
                                options={PHOTO_CATEGORY_OPTIONS}
                            />
                        </FormGroup> */}
                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />
                        <FormGroup>
                            <Button className="add-to-album" type="submit" color={isAddMode ? "primary" : "success"} >
                                {isSubmitting && <div class="loader"></div>}
                                {isAddMode ? 'Add to Album' : 'Update your Photo '}</Button>
                        </FormGroup>
                    </Form>
                )
            }}
        </Formik>

    );
}

export default PhotoForm;