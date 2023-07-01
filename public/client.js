document.getElementById('color-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const hexInput = document.getElementById('hex-input');
    const tokenName = document.getElementById('token-name');
    
    const response = await fetch(`/convert/${hexInput.value.replace('#', '')}`);
    const color = await response.json();
    
    const response2 = await fetch(`/match/${color.lightness}/${color.chroma}/${color.hue}/${color.contrast_ratio}`);
    const token = await response2.json();
    
    tokenName.textContent = token.name;
  });
  