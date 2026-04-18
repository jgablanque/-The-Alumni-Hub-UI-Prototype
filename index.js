// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker registered:', reg.scope))
      .catch((err) => console.error('❌ Service Worker failed to register:', err));
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Show the button when installable
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

// Handle click
installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none';
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(outcome === 'accepted' ? '✅ User installed the app' : '❌ User dismissed install');
  deferredPrompt = null;
});

// Confirmation after install
window.addEventListener('appinstalled', () => {
  console.log('🎉 Ateneo Alumni Hub installed successfully!');
  const toast = document.createElement('div');
  toast.textContent = '🎓 App installed successfully!';
  toast.className = 'install-toast';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
});
