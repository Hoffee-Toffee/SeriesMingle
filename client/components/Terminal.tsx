import fetchSecret from "../apis/fetchSecret";
import { useState, useEffect } from "react";

export default function Terminal({ keys, setKeys }: { keys: string[], setKeys: (keys: string[]) => void }) {
  const [passphrase, setPassphrase] = useState<string>("");
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [konami, setKonami] = useState<number[]>([0, 0]);

  // Konami listener
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];

    let konamiIndex = konami[0];
    let lastKeyPress = konami[1];

    const handleKonamiCode = (e: KeyboardEvent) => {
      if (showTerminal) return;
      if (!konamiIndex) lastKeyPress = Date.now();
      if (Date.now() - lastKeyPress > 500) {
        konamiIndex = 0;
        return
      }
      lastKeyPress = Date.now();
      if (e.key === konamiCode[konamiIndex]) konamiIndex++;
      else konamiIndex = 0;
      if (konamiIndex === 11) setShowTerminal(true);
      else setKonami([konamiIndex, lastKeyPress]);
    }

    document.addEventListener('keydown', handleKonamiCode);
    return () => document.removeEventListener('keydown', handleKonamiCode);
  }, [konami, showTerminal]);


  const handleDecrypt = async (passphrase: string) => {
    const response = await fetchSecret(passphrase);
    if (response) {
      if (keys.includes(passphrase)) {
        setKeys(keys.filter((egg) => egg !== passphrase));
      } else {
        setKeys([...keys, passphrase]);
      }
      setShowTerminal(false);
    }
    setPassphrase('');
  }

  const handlePassphraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassphrase = e.target.value.toUpperCase()
    const prevChar = newPassphrase.at(-2) || ' '
    const prevWasSpace = prevChar === ' '

    const newChar = newPassphrase.at(-1) || ''
    const newLength = newPassphrase.length

    // Only allow capital letters, numbers, and spaces, but can be empty
    if (!newChar.match(/[A-Z0-9 ]/) && newChar !== '') return
    // Spaces cannot be neighbors, or at the end of the string
    if (newChar === ' ' && (prevWasSpace || newLength === 9)) return

    // Automatically submit the passphrase when it reaches 9 characters, and clear the passphrase
    if (newLength === 9) {
      handleDecrypt(newPassphrase)
      return
    }

    setPassphrase(newPassphrase)
  }

  return showTerminal && (
    <div>
      <input
        type="text"
        value={passphrase}
        onChange={handlePassphraseChange}
        placeholder="?????????"
      />
      <button onClick={() => setShowTerminal(false)}>Close</button>
    </div>
  );
}