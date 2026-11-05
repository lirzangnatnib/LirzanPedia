/**
 * LIRZANPEDIA - Terminal POS & Interactive Engine
 * Admin & Bot WhatsApp: 081572693453
 * Featuring: Custom Interactive Checkout View Switcher, Live Inline QRIS, 3D Cockpit Deck Tilt
 */

// Configuration State
const APP_STATE = {
  adminWhatsApp: '6281572693453', // Nomor Admin & Bot WA Resmi
  activeService: 'alight-motion',
  selectedPlan: 'am-admin-mail',
  selectedLogoTier: 'logo-y2k',
  selectedBotPlatform: 'whatsapp',
  botServiceMode: 'new-bot', // 'new-bot' | 'add-feature'
  featureDifficulty: 'feat-light', // 'feat-light' (5k) | 'feat-medium' (20k) | 'feat-heavy' (50k)
  botAddons: ['ai-bot', 'downloader'],
  customerNote: '',
  uniqueCode: 0, // Harga pas transparan tanpa biaya tambahan
  audioMuted: false,
  checkoutActiveTab: 'invoice' // 'invoice' | 'qris'
};

// Pricing Configuration (IDR)
const PRICING = {
  'alight-motion': {
    'am-admin-mail': { 
      name: 'Alight Motion 1 Tahun (Email Toko)', 
      price: 5000,
      desc: 'Masa aktif 1 Tahun, Garansi 7 Hari (Akun disediakan admin)'
    },
    'am-own-mail': { 
      name: 'Alight Motion 1 Tahun (Email Sendiri)', 
      price: 7000,
      desc: 'Masa aktif 1 Tahun, Garansi 1 Bulan (30 Hari) (Diaktifkan di email pribadi pembeli)'
    }
  },
  'logo-design': {
    'logo-y2k': { 
      name: 'Desain Logo', 
      price: 15000,
      desc: 'Logo kustom Y2K chrome, liquid metal, master vector SVG & PNG'
    },
    'logo-brutalist': { 
      name: 'Desain Poster & Banner (Event / Olshop / Spanduk)', 
      price: 25000,
      desc: 'Poster event musik, banner olshop & spanduk siap cetak'
    },
    'logo-mascot': { 
      name: 'Full Social Media Kit & Clan Mascot Logo', 
      price: 40000,
      desc: 'Feed IG carousel, header YouTube/Discord, avatar mascot clan'
    }
  },
  'bot-script': {
    base: {
      whatsapp: { name: 'Script Bot WhatsApp (Baileys v6)', price: 25000 },
      telegram: { name: 'Script Bot Telegram (Telegraf)', price: 25000 },
      discord: { name: 'Script Bot Discord (Discord.js v14)', price: 30000 },
      multi: { name: 'Hybrid Multi-Platform Bot', price: 45000 }
    },
    featureAdd: {
      'feat-light': { name: 'Tambah Fitur Sederhana (Auto Reply/Greeting/Link)', price: 5000 },
      'feat-medium': { name: 'Tambah Fitur Sedang (Downloader/Sticker/Menu)', price: 20000 },
      'feat-heavy': { name: 'Tambah Fitur Rumit (AI Gemini/GPT, Auto QRIS & Mutasi, DB)', price: 50000 }
    },
    addons: {
      'ai-bot': { name: 'AI Gemini / ChatGPT', price: 0 },
      'downloader': { name: 'Media Downloader TT/IG/YT', price: 0 },
      'qris-payment': { name: 'Auto QRIS Gateway', price: 0 },
      'group-manager': { name: 'Group Auto-Mod & Anti-Link', price: 0 },
      'database': { name: 'Database MySQL / MongoDB', price: 0 }
    }
  }
};

// Web Audio API Retro Synth Sound
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  beep(freq = 440, type = 'sine', duration = 0.08) {
    if (APP_STATE.audioMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted
    }
  }

  click() {
    this.beep(800, 'square', 0.04);
  }

  confirm() {
    this.beep(523.25, 'triangle', 0.06);
    setTimeout(() => this.beep(659.25, 'triangle', 0.08), 70);
  }

  glitch() {
    if (APP_STATE.audioMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(150 + Math.random() * 900, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  shimmer() {
    if (APP_STATE.audioMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  prismBeam() {
    if (APP_STATE.audioMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.1);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  digitalBeep() {
    if (APP_STATE.audioMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.setValueAtTime(1800, now + 0.03);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.06);
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Calculate Current Total
function calculateTotal() {
  let subtotal = 0;
  let serviceDescription = '';

  if (APP_STATE.activeService === 'alight-motion') {
    const item = PRICING['alight-motion'][APP_STATE.selectedPlan];
    subtotal = item ? item.price : 5000;
    serviceDescription = item ? item.name : 'Alight Motion 1 Tahun';
  } else if (APP_STATE.activeService === 'logo-design') {
    const item = PRICING['logo-design'][APP_STATE.selectedLogoTier];
    subtotal = item ? item.price : 15000;
    serviceDescription = item ? item.name : 'Jasa Desain';
  } else if (APP_STATE.activeService === 'bot-script') {
    if (APP_STATE.botServiceMode === 'add-feature') {
      const feat = PRICING['bot-script'].featureAdd[APP_STATE.featureDifficulty];
      subtotal = feat ? feat.price : 5000;
      serviceDescription = feat ? feat.name : 'Tambah Fitur Script Sendiri';
    } else {
      const baseItem = PRICING['bot-script'].base[APP_STATE.selectedBotPlatform];
      subtotal = baseItem ? baseItem.price : 25000;
      serviceDescription = baseItem ? baseItem.name : 'Script Bot';

      const addonNames = [];
      APP_STATE.botAddons.forEach(addonKey => {
        const addon = PRICING['bot-script'].addons[addonKey];
        if (addon) {
          addonNames.push(addon.name);
        }
      });

      if (addonNames.length > 0) {
        serviceDescription += ` (Request Fitur: ${addonNames.join(', ')})`;
      }
    }
  }

  const grandTotal = subtotal + APP_STATE.uniqueCode;
  return { subtotal, grandTotal, serviceDescription };
}

// Update DOM elements for the Terminal
function updateTerminalUI() {
  const { grandTotal, serviceDescription } = calculateTotal();
  
  const displayTotal = document.getElementById('terminal-total-tagihan');
  const displayItemName = document.getElementById('terminal-item-name');
  const displaySubtotal = document.getElementById('terminal-subtotal-val');
  const displayUnique = document.getElementById('terminal-unique-code');
  
  if (displayTotal) displayTotal.innerText = formatRupiah(grandTotal);
  if (displayItemName) displayItemName.innerText = serviceDescription;
  if (displaySubtotal) displaySubtotal.innerText = formatRupiah(grandTotal);
  if (displayUnique) displayUnique.innerText = `Rp 0 (Pas)`;

  // Update Live WhatsApp Order Preview Snippet
  const previewSnippet = document.getElementById('whatsapp-preview-snippet');
  if (previewSnippet) {
    let orderPhrase = '';
    const noteInput = document.getElementById('terminal-customer-note');
    const customerNote = noteInput ? noteInput.value.trim() : '';

    if (APP_STATE.activeService === 'alight-motion') {
      const isOwnMail = APP_STATE.selectedPlan === 'am-own-mail';
      const opsi = isOwnMail ? 'email sendiri' : 'email dari admin';
      orderPhrase = `alight motion premium ${opsi}`;
    } else if (APP_STATE.activeService === 'logo-design') {
      let opsi = 'desain logo';
      if (APP_STATE.selectedLogoTier === 'logo-brutalist') opsi = 'desain poster & banner';
      else if (APP_STATE.selectedLogoTier === 'logo-mascot') opsi = 'social media kit & mascot';
      orderPhrase = opsi;
    } else if (APP_STATE.activeService === 'bot-script') {
      if (APP_STATE.botServiceMode === 'add-feature') {
        orderPhrase = 'jasa tambah fitur script bot';
      } else {
        const plat = APP_STATE.selectedBotPlatform || 'whatsapp';
        const platText = plat === 'multi' ? 'multi platform' : plat;
        
        if (APP_STATE.botAddons && APP_STATE.botAddons.length > 0) {
          const addonLabels = {
            'ai-bot': 'AI Gemini/ChatGPT',
            'downloader': 'Media Downloader',
            'qris-payment': 'Payment Gateway',
            'group-manager': 'Group Auto-Mod',
            'database': 'Custom Database'
          };
          const featureList = APP_STATE.botAddons.map(k => addonLabels[k] || k).join(', ');
          orderPhrase = `script bot ${platText} + tambah fitur (${featureList})`;
        } else {
          orderPhrase = `script bot ${platText}`;
        }
      }
    } else {
      orderPhrase = 'layanan digital';
    }

    let msg = `Halo min, saya mau order ${orderPhrase}`;
    if (customerNote) {
      msg += ` dengan catatan ${customerNote}`;
    }
    previewSnippet.innerText = msg;
  }

  // Toggle active service tabs
  document.querySelectorAll('.service-tab-btn').forEach(btn => {
    const service = btn.getAttribute('data-service');
    if (service === APP_STATE.activeService) {
      btn.classList.add('bg-white', 'text-black');
      btn.classList.remove('bg-black', 'text-white');
    } else {
      btn.classList.remove('bg-white', 'text-black');
      btn.classList.add('bg-black', 'text-white');
    }
  });

  // Toggle service option containers
  ['alight-motion-options', 'logo-design-options', 'bot-script-options'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === `${APP_STATE.activeService}-options`) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // Toggle bot mode containers (New Bot vs Add Feature)
  const botNewContainer = document.getElementById('bot-mode-new-container');
  const botAddContainer = document.getElementById('bot-mode-add-container');
  if (botNewContainer && botAddContainer) {
    if (APP_STATE.botServiceMode === 'add-feature') {
      botNewContainer.classList.add('hidden');
      botAddContainer.classList.remove('hidden');
    } else {
      botNewContainer.classList.remove('hidden');
      botAddContainer.classList.add('hidden');
    }
  }
}

window.openCheckout = function(service = 'alight-motion', key = '') {
  let url = 'checkout.html';
  const params = new URLSearchParams();
  if (service) params.set('service', service);
  if (service === 'alight-motion' && key) params.set('plan', key);
  if (service === 'logo-design' && key) params.set('tier', key);
  if (service === 'bot-script') {
    if (key === 'add-feature') {
      params.set('mode', 'add-feature');
    } else if (key) {
      params.set('platform', key);
    }
  }
  const query = params.toString();
  if (query) url += '?' + query;
  window.open(url, '_blank');
};

// Quick Select Package from Catalog Cards (Adapts based on whether terminal exists on current page)
window.selectProductFromCatalog = function(service, key) {
  // If on checkout page where terminal exists, select inline
  if (document.getElementById('terminal-interactive-deck')) {
    APP_STATE.activeService = service;
    if (service === 'alight-motion') {
      APP_STATE.selectedPlan = key;
      const radio = document.querySelector(`input[name="am-plan"][value="${key}"]`);
      if (radio) radio.checked = true;
    } else if (service === 'logo-design') {
      APP_STATE.selectedLogoTier = key;
      const radio = document.querySelector(`input[name="logo-tier"][value="${key}"]`);
      if (radio) radio.checked = true;
    } else if (service === 'bot-script') {
      if (key === 'add-feature') {
        APP_STATE.botServiceMode = 'add-feature';
        const radio = document.querySelector(`input[name="bot-service-mode"][value="add-feature"]`);
        if (radio) radio.checked = true;
      } else {
        APP_STATE.selectedBotPlatform = key;
        const radio = document.querySelector(`input[name="bot-platform"][value="${key}"]`);
        if (radio) radio.checked = true;
      }
    }
    updateTerminalUI();
    sfx.confirm();
  } else {
    // If on homepage or other page, open checkout in a new tab!
    sfx.click();
    window.openCheckout(service, key);
  }
};

// Generate Bot-Friendly WhatsApp Order Link
window.sendWhatsAppOrder = function() {
  sfx.confirm();
  
  let orderPhrase = '';
  const noteInput = document.getElementById('terminal-customer-note');
  const customerNote = noteInput ? noteInput.value.trim() : '';

  if (APP_STATE.activeService === 'alight-motion') {
    const isOwnMail = APP_STATE.selectedPlan === 'am-own-mail';
    const opsi = isOwnMail ? 'email sendiri' : 'email dari admin';
    orderPhrase = `alight motion premium ${opsi}`;
  } else if (APP_STATE.activeService === 'logo-design') {
    let opsi = 'desain logo';
    if (APP_STATE.selectedLogoTier === 'logo-brutalist') {
      opsi = 'desain poster & banner';
    } else if (APP_STATE.selectedLogoTier === 'logo-mascot') {
      opsi = 'social media kit & mascot';
    }
    orderPhrase = opsi;
  } else if (APP_STATE.activeService === 'bot-script') {
    if (APP_STATE.botServiceMode === 'add-feature') {
      orderPhrase = 'jasa tambah fitur script bot';
    } else {
      const plat = APP_STATE.selectedBotPlatform || 'whatsapp';
      const platText = plat === 'multi' ? 'multi platform' : plat;
      
      if (APP_STATE.botAddons && APP_STATE.botAddons.length > 0) {
        const addonLabels = {
          'ai-bot': 'AI Gemini/ChatGPT',
          'downloader': 'Media Downloader',
          'qris-payment': 'Payment Gateway',
          'group-manager': 'Group Auto-Mod',
          'database': 'Custom Database'
        };
        const featureList = APP_STATE.botAddons.map(k => addonLabels[k] || k).join(', ');
        orderPhrase = `script bot ${platText} + tambah fitur (${featureList})`;
      } else {
        orderPhrase = `script bot ${platText}`;
      }
    }
  } else {
    orderPhrase = 'layanan digital';
  }

  let message = `Halo min, saya mau order ${orderPhrase}`;
  if (customerNote) {
    message += ` dengan catatan ${customerNote}`;
  }

  const phone = APP_STATE.adminWhatsApp || '6281572693453';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

// Direct WhatsApp Consultation Link Handler
window.openConsultationWhatsApp = function() {
  sfx.confirm();
  const phone = APP_STATE.adminWhatsApp || '6281572693453';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Halo min saya mau konsultasi')}`;
  window.open(waUrl, '_blank');
};

// Copy Checkout Summary
window.copyCheckoutSummary = function() {
  sfx.click();
  let orderPhrase = '';
  const noteInput = document.getElementById('terminal-customer-note');
  const customerNote = noteInput ? noteInput.value.trim() : '';

  if (APP_STATE.activeService === 'alight-motion') {
    const isOwnMail = APP_STATE.selectedPlan === 'am-own-mail';
    const opsi = isOwnMail ? 'email sendiri' : 'email dari admin';
    orderPhrase = `alight motion premium ${opsi}`;
  } else if (APP_STATE.activeService === 'logo-design') {
    let opsi = 'desain logo';
    if (APP_STATE.selectedLogoTier === 'logo-brutalist') opsi = 'desain poster & banner';
    else if (APP_STATE.selectedLogoTier === 'logo-mascot') opsi = 'social media kit & mascot';
    orderPhrase = opsi;
  } else if (APP_STATE.activeService === 'bot-script') {
    if (APP_STATE.botServiceMode === 'add-feature') {
      orderPhrase = 'jasa tambah fitur script bot';
    } else {
      const plat = APP_STATE.selectedBotPlatform || 'whatsapp';
      const platText = plat === 'multi' ? 'multi platform' : plat;
      orderPhrase = `script bot ${platText}`;
    }
  }

  let textToCopy = `Halo min, saya mau order ${orderPhrase}`;
  if (customerNote) textToCopy += ` dengan catatan ${customerNote}`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Format order berhasil disalin:\n\n' + textToCopy);
  }).catch(() => {
    alert('Format order: ' + textToCopy);
  });
};

// Inline QRIS Timer
let inlineTimerInterval = null;
function startInlineQRISTimer() {
  clearInterval(inlineTimerInterval);
  let timeLeft = 15 * 60; // 15 mins
  const timerDisplay = document.getElementById('inline-qris-timer');

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerDisplay) {
      timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    if (timeLeft <= 0) {
      clearInterval(inlineTimerInterval);
      if (timerDisplay) timerDisplay.innerText = 'EXPIRED';
    }
    timeLeft--;
  }

  updateTimer();
  inlineTimerInterval = setInterval(updateTimer, 1000);
}

// Copy Total Amount
window.copyTotalNominal = function() {
  sfx.click();
  const { grandTotal } = calculateTotal();
  navigator.clipboard.writeText(grandTotal.toString()).then(() => {
    const btn = document.getElementById('copy-nominal-btn');
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = `<svg class="w-3.5 h-3.5 text-emerald-400 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> <span>TERSALIN</span>`;
      setTimeout(() => {
        btn.innerHTML = origText;
      }, 1800);
    }
  });
};

// QRIS Modal Controls
window.openQRISModal = function() {
  sfx.click();
  const modal = document.getElementById('qris-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    startQRISTimer();
  }
};

window.closeQRISModal = function() {
  sfx.click();
  const modal = document.getElementById('qris-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

let timerInterval = null;
function startQRISTimer() {
  clearInterval(timerInterval);
  let timeLeft = 15 * 60; // 15 minutes
  const timerDisplay = document.getElementById('qris-timer');
  
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerDisplay) {
      timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (timerDisplay) timerDisplay.innerText = 'KEDALUWARSA';
    }
    timeLeft--;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Admin Number Configuration Modal
window.promptChangeAdminNumber = function() {
  sfx.click();
  const current = APP_STATE.adminWhatsApp;
  const newNum = prompt('Masukkan Nomor WhatsApp Admin & Bot (Contoh: 081572693453):', current);
  if (newNum && newNum.trim().length >= 10) {
    let cleaned = newNum.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    APP_STATE.adminWhatsApp = cleaned;
    alert(`Nomor WhatsApp admin & bot berhasil diubah menjadi: ${APP_STATE.adminWhatsApp}`);
  }
};

// Toggle Audio Sound
window.toggleSound = function() {
  APP_STATE.audioMuted = !APP_STATE.audioMuted;
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.innerText = APP_STATE.audioMuted ? 'AUDIO: OFF [X]' : 'AUDIO: ON [SND]';
  }
  if (!APP_STATE.audioMuted) {
    sfx.beep(600, 'sine', 0.1);
  }
};

// Interactive Bot Code Viewer Tab Switcher
window.switchBotSnippet = function(type) {
  sfx.click();
  const snippets = {
    whatsapp: `// LIRZANPEDIA WHATSAPP BOT ENGINE (Baileys v6.7)
// Bot Auto Order Handler: #ORDER_AMPREM
import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';

const bot = makeWASocket({ auth: state });
bot.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0];
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
  if (!text || msg.key.fromMe) return;

  // Auto Order Alight Motion Premium
  if (text.startsWith('#ORDER_AMPREM')) {
    await bot.sendMessage(msg.key.remoteJid, {
      text: '[AUTO BOT] Pesanan Alight Motion Premium terdeteksi! Silakan bayar via QRIS otomatis berikut:'
    });
    // Send Dynamic QRIS
  }
});`,
    telegram: `// LIRZANPEDIA TELEGRAM BOT ENGINE (Telegraf v4.16)
import { Telegraf } from 'telegraf';
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('order', async (ctx) => {
  // Generate Dynamic QRIS & GoPay Mutation Gateway
  const orderId = 'ORD-' + Date.now();
  await ctx.replyWithPhoto({ url: qrisEngine.getURL(orderId, 5000) }, {
    caption: '[!] Tagihan Otomatis Lirzanpedia Terverifikasi 0% MDR'
  });
});

bot.launch();`,
    discord: `// LIRZANPEDIA DISCORD BOT ENGINE (Discord.js v14)
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.on('messageCreate', async (msg) => {
  if (msg.content === '!menu') {
    const embed = new EmbedBuilder()
      .setColor('#FF0033')
      .setTitle('[+] LIRZANPEDIA BOT SYSTEM')
      .setDescription('Custom commands, ticket system, and auto-role ready.');
    await msg.reply({ embeds: [embed] });
  }
});
client.login(process.env.DISCORD_TOKEN);`
  };

  const codeEl = document.getElementById('bot-code-display');
  if (codeEl && snippets[type]) {
    codeEl.innerText = snippets[type];
  }

  document.querySelectorAll('.bot-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-bot') === type) {
      btn.classList.add('bg-white', 'text-black');
      btn.classList.remove('bg-black', 'text-white');
    } else {
      btn.classList.remove('bg-white', 'text-black');
      btn.classList.add('bg-black', 'text-white');
    }
  });
};

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Service Tabs Handler
  document.querySelectorAll('.service-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sfx.click();
      APP_STATE.activeService = btn.getAttribute('data-service');
      updateTerminalUI();
    });
  });

  // Alight Motion Radio Options
  document.querySelectorAll('input[name="am-plan"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      sfx.click();
      APP_STATE.selectedPlan = e.target.value;
      updateTerminalUI();
    });
  });

  // Logo Design Radio Options
  document.querySelectorAll('input[name="logo-tier"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      sfx.click();
      APP_STATE.selectedLogoTier = e.target.value;
      updateTerminalUI();
    });
  });

  // Bot Platform Radio Options
  document.querySelectorAll('input[name="bot-platform"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      sfx.click();
      APP_STATE.selectedBotPlatform = e.target.value;
      updateTerminalUI();
    });
  });

  // Bot Addon Checkboxes
  document.querySelectorAll('input[name="bot-addon"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      sfx.click();
      const val = e.target.value;
      if (cb.checked) {
        if (!APP_STATE.botAddons.includes(val)) APP_STATE.botAddons.push(val);
      } else {
        APP_STATE.botAddons = APP_STATE.botAddons.filter(item => item !== val);
      }
      updateTerminalUI();
    });
  });

  // Bot Service Mode (Bikin Bot Baru vs Tambah Fitur Sendiri)
  document.querySelectorAll('input[name="bot-service-mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      sfx.click();
      APP_STATE.botServiceMode = e.target.value;
      updateTerminalUI();
    });
  });

  // Feature Difficulty (Bawa Script Sendiri)
  document.querySelectorAll('input[name="feature-difficulty"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      sfx.click();
      APP_STATE.featureDifficulty = e.target.value;
      updateTerminalUI();
    });
  });

  // Customer Note Input Real-Time Preview
  const customerNoteEl = document.getElementById('terminal-customer-note');
  if (customerNoteEl) {
    customerNoteEl.addEventListener('input', () => {
      updateTerminalUI();
    });
  }

  // Initial UI Render
  updateTerminalUI();

  // Read URL Search Params on Load (Used by checkout.html)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramService = urlParams.get('service');
    const paramPlan = urlParams.get('plan');
    const paramTier = urlParams.get('tier');
    const paramPlatform = urlParams.get('platform');
    const paramMode = urlParams.get('mode');
    const paramDiff = urlParams.get('diff');

    if (paramService && PRICING[paramService]) {
      APP_STATE.activeService = paramService;
    }
    if (paramPlan && PRICING['alight-motion'][paramPlan]) {
      APP_STATE.selectedPlan = paramPlan;
      const r = document.querySelector(`input[name="am-plan"][value="${paramPlan}"]`);
      if (r) r.checked = true;
    }
    if (paramTier && PRICING['logo-design'][paramTier]) {
      APP_STATE.selectedLogoTier = paramTier;
      const r = document.querySelector(`input[name="logo-tier"][value="${paramTier}"]`);
      if (r) r.checked = true;
    }
    if (paramPlatform && PRICING['bot-script'].base[paramPlatform]) {
      APP_STATE.selectedBotPlatform = paramPlatform;
      const r = document.querySelector(`input[name="bot-platform"][value="${paramPlatform}"]`);
      if (r) r.checked = true;
    }
    if (paramMode === 'add-feature') {
      APP_STATE.botServiceMode = 'add-feature';
      const r = document.querySelector(`input[name="bot-service-mode"][value="add-feature"]`);
      if (r) r.checked = true;
    }
    if (paramDiff && PRICING['bot-script'].featureAdd[paramDiff]) {
      APP_STATE.featureDifficulty = paramDiff;
      const r = document.querySelector(`input[name="feature-difficulty"][value="${paramDiff}"]`);
      if (r) r.checked = true;
    }
    updateTerminalUI();
  } catch (err) {}

  // Analog Cockpit 3D Tilt for Both Left Input Deck and Right Checkout Deck
  const tiltDeckLeft = document.getElementById('terminal-interactive-deck');
  const tiltDeckRight = document.getElementById('terminal-checkout-deck');
  if (tiltDeckLeft || tiltDeckRight) {
    window.addEventListener('mousemove', (e) => {
      [tiltDeckLeft, tiltDeckRight].forEach(deck => {
        if (!deck) return;
        const rect = deck.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
        const rotX = Math.max(-6, Math.min(6, deltaY * -6));
        const rotY = Math.max(-6, Math.min(6, deltaX * 6));
        deck.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      });
    });
  }

  // =========================================================================
  // DISTINCT HERO TITLE HOVER ANIMATIONS (Foto 1: Berbeda-beda Tiap Baris)
  // =========================================================================

  // 1. ROW 1: LIRZAN (Metallic Shimmer & Chrome Stardust)
  const lirzanEl = document.querySelector('.hero-title-lirzan');
  if (lirzanEl) {
    let lastShimmer = 0;
    lirzanEl.addEventListener('mouseenter', (e) => {
      sfx.shimmer();
      spawnChromeStars(e.clientX, e.clientY, 8);
    });
    lirzanEl.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastShimmer > 180) {
        lastShimmer = now;
        sfx.shimmer();
        spawnChromeStars(e.clientX, e.clientY, 3);
      }
    });
  }

  // 2. ROW 2: PEDIA [!] (Y2K Acid Prism Hologram & Chromatic Laser Shards)
  const pediaEl = document.querySelector('.hero-title-pedia');
  const tagEl = document.querySelector('.hero-title-tag');
  [pediaEl, tagEl].forEach(el => {
    if (!el) return;
    let lastLaser = 0;
    el.addEventListener('mouseenter', (e) => {
      sfx.prismBeam();
      spawnAcidShards(e.clientX, e.clientY, 8);
    });
    el.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastLaser > 140) {
        lastLaser = now;
        sfx.prismBeam();
        spawnAcidShards(e.clientX, e.clientY, 3);
      }
    });
  });

  // 3. ROW 3: DIGITAL [EYE] (Matrix Hacker Decrypt & Cyber Eye Flare)
  const digitalEl = document.querySelector('.hero-title-digital');
  const eyeBoxEl = document.querySelector('.eye-cutout-box');
  if (digitalEl) {
    let isScrambling = false;
    const originalText = 'DIGITAL';
    const matrixGlyphs = '01<>/#!@$%&*#_[]';
    
    digitalEl.addEventListener('mouseenter', (e) => {
      sfx.digitalBeep();
      spawnMatrixBits(e.clientX, e.clientY, 6);
      if (eyeBoxEl) eyeBoxEl.classList.add('eye-laser-active');

      if (!isScrambling) {
        isScrambling = true;
        let iter = 0;
        const interval = setInterval(() => {
          digitalEl.innerText = originalText
            .split('')
            .map((char, idx) => {
              if (idx < iter) return originalText[idx];
              return matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
            })
            .join('');

          if (iter >= originalText.length) {
            clearInterval(interval);
            digitalEl.innerText = originalText;
            isScrambling = false;
          }
          iter += 1 / 3;
        }, 30);
      }
    });

    digitalEl.addEventListener('mouseleave', () => {
      if (eyeBoxEl) eyeBoxEl.classList.remove('eye-laser-active');
    });
  }

  if (eyeBoxEl) {
    eyeBoxEl.addEventListener('mouseenter', () => {
      sfx.digitalBeep();
    });
  }

  // 4. ROW 4: SOLUTION (Pixel Glitch Shatter & Explosive Debris - Hanya di SOLUTION)
  const solutionEl = document.querySelector('.hero-title-solution');
  if (solutionEl) {
    let lastGlitchTime = 0;
    solutionEl.addEventListener('mouseenter', (e) => {
      sfx.glitch();
      spawnDebris(e.clientX, e.clientY, 10);
    });

    solutionEl.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastGlitchTime > 140) {
        lastGlitchTime = now;
        sfx.glitch();
        spawnDebris(e.clientX, e.clientY, 4);
      }
    });
  }

  // Particle Emitter 1: Shatter Debris (Khusus SOLUTION)
  function spawnDebris(x, y, count = 8) {
    const colors = ['#ff0033', '#00f0ff', '#ffffff', '#00ff88', '#b026ff', '#facc15'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'shatter-debris';
      const size = Math.floor(Math.random() * 6) + 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.boxShadow = `0 0 8px ${p.style.backgroundColor}`;
      
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 80 + 20;
      const dx = `${Math.cos(angle) * dist}px`;
      const dy = `${Math.sin(angle) * dist}px`;
      const rot = `${(Math.random() - 0.5) * 480}deg`;

      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.setProperty('--rot', rot);

      document.body.appendChild(p);
      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 580);
    }
  }

  // Particle Emitter 2: Chrome Diamond Stars (Khusus LIRZAN)
  function spawnChromeStars(x, y, count = 6) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'shatter-debris';
      const size = Math.floor(Math.random() * 5) + 3;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.backgroundColor = i % 2 === 0 ? '#00f0ff' : '#ffffff';
      p.style.boxShadow = '0 0 10px #00f0ff';
      p.style.borderRadius = '2px';
      
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 50 + 15;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist - 25}px`);
      p.style.setProperty('--rot', '45deg');

      document.body.appendChild(p);
      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 600);
    }
  }

  // Particle Emitter 3: Neon Laser Prism Shards (Khusus PEDIA)
  function spawnAcidShards(x, y, count = 8) {
    const shardColors = ['#ff0033', '#00f0ff', '#b026ff', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'shatter-debris';
      const w = Math.floor(Math.random() * 8) + 4;
      const h = Math.floor(Math.random() * 3) + 2;
      p.style.width = `${w}px`;
      p.style.height = `${h}px`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.backgroundColor = shardColors[Math.floor(Math.random() * shardColors.length)];
      p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;
      p.style.transform = `skewX(${Math.random() * 40 - 20}deg)`;

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 70 + 20;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      p.style.setProperty('--rot', `${(Math.random() - 0.5) * 360}deg`);

      document.body.appendChild(p);
      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 500);
    }
  }

  // Particle Emitter 4: Matrix Cyan Bits (Khusus DIGITAL)
  function spawnMatrixBits(x, y, count = 6) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'shatter-debris font-mono font-bold text-xs';
      p.innerText = Math.random() > 0.5 ? '1' : '0';
      p.style.color = '#00f0ff';
      p.style.textShadow = '0 0 8px #00f0ff';
      p.style.left = `${x + (Math.random() - 0.5) * 30}px`;
      p.style.top = `${y}px`;
      
      const dy = `-${Math.random() * 50 + 20}px`;
      const dx = `${(Math.random() - 0.5) * 20}px`;
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.setProperty('--rot', '0deg');

      document.body.appendChild(p);
      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 550);
    }
  }

  // Mobile Topbar Hamburger Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      sfx.click();
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Mobile Product Accordion Submenu Toggle
  const mobileProdToggle = document.getElementById('mobile-product-toggle');
  const mobileProdSub = document.getElementById('mobile-product-submenu');
  if (mobileProdToggle && mobileProdSub) {
    mobileProdToggle.addEventListener('click', (e) => {
      e.preventDefault();
      sfx.click();
      mobileProdSub.classList.toggle('hidden');
    });
  }


  // =========================================================================
  // FIGCRAFT STYLE RIGHT-SIDE HUD RULER & SCROLLBAR (DRAGGABLE & SCRUBBABLE)
  // =========================================================================
  const rulerDock = document.getElementById('figcraft-ruler-dock');
  const rulerTrack = document.getElementById('figcraft-ruler-track');
  const rulerNeedle = document.getElementById('figcraft-ruler-needle');
  const rulerPct = document.getElementById('figcraft-ruler-pct');

  if (rulerTrack && rulerNeedle && rulerPct) {
    let isDragging = false;

    // Helper: calculate scroll percentage from cursor Y and scroll
    const scrollToY = (clientY) => {
      const rect = rulerTrack.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const pct = Math.max(0, Math.min(1, relativeY / rect.height));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: pct * maxScroll,
        behavior: 'auto'
      });
    };

    // Pointer down: click to jump or begin drag
    rulerTrack.addEventListener('pointerdown', (e) => {
      isDragging = true;
      rulerTrack.classList.add('is-dragging');
      rulerTrack.setPointerCapture(e.pointerId);
      scrollToY(e.clientY);
      sfx.click();
    });

    // Pointer move: live scrub when dragging
    rulerTrack.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      scrollToY(e.clientY);
    });

    // Pointer up & cancel: release drag
    const stopDragging = (e) => {
      if (isDragging) {
        isDragging = false;
        rulerTrack.classList.remove('is-dragging');
        try { rulerTrack.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    rulerTrack.addEventListener('pointerup', stopDragging);
    rulerTrack.addEventListener('pointercancel', stopDragging);

    // Real-Time Ruler Sync (Needle & % Counter)
    const updateRulerOnScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercent = maxScroll > 0 ? Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100)) : 0;

      const trackHeight = rulerTrack.clientHeight;
      const needleY = (scrollPercent / 100) * (trackHeight - 8);
      rulerNeedle.style.top = `${needleY}px`;
      const formatted = String(Math.round(scrollPercent)).padStart(3, '0') + '%';
      rulerPct.innerText = formatted;
    };

    window.addEventListener('scroll', updateRulerOnScroll, { passive: true });
    window.addEventListener('resize', updateRulerOnScroll, { passive: true });
    updateRulerOnScroll();
  }

});
