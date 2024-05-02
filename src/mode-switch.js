document.querySelector('.mode-btn').addEventListener('click', () => {
  const links = document.querySelectorAll('link');

  links.forEach((link) => {
    if(link.type === 'text/css'){
      if(link.outerHTML === '<link rel="stylesheet" type="text/css" href="./styles/dark-mode.css">'){
        link.outerHTML = '<link rel="stylesheet" type="text/css" href="./styles/main.css">'
      } else{
        link.outerHTML = '<link rel="stylesheet" type="text/css" href="./styles/dark-mode.css">'
      }
    }
  })

  const darkBg = document.querySelector('.background-image-dark');
  const lightBg = document.querySelector('.background-image-light');
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');

  if(darkBg.classList.contains('bg-active')){
    darkBg.classList.remove('bg-active');
    lightBg.classList.add('bg-active');
    moonIcon.classList.remove('icon-active');
    sunIcon.classList.add('icon-active');
  } else {
    darkBg.classList.add('bg-active');
    lightBg.classList.remove('bg-active');
    moonIcon.classList.add('icon-active');
    sunIcon.classList.remove('icon-active');
  }
})
