# API de Pessoas

API REST para gerenciamento de pessoas desenvolvida com .NET Core e Angular 17.

## Requisitos

- .NET 9.0 SDK
- Node.js
- Angular CLI 17
- SQL Server

## Execução

### Backend

```bash
cd PessoaApi
dotnet restore
dotnet ef migrations add InitialCreate --project ../Infrastructure --startup-project .
dotnet ef database update --project ../Infrastructure --startup-project .
dotnet run
```

### Frontend

```bash
cd frontend
cd pessoa-app
npm install
ng serve
```

## Endpoints

- GET /api/Pessoas - Lista todas as pessoas
- GET /api/Pessoas/{id} - Busca uma pessoa específica
- POST /api/Pessoas - Cria uma nova pessoa
- PUT /api/Pessoas/{id} - Atualiza uma pessoa
- DELETE /api/Pessoas/{id} - Remove uma pessoa

### Exemplo de Payload

```json
{
  "nome": "Nome da Pessoa",
  "endereco": "Endereço da Pessoa",
  "dataNascimento": "15/03/2024"
}
``` 
