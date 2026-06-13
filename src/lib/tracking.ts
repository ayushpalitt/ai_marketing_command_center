import { sendGTMEvent } from '@next/third-parties/google';

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    sendGTMEvent({ event: eventName, ...params });
  }
};
