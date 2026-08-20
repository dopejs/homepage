import { createRoot, hydrateRoot } from 'react-dom/client';

import { App } from './App';
import { readLanguagePreference } from './language-preference';
import { localeForPath } from './locales';
import { routeForPath } from './routes';
import './styles.css';

const container = document.querySelector('#root');
if (container === null) throw new Error('dopejs site root is missing');

const route = routeForPath(location.pathname);
const localePath = readLanguagePreference();
const locale = localeForPath(localePath);
document.documentElement.lang = locale.lang;
document.documentElement.dir = locale.dir ?? 'ltr';

const app = <App route={route} initialLocalePath={localePath} />;
// The static HTML is rendered in the default locale, so it can only be
// hydrated when the visitor's resolved preference is that same locale.
if (container.hasChildNodes() && localePath === '') {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
