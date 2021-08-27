import * as actionsAPI from "api/axiosClient";
import {createSlice} from '@reduxjs/toolkit';

const initialPhotos = [];

const photo = createSlice({
    name: 'photos',
    initialState: initialPhotos,
    reducers: {
        addPhoto: (state, action) => {
            const newPhoto = action.payload;
            state.push(newPhoto); // không cần return do chúng ta đã mutate trực tiếp trên state của mình
        },
        removePhoto: (state, action) => {
            console.log(action.payload);
            const removePhotoId = action.payload; 
            return state.filter(photo => photo.id !== removePhotoId); // lấy những thằng photo có id khác với th id muốn xóa
        // thằng state.filter tạo ra mảng mới nên thằng state lúc này là state mới, nên phải retun, do mảng đã bị mutate
        },
        updatePhoto: (state, action) => {
            const newPhoto = action.payload;
            const photoIndex = state.findIndex(photo => photo.id === newPhoto.id); // so sánh id , tìm index của thằng muốn update

            if (photoIndex >= 0) { // nếu tìm được thì cập nhật item ở vị trí index đó = newPhoto
                state[photoIndex] = newPhoto; // mutate trên dữ liệu hiện tại nên k cần return
            }
        }
    } // la 1 object, moi key la 1 action
});
// export const fetchPhotos = () => async (dispatch) => {
//   const res = await actionsAPI.getPhotoAPI();
//   console.log(res.data)
//   // dispatch((res.data));
//   // dispatch(getPhoto(res.data));
// };
const {reducer, actions } = photo;
export const { addPhoto, removePhoto , updatePhoto } = actions;
export default reducer;