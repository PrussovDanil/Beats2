/////////////////////////////////////////////////////////////////////////
///                        TEAM.JS                                      /
/////////////////////////////////////////////////////////////////////////


  const openI = item =>  {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content--block");
    const itemButton = container.find(".team__name");
    const reqHeight = textBlock.height();
  
    container.addClass("actives");
    itemButton.addClass("team__name--active");
    contentBlock.height(reqHeight);
  }
  
  const closeI = container =>{
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");
    const itemButton = container.find(".team__name");
  
    itemButton.removeClass("team__name--active");
    itemContainer.removeClass("actives");
    items.height(0);
  }
  
  $(".team__name").click((e)=>{
    const $this =$(e.currentTarget);
    const container = $this.closest(".team");
    const elemActive = $this.closest(".team__item")
  
    if(elemActive.hasClass("actives")){
      closeI(container);
    }else{
      closeI(container);
      openI($this); 
    }
  
    
  })

