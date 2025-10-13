# Site Desbrave

Landing page construída com Vite + React + TypeScript para divulgar os roteiros de cicloturismo da Desbrave.

## Como rodar localmente

```bash
npm install
npm run dev
```

Cria um arquivo `.env` na raiz copiando o conteúdo de `.env.example` **ou** duplica `public/app-config.example.json` para `public/app-config.json`. Em ambos os casos tu vais informar a URL do Google Apps Script (ver passo a passo mais abaixo).

## Integração do formulário com Google Sheets

O formulário do mini-guia envia os dados através da função `enviarLead`, que espera um endpoint HTTP capaz de receber JSON. A forma mais simples de conectar com a tua planilha é usando um Google Apps Script publicado como Web App.

1. Abre a planilha [`Mini guia Desbrave`](https://docs.google.com/spreadsheets/d/1HjF6eQFk1ZlidNZvPXxYrLsp0nrOAkhkcr4paWzVkOY/edit).
2. Vai em **Extensões → Apps Script**. Um novo projeto de script será criado atrelado a essa planilha.
3. Substitui o conteúdo do editor pelo código abaixo (ajusta o nome da aba em `SHEET_NAME` se necessário):

   ```ts
   const SHEET_NAME = 'Página1';

   function doPost(e: GoogleAppsScript.Events.DoPost) {
     try {
       const body = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

       if (!sheet) {
         throw new Error(`A aba ${SHEET_NAME} não existe.`);
       }

       sheet.appendRow([
         new Date(),
         body.nomeCompleto,
         body.email,
         body.whatsapp,
         body.interessePrincipal,
         body.cidadeUF,
       ]);

       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, message: error instanceof Error ? error.message : 'Erro desconhecido' }))
         .setMimeType(ContentService.MimeType.JSON)
         .setResponseCode(500);
     }
   }
   ```

4. Clica em **Deploy → New deployment**, escolhe o tipo **Web app**, define qualquer descrição, em **Execute as** seleciona *Você* e em **Quem tem acesso** marca *Anyone*. Confirma em **Deploy** e copia a URL gerada.
5. Cola a URL na variável `VITE_APP_SCRIPT_URL` do teu arquivo `.env` ou, se preferir manter a configuração fora do build, abre `public/app-config.json` e preenche o campo `appScriptUrl` com a mesma URL.
6. Reinicia o servidor de desenvolvimento (`npm run dev`) para que a nova variável seja carregada (se usares `.env`). Para a configuração via `public/app-config.json`, basta salvar o arquivo e recarregar a página.

### Onde reiniciar o servidor de desenvolvimento

O servidor roda no terminal em que executaste `npm run dev`. Para reiniciá-lo:

1. Volta ao terminal/console onde o comando está em execução e pressiona `Ctrl + C` para interromper o processo atual.
2. No mesmo diretório do projeto (`Site-desbrave`), executa novamente `npm run dev`.
3. Abre ou recarrega o navegador na URL indicada (normalmente `http://localhost:5173`).

Se estiveres usando um ambiente como VS Code, o terminal integrado funciona da mesma maneira: interrompe com `Ctrl + C` e roda `npm run dev` novamente.

A partir desse momento, sempre que alguém enviar o formulário, o site chamará o Apps Script e os dados serão adicionados automaticamente à planilha. Caso o formulário mostre a mensagem "Nenhuma URL do Google Apps Script configurada", verifica se `VITE_APP_SCRIPT_URL` ou `public/app-config.json` estão preenchidos corretamente e se o deployment do Apps Script está ativo.

## Como sincronizar teu diretório local com o GitHub

Quando outra pessoa faz alterações e publica na branch `main` do GitHub, tu podes trazer as novidades para o teu computador com os comandos abaixo. Eles assumem que tu já clonaste o repositório e estás dentro da pasta `Site-desbrave`.

1. Garante que não tens alterações pendentes. Se houver, confirma (`git commit`) ou descarta antes de atualizar:

   ```bash
   git status
   ```

2. Baixa as atualizações do repositório remoto:

   ```bash
   git fetch origin
   ```

3. Aplica as novidades da branch `main` na tua cópia local. Se estiveres na `main`, basta dar merge fast-forward:

   ```bash
   git checkout main
   git pull origin main
   ```

4. Caso trabalhes em outra branch, atualiza a `main` como no passo anterior e depois sincroniza tua branch com ela:

   ```bash
   git checkout minha-branch
   git merge main
   ```

Se preferires reescrever o histórico da tua branch em cima da `main` atualizada (por exemplo, para manter commits lineares), troca o `git merge main` por `git rebase main`. Após sincronizar, roda `npm install` caso o `package.json` tenha sido alterado e reinicia o servidor de desenvolvimento se necessário.

## Onde ficam as imagens

O projeto não guarda arquivos de imagem localmente. Os pontos que exibem imagens usam URLs hospedadas em `https://desbravecicloturismo.com.br`:

- O JSON-LD em `src/App.tsx` aponta para `logo.png` e `hero.jpg`, usados nos rich snippets do Google.
- As meta tags Open Graph e Twitter em `index.html` usam `og-image.jpg`, que é a prévia compartilhada em redes sociais.

Para trocar esses visuais, basta substituir as URLs pelos caminhos dos teus novos arquivos (por exemplo, enviando as imagens para outro domínio ou adicionando-as à pasta `public/` do Vite e referenciando-as como `/nome-do-arquivo.jpg`).
