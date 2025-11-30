// Navigation mobile améliorée
let hamburger, navMenu, header, body;

// Initialiser les éléments de la navbar
function initNavbarElements() {
    hamburger = document.getElementById('hamburger');
    navMenu = document.querySelector('.nav-menu');
    header = document.getElementById('main-header');
    body = document.body;
}

// Gestion du menu hamburger (compatible Bootstrap)
function initHamburgerMenu() {
    initNavbarElements();
    if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        // Utiliser Bootstrap collapse si disponible
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (!bsCollapse) {
                new bootstrap.Collapse(navbarCollapse, {toggle: true});
            }
        }
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
    }
}

// Initialiser le menu hamburger au chargement
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
});

// Animation de la navbar au scroll
let lastScroll = 0;
let ticking = false;
let navItemsAnimated = false; // Pour index.html uniquement

function updateNavbarOnScroll() {
    if (!header) {
        initNavbarElements();
    }
    
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const isIndexPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    if (header) {
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            if (header.querySelector('.navbar')) {
                header.querySelector('.navbar').style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }
            
            // Animation spéciale pour index.html : afficher les éléments du menu un par un
            if (isIndexPage && !navItemsAnimated) {
                animateNavItems();
                navItemsAnimated = true;
            }
        } else {
            header.classList.remove('scrolled');
            if (header.querySelector('.navbar')) {
                header.querySelector('.navbar').style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
            
            // Réinitialiser l'animation si on remonte en haut
            if (isIndexPage && navItemsAnimated) {
                resetNavItemsAnimation();
                navItemsAnimated = false;
            }
        }
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

// Fonction pour animer les éléments du menu un par un
function animateNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    if (!navItems.length) return;
    
    navItems.forEach((item, index) => {
        // Réinitialiser l'état - commencer invisible et décalé
        item.style.opacity = '0';
        item.style.transform = 'translateY(-30px) scale(0.9)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Animer avec délai progressif pour un effet cascade
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100); // 100ms entre chaque élément pour un effet plus visible
    });
}

// Fonction pour réinitialiser l'animation
function resetNavItemsAnimation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
        item.style.transition = '';
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbarOnScroll);
        ticking = true;
    }
});

// Détecter la page active et mettre à jour le lien actif
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    initNavbarElements();
    setActiveNavLink();
    updateNavbarOnScroll();
});

// Quizz - Réponses correctes (questions plus difficiles)
const correctAnswers = {
    q1: 'a', // display: none vs visibility: hidden
    q2: 'a', // Object.assign ou spread operator
    q3: 'b', // Spécificité CSS
    q4: 'a', // let, const, var
    q5: 'a', // Closure
    q6: 'a', // <table>
    q7: 'c', // color
    q8: 'a', // *
    q9: 'a', // <form>
    q10: 'a', // border-spacing
    q11: 'a', // push()
    q12: 'a', // <ul>
    q13: 'b', // visibility: hidden
    q14: 'b', // <header>
    q15: 'c'  // margin: 0 auto
};

// Questions et réponses pour l'affichage
const questionsData = {
    q1: { question: "Question 1 : Quelle est la différence entre display: none et visibility: hidden en CSS ?", correct: "display: none supprime l'élément du flux, visibility: hidden le cache mais garde l'espace" },
    q2: { question: "Question 2 : Quelle méthode JavaScript permet de créer une copie superficielle (shallow copy) d'un objet ?", correct: "Object.assign({}, obj) ou {...obj}" },
    q3: { question: "Question 3 : Quelle est la spécificité CSS de ce sélecteur : #header .nav li.active ?", correct: "0-1-1-2 (1 ID, 1 classe, 2 éléments)" },
    q4: { question: "Question 4 : Quelle est la différence entre let, const et var en JavaScript ?", correct: "let et const sont block-scoped, var est function-scoped. const est immuable, let et var sont mutables" },
    q5: { question: "Question 5 : Qu'est-ce qu'une closure en JavaScript ?", correct: "Une fonction qui a accès aux variables de sa portée externe même après que la fonction externe soit retournée" },
    q6: { question: "Question 6 : Quelle balise HTML est utilisée pour créer un tableau ?", correct: "&lt;table&gt;" },
    q7: { question: "Question 7 : Quelle propriété CSS est utilisée pour changer la couleur du texte ?", correct: "color" },
    q8: { question: "Question 8 : Quel est le sélecteur CSS pour cibler tous les éléments ?", correct: "*" },
    q9: { question: "Question 9 : Quelle balise HTML est utilisée pour créer un formulaire ?", correct: "&lt;form&gt;" },
    q10: { question: "Question 10 : Quelle propriété CSS est utilisée pour définir l'espacement entre les bordures d'un tableau ?", correct: "border-spacing" },
    q11: { question: "Question 11 : Quelle méthode JavaScript est utilisée pour ajouter un élément à la fin d'un tableau ?", correct: "push()" },
    q12: { question: "Question 12 : Quelle balise HTML est utilisée pour créer une liste non ordonnée ?", correct: "&lt;ul&gt;" },
    q13: { question: "Question 13 : Quelle propriété CSS est utilisée pour rendre un élément invisible mais garder son espace ?", correct: "visibility: hidden" },
    q14: { question: "Question 14 : Quelle balise HTML5 est utilisée pour définir un en-tête de section ?", correct: "&lt;header&gt;" },
    q15: { question: "Question 15 : Quelle propriété CSS est utilisée pour centrer un élément horizontalement ?", correct: "margin: 0 auto" }
};

// Gestion du formulaire de quizz
const quizzForm = document.getElementById('quizz-form');
const resultsDiv = document.getElementById('results');

// Stocker les résultats pour l'envoi par email
let quizResults = null;

// Timer de 5 minutes (300 secondes)
let timeLeft = 300; // 5 minutes en secondes
let timerInterval = null;
let isQuizSubmitted = false;

// Fonction pour démarrer le timer
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const timerDiv = document.getElementById('quiz-timer');
    
    if (!timerDisplay || !timerDiv) return;
    
    // Réinitialiser le temps
    timeLeft = 300;
    isQuizSubmitted = false;
    
    // Masquer le timer si le quiz est déjà soumis
    if (resultsDiv && !resultsDiv.classList.contains('hidden')) {
        timerDiv.style.display = 'none';
        return;
    }
    
    timerDiv.style.display = 'block';
    
    // Nettoyer l'intervalle précédent s'il existe
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Mettre à jour l'affichage initial
    updateTimerDisplay();
    updateStepsRemaining();
    
    // Démarrer le compte à rebours
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        // Si le temps est écoulé, soumettre automatiquement
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            // Soumettre automatiquement le quiz
            if (quizzForm && !isQuizSubmitted) {
                isQuizSubmitted = true;
                // Vérifier d'abord si toutes les questions sont répondues
                if (checkAllQuestionsAnswered()) {
                    quizzForm.dispatchEvent(new Event('submit'));
                } else {
                    // Forcer la soumission même si toutes les questions ne sont pas répondues
                    forceSubmitQuiz();
                }
            }
        }
    }, 1000);
}

// Fonction pour mettre à jour l'affichage du timer
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    const timerDiv = document.getElementById('quiz-timer');
    
    if (!timerDisplay || !timerDiv) return;
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerDisplay.textContent = formattedTime;
    
    // Changer la couleur quand il reste moins d'une minute
    if (timeLeft <= 60) {
        timerDiv.classList.add('timer-warning');
        if (timeLeft <= 30) {
            timerDiv.classList.add('timer-danger');
        }
    } else {
        timerDiv.classList.remove('timer-warning', 'timer-danger');
    }
}

// Fonction pour mettre à jour l'affichage des étapes restantes
function updateStepsRemaining() {
    const stepsDisplay = document.getElementById('steps-display');
    if (!stepsDisplay || !quizzForm) return;
    
    const totalQuestions = Object.keys(correctAnswers).length;
    let answeredCount = 0;
    
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedAnswer = quizzForm.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedAnswer) {
            answeredCount++;
        }
    });
    
    const remaining = totalQuestions - answeredCount;
    stepsDisplay.textContent = remaining;
    
    // Changer la couleur si peu d'étapes restantes
    if (remaining <= 3) {
        stepsDisplay.style.color = '#ff9800';
    } else if (remaining === 0) {
        stepsDisplay.style.color = '#4caf50';
    } else {
        stepsDisplay.style.color = '#2196f3';
    }
}

// Fonction pour vérifier si toutes les questions sont répondues
function checkAllQuestionsAnswered() {
    if (!quizzForm) return false;
    
    const totalQuestions = Object.keys(correctAnswers).length;
    let answeredCount = 0;
    
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedAnswer = quizzForm.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedAnswer) {
            answeredCount++;
        }
    });
    
    return answeredCount === totalQuestions;
}

// Fonction pour forcer la soumission (quand le temps est écoulé)
function forceSubmitQuiz() {
    if (!quizzForm) return;
    
    // Marquer toutes les questions non répondues comme non répondues
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedAnswer = quizzForm.querySelector(`input[name="${questionId}"]:checked`);
        if (!selectedAnswer) {
            // Créer une réponse vide pour les questions non répondues
            const questionBlock = quizzForm.querySelector(`input[name="${questionId}"]`).closest('.question-block');
            if (questionBlock) {
                // Marquer visuellement comme non répondu
                questionBlock.style.border = '2px solid #ff9800';
            }
        }
    });
    
    // Soumettre le formulaire
    processQuizSubmission();
}

if (quizzForm) {
    quizzForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Vérifier si toutes les questions sont répondues
        if (!checkAllQuestionsAnswered()) {
            // Afficher le message d'erreur
            const errorMessage = document.getElementById('quiz-error-message');
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
                // Masquer après 5 secondes
                setTimeout(() => {
                    errorMessage.classList.add('hidden');
                }, 5000);
            }
            
            // Scroll vers le message d'erreur
            if (errorMessage) {
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return; // Empêcher la soumission
        }
        
        // Masquer le message d'erreur si toutes les questions sont répondues
        const errorMessage = document.getElementById('quiz-error-message');
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
        
        // Arrêter le timer
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        isQuizSubmitted = true;
        
        // Masquer le timer
        const timerDiv = document.getElementById('quiz-timer');
        if (timerDiv) {
            timerDiv.style.display = 'none';
        }
        
        // Traiter la soumission
        processQuizSubmission();
    });
}

// Fonction pour traiter la soumission du quiz
function processQuizSubmission() {
    if (!quizzForm) return;
    
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const userAnswers = {};
    const detailedResults = [];

    // Calculer le score et les statistiques
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedAnswer = quizzForm.querySelector(`input[name="${questionId}"]:checked`);
        const questionData = questionsData[questionId];
        let isCorrect = false;
        let userAnswer = null;
        
        if (selectedAnswer) {
            userAnswer = selectedAnswer.value;
            userAnswers[questionId] = userAnswer;
            if (userAnswer === correctAnswers[questionId]) {
                score++;
                correctCount++;
                isCorrect = true;
            } else {
                incorrectCount++;
            }
        } else {
            unansweredCount++;
        }
        
        // Stocker les détails pour l'affichage
        detailedResults.push({
            question: questionData.question,
            correctAnswer: questionData.correct,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            wasAnswered: selectedAnswer !== null
        });
    });

    // Stocker les résultats pour l'envoi par email
    quizResults = {
        score: score,
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        incorrectCount: incorrectCount,
        unansweredCount: unansweredCount,
        percentage: Math.round((score / totalQuestions) * 100),
        detailedResults: detailedResults
    };

    // Afficher le score en haut
    const scoreTopDiv = document.getElementById('quiz-score-top');
    const scoreTopValue = document.getElementById('score-top-value');
    if (scoreTopDiv && scoreTopValue) {
        scoreTopValue.textContent = score;
        scoreTopDiv.classList.remove('hidden');
        // Scroll vers le haut pour voir le score
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Afficher les résultats dans la section résultats (pour compatibilité)
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.textContent = score;
    const percentageElement = document.getElementById('percentage');
    if (percentageElement) percentageElement.textContent = quizResults.percentage;
    const correctCountElement = document.getElementById('correct-count');
    if (correctCountElement) correctCountElement.textContent = correctCount;
    const incorrectCountElement = document.getElementById('incorrect-count');
    if (incorrectCountElement) incorrectCountElement.textContent = incorrectCount;
    const unansweredCountElement = document.getElementById('unanswered-count');
    if (unansweredCountElement) unansweredCountElement.textContent = unansweredCount;
    
    // Colorier les réponses directement dans le formulaire
    Object.keys(correctAnswers).forEach((questionId, index) => {
        const questionBlock = quizzForm.querySelectorAll('.question-block')[index];
        if (!questionBlock) return;
        
        const correctAnswer = correctAnswers[questionId];
        const userSelected = quizzForm.querySelector(`input[name="${questionId}"]:checked`);
        const allLabels = questionBlock.querySelectorAll('label');
        
        allLabels.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (!input) return;
            
            // Réinitialiser les styles
            label.classList.remove('answer-correct', 'answer-incorrect', 'answer-not-selected');
            label.style.backgroundColor = '';
            label.style.borderColor = '';
            label.style.color = '';
            
            // Si c'est la bonne réponse, toujours la mettre en vert
            if (input.value === correctAnswer) {
                label.classList.add('answer-correct');
                label.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                label.style.borderColor = '#4caf50';
                label.style.color = '#4caf50';
                
                // Ajouter une icône de validation
                let checkIcon = label.querySelector('.answer-check-icon');
                if (!checkIcon) {
                    checkIcon = document.createElement('i');
                    checkIcon.className = 'fas fa-check-circle answer-check-icon';
                    checkIcon.style.marginLeft = '10px';
                    checkIcon.style.color = '#4caf50';
                    label.appendChild(checkIcon);
                }
            }
            
            // Si c'est la réponse de l'utilisateur
            if (userSelected && input === userSelected) {
                if (input.value === correctAnswer) {
                    // Réponse correcte - déjà en vert
                } else {
                    // Réponse incorrecte - mettre en rouge
                    label.classList.add('answer-incorrect');
                    label.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                    label.style.borderColor = '#f44336';
                    label.style.color = '#f44336';
                    
                    // Ajouter une icône d'erreur
                    let errorIcon = label.querySelector('.answer-error-icon');
                    if (!errorIcon) {
                        errorIcon = document.createElement('i');
                        errorIcon.className = 'fas fa-times-circle answer-error-icon';
                        errorIcon.style.marginLeft = '10px';
                        errorIcon.style.color = '#f44336';
                        label.appendChild(errorIcon);
                    }
                }
            }
            
            // Désactiver tous les inputs après soumission
            input.disabled = true;
        });
    });
    
    // Afficher la section des résultats (pour compatibilité)
    if (resultsDiv) {
        resultsDiv.classList.remove('hidden');
    }
}

// Fonction pour obtenir le texte de la réponse à partir de la valeur
function getAnswerText(questionText, answerValue) {
    // Trouver la question correspondante dans le formulaire
    const form = document.getElementById('quizz-form');
    if (!form) return answerValue;
    
    const questionNumber = questionText.match(/Question (\d+)/);
    if (questionNumber) {
        const qNum = questionNumber[1];
        const answerInput = form.querySelector(`input[name="q${qNum}"][value="${answerValue}"]`);
        if (answerInput) {
            // Trouver le label parent
            const label = answerInput.closest('label');
            if (label) {
                // Récupérer tout le texte du label et enlever l'espace initial
                const labelText = label.textContent.trim();
                // Le texte commence après l'input, donc on prend tout le texte du label
                return labelText;
            }
        }
    }
    return answerValue;
}

// Fonction pour envoyer les résultats par email
function sendResultsByEmail() {
    if (!quizResults) {
        alert('Aucun résultat à envoyer. Veuillez d\'abord compléter le quiz.');
        return;
    }
    
    // Construire le corps de l'email avec les résultats
    let emailBody = `Résultats du Quiz sur le Développement Web\n\n`;
    emailBody += `Score : ${quizResults.score} / ${quizResults.totalQuestions}\n`;
    emailBody += `Pourcentage : ${quizResults.percentage}%\n\n`;
    emailBody += `Statistiques :\n`;
    emailBody += `- Réponses correctes : ${quizResults.correctCount}\n`;
    emailBody += `- Réponses fausses : ${quizResults.incorrectCount}\n`;
    emailBody += `- Non répondues : ${quizResults.unansweredCount}\n\n`;
    emailBody += `Détail des réponses :\n\n`;
    
    quizResults.detailedResults.forEach((result, index) => {
        emailBody += `${result.question}\n`;
        if (result.isCorrect) {
            emailBody += `✓ Correcte : ${result.correctAnswer}\n`;
        } else if (result.wasAnswered) {
            emailBody += `✗ Fausse\n`;
            emailBody += `  Votre réponse : ${getAnswerText(result.question, result.userAnswer)}\n`;
            emailBody += `  Réponse correcte : ${result.correctAnswer}\n`;
        } else {
            emailBody += `? Non répondue\n`;
            emailBody += `  Réponse correcte : ${result.correctAnswer}\n`;
        }
        emailBody += `\n`;
    });
    
    // Créer le lien mailto
    const subject = encodeURIComponent('Résultats du Quiz - Développement Web');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
}

// Fonction pour réinitialiser le quizz
function resetQuizz() {
    // Arrêter le timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    isQuizSubmitted = false;
    
    // Réinitialiser et redémarrer le timer
    startTimer();
    updateStepsRemaining();
    
    if (quizzForm) {
        quizzForm.reset();
        
        // Réinitialiser les styles des labels
        const allLabels = quizzForm.querySelectorAll('label');
        allLabels.forEach(label => {
            label.classList.remove('answer-correct', 'answer-incorrect', 'answer-not-selected');
            label.style.backgroundColor = '';
            label.style.borderColor = '';
            label.style.color = '';
            
            // Réactiver les inputs
            const input = label.querySelector('input[type="radio"]');
            if (input) {
                input.disabled = false;
            }
            
            // Supprimer les icônes
            const checkIcon = label.querySelector('.answer-check-icon');
            if (checkIcon) checkIcon.remove();
            const errorIcon = label.querySelector('.answer-error-icon');
            if (errorIcon) errorIcon.remove();
        });
        
        // Réinitialiser les styles des question-blocks
        const questionBlocks = quizzForm.querySelectorAll('.question-block');
        questionBlocks.forEach(block => {
            block.style.border = '';
        });
    }
    
    // Masquer le score en haut
    const scoreTopDiv = document.getElementById('quiz-score-top');
    if (scoreTopDiv) {
        scoreTopDiv.classList.add('hidden');
    }
    
    // Masquer le message d'erreur
    const errorMessage = document.getElementById('quiz-error-message');
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
    
    if (resultsDiv) {
        resultsDiv.classList.add('hidden');
    }
    
    // Réinitialiser les résultats stockés
    quizResults = null;
    
    // Scroll vers le haut du formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Démarrer le timer au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    if (quizzForm) {
        startTimer();
        
        // Ajouter des écouteurs d'événements à tous les inputs radio pour mettre à jour les étapes restantes
        const radioInputs = quizzForm.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.addEventListener('change', () => {
                updateStepsRemaining();
            });
        });
        
        // Initialiser l'affichage des étapes restantes
        updateStepsRemaining();
    }
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

// Initialiser EmailJS
if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
        const sujet = document.getElementById('sujet') ? document.getElementById('sujet').value : '';
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!nom || !email || !phone || !message) {
            showFormError('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormError('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Validation téléphone (format: +216 suivi de 8 chiffres)
        let cleanPhone = phone;
        if (phone) {
            // Nettoyer le numéro (enlever les espaces)
            cleanPhone = phone.replace(/\s/g, '');
            const phoneRegex = /^\+216\d{8}$/;
            if (!phoneRegex.test(cleanPhone)) {
                showFormError('Le numéro de téléphone doit être au format +216 suivi de 8 chiffres (ex: +21612345678).');
                return;
            }
            // Mettre à jour avec le format nettoyé
            document.getElementById('phone').value = cleanPhone;
        }
        
        // Afficher le loader
        const submitButton = contactForm.querySelector('.btn-submit-extraordinary');
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        }
        
        // Construire le corps de l'email
        let emailBody = `Bonjour,\n\n`;
        emailBody += `Vous avez reçu un nouveau message depuis votre portfolio :\n\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        emailBody += `Nom : ${nom}\n`;
        emailBody += `Email : ${email}\n`;
        if (cleanPhone) {
            emailBody += `Téléphone : ${cleanPhone}\n`;
        }
        if (sujet) {
            emailBody += `Intérêt : ${sujet}\n`;
        }
        emailBody += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        emailBody += `Message :\n${message}\n\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        
        // Créer le sujet de l'email
        const subject = sujet ? `Contact Portfolio - ${sujet}` : `Contact Portfolio - Message de ${nom}`;
        
        // Vérifier si EmailJS est disponible et configuré
        if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && 
            EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
            EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
            // Paramètres pour EmailJS
            const templateParams = {
                from_name: nom,
                from_email: email,
                phone: cleanPhone || 'Non fourni',
                subject: subject,
                message: message,
                to_email: EMAILJS_CONFIG.TO_EMAIL
            };
            
            // Envoyer l'email via EmailJS
            emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
                .then((response) => {
                    console.log('Email envoyé avec succès!', response.status, response.text);
                    
                    // Afficher le message de succès
                    showFormSuccess();
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Retirer le loader
                    if (submitButton) {
                        submitButton.classList.remove('loading');
                        submitButton.disabled = false;
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'envoi de l\'email:', error);
                    showFormError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
                    
                    // Retirer le loader
                    if (submitButton) {
                        submitButton.classList.remove('loading');
                        submitButton.disabled = false;
                    }
                });
        } else {
            // Fallback vers mailto si EmailJS n'est pas configuré
            const mailtoLink = `mailto:nourmenii0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Ouvrir le client email après un court délai pour l'animation
            setTimeout(() => {
                window.location.href = mailtoLink;
                
                // Afficher le message de succès
                showFormSuccess();
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Retirer le loader
                if (submitButton) {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }
            }, 500);
        }
    });
    
    // Formatage automatique du téléphone pendant la saisie
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            
            // Si l'utilisateur commence par 216, ajouter automatiquement le +
            if (value.startsWith('216') && !value.startsWith('+216')) {
                value = '+' + value;
            }
            
            // Limiter à +216 suivi de 8 chiffres maximum
            if (value.startsWith('+216')) {
                const digits = value.substring(4);
                if (digits.length > 8) {
                    value = '+216' + digits.substring(0, 8);
                }
            } else if (value.length > 0 && !value.startsWith('+')) {
                // Si l'utilisateur tape sans le +, limiter à 13 caractères
                if (value.length > 13) {
                    value = value.substring(0, 13);
                }
            }
            
            e.target.value = value;
        });
        
        // Ajouter un espace après +216 pour la lisibilité (optionnel)
        phoneInput.addEventListener('blur', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            if (value.startsWith('+216') && value.length > 4) {
                // Formater avec un espace: +216 12345678
                const digits = value.substring(4);
                if (digits.length === 8) {
                    e.target.value = '+216 ' + digits;
                }
            }
        });
        
        // Enlever l'espace au focus pour faciliter l'édition
        phoneInput.addEventListener('focus', (e) => {
            e.target.value = e.target.value.replace(/\s/g, '');
        });
    }
}

// Fonction pour afficher le message de succès
function showFormSuccess() {
    const successMessage = document.getElementById('form-success-message');
    
    if (successMessage) {
        // Scroll vers le haut de la page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Afficher le message de succès en haut
        successMessage.style.display = 'block';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
            successMessage.style.transition = 'all 0.5s ease';
        }, 100);
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }
}

// Fonction pour afficher les erreurs
function showFormError(message) {
    // Créer ou récupérer l'élément d'erreur
    let errorElement = document.getElementById('form-error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'form-error-message';
        errorElement.className = 'form-error-message';
        const formSection = document.querySelector('.contact-form-section');
        if (formSection) {
            formSection.insertBefore(errorElement, contactForm);
        }
    }
    
    errorElement.innerHTML = `
        <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <p>${message}</p>
    `;
    
    errorElement.style.display = 'block';
    errorElement.style.opacity = '0';
    errorElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
        errorElement.style.transition = 'all 0.3s ease';
    }, 10);
    
    // Masquer l'erreur après 5 secondes
    setTimeout(() => {
        errorElement.style.opacity = '0';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 300);
    }, 5000);
}

// Animation des statistiques
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animer les compteurs de statistiques
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
            
            // Animer les barres de progression
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observer les éléments à animer (témoignage)
const temoignageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animer les compteurs de statistiques IIT
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
            
            // Animer les barres de progression de rating
            const ratingFills = entry.target.querySelectorAll('.rating-fill');
            ratingFills.forEach(bar => {
                const width = bar.style.width;
                if (width && !bar.classList.contains('animated')) {
                    bar.style.width = '0';
                    bar.classList.add('animated');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Observer tous les éléments animate-on-scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    temoignageObserver.observe(el);
});

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.diplome, .experience, .manifestation, .projet-card, .passion-card, .sport-card, .qualite-item, .competence-item, .bio-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Animer les statistiques si elles sont visibles au chargement
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observer les éléments de témoignage avec animations
    const temoignageElements = document.querySelectorAll('.animate-on-scroll');
    temoignageElements.forEach(el => {
        temoignageObserver.observe(el);
    });
    
    // Observer les cartes de statistiques IIT
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        temoignageObserver.observe(card);
    });
    
    // Smooth scroll pour le scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Gestion du clic sur les cartes de la section "Mes Passions Personnelles"
    const passionsPersonnellesSection = document.querySelector('.passions-personnelles');
    if (passionsPersonnellesSection) {
        const passionCards = passionsPersonnellesSection.querySelectorAll('.passion-card');
        passionCards.forEach(card => {
            card.addEventListener('click', function() {
                // Toggle la classe 'clicked' pour changer la couleur de l'icône en rouge
                this.classList.toggle('clicked');
            });
        });
    }
});

