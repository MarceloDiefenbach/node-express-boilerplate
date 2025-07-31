const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

let client;

const initializeWhatsapp = async () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
  });

  client.on('qr', async (qr) => {
    const qrImage = await qrcode.toDataURL(qr);
    global.qrCodeImage = qrImage;
    console.log('✅ QR Code gerado. Escaneie com o WhatsApp.');
  });

  client.on('ready', () => {
    console.log('📱 WhatsApp conectado com sucesso!');
  });

  client.on('message', (msg) => {
    console.log('📩 Mensagem recebida:', msg.body);
  });

  client.initialize();
};

const getQRCode = () => {
  return global.qrCodeImage || null;
};

module.exports = {
  initializeWhatsapp,
  getQRCode,
};
