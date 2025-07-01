const ZKLib = require('node-zklib');

async function fetchZKLogs() {
  try {
    // This would connect to actual ZKTeco devices in production
    // For now, return empty array to prevent deployment errors
    console.log('ZKTeco adapter: No devices configured');
    return [];
  } catch (error) {
    console.error('ZKTeco fetch error:', error);
    return [];
  }
}

module.exports = { fetchZKLogs };