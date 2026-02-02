// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    // Fecha o menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }
});
// ===== MODAL DE IMAGEM EM TELA CHEIA PARA RESULTADOS =====
window.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal-imagem');
  const imgModal = document.getElementById('imagem-modal-grande');
  const fechar = document.getElementById('fechar-modal-imagem');
  const setaEsquerda = document.getElementById('seta-esquerda-modal');
  const setaDireita = document.getElementById('seta-direita-modal');
  if (!modal || !imgModal || !fechar || !setaEsquerda || !setaDireita) return;


  // Coletar todas as imagens do grid de resultados e feedbacks
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
  const feedbackItems = Array.from(document.querySelectorAll('.feedback-card .feedback-img'));
  const imagensPortfolio = portfolioItems.map(item => {
    const img = item.querySelector('img');
    return img ? {src: img.src, alt: img.alt} : null;
  }).filter(Boolean);
  const imagensFeedback = feedbackItems.map(item => {
    const img = item.querySelector('img');
    return img ? {src: img.src, alt: img.alt} : null;
  }).filter(Boolean);
  const todasImagens = imagensPortfolio.concat(imagensFeedback);
  let imagemAtual = 0;

  function mostrarImagemModal(idx) {
    if (idx < 0) idx = todasImagens.length - 1;
    if (idx >= todasImagens.length) idx = 0;
    imagemAtual = idx;
    imgModal.src = todasImagens[imagemAtual].src;
    imgModal.alt = todasImagens[imagemAtual].alt;
  }

  // Clique nas imagens dos resultados
  portfolioItems.forEach((item, idx) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', function(e) {
      const img = this.querySelector('img');
      if (!img) return;
      imagemAtual = idx;
      mostrarImagemModal(imagemAtual);
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      setTimeout(()=>{modal.style.opacity='1';},10);
    });
  });
  // Clique nas imagens dos feedbacks
  feedbackItems.forEach((item, idx) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', function(e) {
      imagemAtual = imagensPortfolio.length + idx;
      mostrarImagemModal(imagemAtual);
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      setTimeout(()=>{modal.style.opacity='1';},10);
    });
  });

  function fecharModal() {
    modal.style.opacity = '0';
    setTimeout(()=>{
      modal.style.display='none';
      imgModal.src = '';
    },300);
  }
  fechar.addEventListener('click', fecharModal);
  // Fechar ao clicar fora da imagem
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      fecharModal();
    }
  });
  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      fecharModal();
    }
    // Navegação por teclado
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        mostrarImagemModal(imagemAtual - 1);
      } else if (e.key === 'ArrowRight') {
        mostrarImagemModal(imagemAtual + 1);
      }
    }
  });
  // Setas do modal
  setaEsquerda.addEventListener('click', function(e) {
    e.stopPropagation();
    mostrarImagemModal(imagemAtual - 1);
  });
  setaDireita.addEventListener('click', function(e) {
    e.stopPropagation();
    mostrarImagemModal(imagemAtual + 1);
  });
});
// ===== PRELOADER =====
window.addEventListener('load', function() {
  const loader = document.getElementById('preloader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTADOR ANIMADO DE ESTATÍSTICAS =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Observador para iniciar animação quando a seção estiver visível
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        animateCounter(number, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== ANIMAÇÃO DE SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.hero-content, .about-content, .process-card, .skill-card-modern, .portfolio-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  revealObserver.observe(element);
});

// (Formspree: handler agora está no HTML)

// ===== EFEITO DE PARALLAX SUAVE NO SCROLL =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 600);
  }
});

// ===== MODAL DE SENHA PARA ÁREA RESTRITA (LG) =====
document.addEventListener('DOMContentLoaded', function() {
  const cadeado = document.getElementById('cadeado-lg');
  if (cadeado) {
    cadeado.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);';
      modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#0a0a0a 80%,var(--primary) 100%);padding:50px 40px;border-radius:20px;box-shadow:0 10px 50px rgba(0,247,255,0.4);display:flex;flex-direction:column;align-items:center;min-width:350px;max-width:90vw;border:2px solid rgba(0,247,255,0.3);">
          <div style='font-size:2.5rem;color:var(--primary);margin-bottom:20px;display:flex;align-items:center;gap:12px;'><span style="font-size:3rem;">🔒</span> Área Restrita</div>
          <div style='color:var(--gray);font-size:1.1rem;margin-bottom:25px;text-align:center;'>Digite a senha para acessar</div>
          <input id='senha-lg' type='password' maxlength='8' placeholder='Senha' style='padding:15px 20px;font-size:1.2rem;border-radius:12px;border:2px solid var(--primary);outline:none;margin-bottom:20px;width:100%;text-align:center;background:#111;color:var(--primary);box-shadow:0 2px 15px rgba(0,247,255,0.2);'>
          <button id='btn-lg-acessar' style='padding:15px 40px;font-size:1.1rem;background:var(--primary);color:#000;border:none;border-radius:50px;font-weight:700;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:1px;'>Acessar</button>
          <div id='msg-lg-erro' style='color:#ff4b4b;font-size:1rem;margin-top:15px;display:none;font-weight:500;'>❌ Senha incorreta!</div>
        </div>
      `;
      document.body.appendChild(modal);
      const input = modal.querySelector('#senha-lg');
      const btn = modal.querySelector('#btn-lg-acessar');
      const erro = modal.querySelector('#msg-lg-erro');
      input.focus();
      
      function closeModal() { modal.remove(); }
      
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          btn.click();
        }
      });
      
      btn.onclick = function() {
        if (input.value === '5854') {
          sessionStorage.setItem('acesso_lg', 'ok');
          closeModal();
          window.open('html/lg.html', '_blank');
        } else {
          erro.style.display = 'block';
          input.value = '';
          input.focus();
          input.style.borderColor = '#ff4b4b';
          setTimeout(() => {
            input.style.borderColor = 'var(--primary)';
            erro.style.display = 'none';
          }, 2000);
        }
      };
      
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.5)';
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
      
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', esc);
        }
      });
    });
    
    // Efeito hover no cadeado
    cadeado.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
      this.style.boxShadow = '0 6px 30px rgba(255, 255, 255, 0.5)';
    });
    
    cadeado.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0)';
      this.style.boxShadow = '0 4px 24px rgba(255, 255, 255, 0.3)';
    });
  }
});

// ===== EFEITO DE DIGITAÇÃO NO MENU MOBILE =====
const menubar = document.getElementById('menubar');
if (menubar) {
  menubar.addEventListener('change', function() {
    const menu = document.querySelector('.menu');
    if (this.checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', () => {
    const menubar = document.getElementById('menubar');
    if (menubar.checked) {
      menubar.checked = false;
      document.body.style.overflow = 'auto';
    }
  });
});

// ===== SCROLL HEADER EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.5)';
  }
  
  lastScroll = currentScroll;
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg ativado!
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', function() {
  const faqCards = document.querySelectorAll('[data-faq]');
  
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Fecha todos os outros cards
      faqCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
        }
      });
      
      // Toggle do card clicado
      card.classList.toggle('active');
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

console.log('%c🚀 Site desenvolvido por Luan Gs', 'color: #ffffff; font-size: 20px; font-weight: bold;');
console.log('%c💡 Quer um site assim? Entre em contato!', 'color: #a0a0a0; font-size: 14px;');
