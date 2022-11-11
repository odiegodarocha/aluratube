import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://sgyfjfpngzhkjpnuqyub.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNneWZqZnBuZ3poa2pwbnVxeXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzE2MjQsImV4cCI6MTk4Mzc0NzYyNH0.2w7YNVV6rCg_2ymoq8Fq3nPK4JVbQBxLbTJSXbzzff4";
const supabase = createClient(PROJECT_URL, API_KEY);

export function videoService() {
  return {
    getVideo() {
      return supabase.from("video");
    },
  };
}
