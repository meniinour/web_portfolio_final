// Configuration EmailJS
// Remplacez ces valeurs par vos propres clés après avoir suivi le guide EMAILJS_SETUP.md

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',        // Votre clé publique EmailJS
    SERVICE_ID: 'YOUR_SERVICE_ID',        // ID de votre service email
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',      // ID de votre template d'email
    TO_EMAIL: 'nourmenii0@gmail.com'      // Email de destination
};

// Exporter pour utilisation dans script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}

