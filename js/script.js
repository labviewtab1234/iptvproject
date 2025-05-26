function showTab(index) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    buttons[i].classList.toggle("active", i === index);
  });
};

function openWhatsApp() {
  // Remplacez 'YOUR_WHATSAPP_NUMBER' par le numéro de téléphone complet avec le code du pays (sans + ni 00)
  // Exemple : 33612345678 pour un numéro français
  const phoneNumber = '+33644657615';
  // Vous pouvez également ajouter un message pré-rempli : `https://wa.me/${phoneNumber}?text=Bonjour%20!`
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

function openTelegram() {
  // Remplacez 'YOUR_TELEGRAM_USERNAME' par le nom d'utilisateur Telegram (sans @)
  // Exemple : 'MyTelegramUser'
  const telegramUsername = 'genuistv';
  // Pour ouvrir un chat direct avec un utilisateur : `tg://resolve?domain=${telegramUsername}`
  // Ou pour ouvrir Telegram avec un message pré-rempli (si l'appli est installée) : `tg://msg?text=Bonjour%20!`
  window.open(`https://t.me/${telegramUsername}`, '_blank');
}