function show() {
    tooltip.setAttribute('data-show', '');
  
    // We need to tell Popper to update the tooltip position
    // after we show the tooltip, otherwise it will be incorrect
    
  }
  
  function hide() {
    tooltip.removeAttribute('data-show');
  }
  
  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];
  
  showEvents.forEach(event => {
    button.addEventListener(event, show);
  });
  
  hideEvents.forEach(event => {
    button.addEventListener(event, hide);
  });