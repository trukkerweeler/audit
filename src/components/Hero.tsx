import React from 'react';

interface HeroProps {
  title: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <h1 className="bg-blue text-gold font-sans text-5xl h-20 flex items-center justify-center">
      {title}
    </h1>
  );
};

export default Hero;
