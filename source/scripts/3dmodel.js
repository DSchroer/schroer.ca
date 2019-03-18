var container;

var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;

function init() {

    container = document.createElement('div');
    document.getElementById('3dmodel').appendChild(container);

    /* Camera */
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / 400, 1, 1000);
    camera.position.z = 35;
    camera.position.y = 35;

    /* Scene */
    scene = new THREE.Scene();

    lighting = false;

    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('/models/');
    mtlLoader.load('export.mtl', function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/export.obj', function (object) {

            object.rotateX(-(Math.PI / 4));
            object.translateZ(35);

            scene.add(object);
        });
    });

    /* Renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, 400);
    renderer.setClearColor(new THREE.Color("rgb(100, 100, 100)"));
    container.appendChild(renderer.domElement);
    /* Controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dampingFactor = 1;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.enablePan = false;

    window.onresize = function () {
        camera.aspect = container.clientWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, 400);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();