const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const { fetchZKLogs } = require('./adapters/zkteco');
const { fetchUSBLogs } = require('./adapters/usbBridge');
const normalizeLog = require('./utils/normalizeLog');

const serviceAccount = require('./firebase/serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route to simulate biometric log in browser
app.get('/test-log', (req, res) => {
  res.send(`
    <form method="POST" action="/biometric-log">
      <label>Employee ID:</label>
      <input name="employee_id" value="EMP001"/><br/>
      <label>Timestamp:</label>
      <input name="timestamp" value="${new Date().toISOString()}"/><br/>
      <label>Device ID:</label>
      <input name="device_id" value="SimDevice"/><br/>
      <label>Status:</label>
      <select name="status">
        <option value="check-in">Check-In</option>
        <option value="check-out">Check-Out</option>
      </select><br/><br/>
      <button type="submit">Submit Log</button>
    </form>
  `);
});

// ✅ Accept biometric log from Wi-Fi or manual POST
app.post('/biometric-log', async (req, res) => {
  try {
    const log = normalizeLog(req.body);
    await db.collection('biometric_logs').add(log);
    res.status(200).send({ message: 'Log received' });
  } catch (err) {
    console.error('Push log error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ✅ Pull logs from LAN and USB scanners
app.get('/sync-logs', async (req, res) => {
  try {
    const zkLogs = await fetchZKLogs();
    const usbLogs = await fetchUSBLogs();
    const allLogs = [...zkLogs, ...usbLogs];

    for (const log of allLogs) {
      const normalized = normalizeLog(log);
      await db.collection('biometric_logs').add(normalized);
    }

    res.status(200).send(`Synchronized ${allLogs.length} logs.`);
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).send('Error syncing logs');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Middleware running on port ${PORT}`));
