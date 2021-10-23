/////////////////////////////////////////////////////////////////////////
///                       PROD.JS                                      /
/////////////////////////////////////////////////////////////////////////


    const mesureWidth = item => {
        const desktopWidth = $(window).width();
        const list = item.closest(".products-menu ");
        const link = list.find(".products-menu__title");
        const linkWidth = link.width();
        const linksWidth = linkWidth * link.length;
        const contentWidth = desktopWidth - linksWidth;
        if(desktopWidth > 929) {
            return 630;
        }
        else  if(desktopWidth > 480){
            return contentWidth;
        }
        else {
            return desktopWidth - linkWidth;
        }
      };
      
      const openItem = item => {
        const desktopWidth = $(window).width();
        const desc = item.find(".products-menu_content");
        const descWidth = mesureWidth(item);
        desc.width(descWidth);
        if(item.siblings().hasClass("Open")) {
            closeItem(item.siblings());
        }
        item.addClass("Open");
      };
      
      const rightPos = (elem, pos) => {
        return elem.css("right", pos);
      };
      
      const closeItem = item => {
            const list = item.closest(".products-menu "); 
            const desc = item.find(".products-menu_content");
            if($(window).width() <= 480) {
                setTimeout(rightPos, 500, list, 0);
            }
            desc.width(0);
            item.removeClass("Open");
      };
      
      const addWidth = (block, width, item) => {
        setTimeout(function(){
            item.addClass("Open");
        }, 400);
        return block.width(width);
      };
      
      const openMobileItem = (item, desktopWidth, linksSum) => {
        const desc = item.find(".products-menu_content");
        const list = item.closest(".products-menu ");
        const link = item.find(".products-menu__title");
        const linkArr = linksSum.find(".products-menu__title");
        const linkWidth = item.width();
        const descWidth = desktopWidth - linkWidth;
        const linkArrLen = linkArr.length-1;
        for(let i = 0; i < linkArrLen+1; i++) {
            if(link[0] == linkArr[i]) {
                let linkRight = -(linkWidth * (linkArrLen - i));
                list.css("right", linkRight);
                if(linkArr[i] == linkArr[linkArrLen]) {
                    addWidth(desc, descWidth, item);
                }
                else {
                    setTimeout(addWidth, 400, desc, descWidth, item);
                }
            }
        }
      };
      
      $(".products-menu__title").on("click", e => {
        const desktopWidth = $(window).width();
        e.preventDefault();
        const $this = $(e.currentTarget);
        const item = $this.closest(".products-menu__item");
        const linksSum = $(".products-menu ").find(".products-menu__item");
        if(item.hasClass("Open")) {
            closeItem(item);
        }
        else {
            if(desktopWidth > 480) {
                openItem(item);
            }
            else {
                openMobileItem(item, desktopWidth, linksSum);
            }
        }
      });
      
      $(".products-menu__button").on("click", e => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const item = $this.closest(".products-menu__item");
        if(item.hasClass("Open")) {
            closeItem(item);
        }
      });

