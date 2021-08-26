# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### Custom Field 
- Cầu nối giữa UI control và Formik.
- UI Control là 1 controlled component với props: 
    - name: tên xác định control
    - value: giá trị của control
    - onChange: trigger hàm này với giá trị mới khi thay đổi
    - onBlur: xác định khi nào thì control này bị touched

### Random Image Control 
Props
    - name:
    - imageUrl
    - onImageUrlChange
    - onRandomButtonBlur