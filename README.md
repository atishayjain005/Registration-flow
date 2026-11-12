# Registration Flow

A React registration **demo** with personal-detail validation, monthly/yearly plan
selection, optional add-ons, an itemized review, and a restartable completion screen.

## Run locally

Use Node.js 22 LTS and npm:

```sh
npm ci
npm run dev
```

## Verify

```sh
npx playwright install chromium
npm run lint
npm run build
npm test
npm audit --audit-level=high
```

The browser suite covers desktop and mobile validation, keyboard submission,
required plan selection, billing persistence, add-on totals, completion/reset,
step focus, and 320px overflow. This JavaScript project has no separate type check.
ESLint currently reports one non-blocking Fast Refresh warning because the context
provider and its hook share a module.

## Demo boundaries

- No backend, account creation, payment, or external API calls.
- Form details stay in React memory. Refresh or **Start again** clears them.
- Prices are illustrative, inherited from the original implementation. Add-ons
  retain the same numeric price in both billing periods; do not use this catalogue
  as real commercial pricing without product approval.
- Phone validation accepts common international formatting with 7–15 digits;
  it does not verify ownership or deliverability. Email validation is format-only.

## Structure

- `src/contexts/FormContext.jsx`: in-memory values and step navigation.
- `src/components/FormSteps/`: input, plan, add-on, review, and completion views.
- `src/data/catalog.js`: existing plan and add-on prices shared by the views.
- `tests/registration.spec.js`: Playwright browser regression coverage.
- `docs/improvement-log.md`: scoped ideas, decisions, and validation record.

## Deployment

`npm run build` generates static files in `dist/`; `npm run preview` serves the
built output locally. No hosting target is currently configured or verified.
Publishing to an existing free static host is backlog work. No environment
variables, subscriptions, paid APIs, or secrets are required for this demo.
