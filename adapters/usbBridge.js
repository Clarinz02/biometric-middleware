async function fetchUSBLogs() {
  try {
    // This would connect to USB biometric devices in production
    // For now, return empty array to prevent deployment errors
    console.log('USB Bridge adapter: No devices configured');
    return [];
  } catch (error) {
    console.error('USB Bridge fetch error:', error);
    return [];
  }
}

module.exports = { fetchUSBLogs };