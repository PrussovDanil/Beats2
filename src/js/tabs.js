/////////////////////////////////////////////////////////////////////////
///                        TABS.JS                                      /
/////////////////////////////////////////////////////////////////////////

  const  findBlock = (alias) => {
    return $(".reviews__item").filter((ndx,item)=>{
      return $(item).attr("data-linked-with") === alias;
    })
  }
  
  
  $(".interaktive-avatar__link").click( (e) =>{
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlock(target);
    const curItem = $this.closest(".reviews__switcher-item");
  
    itemToShow.addClass("active__reviews").siblings().removeClass("active__reviews");
    curItem.addClass("active__switcher").siblings().removeClass("active__switcher");
  
  })

