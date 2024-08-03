import Config from 'react-native-config'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseKey = Config.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cXhnZXh1cmVkaXVvZG51aWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA2MjU0MTIsImV4cCI6MTk2NjIwMTQxMn0.oz3dsouWsN0_hHCQxq0Vl9Vlzge-dFgwuX8vhyVDCNs'; 

const supabase = createClient('https://uvqxgexurediuodnuiji.supabase.co', supabaseKey, {
    localStorage: AsyncStorage,
    detectSessionInUrl: false
})


export default supabase;