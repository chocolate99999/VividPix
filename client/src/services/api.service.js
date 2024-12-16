import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 從後端取得 API Key
export const getApiKey = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/get-api-key`);
    return response.data.apiKey;
  } catch (error) {
    console.error('Error fetching API Key:', error);
    throw error;
  }
};

// 使用 API Key 發送搜尋請求
export const searchPhotos = async (url, apiKey) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};

// 使用 API Key 獲取單一圖片的詳細資料
export const getPhotoById = async (id, apiKey) => {
  const url = `https://api.pexels.com/v1/photos/${id}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    return response.data; // 返回單一圖片的詳細資料
  } catch (error) {
    console.error('Error fetching photo by ID:', error);
    throw error;
  }
};

export default { getApiKey, searchPhotos, getPhotoById };