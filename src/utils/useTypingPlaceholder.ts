import { useEffect, useState } from 'react';

const phrases = [
  "Kailash Yatra",
  "Adi Kailash Yatra",
  "Char Dham Yatra",
  "Nepal",
];

export function useTypingPlaceholder(speed = 100, delay = 2000) {
  const [placeholder, setPlaceholder] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false); // 👈 important

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // 👈 skip SSR phase

    let timeout: NodeJS.Timeout;

    if (typing) {
      if (charIndex < phrases[currentPhrase].length) {
        timeout = setTimeout(() => {
          setPlaceholder((prev) => prev + phrases[currentPhrase][charIndex]);
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setTyping(false);
        }, delay);
      }
    } else {
      timeout = setTimeout(() => {
        setPlaceholder('');
        setCharIndex(0);
        setCurrentPhrase((currentPhrase + 1) % phrases.length);
        setTyping(true);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, typing, currentPhrase, speed, delay, mounted]);

  return mounted ? placeholder : ''; // 👈 don't return anything until mounted
}
