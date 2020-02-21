# Демонстрационная площадка "Демобанк"

Пример интеграции Рутокен Плагина в системы дистанционного банковского обслуживания.


## Системные требования

- Dotnet SDK(версия 2.2.8)
- ASP.NET Core (версия 2.2.8)(не всегда ставится с Dotnet SDK, можно проверить через команду `dotnet --info`)
- Node js (версия v11.5.0 или новее)
- Yarn (версия v1.12.0 или новее)
- PostgreSQL (на сервере нужна PostgreSQL версии не ниже 11, учетная запись должна быть наделена правами создания БД. 
    connectionString - в файле DemoPortalInternetBank.Web/appsettings.json)
- Docker (версия 18.09), Docker-compose (версия 1.24.0) - опционально

## Сборка проекта
```
dotnet restore && dotnet publish -c Release
```

## Миграция БД
```
1. Задать переменную connectionString=(дефолтный $connectionString находится по адресу DemoPortalInternetBank.Web/appsettings.json.)
Пример:
    connectionString="Host=host;Port=port;Database=database;Username=username;Password=password"
2. cd DemoPortalInternetBank.Migrator/bin/Release/netcoreapp2.2/publish
3. dotnet DemoPortalInternetBank.Migrator.dll $connectionString
```


## Запуск сервиса
```
1. cd DemoPortalInternetBank.Web/Spa
2. yarn && yarn build:prod (сборка SPA)
3. cd ../..
4. dotnet restore (приложение должно подхватить собранное SPA)
5. cd DemoPortalInternetBank.Web
6. dotnet ./bin/Release/netcoreapp2.2/publish/DemoPortalInternetBank.Web.dll (запуск самого приложения)
7. http://localhost:5000 https://localhost:5001
```

## Запуск с использованием Docker
```
1. cd DemoPortalInternetBank.Web/Spa && yarn && yarn build:prod (сборка SPA)
2. cd ../..
3. dotnet restore && dotnet publish -c Release (сборка WEB-сервиса)
4. sudo mkdir -p /docker_sys/demobank.aktivco.ru/var/app
5. sudo mkdir -p /docker_sys/demobank.aktivco.ru/var/migrator
6. sudo cp -r ./DemoPortalInternetBank.Web/bin/Release/netcoreapp2.2/publish/* /docker_sys/demobank.aktivco.ru/var/app
7. sudo cp -r ./DemoPortalInternetBank.Migrator/bin/Release/netcoreapp2.2/publish/* /docker_sys/demobank.aktivco.ru/var/migrator
8. cd DemoPortalInternetBank.Web
9. sudo docker-compose up -d (запуск двух контейнеров, PostgreSql и Asp.Net core)
ВАЖНО:
    Заменить порт на 54328 в файле appsettings.json и переменной connectionString, для доступа к контейнеру с БД из других контейнеров
    Дефолтный $connectionString указан в в файле DemoPortalInternetBank.Web/appsettings.json
    Пример:
        connectionString="Host=host;Port=port;Database=database;Username=username;Password=password"
10. sudo docker exec -i demobank.aktivco.ru-dotnet dotnet /migrator/DemoPortalInternetBank.Migrator.dll $connectionString 
11. sudo docker exec -d demobank.aktivco.ru-dotnet bash -c "cd /app && dotnet DemoPortalInternetBank.Web.dll" (запуск приложения)
12. http://localhost:88
```

## Генерация документации SPA
```
1. cd DemoPortalInternetBank.Web/Spa && yarn && yarn build:doc (генерация документации SPA)
2. Документация сгенерирована в папке DemoPortalInternetBank.Web/Spa/out
3. Просмотр документации - index.html 
```