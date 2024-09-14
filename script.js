function locoMOtiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

};
locoMOtiveAnimation();

function navBarAni(){
    gsap.to("#nav-part1 svg",{
        transform:"translateY(-100%)",
        ScrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            markers:true,
            start:"top 0",
            end: "top -5%",
            scrub:true
        }
    })
    
    gsap.to("#nav-part #links",{
        transform:"translateY(-100%)",
        opacity:0,
        ScrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            markers:true,
            start:"top 0",
            end: "top -5%",
            scrub:true
        }
    })
}
navBarAni();


function vidAnim(){
    var vidcon = document.querySelector("#vid-cont");
var play = document.querySelector("#play");
vidcon.addEventListener("mouseenter",function(){
    // play.style.opacity = 1
    // play.style.scale = 1 or
    gsap.to(play,{
        opacity: 1,
        scale: 1
    })
})

vidcon.addEventListener("mouseleave",function(){
    gsap.to(play,{
        opacity: 0,
        scale: 0
    })
})

vidcon.addEventListener("mousemove",function(dets){
    gsap.to(play,{
        left: dets.x - 70,
        top: dets.y - 77
    })
})
};
vidAnim();

function pg1H1(){
    gsap.from("#page1 h1",{
        y: 80,
        opacity:0,
        duration:1,
        delay:0.5,
        stagger:0.2
    })

    gsap.from("#page1 h1 #vid-cont",{
        scale:0.9,
        opacity:0,
        duration:0.5,
        delay:1.3,
        // stagger:0.3
    })
};
pg1H1();


document.addEventListener("mousemove",function(dets){
    gsap.to("#cursor",{
        left:dets.x,
        top:dets.y
    })

})


// document.querySelector("#child1").addEventListener("mouseenter",function(){
//     gsap.to("#cursor",{
//         transform:'translate(-50%,-50%) scale(2)'
//     })
// })

// document.querySelector("#child1").addEventListener("mouseleave",function(){
//     gsap.to("#cursor",{
//         transform:'translate(-50%,-50%) scale(0)'
//     })
// })

// or, 

document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        gsap.to("#cursor",{
            transform:'translate(-50%,-50%) scale(2)'
        })
    });

    elem.addEventListener("mouseleave",function(){
        gsap.to("#cursor",{
            transform:'translate(-50%,-50%) scale(0)'
        })
    })
})