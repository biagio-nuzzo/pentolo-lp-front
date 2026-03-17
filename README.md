# Template Next.js App Router con SEO e Internazionalizzazione

Questo è un template [Next.js](https://nextjs.org) con supporto completo per l'internazionalizzazione (i18n) utilizzando [next-intl](https://next-intl.dev) e ottimizzato per la SEO.

## Caratteristiche

- ✅ Next.js 16 con App Router
- 🌍 Internazionalizzazione con next-intl
- 🎨 Tailwind CSS 4
- 📱 Design responsive
- 🔍 Ottimizzato per SEO (sitemap, robots.txt, manifest)
- 🚀 TypeScript
- 📝 Pathname localizzati
- 🌐 Supporto multilingua (Italiano e Inglese di default)

## Getting Started

Prima, installa le dipendenze:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Poi, avvia il server di sviluppo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000) con il tuo browser per vedere il risultato.

La lingua di default è l'italiano, quindi verrai reindirizzato a [http://localhost:3000/it](http://localhost:3000/it).

## Struttura del Progetto

```
├── src/
│   ├── app/                   # App Router di Next.js
│   │   ├── [locale]/          # Route localizzate
│   │   ├── manifest.ts        # PWA manifest
│   │   ├── robots.tsx         # File robots.txt
│   │   └── sitemap.ts         # Sitemap generata dinamicamente
│   ├── ui/                    # Componenti React riutilizzabili
|   |   ├── atoms/			   # Componenti atomici
|   |   ├── molecules/		   # Componenti composti
|   |   └── organisms/		   # Componenti complessi
│   ├── i18n/                  # Configurazione internazionalizzazione
│   │   ├── routing.ts         # Definizione route e locale
│   │   ├── navigation.ts      # Helper per navigazione localizzata
│   │   └── request.ts         # Gestione richieste i18n
│   └── ui/                    # Componenti UI
├── messages/                  # File di traduzione
│   ├── en.json                # Traduzioni inglese
│   └── it.json                # Traduzioni italiano
└── public/                    # Asset statici
```

## Guida all'Internazionalizzazione

### Come Aggiungere una Nuova Lingua

Per aggiungere una nuova lingua al progetto, segui questi passaggi:

#### 1. Crea il file di traduzioni

Crea un nuovo file JSON nella cartella `messages/` con il codice della lingua (es. `messages/fr.json` per il francese):

```json
{
	"Error": {
		"description": "<p>Malheureusement, une erreur s'est produite.</p><p>Vous pouvez essayer de <retry>recharger la page</retry> que vous visitiez.</p>",
		"title": "Quelque chose s'est mal passé!"
	},
	"IndexPage": {
		"description": "Ceci est un exemple de base qui démontre l'utilisation de <code>next-intl</code> avec Next.js App Router...",
		"title": "Exemple next-intl"
	}
	// ... copia la struttura da en.json o it.json e traduci i valori
}
```

#### 2. Aggiorna la configurazione routing

Modifica il file `src/i18n/routing.ts` per includere la nuova lingua:

```typescript
export const routing = defineRouting({
	locales: ['it', 'en', 'fr'], // Aggiungi il nuovo locale
	defaultLocale: 'it',
	pathnames: {
		'/': '/',
		'/example': {
			it: '/esempio',
			en: '/example',
			fr: '/exemple', // Aggiungi la traduzione del pathname
		},
	},
});
```

#### 3. Aggiorna il LanguageSwitcher

Modifica i file di traduzione per includere il nome della nuova lingua nel componente `LanguageSwitcher`.

In `messages/en.json`, `messages/it.json` e nel nuovo file di lingua, aggiorna:

```json
{
	"LanguageSwitcher": {
		"label": "Change language",
		"locale": "{locale, select, en {English} it {Italian} fr {French} other {Unknown}}"
	}
}
```

#### 4. Testa la nuova lingua

Avvia il server di sviluppo e naviga a `http://localhost:3000/fr` (o il codice della tua lingua).

### Come Aggiungere un Nuovo Pathname Localizzato

Per aggiungere una nuova route con pathname localizzati:

#### 1. Definisci il pathname nel routing

Modifica `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
	locales: ['it', 'en'],
	defaultLocale: 'it',
	pathnames: {
		'/': '/',
		'/example': {
			it: '/esempio',
			en: '/example',
		},
		// Aggiungi il nuovo pathname
		'/about': {
			it: '/chi-siamo',
			en: '/about',
		},
	},
});
```

#### 2. Crea la pagina

Crea un nuovo file in `src/app/[locale]/about/page.tsx`:

```typescript
import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function AboutPage({
  params: {locale}
}: {
  params: {locale: string};
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

#### 3. Aggiungi le traduzioni

Aggiungi le chiavi di traduzione in tutti i file di lingua (`messages/it.json`, `messages/en.json`, ecc.):

```json
{
	"AboutPage": {
		"title": "Chi Siamo",
		"description": "Questa è la pagina chi siamo..."
	}
}
```

#### 4. Aggiungi il link alla navigazione

Modifica `src/ui/organisms/Navigation.tsx` per includere il nuovo link:

```typescript
<NavigationLink href="/about">{t('about')}</NavigationLink>
```

E aggiungi la traduzione in `messages/*/json`:

```json
{
	"Navigation": {
		"home": "Home",
		"example": "Esempio",
		"about": "Chi Siamo"
	}
}
```

### Utilizzare le Traduzioni nei Componenti

#### Server Components

```typescript
import {useTranslations} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function MyPage({params: {locale}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('MyPage');

  return <h1>{t('title')}</h1>;
}
```

#### Client Components

```typescript
'use client';

import {useTranslations} from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyComponent');

  return <button>{t('label')}</button>;
}
```

### Link Localizzati

Usa sempre il componente `Link` da `src/i18n/navigation.ts`:

```typescript
import {Link} from '@/i18n/navigation';

<Link href="/example">
  {t('link')}
</Link>
```

Il link verrà automaticamente localizzato in base alla lingua corrente:

- `/it/esempio` per l'italiano
- `/en/example` per l'inglese

## SEO

Il template include:

- **Sitemap dinamica**: Generata automaticamente in `src/app/sitemap.ts`
- **Robots.txt**: Configurato in `src/app/robots.tsx`
- **Manifest**: PWA manifest in `src/app/manifest.ts`
- **Metadata localizzati**: Ogni pagina può avere metadata specifici per lingua

## Build e Deploy

### Build di produzione

```bash
npm run build
npm run start
```

### Deploy su Vercel

Il modo più semplice per deployare la tua app Next.js è usare la [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulta la [documentazione di deploy di Next.js](https://nextjs.org/docs/app/building-your-application/deploying) per maggiori dettagli.

## Risorse Utili

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione next-intl](https://next-intl.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
