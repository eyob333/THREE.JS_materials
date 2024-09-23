import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Gui from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug
*/

const gui = new Gui()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



const textureLoder = new THREE.TextureLoader()

const doorColorTexture = textureLoder.load('src/assets/textures/door/color.jpg')
const doorAlphaTexture = textureLoder.load('src/assets/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoder.load('src/assets/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoder.load('src/assets/textures/door/height.jpg')
const doorNormalTexture = textureLoder.load('src/assets/textures/door/Normal.jpg')
const doorRouthnessTexture = textureLoder.load('src/assets/textures/door/roughness.jpg')
const doorMetalnessTexture = textureLoder.load('src/assets/textures/door/metalness.jpg')
const MatcapTexture = textureLoder.load('src/assets/textures/matcaps/3.png')
const gradientTexture = textureLoder.load('src/assets/textures/gradients/5.jpg')


doorColorTexture.colorSpace = THREE.SRGBColorSpace
MatcapTexture.colorSpace = THREE.SRGBColorSpace



/**
 * objects
 */

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.transparent = true
// // material.map = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material  = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = MatcapTexture

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.roughness = 1
// material.metalness = 1
// // material.wireframe = true

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap= doorMetalnessTexture
// material.roughnessMap = doorRouthnessTexture
// material.normalMap = doorNormalTexture
// // material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'aoMapIntensity').min(0).max(5).step(0.01)

const material = new THREE.MeshPhysicalMaterial()
material.roughness = 1
// material.metalness = 1
// // material.wireframe = true

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap= doorMetalnessTexture
// material.roughnessMap = doorRouthnessTexture
// material.normalMap = doorNormalTexture
// // material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'aoMapIntensity').min(0).max(5).step(0.01)

// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.001)

// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)
// gui.add(material, 'sheen').min(0).max(5).step(0.001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.001)
// gui.addColor(material, 'sheenColor')

// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)




const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)



/// positions

sphere.position.x = 1.5
torus.position.x = -1.5

// 
scene.add(plane, torus, sphere )


const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const rgbeLoder = new RGBELoader()
rgbeLoder.load('src/assets/textures/environmentMap/2k.hdr', (enviromentMap) => {
    enviromentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = enviromentMap
    scene.environment = enviromentMap

})


const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(1)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // geometry animate
    plane.rotation.x = elapsedTime * 0.1
    torus.rotation.x = elapsedTime * 0.1
    sphere.rotation.x = elapsedTime * 0.1

    plane.rotation.y = elapsedTime * -0.15
    torus.rotation.y = elapsedTime * -0.15
    sphere.rotation.y = elapsedTime * -0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()