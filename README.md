# dota-chatbot-app

Frontend do [Dota 2 AI Chatbot](https://github.com/Diegobraun/dota-chatbot), construído com **React + Vite**. Interface de chat estilo terminal com tema Dota 2.

## Pré-requisitos

- Node.js 18+
- Backend [`dota-chatbot`](https://github.com/Diegobraun/dota-chatbot) rodando em `localhost:8080`

## Instalação

```bash
npm install
```

## Rodando em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`. As requisições para `/dota` são redirecionadas automaticamente para `http://localhost:8080` via proxy do Vite — sem necessidade de configurar CORS.

## Build para produção

```bash
npm run build
```

Os arquivos estáticos ficam em `dist/`. Para servir localmente:

```bash
npm run preview
```

## Rodando o projeto completo

É necessário ter o backend rodando antes de abrir o frontend.

**Terminal 1 — backend:**
```bash
# Requer Java 21+ e Ollama rodando com llama3.2:latest e nomic-embed-text
cd ../dota-chatbot
./mvnw spring-boot:run
```

**Terminal 2 — frontend:**
```bash
cd ../dota-chatbot-app
npm run dev
```

Acesse `http://localhost:5173`.
