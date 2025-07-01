function normalizeLog(logData) {
  return {
    employee_id: logData.employee_id || logData.employeeId || 'UNKNOWN',
    timestamp: logData.timestamp || new Date().toISOString(),
    device_id: logData.device_id || logData.deviceId || 'UNKNOWN_DEVICE',
    status: logData.status || 'check-in',
    created_at: new Date().toISOString()
  };
}

module.exports = normalizeLog;