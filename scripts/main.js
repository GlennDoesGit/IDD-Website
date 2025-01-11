import { gsap } from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  ScrollableCameraViewPlugin,
  VariationConfiguratorPlugin,
  FrameFadePlugin,
  LoadingScreenPlugin,
  PickingPlugin,
  TweakpaneUiPlugin,
  MaterialConfiguratorPlugin,

  // Import THREE.js internals
  Color,
	Texture,
  Vector3
} from 'webgi';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

async function setupViewer() {
  const viewer = new ViewerApp({
      canvas: document.getElementById('web-canvas'),
  });

  await addBasePlugins(viewer);
  await viewer.addPlugin(ScrollableCameraViewPlugin);

  // const manager = await viewer.getPlugin(AssetManagerPlugin);
  // This must be called after adding any plugin that changes the render pipeline.
	viewer.renderer.refreshPipeline();

  // Load an environment map if not set in the glb file
  await viewer.setEnvironmentMap("./assets/autumn forest.hdr");

  // await manager.addFromPath("./assets/casio watch.glb");
  const model = await viewer.load("./assets/iphone_16_pro_max.glb");

  // let scrollSection = document.getElementById("scrollSection");
  // await viewer.getPlugin(new ScrollableCameraViewPlugin(scrollSection));

  // ScrollTrigger for controlling GLB model visibility in specific section
  // ScrollTrigger.create({
  //   trigger: '#section4', // The section where the model should be in-active
  //   start: '10% bottom', // When the top of the section reaches the center of the viewport
  //   end: '110% center', // When the bottom of the section leaves the center of the viewport
  //   onEnter: () => {
  //     model.visible = false;
  //     console.log('Model disabled when entering section while scrolling downwards');
  //   },
  //   onLeave: () => {
  //     model.visible = true;
  //     console.log('Model remains disabled when leaving section while scrolling downwards');
  //   },
  //   onEnterBack: () => {
  //     model.visible = false;
  //     console.log('Model remains disabled outside section while scrolling upwards');
  //   },
  //   onLeaveBack: () => {
  //     model.visible = true;
  //     console.log('Model re-enabled when re-entering section again while scrolling upwards');
  //   },
  //   markers: {
  //     startColor: "white",
  //     endColor: "red",
  //     fontSize: "20px",
  //     indent: 0,
  //   }
  // });
}

setupViewer();

// Control display of back to top button
window.onscroll = function() {
  if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.querySelector('.back-to-top').style.display = 'block';
  } else {
      document.querySelector('.back-to-top').style.display = 'none';
  }
};

// Control GLB model camera view animation while scrolling from section to section
let scrollSpeed = 2.5;

// Add an event listener for the 'wheel' event
document.addEventListener('wheel', function(event) {
  // Prevent default scrolling behavior
  event.preventDefault();

  // Calculate the new scroll position
  let delta = event.deltaY;
  let scrollPosition = window.scrollY + (delta * scrollSpeed);

  // Set the new scroll position
  window.scrollTo({
    top: scrollPosition,
    // behavior: 'smooth'
  });
},
{ passive: false });

// Animate horizontal animation of text and image for specific section
document.querySelectorAll('section').forEach((section) => {
  if(section.id === 'view3') {
    const content = section.querySelector('.section-content');
    const text = content.querySelector('.text');
    const image = content.querySelector('.image');

    // GSAP Timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center', // Trigger when section's top hits the center of the viewport
        end: 'bottom center', // End when section's bottom hits the center
        toggleActions: 'play reverse play reverse', // Animation actions
        markers: { // Custom marker for debugging purpose
          startColor: "orange",
          endColor: "blue",
          fontSize: "20px",
          indent: 200,
        }
      },
    });

    // Animate text and image from outside to inside
    tl.to(text, {
      x: 0, // Bring text to original position
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }).to(image, {
      x: 0, // Bring image to original position
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '<'); // Start the image animation at the same time as text
  }
});
