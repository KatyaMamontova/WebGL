function main() {
  const canvas = document.querySelector('.screen');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 100;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  function makeInstance(geometry, color, x, y = 0, rotation = false) {

    const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });

    const figure = new THREE.Mesh(geometry, material);
    scene.add(figure);

    figure.position.x = x;
    figure.position.y = y;
    if (rotation) figure.rotation.x = -Math.PI / 2;

    return figure;
  }

  function setGeometry(figure) {
    let radius,
      radialSegments,
      height,
      heightSegments,
      widthSegments;
    switch (figure) {
      case 'torus':
        radius = 0.35;
        const tubeRadius = 0.2;
        radialSegments = 8;
        const tubularSegments = 24;
        return new THREE.TorusGeometry(
          radius, tubeRadius,
          radialSegments, tubularSegments);
      case 'cylinder':
        const radiusTop = 0.3;
        const radiusBottom = 0.3;
        height = 1;
        radialSegments = 12;
        heightSegments = 2;
        return new THREE.CylinderGeometry(
          radiusTop, radiusBottom, height,
          radialSegments, heightSegments);
      case 'sphere':
        radius = 0.55;
        widthSegments = 50;
        heightSegments = 50;
        return new THREE.SphereGeometry(
          radius,
          widthSegments, heightSegments);
      case 'plane':
        const width = 4;
        height = 2;
        widthSegments = 10;
        heightSegments = 10;
        return new THREE.PlaneGeometry(
          width, height,
          widthSegments, heightSegments);
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


  makeInstance(setGeometry('torus'), 0xff49cc, -1);
  makeInstance(setGeometry('cylinder'), 0xddff66, 0);
  makeInstance(setGeometry('sphere'), 0xff8f00, 1);
  makeInstance(setGeometry('plane'), 0x77bbff, 0, -0.5, true);

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();