import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import PhotoForm from 'features/Photo/components/PhotoForm';
import Banner from 'components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/comon';
AddEditPage.propTypes = {

};

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();  // photoId tu Index routing // useParam trả về 1object, có bao nhiêu biến trên url thì trả về bấy nhiêu


    const isAddMode = !photoId; // trang này sẽ là Add photo nếu đường dẫn không có idphoto

    const editedPhoto = useSelector(state => {
        return state.photos.find(x => x.id === +photoId) // chuyen photoId ve number

    }); // laasy trong redux cai list cua minh, tim thang nao co id === idPhoto param
    const initialValues = isAddMode // neeus la isAddmode thi se lay thang hien tai
        ? {
            title: '',
            categoryId: null,
            photo: ''
        }
        : editedPhoto;
    console.log({ photoId, editedPhoto });
    const handleSubmit = (values) => {
        // console.log('Form Submit: ', values)
        // const action = addPhoto(values);
        // console.log({action});
        // dispatch(action);

        // history.push('/photos');
        return new Promise(resolve => {
            console.log('Form submit: ', values);

            setTimeout(() => {
                if (isAddMode) {

                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999)
                    }
                    const action = addPhoto(newPhoto);
                    console.log({ action });
                    dispatch(action);
                } else {
                    const action = updatePhoto(values);
                    dispatch(action);
                }
                history.push('/photos');
                resolve(true);

            }, 2000);
        });
    }

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo" />
            <div className="photo-edit__form">
                <PhotoForm
                    isAddMode={isAddMode}
                    initialValues={initialValues}
                    onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default AddEditPage;