/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Camera, Sparkles, Gift, Star } from 'lucide-react';

export default function App() {
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [animationStage, setAnimationStage] = useState<'initial' | 'text-fading' | 'box-opening' | 'finished'>('initial');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setPermissionRequested(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setHasCameraPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasCameraPermission(false);
      setCameraError("Acesso à câmera negado.");
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleOpenGift = () => {
    if (animationStage !== 'initial') return;
    
    setAnimationStage('text-fading');
    setTimeout(() => {
      setAnimationStage('box-opening');
      setTimeout(() => {
        setAnimationStage('finished');
      }, 1200);
    }, 1200);
  };

  if (!permissionRequested) {
    return (
      <div className="min-h-screen bg-[#FFF0F5] flex flex-col items-center justify-center p-8 text-center space-y-8">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Great+Vibes&display=swap');
          .cursive { font-family: 'Great Vibes', cursive; }
          .serif { font-family: 'Playfair Display', serif; }
        `}</style>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 max-w-md"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-pink-300 rounded-full blur-2xl"
            />
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500 relative z-10" />
          </div>

          <div className="space-y-4">
            <h1 className="cursive text-5xl text-rose-600">Preparando sua surpresa...</h1>
            <p className="text-rose-800/70 font-medium leading-relaxed">
              Para ver o seu presente especial, precisamos de acesso à sua câmera frontal. Prometemos que será mágico!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startCamera}
            className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-200 flex items-center gap-3 mx-auto transition-colors hover:bg-rose-600"
          >
            <Camera size={20} />
            Habilitar Câmera
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#5D2A42] font-['Montserrat'] selection:bg-[#FFD1DC] flex flex-col items-center justify-center overflow-hidden p-8 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Great+Vibes&display=swap');
        
        .serif {
          font-family: 'Playfair Display', serif;
        }

        .cursive {
          font-family: 'Great Vibes', cursive;
        }

        .mirror-surface {
          position: relative;
          background: #e0e0e0;
          box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        }

        .mirror-surface::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0) 45%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 55%,
            rgba(255,255,255,0) 100%
          );
          background-size: 250% 250%;
          animation: shimmer 4s infinite linear;
          pointer-events: none;
          z-index: 21;
        }

        .mirror-distortion {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(0.5px) contrast(1.1) brightness(1.05);
          z-index: 20;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% { background-position: -150% -150%; }
          100% { background-position: 150% 150%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 5s ease-in-out infinite;
        }

        .heart-beat {
          animation: beat 2s infinite ease-in-out;
        }

        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      {/* Decorative Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0, 1, 0],
              y: [Math.random() * 1000, Math.random() * 1000 - 100],
              x: [Math.random() * 1000, Math.random() * 1000]
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute text-pink-300"
          >
            <Sparkles size={12 + Math.random() * 10} />
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-12">
        
        {/* Texts Container */}
        <div className="w-full max-w-xl flex flex-col justify-center items-center h-24">
          <AnimatePresence mode="wait">
            {(animationStage === 'initial' || animationStage === 'text-fading') && (
              <motion.div
                key="initial-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4 px-4"
              >
                <p className="serif text-rose-800 leading-relaxed text-xl md:text-2xl font-light italic">
                  "Hoje eu comemoro meu aniversário e preciso dizer que amei o presente que ganhei. É o melhor presente que alguém poderia receber."
                </p>
              </motion.div>
            )}

            {animationStage === 'finished' && (
              <motion.div
                key="final-text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1, type: "spring" }}
                className="text-center space-y-6"
              >
                <div className="flex flex-col items-center">
                  <h2 className="cursive text-5xl md:text-7xl text-[#FF69B4] leading-tight heart-beat drop-shadow-sm">
                    Meu melhor presente é você!
                  </h2>
                  <p className="text-[#DB7093] font-medium tracking-[0.3em] uppercase text-[10px] md:text-xs mt-2 opacity-80">
                    Obrigado por ser quem você é: Perfeita!!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The Gift Box - Top down perspective focused */}
        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center perspective-[1000px]">
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
            onClick={handleOpenGift}
            animate={animationStage === 'box-opening' || animationStage === 'finished' ? { scale: 1.05 } : {}}
          >
            {/* Box Body (Viewed from top, so we see the inside) */}
            <div className="relative w-full h-full bg-[#FFF5F8] rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(255,182,193,0.5)] border-[15px] border-white flex flex-col items-center justify-center overflow-hidden">
              {/* Moldura Interna do Background */}
              <div className="absolute inset-4 border-2 border-dashed border-pink-200 rounded-[1.8rem] pointer-events-none z-10"></div>
              
              {/* Mirror (Alinhado com a moldura do background) */}
              <div className="relative w-[92%] h-[92%] rounded-[2rem] border-[12px] border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center justify-center overflow-hidden mirror-surface transition-all duration-1000 z-0">
                {/* Gold Frame Detailing */}
                <div className="absolute inset-0 border-[2px] border-white/40 rounded-[1.5rem] z-10 pointer-events-none" />
                
                {/* Mirror Realism Layers */}
                <div className="mirror-distortion" />
                
                {hasCameraPermission === false ? (
                  <div className="flex flex-col items-center text-rose-300 p-6 text-center text-[10px] tracking-widest uppercase font-semibold z-30">
                    <Camera className="h-12 w-12 mb-3 opacity-40" strokeWidth={1} />
                    <span>{cameraError}</span>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-1500 ease-in-out ${animationStage === 'finished' ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}

                {/* Glam Effects */}
                {animationStage === 'finished' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-40 pointer-events-none"
                  >
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [0, 1.2, 0.8, 1],
                          opacity: [0, 0.8, 0.5, 0],
                          rotate: [0, 90, 180],
                          x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400],
                          y: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400]
                        }}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute left-1/2 top-1/2 text-pink-400"
                      >
                         {i % 2 === 0 ? <Heart size={20} fill="currentColor" className="opacity-60" /> : <Star size={18} fill="currentColor" />}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* Texto Oculto */}
              <AnimatePresence>
                {animationStage === 'finished' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    className="absolute bottom-10 z-50 pointer-events-none bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-100 shadow-sm"
                  >
                    <p className="serif italic text-xs md:text-sm text-pink-600 tracking-tight">
                      Você é linda!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Top-Down Lid System */}
            <AnimatePresence>
              {(animationStage === 'initial' || animationStage === 'text-fading' || animationStage === 'box-opening') && (
                <motion.div 
                  initial={false}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-50 pointer-events-none preserve-3d"
                >
                  {/* The Lid - Top Surface */}
                  <motion.div 
                    className="absolute inset-0 bg-[#FFB6C1] rounded-[2.5rem] shadow-lg border-[15px] border-[#FFC0CB] flex flex-col items-center justify-center"
                    animate={
                      animationStage === 'box-opening' 
                      ? { 
                          rotateX: 90, 
                          y: -300, 
                          opacity: 0, 
                          scale: 1.3,
                          z: 500 
                        } 
                      : animationStage === 'text-fading' 
                      ? { y: [0, -8, 8, -8, 8, 0], rotateZ: [0, -0.8, 0.8, -0.8, 0.8, 0] }
                      : {}
                    }
                    transition={{ duration: 1.5, ease: [0.68, -0.6, 0.32, 1.6] }}
                  >
                    {/* Pattern on Lid */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fff_20%,_transparent_20%)] bg-[length:24px_24px]" />
                    
                    {/* Ribbons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-full bg-[#DB7093] opacity-80" />
                      <div className="h-20 w-full bg-[#DB7093] opacity-80 absolute" />
                    </div>

                    {/* Central Bow Knot */}
                    <div className="relative z-10 scale-[1.8]">
                       <div className="w-12 h-8 bg-[#C71585] rounded-full rotate-45 border-2 border-[#8B008B] shadow-md" />
                       <div className="w-12 h-8 bg-[#C71585] rounded-full -rotate-45 border-2 border-[#8B008B] shadow-md absolute top-0" />
                       <div className="w-6 h-6 bg-[#FF69B4] rounded-full absolute top-1 left-3 border-2 border-white shadow-inner" />
                    </div>

                    {animationStage === 'initial' && (
                      <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="mt-24 z-20 flex flex-col items-center gap-2"
                      >
                         <Gift size={48} className="text-white drop-shadow-md" strokeWidth={1} />
                         <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-white drop-shadow-sm">Toque na Tampa</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Final Footer Credits */}
        <AnimatePresence>
          {animationStage === 'finished' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="mt-4 flex items-center gap-4 text-stone-400"
            >
              <div className="h-[0.5px] w-8 bg-stone-300"></div>
              <span className="serif italic text-[11px]">EU TE AMO!!</span>
              <div className="h-[0.5px] w-8 bg-stone-300"></div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
