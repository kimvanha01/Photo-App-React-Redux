import axiosClient from "./axiosClient";
const photoApi = {

    getAllPhoto: (params) => {
        const url = `/photos?${params}`;
        console.log(url);
        return axiosClient.get(url, {
            header: 'Ha Van Kim'
        });

    },
    getPhoto: (id) => {
        const url = `/photos/${id}`;
        return axiosClient.get(url);
    },
    addPhoto: (photo) => {
        const url = '/photos';
        return axiosClient.post(url, photo)
    },
    updatedPhoto: (photo) => {
        const url = `/photos/${photo.id}`;
        return axiosClient.put(url, {
            title: photo.title,
            categoryId: photo.categoryId,
            photo: photo.photo,
        })
    },
    deletePhoto: (id) => {
        const url = `/photos/${id}`;
        return axiosClient.delete(url)
    },

}

export default photoApi;
// export const postTodoAPI = (todo: ITodo) => {
//     return axiosInstance.post(`/todoList`, todo);
//   };

//   export const deleteTodoAPI = (id: number) => {
//     return axiosInstance.delete(`/todoList/${id}`);
//   };

//   export const putTodoAPI = (todo: ITodo) => {
//     return axiosInstance.put(`/todoList/${todo.id}`, {
//       title: todo.title,
//       isCompleted: todo.isCompleted,
//       deadline: todo.deadline,
//     });
//   };