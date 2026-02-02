// Carrossel simples para feedbacks
const feedbackImages = [
  'img/F_1.PNG', 'img/F_2.PNG', 'img/F_3.jpeg', 'img/F_4.PNG', 'img/F_5.PNG',
  'img/F_6.PNG', 'img/F_7.PNG', 'img/F_8.PNG', 'img/F_9.PNG', 'img/F_10.jpeg',
  'img/F_11.PNG', 'img/F_12.PNG', 'img/F_13.PNG', 'img/F_14.PNG'
];

let autoInterval = null;

let currentIndex = 0;

function showFeedback(index) {
  const img = document.getElementById('carousel-feedback-img');
  img.src = feedbackImages[index];
  img.alt = `Feedback real ${index + 1}`;
}

function nextFeedback() {
  currentIndex = (currentIndex + 1) % feedbackImages.length;
  showFeedback(currentIndex);
}

function prevFeedback() {
  currentIndex = (currentIndex - 1 + feedbackImages.length) % feedbackImages.length;
  showFeedback(currentIndex);
}

function startAutoCarousel() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = setInterval(nextFeedback, 3500); // Troca a cada 3,5s
}

document.addEventListener('DOMContentLoaded', function() {
  showFeedback(currentIndex);
  document.getElementById('carousel-feedback-next').addEventListener('click', function() {
    nextFeedback();
    startAutoCarousel();
  });
  document.getElementById('carousel-feedback-prev').addEventListener('click', function() {
    prevFeedback();
    startAutoCarousel();
  });
  startAutoCarousel();

  // Expansão da imagem em modal
  const feedbackImg = document.getElementById('carousel-feedback-img');
  const modal = document.getElementById('feedback-modal');
  const modalImg = document.getElementById('feedback-modal-img');
  const modalClose = document.getElementById('feedback-modal-close');

  feedbackImg.addEventListener('click', function() {
    modalImg.src = feedbackImages[currentIndex];
    modal.style.display = 'flex';
  });
  modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
