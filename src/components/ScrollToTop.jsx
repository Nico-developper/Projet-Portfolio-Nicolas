import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Fait défiler en haut à chaque changement de route.
 * Fonctionne avec BrowserRouter (dev) et HashRouter (prod).
 * Bonus a11y : place le focus sur <main id="main"> si présent.
 */
export default function ScrollToTop({ behavior = 'auto' }) {
  const location = useLocation();
  const { pathname, search, hash } = location;

  useEffect(() => {
    // En HashRouter, location.hash contient le chemin (ex: "#/about").
    // On scrolle toujours tout en haut pour éviter de rester au milieu de la page.
    window.scrollTo({ top: 0, left: 0, behavior });

    // Accessibilité : déplacer le focus sur le contenu principal
    const main = document.getElementById('main');
    if (main) {
      // S’assure que le main est focusable
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, hash]); // réagit à tout changement d’URL

  return null;
}
