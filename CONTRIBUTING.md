# Contributing

## Run an instance

> Due to how Telegram login works, setting up a development instance may be quite complicated.

### Installing dependencies

Dependencies are managed using [Yarn](https://yarnpkg.com/), and can be installed with:

```console
$ yarn install
```

### Setting up the environment

The environment is loaded by the `.env.local` file in the root directory:

```console
$ cp .env.example .env.local
$ edit .env.local
```

Additional "global" environment files can be configured via [the Next.js environment pipeline](https://nextjs.org/docs/basic-features/environment-variables):

```console
$ edit .env.production
$ edit .env.development
```

The following sections will detail which variables to change depending on your setup.

### Configuring the database

A [PostgreSQL 14.3](https://www.postgresql.org/) database is required by the [Prisma](https://prisma.io/) to store data.

The address of the server to use is specified via the `DATABASE_URL` environment variable.

Since the project is in a prototyping phase, migrations have not been set up yet, therefore you can push the schema to the database using:

```console
$ yarn run db:push
```

Additionally, the TypeScript client can be generated with the following command:

```console
$ yarn run db:generate
```

[Visual Studio Code tasks](https://code.visualstudio.com/docs/editor/tasks) [are included](.vscode/tasks.json) to perform these operation from the editor.


### Configuring Telegram Login

To set up [Telegram Login](https://core.telegram.org/widgets/login), you'll first need to [create a bot](https://core.telegram.org/bots) on Telegram:

```console
$ open https://t.me/BotFather
```

Since Telegram Login [does not support non-standard ports](https://github.com/hprobotic/react-telegram-login#notes), you'll need a domain where the development instance of the website will be accessible at:

```dns
local.steffo.eu.        0       IN      A       192.168.1.135
```

> If you don't own a domain name, you can use your computer's [hosts file](https://en.wikipedia.org/wiki/Hosts_(file)) to configure a `HOSTNAME.localhost` domain.

Your development server will also need to be reverse-proxied to be accessible at that domain, for example using [Caddy](https://caddyserver.com/).

```caddy
local.steffo.eu:80 {
    reverse_proxy "http://127.0.0.1:3000"
}
```

Then, your Telegram bot needs to be configured to allow logins at your development domain, via the <kbd><kbd>BotFather</kbd> → <kbd>/mybots</kbd> → <kbd>@yourbot</kbd> → <kbd>Bot Settings</kbd> → <kbd>Domain</kbd></kbd> menu.

Finally, the details of your bot should be added to the environment:
- `TELEGRAM_TOKEN` should be set to the Telegram API token of your bot
- `NEXT_PUBLIC_TELEGRAM_USERNAME` should be set to the Telegram username of your bot, without the `@`

### Starting the development services

You can start the development web server via the `app:dev` package script:

```console
$ yarn app:dev
$ open http://local.steffo.eu/
```

Additionally, you can open the database explorer via the `db:studio` package script:

```console
$ yarn db:studio
$ open http://127.0.0.1:5000/
```

[Visual Studio Code launchers](https://code.visualstudio.com/docs/editor/debugging) [are included](.vscode/launch.json) to launch the dev server, the debug browser, and the database explorer.
