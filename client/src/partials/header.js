import React from 'react';

const Header = () => {
  return (
    <header>
      <nav class="app-header navbar navbar-expand-lg">
  <a class="navbar-brand" href="#">
    <img src="https://banner2.cleanpng.com/20180326/eye/kisspng-github-computer-icons-logo-github-5ab8a338143da0.8375508315220498480829.jpg" alt="Logo" width="50" height="50"></img>
    GitHubPulseSampler
  </a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Главная</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Лучшие контрибьюторы</a>
      </li>

    </ul>

  </div>
</nav>
    </header>
  );
};

export default Header;