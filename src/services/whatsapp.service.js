const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
let client;

const initializeWhatsapp = async () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
  });

  client.on('qr', async (qr) => {
    const qrImageUrl = await qrcode.toDataURL(qr);
    console.log('Escaneie o QR Code para autenticar.');
    // Você pode armazenar esse QR em memória se quiser usar numa rota
    global.qrCodeImage = qrImageUrl;
  });

  client.on('ready', () => {
    console.log('WhatsApp está pronto!');
  });

  client.on('message', message => {
    console.log('Mensagem recebida:', message.body);
  });

  client.initialize();
};

const getQRCode = () => global.qrCodeImage || null;

module.exports = {
  initializeWhatsapp,
  getQRCode
};
