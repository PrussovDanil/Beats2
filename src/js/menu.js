/////////////////////////////////////////////////////////////////////////
///                        MENU.JS                                      /
/////////////////////////////////////////////////////////////////////////



  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu__mob");
  const closeBtn = document.querySelector(".menu__mob--close");
  
  
  
  burger.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.style.overflow = 'hidden';
    menu.classList.add("active");
  
    
  
  }) 
  
  
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.style.overflow = 'visible';
    menu.classList.remove("active");
    
    
  
  }) 
  

