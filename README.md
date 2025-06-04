# API de Gerenciamento de Pessoas

Este projeto consiste em uma API REST para gerenciamento de pessoas, desenvolvida com .NET Core e Angular 17.

## Requisitos

- .NET 9.0 SDK
- Node.js (versão LTS)
- Angular CLI 17
- SQL Server (opcional, o projeto pode usar dados estáticos)

## Estrutura do Projeto

```
├── PessoaApi/              # Projeto principal da API
├── Application/            # Camada de aplicação
├── Domain/                 # Camada de domínio
└── Infrastructure/         # Camada de infraestrutura
```

## Configuração e Execução

### Backend (.NET Core)

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Restaure as dependências
```bash
dotnet restore
```

3. Execute as migrações do banco de dados (se estiver usando banco de dados)
```bash
dotnet ef migrations add InitialCreate --project Infrastructure --startup-project PessoaApi
dotnet ef database update --project Infrastructure --startup-project PessoaApi
```

4. Execute o projeto
```bash
cd PessoaApi
dotnet run
```

A API estará disponível em:
- Swagger UI: https://localhost:5001 ou http://localhost:5000
- API Endpoints: https://localhost:5001/api/Pessoas

### Frontend (Angular)

1. Navegue até o diretório do frontend
```bash
cd frontend
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
ng serve
```

O frontend estará disponível em: http://localhost:4200

## Endpoints da API

A API possui os seguintes endpoints:

- `GET /api/Pessoas` - Lista todas as pessoas
- `GET /api/Pessoas/{id}` - Busca uma pessoa específica
- `POST /api/Pessoas` - Cria uma nova pessoa
- `PUT /api/Pessoas/{id}` - Atualiza uma pessoa existente
- `DELETE /api/Pessoas/{id}` - Remove uma pessoa

### Exemplo de Payload para POST/PUT

```json
{
  "nome": "Nome da Pessoa",
  "endereco": "Endereço da Pessoa",
  "dataNascimento": "1990-01-01"
}
```

## Validações

A API inclui as seguintes validações:

- Nome: Obrigatório, máximo 100 caracteres
- Endereço: Obrigatório, máximo 200 caracteres
- Data de Nascimento: Obrigatória

## Documentação

A documentação completa da API está disponível através do Swagger UI quando o projeto está em execução.

## Desenvolvimento

### Comandos Úteis

- Para criar uma nova migração:
```bash
dotnet ef migrations add [NOME_DA_MIGRACAO] --project Infrastructure --startup-project PessoaApi
```

- Para atualizar o banco de dados:
```bash
dotnet ef database update --project Infrastructure --startup-project PessoaApi
```

- Para remover a última migração:
```bash
dotnet ef migrations remove --project Infrastructure --startup-project PessoaApi
```

## Suporte

Em caso de dúvidas ou problemas, por favor abra uma issue no repositório do projeto. 