// Navigation mobile améliorée
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.getElementById('main-header');
const body = document.body;

// Gestion du menu hamburger
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

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Animation de la navbar au scroll
let lastScroll = 0;
let ticking = false;

function updateNavbarOnScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            if (header.querySelector('.navbar')) {
                header.querySelector('.navbar').style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }
        } else {
            header.classList.remove('scrolled');
            if (header.querySelector('.navbar')) {
                header.querySelector('.navbar').style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        }
    }
    
    lastScroll = currentScroll;
    ticking = false;
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
    setActiveNavLink();
    updateNavbarOnScroll();
});

// Quizz - Réponses correctes
const correctAnswers = {
    q1: 'a', // HyperText Markup Language
    q2: 'b', // <a>
    q3: 'b', // Cascading Style Sheets
    q4: 'c', // style
    q5: 'a', // getElementById()
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
    q1: { question: "Question 1 : Que signifie HTML ?", correct: "HyperText Markup Language" },
    q2: { question: "Question 2 : Quelle balise HTML est utilisée pour créer un lien ?", correct: "&lt;a&gt;" },
    q3: { question: "Question 3 : Que signifie CSS ?", correct: "Cascading Style Sheets" },
    q4: { question: "Question 4 : Quel attribut HTML est utilisé pour définir un style inline ?", correct: "style" },
    q5: { question: "Question 5 : Quelle méthode JavaScript est utilisée pour sélectionner un élément par son ID ?", correct: "getElementById()" },
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

if (quizzForm) {
    quizzForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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

        // Afficher les résultats
        document.getElementById('score').textContent = score;
        document.getElementById('percentage').textContent = quizResults.percentage;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('incorrect-count').textContent = incorrectCount;
        document.getElementById('unanswered-count').textContent = unansweredCount;
        
        // Afficher la liste détaillée des réponses
        const correctAnswersListElement = document.getElementById('correct-answers-list');
        correctAnswersListElement.innerHTML = '';
        
        detailedResults.forEach((result, index) => {
            const li = document.createElement('li');
            let statusIcon = '';
            let statusClass = '';
            
            if (result.isCorrect) {
                statusIcon = '<i class="fas fa-check-circle" style="color: #4caf50;"></i>';
                statusClass = 'answer-correct';
            } else if (result.wasAnswered) {
                statusIcon = '<i class="fas fa-times-circle" style="color: #f44336;"></i>';
                statusClass = 'answer-incorrect';
            } else {
                statusIcon = '<i class="fas fa-question-circle" style="color: #ff9800;"></i>';
                statusClass = 'answer-unanswered';
            }
            
            li.className = statusClass;
            li.innerHTML = `
                ${statusIcon}
                <strong>${result.question}</strong><br>
                <span class="answer-detail">Réponse correcte : ${result.correctAnswer}</span>
                ${result.wasAnswered && !result.isCorrect ? `<br><span class="user-answer">Votre réponse : ${getAnswerText(result.question, result.userAnswer)}</span>` : ''}
                ${!result.wasAnswered ? '<br><span class="unanswered-note">Non répondue</span>' : ''}
            `;
            correctAnswersListElement.appendChild(li);
        });

        // Afficher la section des résultats
        resultsDiv.classList.remove('hidden');
        
        // Scroll vers les résultats
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
    if (quizzForm) {
        quizzForm.reset();
    }
    if (resultsDiv) {
        resultsDiv.classList.add('hidden');
    }
    // Réinitialiser les résultats stockés
    quizResults = null;
    // Scroll vers le haut du formulaire
    if (quizzForm) {
        quizzForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value;
        
        // Construire le corps de l'email
        const emailBody = `Nom: ${nom}\nEmail: ${email}\nSujet: ${sujet}\n\nMessage:\n${message}`;
        
        // Créer le lien mailto
        const mailtoLink = `mailto:contact@monportfolio.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(emailBody)}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;
        
        // Afficher un message de confirmation
        alert('Votre message va être envoyé. Merci de votre contact !');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
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
});

