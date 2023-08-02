import axios from 'axios';

const baseUrl = 'https://api.trello.com/1';

export const createTodoCard = async (name, description) => {
  try {
    const response = await axios.post(`${baseUrl}/cards?key=${process.env.apiKey}&token=${process.env.token}`, {
      idList: process.env.boardId,
      name,
      desc: description,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};

export const getTodoCards = async () => {
  try {
    const response = await axios.get(`${baseUrl}/boards/${process.env.boardId}/cards?key=${process.env.apiKey}&token=${process.env.token}`);
    return response.data;
  } catch (error) {
    console.error('Error getting cards:', error);
    throw error;
  }
};
