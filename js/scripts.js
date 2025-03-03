document.addEventListener('DOMContentLoaded', function() {
  // Sélection des éléments
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const sections = document.querySelectorAll('section, .card');

  // Gestion du scroll pour la navbar
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
          backToTop.style.display = 'block';
      } else {
          navbar.classList.remove('scrolled');
          backToTop.style.display = 'none';
      }

      // Animation des sections au scroll
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (sectionTop < windowHeight * 0.8) {
              section.classList.add('fade-in', 'visible');
          }
      });
  });

  // Gestion du clic pour le retour en haut
  backToTop.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Initialisation : ajout de la classe fade-in à toutes les sections
  sections.forEach(section => {
      section.classList.add('fade-in');
  });
});


document.addEventListener('DOMContentLoaded', function() {
    // 1. Animation de reveal pour les sections
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card');

    function checkScroll() {
        const triggerPoint = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerPoint) {
                section.classList.add('reveal', 'visible');
            }
        });

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerPoint) {
                card.classList.add('visible');
            }
        });
    }

    // Initialisation
    sections.forEach(section => section.classList.add('reveal'));
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // 2. Animation de particules
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.life = Math.random() * 100 + 50;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(40, 167, 69, ${this.life / 100})`; // Vert assorti à votre thème
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Création des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            
            if (particle.life <= 0) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Ajustement du canvas au redimensionnement
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animateParticles();
});