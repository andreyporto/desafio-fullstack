# 🔗 Desafio Técnico — Encurtador de URLs com Analytics

## 🧠 Contexto

Você foi contratado para construir um serviço interno de encurtamento de URLs com rastreamento de acessos.

O sistema deve permitir que usuários autenticados criem URLs curtas, acompanhem os acessos e visualizem analytics básicos de cada link.

---

## 📦 Requisitos — Backend (Laravel)

### Autenticação
- Registro e login via **Laravel Sanctum**
- Logout

### URLs
- Criar URL curta com **slug único gerado automaticamente**
- Listar URLs do usuário autenticado
- Deletar URL própria
- Redirecionamento público via slug: `GET /{slug}`

### Tracking
Ao acessar um link curto, registrar:
- IP do visitante
- User-Agent
- Timestamp do acesso

### Analytics
Endpoint de analytics por URL:
- Total de cliques
- Cliques agrupados por dia (últimos 7 dias)

---

## 🎨 Requisitos — Frontend (React)

- Tela de **login e registro**
- **Dashboard** com lista de URLs criadas pelo usuário
- Formulário para **criar nova URL**
- Página de **analytics por URL** com gráfico de cliques por dia
- Botão para **copiar o link curto** para o clipboard

---

## 🔥 Diferenciais (opcionais, mas valorizados)

- Expiração de URL por data limite
- Proteção de link por senha
- Cache nos hits com Redis
- Paginação na listagem de URLs
- Testes automatizados (unitários ou de integração)

---

## 📋 Regras Gerais

- Escolha **apenas um** dos desafios
- O prazo é de **5 dias corridos** a partir do recebimento deste desafio
- Faça o fork desse repositório e ao finalizar solicite uma pull request para avaliação
- Na descrição da sua pull request, inclua instruções claras para rodar localmente

---

## ✅ Critérios de Avaliação

| Critério                              | Peso   |
|---------------------------------------|--------|
| Organização e clareza do código       | Alto   |
| Qualidade e consistência da API REST  | Alto   |
| Integração frontend/backend           | Alto   |
| Boas práticas (validação, erros, auth)| Médio  |
| UX básica e usabilidade               | Médio  |
| Diferenciais implementados            | Bônus  |

---

## ⏱ Prazo

**5 dias corridos** a partir do recebimento deste desafio.

---

## 💡 Observações

- Você tem liberdade para escolher as bibliotecas React que preferir
- Deploy é **opcional**, mas será considerado um diferencial
- Não é necessário overengineering — **clareza e simplicidade são valorizadas**
- Documente os trade-offs que você fez no README
