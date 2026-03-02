# Демонстрационная площадка "Демобанк"

Пример интеграции Рутокен Плагина в системы дистанционного банковского обслуживания.


## Системные требования

- Dotnet SDK(версия 10.0.103)
- ASP.NET Core (версия 10.0.103) (не всегда ставится с Dotnet SDK, можно проверить через команду `dotnet --info`)
- Node js (версия v22.22.0)
- npm (версия v10.9.4 или новее)
- PostgreSQL (на сервере нужна PostgreSQL версии не ниже 11, учетная запись должна быть наделена правами создания БД. 
    connectionString - в файле DemoPortalInternetBank.Web/appsettings.json)
- docker compose (версия 29+)

## Сборка проекта
```
dotnet publish -c Release
```

## Миграция БД
```
1. Задать переменную connectionString=(дефолтный $connectionString находится по адресу DemoPortalInternetBank.Web/appsettings.json.)
Пример:
    connectionString="Host=host;Port=port;Database=database;Username=username;Password=password"
2. cd DemoPortalInternetBank.Migrator/bin/Release/net10.0/publish
3. dotnet DemoPortalInternetBank.Migrator.dll $connectionString
```


## Запуск сервиса
```
1. cd DemoPortalInternetBank.Web/Spa
2. npm install && npm run build:prod (сборка SPA)
3. cd ../..
4. dotnet restore (приложение должно подхватить собранное SPA)
5. cd DemoPortalInternetBank.Web
6. dotnet ./bin/Release/net10.0/publish/DemoPortalInternetBank.Web.dll (запуск самого приложения)
7. http://localhost:5000 https://localhost:5001
```

## Запуск с использованием Docker

1. Параметры для запуска в докер контейнере размещены в `.env` файле, в корневой директории проекта. Описание параметров представлено ниже в таблице.
    | Параметр              | Описание                                                                                             |
    | ---                   | ---                       |
    | APP_CONTAINER_NAME    | Имя контейнера приложения |
    | APP_FOLDER            | Путь к директории на хосте, где расположены папки var/app и var/migrator с файлами приложения    |
    | APP_OUT_PORT          | Внешний порт на хосте, который пробрасывается на порт 8080 контейнера приложения   |
    | DB_CONTAINER_NAME     | Имя контейнера базы данных PostgreSQL |
    | DB_NAME               | Наименование базы данных, которая будет создана в PostgreSQL |
    | DB_OUT_PORT           | Внешний порт на хосте, который пробрасывается на внутренний порт PostgreSQL |
    | DB_PORT               | Внутренний порт контейнера PostgreSQL (по умолчанию 5432) |
    | DB_PSWD               | Пароль пользователя базы данных |
    | DB_USER               | Имя пользователя базы данных |
    | DB_FOLDER             | Путь к директории на хосте, которая будет смонтирована в контейнер БД для хранения данных PostgreSQL |
    > Параметры `ConnectionString` в файле `RutokenTotpFido2Demo/appsettings.json` должны совпадать с параметрами, указанными в файле `.env`.
    > ```json
    > {
    >     "ConnectionStrings": {
    >         "Default": "Host=DB_CONTAINER_NAME;Port=DB_PORT;Database=DB_NAME;Username=DB_USER;Password=DB_PSWD"
    >     },
    > }
    > ```

2. cd DemoPortalInternetBank.Web/Spa && npm install && npm run build:prod (сборка SPA)
3. cd ../..
4. dotnet publish -c Release (сборка WEB-сервиса)
5. sudo mkdir -p /docker_sys/demobank.aktivco.ru/var/app
6. sudo mkdir -p /docker_sys/demobank.aktivco.ru/var/migrator
7. sudo cp -r ./DemoPortalInternetBank.Web/bin/Release/net10.0/publish/* /docker_sys/demobank.aktivco.ru/var/app
8. sudo cp -r ./DemoPortalInternetBank.Migrator/bin/Release/net10.0/publish/* /docker_sys/demobank.aktivco.ru/var/migrator
9. cd DemoPortalInternetBank.Web
10. sudo docker compose -f docker-compose.yml up (запуск двух контейнеров, PostgreSql и Asp.Net core)
11. http://localhost:1000 (сервис должен быть доступен по данному url, 1000 - порт указанный в параметрах APP_OUT_PORT)

## Генерация документации SPA
```
1. cd DemoPortalInternetBank.Web/Spa && yarn && yarn build:doc (генерация документации SPA)
2. Документация сгенерирована в папке DemoPortalInternetBank.Web/Spa/out
3. Просмотр документации - index.html 
```