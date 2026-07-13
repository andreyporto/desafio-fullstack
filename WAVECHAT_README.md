# WaveChat — Chat em Tempo Real

Sistema de chat em tempo real construído com Laravel 13 e React 19, utilizando Laravel Reverb para comunicação via WebSocket.

## Tech Stack

| Camada   | Tecnologias                                                           |
| -------- | --------------------------------------------------------------------- |
| Backend  | Laravel 13, PHP 8.5, PostgreSQL, Laravel Sanctum, Laravel Reverb      |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4, Laravel Echo, Pusher.js |

## Pré-requisitos

- Docker + Docker Compose
- Node.js 22+
- Composer

## Setup Backend

```bash
git clone <url-do-repositorio>
cd desafio-fullstack/wavechat-api
composer install
cp .env.example .env
php artisan sail:install
# selecionar PostgreSQL quando solicitado
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan db:seed           # opcional — cria 30 salas com o admin como membro
./vendor/bin/sail artisan reverb:start
./vendor/bin/sail artisan queue:work
```

### Credenciais do usuário criado (após seed)

- **Email:** admin@admin.com
- **Senha:** password

## Setup Frontend

```bash
cd ../wavechat-app
npm install
cp .env.example .env
```

Copiar a `VITE_REVERB_APP_KEY` do `.env` do backend para o `.env` do frontend. O arquivo deve ficar assim:

```
VITE_API_URL=http://localhost/api
VITE_REVERB_APP_KEY=<valor de REVERB_APP_KEY do backend>
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
```

> **`VITE_API_URL`:** define a base URL das requisições HTTP da aplicação. Use `http://localhost/api` se o frontend roda na mesma máquina do backend. Se estiver testando em outro dispositivo na mesma rede, substitua `localhost` pelo IP da máquina (ex: `http://192.168.1.10/api`).

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Features

### Obrigatórias

- Autenticação (registro, login, logout) com Laravel Sanctum
- Salas de chat (criar, listar, entrar, sair)
- Mensagens (enviar, histórico paginado)
- Broadcast em tempo real via WebSocket com Laravel Reverb

### Extras

- Presence Channels com contagem de usuários online
- Indicador de "digitando" em tempo real
- Toast de notificação ao usuário entrar na sala
- Validação por campo nos formulários
- Rate limiting no login (5 tentativas por minuto)
- Página 404 estilizada
- Paginação de salas

## Estrutura do Projeto

```
desafio-fullstack/
├── wavechat-api/        # Backend Laravel
│   ├── app/
│   │   ├── Events/      # Eventos de broadcast
│   │   ├── Exceptions/  # Exceções customizadas
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   └── Services/    # Camada de serviço
│   ├── config/
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
└── wavechat-app/        # Frontend React
    └── src/
        ├── api/
        ├── assets/
        ├── components/
        ├── contexts/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── routes/
        └── types/
```

## Rotas da API

### Auth

| Método | Rota                 | Descrição         |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Registrar usuário |
| POST   | `/api/auth/login`    | Login             |
| POST   | `/api/auth/logout`   | Logout (auth)     |

### Salas

| Método | Rota                    | Descrição               |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/rooms`            | Listar salas (paginado) |
| POST   | `/api/rooms`            | Criar sala (auth)       |
| GET    | `/api/rooms/{id}`       | Detalhes da sala (auth) |
| POST   | `/api/rooms/{id}/join`  | Entrar na sala (auth)   |
| POST   | `/api/rooms/{id}/leave` | Sair da sala (auth)     |
| GET    | `/api/user/rooms`       | Salas do usuário (auth) |

### Mensagens

| Método | Rota                       | Descrição                          |
| ------ | -------------------------- | ---------------------------------- |
| GET    | `/api/rooms/{id}/messages` | Mensagens da sala (auth, paginado) |
| POST   | `/api/rooms/{id}/messages` | Enviar mensagem (auth)             |
