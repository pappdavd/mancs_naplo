import axios from 'axios';

export const logActivity = async (userId: number, type: string, details: string = '') => {
  try {
    // Ha a backend URL más, itt írd át
    await axios.post('http://localhost/pawpatrol/api/log_activity.php', {
      user_id: userId,
      activity_type: type,
      details: details
    });
    console.log(`[LOG]: ${type} - ${details}`);
  } catch (error) {
    console.error("Hiba a naplózáskor:", error);
  }
};