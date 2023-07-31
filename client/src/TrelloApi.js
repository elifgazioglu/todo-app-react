import axios from 'axios';

const apiKey = 'c504324bdddf4f0e60e1630435c46774';
const token = 'ATTA1c040e32058e8c7b314e259c707fb7c93157266b2caa6fcee73647c9e7aae4dc18F09CAE';
const boardId = 'ATATT3xFfGF00I4qBpaIRWbLweNLegwZ8jOslI3lCYRwCnsNdbET0zyfU2uBs-6Z9DMILzdsqwFMAsiSLVDOICrsNB8kVuqolzB7CbG7PEIwUVTUZy2Bc8INp1wcQEaQtEvfJdYLGtmlLK-l5s0PAQ90vSeVs5mEXYAG4S8C6OAUTRcn9mA1V90=AC54D593';

const baseUrl = 'https://api.trello.com/1';

export const createTodoCard = async (name, description) => {
  try {
    const response = await axios.post(`${baseUrl}/cards?key=${apiKey}&token=${token}`, {
      idList: boardId,
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
    const response = await axios.get(`${baseUrl}/boards/${boardId}/cards?key=${apiKey}&token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error getting cards:', error);
    throw error;
  }
};
