import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const TeacherDayBackgroundOverlay: React.FC = () => {
  // Sinh 18 hạt bụi phấn vàng / trắng tinh khôi chuyển động nhẹ nhàng
  const chalkParticles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      top: Math.random() * 80 + 10,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 10 + 8, // 8s to 18s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.45 + 0.25,
    }));
  }, []);

  // 6 cánh hoa hồng / sen bay lượn mềm mại
  const petals = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * 7,
      scale: Math.random() * 0.4 + 0.6,
    }));
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. Warm Twilight & Rose Gradient Aura */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: `
            radial-gradient(ellipse 65% 120% at 90% 10%, rgba(244, 63, 94, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 55% 100% at 15% 90%, rgba(245, 158, 11, 0.18) 0%, transparent 65%),
            radial-gradient(circle 350px at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 80%)
          `,
        }}
      />

      {/* 2. Floating Chalk Dust ("Bụi Phấn Rơi Rơi") */}
      <div className="absolute inset-0">
        {chalkParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white shadow-xs pointer-events-none animate-[chalkFloat_12s_ease-in-out_infinite]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: '0 0 6px 1px rgba(254, 243, 199, 0.7)',
            }}
          />
        ))}
      </div>

      {/* 3. Floating Flower Petals (Cánh Hoa Tri Ân 20/11) */}
      <div className="absolute inset-0">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute animate-[petalDrift_16s_linear_infinite] pointer-events-none"
            style={{
              left: `${petal.left}%`,
              top: '-15px',
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              transform: `scale(${petal.scale})`,
            }}
          >
            <svg
              className="w-4 h-4 text-rose-300/40 drop-shadow-xs"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.5 7 4 11.5 4 16a8 8 0 0 0 16 0c0-4.5-4.5-9-8-14z" />
            </svg>
          </div>
        ))}
      </div>

      {/* 4. Artistic Watermark on Far Right (Cuốn sách, Cành hoa tri ân & Bút mực) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-15 hidden xl:block pointer-events-none">
        <svg className="w-56 h-20 text-amber-200" viewBox="0 0 300 100" fill="none">
          {/* Sách mở & Cành hoa tri ân cách điệu */}
          <path
            d="M 40 80 Q 90 60 150 75 Q 210 60 260 80 L 260 40 Q 210 20 150 35 Q 90 20 40 40 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <path
            d="M 150 35 L 150 75"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Cành nguyệt quế / Bông hoa nở nhẹ */}
          <circle cx="150" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 144 22 Q 138 12 148 10 Q 152 16 144 22" fill="currentColor" opacity="0.6" />
          <path d="M 156 22 Q 162 12 152 10 Q 148 16 156 22" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes chalkFloat {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-16px) translateX(12px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-32px) translateX(24px);
            opacity: 0;
          }
        }

        @keyframes petalDrift {
          0% {
            transform: translateY(-10px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110px) rotate(360deg) translateX(45px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
