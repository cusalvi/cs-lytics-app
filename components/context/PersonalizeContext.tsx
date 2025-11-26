
'use client';

import Personalize from '@contentstack/personalize-edge-sdk';
import { Sdk } from '@contentstack/personalize-edge-sdk/dist/sdk';

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

let sdkInstance: Sdk | null = null;

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance()
      .then(setSdk)
      .catch((error) => {
        console.error('Error initializing Personalize SDK in provider:', error);
        setSdk(null);
      });
  }, []);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}

export async function getPersonalizeInstance() {
  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID as string;
  
  if (!projectUid) {
    console.warn('NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID is not set. Personalization will not work.');
    return null;
  }
  
  try {
    // Set edge API URL if provided
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
      Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
    }
    
    if (!Personalize.getInitializationStatus()) {
      sdkInstance = await Personalize.init(projectUid);
    }
    return sdkInstance;
  } catch (error) {
    console.error('Failed to initialize Personalize SDK:', error);
    return null;
  }
}