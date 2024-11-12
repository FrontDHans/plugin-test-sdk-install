import './LinkTests.css';
import { useContext } from 'react';
import { FrontContext } from '../../providers/frontContext';

const APP_BASE_URL = '/plugin-test-sdk-install/';
const TARGET_COMBINATIONS = ['_self', '_blank', '_parent', '_top'];
const RELATIVE_HREF = `${APP_BASE_URL}relative/`;
const DIFFERENT_DOMAIN_HREF = 'https://example.com';

export function LinkTests() {
  const frontContext = useContext(FrontContext);

  function renderAnchorLinks(href: string, title: string) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{`<a href="${href}" >`}</p>
        <ul>
          {TARGET_COMBINATIONS.map((target) => (
            <li key={target}>
              <a href={href} target={target}>
                {target}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function renderJavaScriptApis(href: string, title: string) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{`const url = "${href}"`}</p>
        <ul>
          {TARGET_COMBINATIONS.map((target) => (
            <li key={target}>
              <button
                onClick={() => window.open(href, target)}
              >{`window.open(url, "${target}")`}</button>
            </li>
          ))}
          <li>
            <button onClick={() => window.open(href)}>window.open(url)</button>
          </li>
          <li>
            <button onClick={() => (window.location.href = href)}>
              window.location.href = url
            </button>
          </li>
          <li>
            <button onClick={() => window.location.assign(href)}>
              window.location.assign(url)
            </button>
          </li>
          <li>
            <button onClick={() => window.location.replace(href)}>
              window.location.replace(url)
            </button>
          </li>
        </ul>
      </div>
    );
  }

  function renderFrontApi(href: string, title: string) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{`const url = "${href}"`}</p>
        <ul>
          <li>
            <button onClick={() => frontContext?.openUrl(href)}>
              frontContext.openUrl(url)
            </button>
          </li>
          <li>
            <button onClick={() => frontContext?.openUrlInPopup(href, {})}>
              frontContext.openUrlInPopup(url, {`{}`})
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Plugin Test with SDK install</h1>
      <h2>Anchor Links</h2>
      <div className="flex-column">
        {renderAnchorLinks(RELATIVE_HREF, 'Relative')}
        {renderAnchorLinks(DIFFERENT_DOMAIN_HREF, 'Different Domain')}
      </div>

      <h2>JavaScript APIs</h2>
      <div className="flex-column">
        {renderJavaScriptApis(RELATIVE_HREF, 'Relative')}
        {renderJavaScriptApis(DIFFERENT_DOMAIN_HREF, 'Different Domain')}
      </div>

      <h2>Front API</h2>
      <div className="flex-column">
        {renderFrontApi(RELATIVE_HREF, 'Relative')}
        {renderFrontApi(DIFFERENT_DOMAIN_HREF, 'Different Domain')}
      </div>
    </div>
  );
}
