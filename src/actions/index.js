import axios from 'axios';

export const SELECT_FILE = 'SELECT_FILE';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const SET_UPLOADING = 'SET_UPLOADING';

export const selectFile = (file) => ({
  type: SELECT_FILE,
  payload: file,
});

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadPhoto = (file) => {
  return async (dispatch) => {
    dispatch({ type: SET_UPLOADING, payload: true });
    dispatch({ type: UPLOAD_FAILURE, payload: null }); // Clear previous errors

    try {
      const base64Image = await convertToBase64(file).then((data) => data.split(',')[1]);

      const apikey = 'decc30535342427f981ccc8d08642ee7'; // Updated API key
      const url = 'https://www.cutout.pro/api/v1/idphoto/printLayout';

      const data = {
        base64: base64Image,
        bgColor: 'FFFFFF',
        dpi: 300,
        mmHeight: 35,
        mmWidth: 25,
        printBgColor: 'FFFFFF',
        printMmHeight: 210,
        printMmWidth: 150,
      };

      const response = await axios.post(url, data, {
        headers: {
          APIKEY: apikey,
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data); // Log API response to console
      dispatch({ type: UPLOAD_SUCCESS, payload: response.data.data.idPhotoImage });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message); // Log API error to console
      dispatch({ type: UPLOAD_FAILURE, payload: 'Error uploading photo. Please try again.' });
    } finally {
      dispatch({ type: SET_UPLOADING, payload: false });
    }
  };
};
