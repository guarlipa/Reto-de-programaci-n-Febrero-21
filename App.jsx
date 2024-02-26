import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogFact, setDogFact] = useState('');
  const [dogImageUrl, setDogImageUrl] = useState('');

  useEffect(() => {
    const fetchDogFact = async () => {
      try {
        const response = await fetch('https://dog-api.kinduff.com/api/facts');
        const data = await response.json();
        setDogFact(data.facts[0]);
      } catch (error) {
        console.error('Error fetching dog fact:', error);
      }
    };

    fetchDogFact();
  }, []);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://source.unsplash.com/featured/?dog');
        if (response.ok) {
          const imageUrl = response.url + '&w=800&h=800'; // Agrega el tamaño deseado
          setDogImageUrl(imageUrl);
        } else {
          console.error('Error fetching dog image:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <>
      <h1>Random Dog Fact</h1>
      {dogFact && <p style={{ fontSize: '40px' }}>{dogFact}</p>}
      {dogImageUrl && <img src={dogImageUrl} alt="random dog" />}
    </>
  );
}

export default App;
