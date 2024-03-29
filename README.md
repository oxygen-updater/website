# Oxygen Updater website

[![Build & Deploy][workflow-badge-image]][workflow-badge-link]

Completely static, built with [Next.js][nextjs], [Preact][preact], and [TailwindCSS][tailwindcss].

Detailed setup instructions may follow in a later commit.

## Getting Started

Next.js' [built-in env-var support][nextjs-env] is a little too basic for our use-case, so we use [`env-cmd`][env-cmd] instead.

```bash
npm run dev        # local dev client+server
npm run build:dev  # build for the `dev` environment (`localhost` or a custom hosts-loopback domain, oxygenupdater.local)
npm run build:test # build for the `test` environment (https://test.oxygenupdater.com/)
npm run build:prod # build for the `prod` environment (https://oxygenupdater.com/)
```

[workflow-badge-image]: https://github.com/oxygen-updater/website/workflows/Build%20%26%20Deploy/badge.svg
[workflow-badge-link]: https://github.com/oxygen-updater/website/actions/workflows/build+deploy.yml

[nextjs]: https://nextjs.org
[preact]: https://preactjs.com
[tailwindcss]: https://tailwindcss.com
[localhost]: http://localhost

[nextjs-env]: https://nextjs.org/docs/basic-features/environment-variables
[env-cmd]: https://www.npmjs.com/package/env-cmd
