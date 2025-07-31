const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsapp.service');

// Inicializa o WhatsApp na primeira chamada
router.get('/connect', async (req, res) => {
  try {
    await whatsappService.initializeWhatsapp();
    res.status(200).send('Inicializando cliente WhatsApp...');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/qr', (req, res) => {
  const qr = whatsappService.getQRCode();
  if (qr) {
    res.send(`<img src="${qr}" />`);
  } else {
    res.send('QR Code ainda não gerado. Acesse /whatsapp/connect primeiro.');
  }
});

module.exports = router;
