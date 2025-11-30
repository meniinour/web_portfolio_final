# Configuration EmailJS pour le formulaire de contact

## Étapes pour configurer EmailJS

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit (100 emails/mois gratuits)

### 2. Ajouter un service email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
- Suivez les instructions pour connecter votre compte email
- Notez le **Service ID** (ex: `service_xxxxxxx`)

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

**Subject:**
```
{{subject}}
```

**Content:**
```
Bonjour,

Vous avez reçu un nouveau message depuis votre portfolio :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nom : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message :
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- Dans "To Email", entrez : `nourmenii0@gmail.com`
- Notez le **Template ID** (ex: `template_xxxxxxx`)

### 4. Obtenir votre clé publique
- Allez dans "Account" > "General"
- Copiez votre **Public Key** (ex: `xxxxxxxxxxxxx`)

### 5. Configurer le code
Ouvrez `script.js` et remplacez :
- `YOUR_PUBLIC_KEY` par votre Public Key
- `YOUR_SERVICE_ID` par votre Service ID
- `YOUR_TEMPLATE_ID` par votre Template ID

Exemple :
```javascript
emailjs.init("abc123xyz789"); // Votre Public Key

// Dans la fonction send :
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Test
Une fois configuré, testez le formulaire de contact. Les emails seront envoyés directement à `nourmenii0@gmail.com` sans ouvrir le client email.

