
export default function router(){
   const sections = document.querySelectorAll('section');

  // Función para mostrar la página correcta según hash
  function showPage(pageId) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === pageId);
    });
  }

  // Manejo del hash en la URL
  window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '') || 'startPage';
    showPage(hash);
  });

  // Render inicial
  showPage(location.hash.replace('#', '') || 'startPage');
}


