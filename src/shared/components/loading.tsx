export function Loading() {
  return (
    <div className="flex justify-center items-center">
      <img
        src="src/assets/pokeball.svg"
        alt="Pokeball loading indicator"
        className="animate-pokeball-wobble"
        style={{ width: 48, height: 48 }}
      />
      <style>
        {`
            @keyframes pokeball-wobble {
              0% { transform: translateX(0); }
              15% { transform: translateX(-15px) rotate(-10deg);}
              30% { transform: translateX(15px) rotate(10deg);}
              45% { transform: translateX(-10px) rotate(-8deg);}
              60% { transform: translateX(10px) rotate(8deg);}
              75% { transform: translateX(-5px) rotate(-4deg);}
              100% { transform: translateX(0); }
            }
            .animate-pokeball-wobble {
              animation: pokeball-wobble 1.2s infinite;
              display: block;
            }
          `}
      </style>
    </div>
  );
}
