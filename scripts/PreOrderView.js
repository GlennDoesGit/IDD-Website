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
} from 'webgi';

async function setupViewer() {
  const viewerpreview = new ViewerApp({
    canvas: document.getElementById('preview-canvas'),
  });

  const canvas = document.getElementById('preview-canvas');
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
  viewerpreview.scene.activeCamera.position = new Vector3(8, 0, -5);
  viewerpreview.scene.activeCamera.target = new Vector3(0, 0, 0);

  // Camera options
  const options = viewerpreview.scene.activeCamera.getCameraOptions();
  options.fov = 25;
  viewerpreview.scene.activeCamera.setCameraOptions(options);

  // Control options
  const controls = viewerpreview.scene.activeCamera.controls;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;
  controls.enableDamping = true;
  controls.rotateSpeed = 0;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 20;

  const frame = manager.materials.findMaterialsByName('metalframe.002')[0]
  const baseColor = manager.materials.findMaterialsByName('basecolor.001')[0]
  const appleLogo = manager.materials.findMaterialsByName('apple_logo.001')[0]

  function ChangeColorBlue() {
    frame.color = new Color(0x2d2787);
    baseColor.color = new Color(0x37326c);
    appleLogo.color = new Color(0x54559a);
    viewerpreview.scene.setDirty();
  }

  ChangeColorBlue();
}

setupViewer();
