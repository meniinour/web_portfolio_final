// Script pour charger la navbar dans toutes les pages
(function() {
    // Fonction pour charger la navbar
    function loadNavbar() {
        // Vérifier si la navbar existe déjà
        const existingHeader = document.querySelector('header#main-header');
        if (existingHeader && existingHeader.querySelector('.navbar')) {
            // La navbar existe déjà, juste mettre à jour le lien actif
            updateActiveLink();
            initNavbar();
            return;
        }
        
        // Vérifier si le body existe
        if (!document.body) {
            // Si le body n'existe pas encore, réessayer plus tard
            setTimeout(loadNavbar, 100);
            return;
        }
        
        // Essayer de charger via fetch, sinon utiliser directement le HTML
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur HTTP: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                // Insérer la navbar au début du body
                const body = document.body;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                const navbar = tempDiv.querySelector('header');
                
                if (navbar) {
                    insertNavbarElement(navbar);
                } else {
                    // Si le fetch a réussi mais qu'il n'y a pas de navbar, utiliser la fonction de secours
                    insertNavbarDirectly();
                }
            })
            .catch(error => {
                console.log('Chargement via fetch échoué, utilisation du HTML direct:', error.message);
                // En cas d'erreur (CORS, fichier local, etc.), utiliser directement le HTML
                insertNavbarDirectly();
            });
    }
    
    // Fonction pour insérer l'élément navbar dans le DOM
    function insertNavbarElement(navbar) {
        const body = document.body;
        const existingHeader = document.querySelector('header#main-header');
        
        // Supprimer l'ancien header s'il existe
        if (existingHeader) {
            existingHeader.remove();
        }
        
        // Supprimer le commentaire si présent
        const comment = Array.from(body.childNodes).find(node => 
            node.nodeType === 8 && node.textContent && node.textContent.includes('Navbar chargée dynamiquement')
        );
        if (comment) {
            comment.remove();
        }
        
        // Insérer la navbar au début du body
        body.insertBefore(navbar, body.firstChild);
        
        // Mettre à jour le lien actif selon la page courante
        updateActiveLink();
        
        // Initialiser les fonctionnalités de la navbar
        initNavbar();
    }
    
    // Fonction de secours pour insérer directement la navbar
    function insertNavbarDirectly() {
        const navbarHTML = `
<header id="main-header">
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <div class="logo-wrapper">
                    <span class="logo-text">NM</span>
                    <div class="logo-glow"></div>
                </div>
                <h1 class="logo-name">Nour Menii</h1>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-home"></i></span>
                        <span class="nav-text">Accueil</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="parcours.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-graduation-cap"></i></span>
                        <span class="nav-text">Parcours</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="competences.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-code"></i></span>
                        <span class="nav-text">Compétences</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="experiences.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-briefcase"></i></span>
                        <span class="nav-text">Expériences</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="manifestations.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-calendar-alt"></i></span>
                        <span class="nav-text">Manifestations</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="projets.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-project-diagram"></i></span>
                        <span class="nav-text">Projets</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="passions.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-heart"></i></span>
                        <span class="nav-text">Passions</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="quizz.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-question-circle"></i></span>
                        <span class="nav-text">Quizz</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-envelope"></i></span>
                        <span class="nav-text">Contact</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="temoignage.html" class="nav-link">
                        <span class="nav-icon"><i class="fas fa-comments"></i></span>
                        <span class="nav-text">Témoignage</span>
                        <span class="nav-indicator"></span>
                    </a>
                </li>
            </ul>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="nav-backdrop"></div>
    </nav>
</header>`;
        
        const body = document.body;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = navbarHTML;
        const navbar = tempDiv.querySelector('header');
        
        if (navbar) {
            insertNavbarElement(navbar);
        }
    }
    
    // Fonction pour mettre à jour le lien actif
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Fonction pour initialiser les fonctionnalités de la navbar
    function initNavbar() {
        // Attendre un peu pour que le DOM soit complètement mis à jour
        setTimeout(() => {
            // Réinitialiser les fonctions du script.js
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const header = document.getElementById('main-header');
            const body = document.body;
            
            // Réinitialiser le menu hamburger
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
                });
                
                // Fermer le menu quand on clique sur un lien
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        body.style.overflow = '';
                    });
                });
            }
            
            // Réinitialiser la détection de la page active
            if (typeof setActiveNavLink === 'function') {
                setActiveNavLink();
            } else {
                updateActiveLink();
            }
            
            // Réinitialiser le scroll de la navbar
            if (typeof updateNavbarOnScroll === 'function') {
                updateNavbarOnScroll();
            }
        }, 100);
    }
    
    // Charger la navbar immédiatement et aussi quand le DOM est prêt
    function startLoading() {
        // Essayer de charger immédiatement
        loadNavbar();
        
        // Si le DOM n'est pas encore prêt, réessayer quand il le sera
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Réessayer après un court délai pour s'assurer que tout est chargé
                setTimeout(loadNavbar, 50);
            });
        }
    }
    
    // Démarrer le chargement
    startLoading();
    
    // Réessayer après un court délai pour s'assurer que la navbar est chargée
    setTimeout(() => {
        const header = document.querySelector('header#main-header');
        if (!header || !header.querySelector('.navbar')) {
            console.log('Navbar non trouvée, réessai...');
            loadNavbar();
        }
    }, 500);
})();

