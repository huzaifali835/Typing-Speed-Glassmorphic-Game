import React, { useEffect, useRef, useState } from 'react'
import './Style.css'

const paragraphs = [`The Dowry system is bad in society. It has turned the sacred matter of marriage into a business deal. The bride is regarded as a marketable commodity. Bride’s parents are often put under inhumane pressure for a handsome dowry. Sometimes they become destitute to give their daughters in marriage. In many cases, young brides are brutally tortured or pushed to commit suicide. To eliminate this social evil, a complete change in society’s outlook is necessary. Women should be treated as equal partners to men.`,
`After summer comes the rainy season. It lasts from mid-June to the end of September. During this time of year, the sky is cloudy. It drizzles and rains cats and dogs sometimes. Rains provide relief from the oppressive summer heat. Green leaves are developed by the tree. Ponds and rivers are full of water. Monsoon is a boon for farmers. Rainwater softens the soil and makes it suitable for cultivation. Monsoon has some disadvantages. Due to heavy and incessant rainfall, the roads, especially in villages, become muddy.`,
`There are many children in our country who are deprived of education and the normal joyous experiences of childhood. While upper-middle-class boys and girls attend school, they work in tea shops or small factories. They work as servants in middle-class and upper-class households. Parents are very poor, so children are forced to take up all these occupations.`,
`Our greatest asset is our own health. A healthy body can earn a lot of money, but a wealthy person cannot. We live in a fast-paced world where people have no time for themselves. The majority of their lives are spent in pursuit of materialistic wealth in order to outshine others, but they lose their health along the way. Wealth is important, but it is not as important as health. Spending a lot of money on junk food in five-star hotels or other forms of entertainment, such as watching movies for a day, has no benefits other than self-satisfaction.`,
`Co-education is an educational system in which boys and girls attend the same school or college. Co-education was uncommon in ancient times. It is a radical concept. Parents supported the case for adequate education for all children, regardless of gender. The countrymen realised that in the free world, boys and girls must move together and work hand in hand in all aspects of life. They began sending their children to co-educational schools. Co-education encourages competition among boys and girls through the activities they participate in at school. That is why students at co-educational institutions perform better in all aspects of their lives.`, `Positive thinking is an attitude or mindset characterized by optimism and happiness. A positive person hopes for the best and expects success in his life. Although many may scoff at the idea of ​​staying positive all the time, it has a plethora of benefits not only for the mind but also for the body. Positivity brings happiness to the soul and lightens one. It evokes our goodwill and joy.`];
const TypingSpeed = () => {
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const inputRef = useRef(null);
  const charRef = useRef([]);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [currentParagraph, setCurrentParagraph] = useState(paragraphs[0]);
  const [colorScheme, setColorScheme] = useState({
    circleGradient: 'linear-gradient(135deg, #3c8ce7 , #00eaff)',
    buttonColor: '#00B8EA',
    headingColor: 'white',
    borderColor: 'white'
  });

  useEffect(() => {
    inputRef.current.focus();
    setCorrectWrong(Array(charRef.current.length).fill(''));
  }, [currentParagraph]);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        let correctChars = charIndex - mistakes;
        let totalTime = maxTime - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);

  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);
    setCorrectWrong(Array(charRef.current.length).fill(''));
    setCurrentParagraph(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const characters = charRef.current;
    let currentChar = charRef.current[charIndex];
    let typedChar = e.target.value.slice(-1);
    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }
      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = ' correct ';
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        correctWrong[charIndex] = ' wrong ';
      }
      if (charIndex === characters.length - 1) setIsTyping(false);
    } else {
      setIsTyping(false);
    }
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <div className='App'>
      <div className='circle one' style={{ background: colorScheme.circleGradient }}></div>
      <div className='circle two' style={{ background: colorScheme.circleGradient }}></div>
      <div className='container'>
        <div className='test'>
          <h1 className='heading' style={{ borderBottomColor: colorScheme.borderColor, color: colorScheme.headingColor }}>TYPING SPEED GAME</h1>
          <input type='text' className='input-field' ref={inputRef} onChange={handleChange} />
          {currentParagraph.split('').map((char, index) => (
            <span
              style={{ borderBottomColor: colorScheme.borderColor }}
              className={`character ${index === charIndex ? 'active' : ''} ${correctWrong[index]}`}
              ref={(e) => (charRef.current[index] = e)}
            >
              {char}
            </span>
          ))}
        </div>
        <div className='result' style={{ borderTopColor: colorScheme.borderColor }}>
          <p>Time Left: <strong>{timeLeft}</strong></p>
          <p>Mistakes: <strong>{mistakes}</strong></p>
          <p>WPM: <strong>{WPM}</strong></p>
          <p>CPM: <strong>{CPM}</strong></p>
          <button onClick={resetGame} className='btn' style={{ borderColor: colorScheme.buttonColor, color: colorScheme.buttonColor }}>Try Again</button>
        </div>
        <div className='color-buttons'>
        <div className='color-btn' style={{ background: 'linear-gradient(135deg, #fec163, #de4313)' }} onClick={() => changeColorScheme({
          circleGradient: 'linear-gradient(135deg, #fec163, #de4313)',
          buttonColor: '#de4313',
          headingColor: '#de4313',
          borderColor: '#de4313'
        })}></div>
        <div className='color-btn' style={{ background: 'linear-gradient(135deg, #3c8ce7, #00eaff)' }} onClick={() => changeColorScheme({
          circleGradient: 'linear-gradient(135deg, #3c8ce7, #00eaff)',
          buttonColor: '#3c8ce7',
          headingColor: '#3c8ce7',
          borderColor: '#3c8ce7'
        })}></div>
        <div className='color-btn' style={{ background: 'linear-gradient(135deg, #eecda1, #ef629a)' }} onClick={() => changeColorScheme({
          circleGradient: 'linear-gradient(135deg, #eecda1, #ef629a)',
          buttonColor: '#ef629a',
          headingColor: '#ef629a',
          borderColor: '#ef629a'
        })}></div>
      </div>
      </div>
    </div>
  );
};

export default TypingSpeed;
