import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEventType = 
  | 'download_guide'
  | 'download_modal_to_waitlist'
  | 'download_modal_continue';

export const trackEvent = async (
  eventType: AnalyticsEventType,
  eventData?: Record<string, any>
) => {
  try {
    await supabase.from('analytics_events').insert({
      event_type: eventType,
      event_data: eventData || {}
    });
  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
};
