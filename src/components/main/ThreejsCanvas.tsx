import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import * as THREE from 'three'
import { TextureLoader } from "three";
import { useImmer } from "use-immer";
import { RootState } from "../../store";

const PARTICLE_COUNT = 300
const OBJECT_DISTANCE = 4

const ThreejsCanvas: React.FC = () => {
  const canvasEl = useRef<any>()
  const scrollHelper = useSelector((state: RootState) => state.scrollHelper)

  /**
   * Texture loader
   */
  const textureLoader = useMemo(() => new TextureLoader(), [])

  /**
   * Renderer
   */
  const [renderer, setRenderer] = useImmer<THREE.WebGLRenderer | undefined>(undefined)

  /**
   * Scene
   */
  const scene = useMemo(() => new THREE.Scene(), [])

  /**
   * Camera group
   */
  const cameraGroup = useMemo(() => new THREE.Group(), [])

  /**
   * Camera
   */
  const camera = useMemo(() => {
    const tmp = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
    tmp.position.z = 6
    return tmp
  }, [])

  /**
   * Points
   */
  const particles = useMemo(() => {
    // Textures
    const starTexture = textureLoader.load('/images/StarTexture.png')

    const points = new Float32Array(PARTICLE_COUNT * 3)

    for(let i = 0; i < PARTICLE_COUNT; i++) {
      points[i * 3 + 0] = (Math.random() - 0.5) * 10
      points[i * 3 + 1] = OBJECT_DISTANCE * 0.5 - Math.random() * OBJECT_DISTANCE * 5
      points[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3))

    const material = new THREE.PointsMaterial({
      color: '#ffffff',
      sizeAttenuation: true,
      transparent: true,
      alphaMap: starTexture,
      size: 0.1,
      depthWrite: true
    })

    return new THREE.Points(geometry, material)
  }, [])

  /**
   * Scroll event
   */
  useEffect(() => {
    if(!scrollHelper.scrollContainerEl) return

    const scrollTop = scrollHelper.scrollEvent?.target?.scrollTop ?? 0

    const scrollY = (scrollTop + window.innerHeight) / scrollHelper.scrollContainerEl.scrollHeight
    
    camera.position.y = -scrollY * OBJECT_DISTANCE
  }, [scrollHelper.scrollEvent, scrollHelper.scrollContainerEl])

  /**
   * Event listener
   */
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer?.setSize(window.innerWidth, window.innerHeight)
      renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderer])

  

  useEffect(() => {
    /**
     * Parallex position
     */
    const parallexPosition = {
      x: 0,
      y: 0
    }
    
    scene.add(particles)

    const tmpRenderer = new THREE.WebGLRenderer({
      canvas: canvasEl.current,
      alpha: true
    })
    
    setRenderer(tmpRenderer)

    tmpRenderer.setSize(window.innerWidth, window.innerHeight)
    tmpRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene.add(cameraGroup)
    cameraGroup.add(camera)

    /**
     * Mouse move event
     */
     const handleMouseMove = (e: any) => {
      parallexPosition.x = e.clientX / window.innerWidth
      parallexPosition.y = e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)

    /**
     * Clock
     */
    const clock = new THREE.Clock()
    let previousTime = 0

    const update = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      const parallexX = parallexPosition.x * 0.5
      const parallexY = -parallexPosition.y * 0.5
      
      cameraGroup.position.x += (parallexX - cameraGroup.position.x) * 5 * deltaTime
      cameraGroup.position.y += (parallexY - cameraGroup.position.y) * 5 * deltaTime

      // Rendering
      tmpRenderer.render(scene, camera)

      window.requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Box
      component='canvas'
      ref={canvasEl}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
      }}/>
  )
}

export default ThreejsCanvas