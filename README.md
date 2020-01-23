# Демонстрационная площадка "Демобанк"

Пример интеграции Рутокен Плагина в системы дистанционного банковского обслуживания.


## Системные требования

- ASP.NET Core (версия 2.2.8)
- Node js (версия v11.5.0 или новее)
- Yarn (версия v1.12.0 или новее)
- PostgreSQL (на сервере нужна PostgreSQL версии не ниже 11, учетная запись должна быть наделена правами создания БД. 
    connectionString - в файле DemoPortalInternetBank.Web/appsettings.json)
- Docker (версия 18.09), Docker-compose (версия 1.24.0) - опционально

## Миграция БД
```
1. cd DemoPortalInternetBank.Web/Spa
2. dotnet restore
4. dotnet run $connectionString 
    (дефолтный $connectionString находится по адресу DemoPortalInternetBank.Web/appsettings.json.  
    Если база доступна по этому адресу, использовать $connectionString.  
    В противном случае поменять параметры $connectionString)
```


## Запуск сервиса
```
1. cd DemoPortalInternetBank.Web/Spa
2. yarn && yarn build:prod (сборка SPA)
3. dotnet restore
4. dotnet run
5. http://localhost:5000
```

## Запуск с использованием Docker
```
1. cd DemoPortalInternetBank.Web && yarn && yarn build:prod (сборка SPA)
2. dotnet restore && dotnet publish -c Release (сборка WEB-сервиса)
3. mkdir /docker_sys/demobank.aktivco.ru/var/app
4. mkdir /docker_sys/demobank.aktivco.ru/var/migrator
5. cp -r ./DemoPortalInternetBank.Web/bin/Release/netcoreapp2.2/publish/* /docker_sys/demobank.aktivco.ru/var/app
6. cp -r ./DemoPortalInternetBank.Migrator/bin/Release/netcoreapp2.2/publish/* /docker_sys/demobank.aktivco.ru/var/migrator
7. docker-compose up -d (запуск двух контейнеров, PostgreSql и Asp.Net core)
8. docker exec -i demobank.aktivco.ru-dotnet dotnet /migrator/DemoPortalInternetBank.Migrator.dll $connectionString
   Дефолтный $connectionString указан в в файле DemoPortalInternetBank.Web/appsettings.json
9. docker exec -d demobank.aktivco.ru-dotnet bash -c "cd /app && dotnet DemoPortalInternetBank.Web.dll" (запуск приложения)
```