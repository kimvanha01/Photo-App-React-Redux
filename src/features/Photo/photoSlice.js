import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';

const initialState = {
  photos: []
};

export const getAllListPhoto = createAsyncThunk('photos/list', async (params) => {
  const data = await photoApi.getAllPhoto(params);
  console.log(data);
  return data;
});
export const addNewPhoto = createAsyncThunk('photos/add', async (photo) => {
  const newPhoto = await photoApi.addPhoto(photo);
  return newPhoto;
});
export const delPhoto = createAsyncThunk('photos/delete', async (id) => {
  await photoApi.deletePhoto(id);
  return id;
});
export const updatedPhoto = createAsyncThunk('photos/updated', async (photo) => {
  const newPhoto = await photoApi.updatedPhoto(photo);
  return newPhoto;
});

const photo = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    // setPhoto: (state, action) => {
    //   state.photos = action.payload
    // },
    // addPhoto: (state, action) => {
    //   const newPhoto = action.payload;
    //   state.push(newPhoto); // không cần return do chúng ta đã mutate trực tiếp trên state của mình
    // },
    // removePhoto: (state, action) => {
    //   console.log(action.payload);
    //   const removePhotoId = action.payload;
    //   return state.filter(photo => photo.id !== removePhotoId); // lấy những thằng photo có id khác với th id muốn xóa
    //   // thằng state.filter tạo ra mảng mới nên thằng state lúc này là state mới, nên phải retun, do mảng đã bị mutate
    // },
    // updatePhoto: (state, action) => {
    //   const newPhoto = action.payload;
    //   const photoIndex = state.findIndex(photo => photo.id === newPhoto.id); // so sánh id , tìm index của thằng muốn update

    //   if (photoIndex >= 0) { // nếu tìm được thì cập nhật item ở vị trí index đó = newPhoto
    //     state[photoIndex] = newPhoto; // mutate trên dữ liệu hiện tại nên k cần return
    //   }
    // }
  }, // la 1 object, moi key la 1 action
  extraReducers: (builder) => {
    builder.addCase(getAllListPhoto.fulfilled, (state, action) => {
      state.photos = action.payload
      // console.log(action.payload)
    })
    builder.addCase(addNewPhoto.fulfilled, (state, action) => {
      const newPhoto = action.payload;
      console.log(newPhoto);
      state.photos.push(newPhoto);
    })
    builder.addCase(delPhoto.fulfilled, (state, action) => {
      const delPhoto = action.payload;
      const photoIndex = state.photos.findIndex(photo => photo.id === delPhoto)
      state.photos.splice(photoIndex, 1);
      console.log(photoIndex)
    })
    builder.addCase(updatedPhoto.fulfilled, (state, action) => {
      const photoUpdated = action.payload;
      const photoIndex = state.photos.findIndex(photo => photo.id === photoUpdated.id);
      if (photoIndex > -1) { state.photos[photoIndex] = photoUpdated }
      console.log(photoIndex);
    })
  }
});

const { reducer, actions } = photo;
export const { addPhoto, removePhoto, updatePhoto, setPhoto } = actions;
export default photo.reducer;