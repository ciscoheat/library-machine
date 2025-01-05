# Library machine

A [DCI](https://blog.encodeart.dev/dci-tutorial-for-typescript-part-1) project based on [this use case](https://docs.google.com/spreadsheets/d/1TSpjKUhjvP9pMRukt_mInHVbdQWsXHzFjSymQ3VyGmE/edit?usp=sharing) which specifies an automatic library borrowing machine, consisting of a screen, printer and scanner.

## Developing

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Drag and drop items to interact with the machine. PIN code for the card is `1234`.

## Project structure

### src/lib

- `library.ts` - Data for the library
- `printer.svelte.ts`, `rfidScanner.ts` - Interfaces and components for the hardware simulation.
- `errors.ts`, `utils.ts` - Utilities

### src/lib/data

Data models for the library, based on [schema.org](https://schema.org/), validation with [Zod](https://zod.dev/).

- `library.ts` - Library (`librarySchema`) with members and current offers
- `libraryItem.ts` - Definitions of items that can be borrowed
- `common.ts` - Common validation schemas

### src/lib/contexts

DCI Contexts for the app:

- `libraryMachine.ts` - Connects all the parts of the borrowing machine.
- `borrowItem.ts` - Separate (reusable) Context for borrowing a library item.

### src/lib/assets

Components for displaying the machine.

### src/routes

Entrypoint for the app, `+page.svelte`.

## Todo

- [x] Bluray discs for borrowing (to demonstrate different item types)
- [ ] Force remove card after 3 failed attempts
- [ ] Error handling for unexpected Exceptions
