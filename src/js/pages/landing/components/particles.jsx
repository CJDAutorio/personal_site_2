import { useCallback } from 'react';
import ReactParticles from 'react-particles';
import { loadFull } from 'tsparticles';


function Particles() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <ReactParticles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: '#0e0c0d',
          },
        },
        fullScreen: false,
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ['bubble', 'grab'],
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              duration: 1,
              color: '#D23532',
            },
            grab: {
              distance: 200,
              duration: 0.4
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 2, max: 4 },
          },
        },
        detectRetina: true,
      }}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
    />
  )
}

export default Particles;
