import { createContext } from 'react';
import { WebViewContext } from '@frontapp/plugin-sdk/dist/webViewSdkTypes';

/**
 * Context
 */
export const FrontContext = createContext<WebViewContext | undefined>(
  undefined
);
