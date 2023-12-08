//Сервер Node.JS
//Подключаем необходимые модули 

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { Octokit } = require('@octokit/rest');
const PORT = process.env.PORT || 3001;
const Debug_mode = 1;
//Пусть работает axios
const axios = require('axios');
//Настраиваем октокит с персональным токеном полученным от гитхаба
const octokit = new Octokit({
    auth: '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',
  });

//Поддержка генерации ответа в формате JSON
app.use(express.json());
// Разрешить все CORS-запросы
app.use(cors());

//Подключаем статичную папку из приложения React
app.use(express.static(path.join(__dirname, 'client/public')));

//Маршрутизация на статичный файл при попытке перейти к серверу (debug)
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
//});

app.get('/gitapi/random-users', async (req, res) => {
    try {
      const randomUsersArray = [];
      const accessToken = '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'; // Замените на свой токен
      const maxAttempts = 10; // Максимальное количество попыток
  
      const requests = Array.from({ length: maxAttempts }, async (_, i) => {
        const randomUserId = Math.floor(Math.random() * 500000);
  
        const response = await axios.get(`https://api.github.com/users?per_page=1&since=${randomUserId}`, {
          headers: {
            Authorization: `Bearer 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`,
          },
        });
  
        const randomUser = {
          id: response.data[0].id,
          login: response.data[0].login,
          avatarUrl: response.data[0].avatar_url,
        };
        randomUsersArray.push(randomUser);
        // ДЕБАГ
        if (Debug_mode == 1) {
            console.table(randomUsersArray);
          }
          // ДЕБАГ КОНЧИЛСЯ
      });
  
      // Ждем завершения всех асинхронных запросов
      await Promise.all(requests);
        
      res.json(randomUsersArray);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

   // При активации сервера, уведомить в терминале о активации приложения
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
