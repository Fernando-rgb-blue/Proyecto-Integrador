'use client';
import React, { useRef } from 'react';

const members = [
  { name: 'Alfato Titto Anthony Fernando', email: 'TuZamakito1999@gmail.com' },
  { name: 'Gonzales Matos Walter Manuel', email: 'manuelgonzmatos@gmail.com' },
  { name: 'Urcia Peláez Luis Alexander', email: 'urciapelaezluisalex@gmail.com' },
];

export default function Page() {
  return (
    <main className="flex items-center justify-center pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {members.map((m, i) => (
          <TiltCard key={i} member={m} delay={i * 0.2} />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animated {
          transition: transform 0.8s ease;
        }
      `}</style>
    </main>
  );
}

function TiltCard({
  member,
  delay,
}: {
  member: { name: string; email: string };
  delay: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateY = (x - 0.5) * 30;
    const rotateX = (0.5 - y) * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.classList.remove('animated');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    timeoutRef.current = window.setTimeout(() => {
      card?.classList.add('animated');
    }, 2500);
  };

  return (
    <div
      ref={wrapperRef}
      className="three-d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animation: `fadeUp 0.6s ease-out ${delay}s both`,
        perspective: '800px',
      }}
    >
      <div
        ref={cardRef}
        className="animated w-80 h-48 dark:bg-dark rounded-2xl p-6 shadow-2xl flex flex-col justify-center items-center text-center transition-transform ease-out"
        style={{
          transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {member.name}
        </h2>
        <p className="text-lg text-blue-400">{member.email}</p>
      </div>
    </div>
  );
}
