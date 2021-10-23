/////////////////////////////////////////////////////////////////////////
///                        OPS.JS                                       /
/////////////////////////////////////////////////////////////////////////


// (function(){

// }())
const section =$(".section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItem = sideMenu.find(".fixed-menu");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile= mobileDetect;

let inScroll =false;

section.first().addClass("actives");

const countSectionPosition = sectionEq =>{
  const position = sectionEq * -100;

  if(isNaN(position)){
    console.error("Неверное значение в sectionPos");
    return 0;
  }
  return position;
  
};

const changeMenuThemeForSection =sectionEq=>{
  const currentSection =section.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed"


    if(menuTheme === "black"){
      sideMenu.addClass(activeClass)
    }else{
      sideMenu.removeClass(".fixed-menu--shadowed")
    }
};

const resetActiveClass = (item, itemEq, activeClass)=>{
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const perTrans = sectionEq=>{
 if(inScroll)return;

    const transitionOver = 1000;

    inScroll = true;


    const position =countSectionPosition(sectionEq);

    changeMenuThemeForSection (sectionEq);

    display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClass(section, sectionEq, "actives");
 
  setTimeout(()=>{
    inScroll=false;
    resetActiveClass(menuItem, sectionEq, "fixed-menu__item--active");
    sideMenu
        .find(".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .siblings()
        .removeClass("fixed-menu__item--active")
    
  }, transitionOver)  
  
  
};

const  viewScroller= () =>{
  const activeSection = section.filter(".actives");
  const nextSection =activeSection.next("section");
  const prevSection =activeSection.prev("section");

  return {
    next() {
        if(nextSection.length) {
          perTrans(nextSection.index());
          
          
        }
    },
    prev() {
        if(prevSection.length) {
          perTrans(prevSection.index());
        }
    },
};
};
  



$(window).on("wheel", e =>{
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewScroller();
  

  if(deltaY>0){
    scroller.next();
    
    
  }
  if(deltaY<0){
    scroller.prev();
    
  }
  
});

$(window).on("keydown", e=>{
  
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInput = tagName === "input" || tagName === "textarea";
  const scroller = viewScroller();

  if(userTypingInInput )return;


    switch(e.keyCode){
    case 38:
      scroller.prev();
      break;
    
    
    case 40:
      scroller.next();
      break;
  }
  
  
});

$(".wrapper").on("touchmove", e=> e.preventDefault())

$("[data-section-to]").click(e=>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-section-to");
  const reqSection = $(`[data-section-id=${target}]`)
  perTrans(reqSection.index());
  
  
});


if(isMobile) {
  
  $("#body").swipe( {
      //Generic swipe handler for all directions
      swipe: function(event, direction) {
          const scroller = viewScroller();
          let scrollDirection = "";
  
          if(direction === "up") {
              scrollDirection = "next";
          }
          if(direction === "down") {
              scrollDirection = "prev";
          }
          if(scrollDirection) {
              scroller[scrollDirection]();
          }
      }
      });
}




