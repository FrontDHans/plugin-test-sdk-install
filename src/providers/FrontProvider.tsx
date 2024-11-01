import { ReactNode, useEffect, useState } from 'react';
import Front from '@frontapp/plugin-sdk';
import { WebViewContext } from '@frontapp/plugin-sdk/dist/webViewSdkTypes';
import { FrontContext } from './frontContext';

export function FrontContextProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<WebViewContext>();

  useEffect(() => {
    const sub = Front.contextUpdates.subscribe((context) => {
      setContext(context);
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <FrontContext.Provider value={context}>{children}</FrontContext.Provider>
  );
}
