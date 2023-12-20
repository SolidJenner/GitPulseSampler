//Сервер Node.JS
//Подключаем необходимые модули 
const express = require('express');
//Вытаскиваем зашифрованные переменные окружения
require('dotenv').config();
const GitToken = process.env.GIT_TOKEN;
const Debug_mode = process.env.APP_DEBUG_MODE;
//cors - для обмена данными между клиентом и сервером и гитхабом
const cors = require('cors');
const path = require('path');
const app = express();
const { Octokit } = require('@octokit/rest');
const PORT = process.env.PORT || 3001;
//Пусть работает axios
const axios = require('axios');
//Настраиваем октокит с персональным токеном полученным от гитхаба
const octokit = new Octokit({
    auth: GitToken,
  });

//Поддержка генерации ответа в формате JSON
app.use(express.json());
// Разрешить все CORS-запросы
app.use(cors());

//Подключаем статичную папку из приложения React
app.use(express.static(path.join(__dirname, 'client/public')));
//Счетчик для дебага


//Запрос гитхаб о случайных пользователях - запрос от компонентов на главной странице

app.get('/gitapi/random-users', async (req, res) => {
  var DebugAPICount = 0;
    try {
        const randomUserId = Math.floor(Math.random() * 500000);
  
        const response = await axios.get(`https://api.github.com/users?per_page=1&since=${randomUserId}`, {
          headers: {
            Authorization: `Bearer ` + GitToken,
          },
        });
        let randomUser = {
          id: response.data[0].id,
          login: response.data[0].login,
          avatarUrl: response.data[0].avatar_url,
          Type: response.data[0].type,
        };
        // ДЕБАГ
        if (Debug_mode == 1) {
            console.table(randomUser);
            DebugAPICount++;
            console.log("Это ответ на запрос под номером:" + DebugAPICount);
          }
          // ДЕБАГ КОНЧИЛСЯ
      res.json(randomUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong with GitHUB Api' });
    }
  });

//Детальная информация про пользователей - запрос от компонента на странице пользователя

app.get('/gitapi/userinfo', async (req, res) => {
    try {
 console.log('request received!!!');
 const { login } = req.body;

 console.table(login);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with GitHUB Api' });
  }
  });
  

   // При активации сервера, уведомить в терминале о активации приложения
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
