/////////////////////////////////////////////////////////////////////////
///                        PLAYER.JS                                    /
/////////////////////////////////////////////////////////////////////////


  let  interval;
  const video = document.querySelector("#video");
  const buttons = document.querySelectorAll(".player__button");
  const player = document.querySelector(".player ");
  const durationSec =video.duration;
  const durationSec2 =video.currentTime;
  const VolStat= video.volume= 1;
  
  interval = setInterval(()=>{
    const completedSec =video.currentTime;
    const completedPer = (completedSec/durationSec)*100;
  
    $(".player__playback-button").css({
      left:`${completedPer}%`
    });
    
    
  },1000)
  
  buttons.forEach(item =>{
    item.addEventListener("click", (e)=>{
    e.preventDefault();
    
      
    if(video.paused){
      video.play();
     player.classList.add("actives");
      
  
    }else{
      video.pause();
     player.classList.remove("actives");
      
    }
  })
  })
  
  video.addEventListener("click", (e)=>{
    e.preventDefault();
    
   
    if(video.paused){
      video.play();
     player.classList.add("actives");
      
  
    }else{
      video.pause();
     player.classList.remove("actives");
      
    }
  
  })
  
  
  $(".player__playback").click(e=>{
    const bar = $(e.currentTarget);
    const video = document.querySelector("#video");
    const clickPos=e.originalEvent.layerX; 
    const newBtnPos = (clickPos/ bar.width())*100;
    
  
    const newPlaybackPos =(durationSec/100)*newBtnPos;
  
    $(".player__playback-button").css({
      left:`${newBtnPos}%`
    });
    video.currentTime = newPlaybackPos;
    
  })
  
  
  $(".player__sound").click(e=>{
    const block = $(e.currentTarget);
    const clickPosVol=e.originalEvent.layerX; 
    const newSondPos = (clickPosVol/ block.width())*100;
    const x= $(".player__sound-button");
  
    const newSoundkPos =(VolStat/100)*newSondPos;
  
    $(".player__sound-button").css({
      left:`${newSondPos}%`
    });
  
    if( newSondPos< 11){
      video.muted=true;
      video.volume = newSoundkPos;
    }else{
      video.muted=false;
      video.volume = newSoundkPos;
    }
    
    
  })
  
  
  $(".player__sound--volume").click(e=>{
   e.preventDefault();
   if(video.muted){
     video.muted = false;
   }else{
    video.muted = true;
   }
   
  })
  
  

