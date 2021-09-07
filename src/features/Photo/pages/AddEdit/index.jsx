import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addNewPhoto, updatedPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/comon';
import './style.scss';
AddEditPage.propTypes = {

};

function AddEditPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();  // photoId tu Index routing // useParam trả về 1object, có bao nhiêu biến trên url thì trả về bấy nhiêu


    const isAddMode = !photoId; // trang này sẽ là Add photo nếu đường dẫn không có idphoto

    const editedPhoto = useSelector(state => {
        return state.photos.photos.find(x => x.id === + photoId) // chuyen photoId ve number
    }); // laasy trong redux cai list cua minh, tim thang nao co id === idPhoto param

    const initialValues = isAddMode // neeus la isAddmode thi se lay thang hien tai
        ? {
            title: '',
            categoryId: null,
            photo: ''
        }
        : editedPhoto;
    console.log({ photoId, editedPhoto });
    // console.log('initialValues', initialValues);

    const handleSubmit = (values) => {

        return new Promise(resolve => {
            console.log('Form submit: ', values);

            setTimeout(() => {
                if (isAddMode) {

                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999)
                    }

                    console.log(newPhoto);
                    dispatch(addNewPhoto(newPhoto));
                } else {
                    dispatch(updatedPhoto(values));
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