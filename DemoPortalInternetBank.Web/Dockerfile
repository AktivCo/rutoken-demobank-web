FROM mcr.microsoft.com/dotnet/aspnet:10.0

RUN apt-get update && apt-get install -y \
    libgssapi-krb5-2 \
    && rm -rf /var/lib/apt/lists/*