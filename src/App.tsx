import { useContext, useRef } from 'react';
import './App.css';
import { FrontContext } from './providers/frontContext';
import Front from '@frontapp/plugin-sdk';

const link = 'https://www.google.com';

function anchorListener(event: MouseEvent) {
  // No need to do anything if the click did not use the default button.
  if (event.button !== 0) return;

  // Find the targetted anchor element.
  const { target } = event;
  const anchorElement =
    target instanceof window.HTMLElement ? target.closest('a') : null;

  // We can't do anything without an href
  if (!anchorElement || !anchorElement.href) return;

  // Don't do anything if the anchor is not opening a new window nor is a mailto link.
  if (
    anchorElement.target !== '_blank' &&
    !anchorElement.href.startsWith('mailto:')
  )
    return;

  // Parse the href to support relative paths.
  const url = new URL(anchorElement.href, window.location.href);

  event.preventDefault();
  Front.openUrl(url.href);
}

function delegateAnchorClicksToFront() {
  // Traps are not needed in a non-embedded context.
  if (window.parent === window.self) return;

  // Capture clicks.
  window.addEventListener('click', anchorListener);
}

function removeDelegateAnchorClicksToFront() {
  window.removeEventListener('click', anchorListener);
}

// Methods to open a link
// - Anchor link with the different target values (self, blank, parent, top)
// - window.open
// - Any other javascript API to open new windows?
// Type of URLS
// - Relative URLs
// - URLs hosted on a different domain as the plugin
// - URLs with different protocols than http
// Environments
// - In the desktop app
// - In a web browser
// For all the combination, I would like to know:
// - Does it work?
// - If not, what error is thrown?
// - What does the new page has access to
//   - Can it access its opener?
//   - Can it access its parent?
//   - Can it escape the sandbox defined by the iframe?

export function App() {
  const frontContext = useContext(FrontContext);
  const windowOpenRef = useRef(window.open);

  if (frontContext == null) {
    return (
      <div>
        <p>Connecting to the Front context.</p>
      </div>
    );
  }

  function windowOpen() {
    window.open(link);
  }

  function frontOpen() {
    frontContext?.openUrl(link);
  }

  function delegateAnchors() {
    delegateAnchorClicksToFront();
  }
  function removeDelegate() {
    removeDelegateAnchorClicksToFront();
  }

  function delegateOpens() {
    window.open = function (url?: string | URL): Window | null {
      if (url == null) {
        return null;
      }
      Front.openUrl(String(url));
      return null;
    };
  }

  function resetOpens() {
    window.open = windowOpenRef.current;
  }

  return (
    <>
      <h1>Local React App</h1>
      <div className="links-container">
        <a href={link}>Regular link</a>
        <a href={link} target="_blank" rel="noreferrer">
          Target _blank
        </a>
        <button onClick={windowOpen}>window.open()</button>
        <button onClick={frontOpen}>Front.openUrl()</button>

        <button onClick={delegateAnchors}>Delegate Anchor Clicks</button>
        <button onClick={removeDelegate}>Remove event listener</button>

        <button onClick={delegateOpens}>Delegate opens</button>
        <button onClick={resetOpens}>Remove delegate opens</button>

        <button>Foo</button>
      </div>
    </>
  );
}
