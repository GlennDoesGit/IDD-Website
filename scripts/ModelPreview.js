import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  VariationConfiguratorPlugin,
  FrameFadePlugin,
  LoadingScreenPlugin,
  PickingPlugin,
  TweakpaneUiPlugin,
  MaterialConfiguratorPlugin,

  // Import THREE.js internals
  Color,
  Texture,
  Vector3,
} from './webgi';

async function setupViewer() {
  const viewerpreview = new ViewerApp({
    canvas: document.getElementById('preview-canvas'),
  });

  const canvas = document.getElementById('preview-canvas');

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent the default scroll behavior
    event.stopPropagation(); // Stop the event from propagating to parent elements
  }, { passive: false }); // Set passive to false to allow preventDefault

  await addBasePlugins(viewerpreview);

  const manager = await viewerpreview.addPlugin(AssetManagerPlugin);

  // Load an environment map if not set in the glb file
  await viewerpreview.setEnvironmentMap("./assets/autumn forest.hdr");
  // const materialConfigurator = viewer.addPluginSync(new MaterialConfiguratorPlugin());
  // console.log(materialConfigurator);
  // materialConfigurator.enableEditContextMenus = true;

  // const config = await viewer.addPlugin(VariationConfiguratorPlugin);
  // await config.importPath("/config.json");

  // await manager.addFromPath("./assets/wash basin.glb");
  const model = await viewerpreview.load("./assets/iphone_16_pro_max.glb");

  // Camera transform
  viewerpreview.scene.activeCamera.position = new Vector3(10, 0, -6);
  viewerpreview.scene.activeCamera.target = new Vector3(0, -0.25, 0);

  // Camera options
  const options = viewerpreview.scene.activeCamera.getCameraOptions();
  options.fov = 25;
  viewerpreview.scene.activeCamera.setCameraOptions(options);

  // Control options
  const controls = viewerpreview.scene.activeCamera.controls;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableDamping = true;
  controls.rotateSpeed = 0.75;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 20;

  const picking = viewerpreview.addPluginSync(PickingPlugin);
  picking.hoverEnabled = true;
  picking.enableWidget = false;
  console.log(picking.getSelectedObject);
  // const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));
  // ui.setupPluginUi(PickingPlugin);
  picking.addEventListener('hitObject', (e) => {
    console.log('Hit object', e, e.intersects.selectedObject);
    // set to null to prevent selection
    e.intersects.selectedObject = null
  });

  picking.addEventListener('selectedObjectChanged', (e) => {
    console.log('Selected Object Changed', e);
  });

  picking.addEventListener('hoverObjectChanged', (e) => {
    console.log('Hover object changed', e);
  });

  // Colors
  document.querySelector('.button-colors.black')?.addEventListener('click', () => {
    ChangeColorBlack()
  })

  document.querySelector('.button-colors.white')?.addEventListener('click', () => {
    ChangeColorWhite()
  })

  document.querySelector('.button-colors.pink')?.addEventListener('click', () => {
    ChangeColorPink()
  })

  document.querySelector('.button-colors.green')?.addEventListener('click', () => {
    ChangeColorGreen()
  })

  document.querySelector('.button-colors.blue')?.addEventListener('click', () => {
    ChangeColorBlue()
  })

  function changeColor(colorToBeChanged) {
    drawer.color = colorToBeChanged;
    viewerpreview.scene.setDirty();
  }

  const frame = manager.materials.findMaterialsByName('metalframe.002')[0]
  const baseColor = manager.materials.findMaterialsByName('basecolor.001')[0]
  const appleLogo = manager.materials.findMaterialsByName('apple_logo.001')[0]
  const screen = manager.materials.findMaterialsByName('screen.001')[0]

  function ChangeColorBlack() {
    frame.color = new Color(0x7f7f7f);
    baseColor.color = new Color(0x1c1c1c);
    appleLogo.color = new Color(0x363636);
    viewerpreview.scene.setDirty();
  }

  function ChangeColorWhite() {
    frame.color = new Color(0xd9d9d9);
    baseColor.color = new Color(0xd5d5d5);
    appleLogo.color = new Color(0xb5b5b5);
    viewerpreview.scene.setDirty();
  }

  function ChangeColorPink() {
    frame.color = new Color(0xdc9ac2);
    baseColor.color = new Color(0xcf94a4);
    appleLogo.color = new Color(0xf6c7e5);
    viewerpreview.scene.setDirty();
  }

  function ChangeColorGreen() {
    frame.color = new Color(0xb6e596);
    baseColor.color = new Color(0x9acd91);
    appleLogo.color = new Color(0xc7f6ca);
    viewerpreview.scene.setDirty();
  }

  function ChangeColorBlue() {
    frame.color = new Color(0x2d2787);
    baseColor.color = new Color(0x37326c);
    appleLogo.color = new Color(0x54559a);
    viewerpreview.scene.setDirty();
  }

  ChangeColorBlue();
}

setupViewer();
