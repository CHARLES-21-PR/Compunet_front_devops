import React, { useEffect } from 'react'

function ChatSupport() {
  useEffect(() => {
    // Inicializar Tawk API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Crear y agregar el script
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a41c6dc2f988a1d47d85000/1js8f1k5c';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return <></>
}

export default ChatSupport