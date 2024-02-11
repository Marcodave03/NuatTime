window.addEventListener('load', () => {
    const loader = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Hide the loading screen
    loader.style.display = 'none';
    
    // Show the main content
    mainContent.style.display = 'block';
  });
  