# CrossOver - Магазин окон 🪟

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ASP.NET](https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![EF Core](https://img.shields.io/badge/EF_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://docs.microsoft.com/ef/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

## Описание проекта

CrossOver — это комплексный веб-сайт по продаже окон, разработанный в рамках дипломной работы (март 2024). Проект представляет собой полноценную систему с клиентской и административной частями.

![Главная страница](/images/homepage.png)

## Архитектура проекта

Проект состоит из четырех основных компонентов:

- 🖥️ **Клиентская часть** — SPA на React с TypeScript
- 🔄 **API-сервис** — REST API на ASP.NET
- 📊 **База данных** — PostgreSQL
- 🛠️ **Админ-панель** — ASP.NET Razor Pages

## Технологический стек

### Серверная часть

- **ASP.NET Core** — основной фреймворк
- **Entity Framework Core** — ORM для работы с базой данных
- **PostgreSQL** — реляционная СУБД
- **JWT** — аутентификация и авторизация
- **DocX** — генерация документов в формате .docx

### Клиентская часть

- **React** — библиотека для построения пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript
- **Axios** — HTTP-клиент для выполнения запросов к API
- **Bootstrap** — CSS-фреймворк для стилизации
- **CSS** — кастомные стили

## Функциональность клиентского сайта

- ✅ **Авторизация и регистрация пользователей**
- 📞 **Заказ обратного звонка от оператора**
- 🔧 **Интерактивный конструктор для расчета стоимости окон**
- 🔍 **Каталог с возможностью поиска и сортировки**
- 🛒 **Корзина с сохранением данных в БД**
- 📝 **Оформление и отслеживание заказов**

![Пример интерфейса](/images/calculator.png)

## Функциональность Backoffice

- 🔑 **Административная авторизация**
- ✏️ **Полное управление продуктами (CRUD)**
- 📋 **Управление заказами и их статусами**
- 📞 **Просмотр и обработка заявок на звонок**
- 💰 **Мониторинг запросов на расчет стоимости**
- 📊 **Панель аналитики и отчетности**

![Панель администратора](/images/adminorders.jpg)

## API-сервис

- 🔐 **Аутентификация и авторизация с выдачей JWT**
- 🛒 **Полное управление корзиной пользователя**
- 📦 **Обработка и создание заказов**
- 📋 **Управление каталогом товаров и категориями**
- 🧩 **Предоставление данных для конструктора окон**
- 📞 **Обработка заявок на обратный звонок**

## Установка и запуск

```bash
# Запуск серверной части
cd CrossOver/CrossOverApi
dotnet restore
dotnet run

# Запуск клиентской части
cd site
npm install
npm start

# Запуск backoffice части
cd CrossOver/CrossOverBack
dotnet restore
dotnet run
```

## Скриншоты

### Каталог товаров в админ панели
![Каталог товаров в админ панели](/images/adminproducts.jpg)
### Профиль
![Профиль](/images/profile.jpg)
### оформление заявки
![Оформление заявки](/images/modalrequest.jpg)
### Заявки на звонок
![Заявки на звонок](/images/admincalls.jpg)
### Заявки на расчет
![Заявки на расчет](/images/adminrequests.jpg)
