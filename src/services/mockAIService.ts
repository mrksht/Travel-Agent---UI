// This is a mock service that simulates AI responses
// In a real application, this would be replaced with actual API calls to a backend service

interface AIResponse {
  text: string;
}

const RESPONSE_DELAY = 1500; // Simulate network delay

const sampleResponses = [
  {
    response: `For a 7-day trip to Southeast Asia in October, focusing on sunny destinations and avoiding rainy areas, I recommend the following itinerary that includes vibrant cities, beautiful beaches, and cultural experiences. Here's a curated trip plan for you:

### Trip Duration: 7 Days

#### Day 1-3: **Bangkok, Thailand**
- **Highlights**: Explore the Grand Palace, visit Wat Pho and Wat Arun, and experience the bustling markets.
- **Weather**: Sunny and warm weather with occasional showers.
- **Accommodation**: Stay in a centrally located hotel in the vibrant Sukhumvit or Silom area.

#### Day 4-5: **Phuket, Thailand**
- **Highlights**: Relax on the stunning beaches of Patong or Kata, take a boat tour to Phi Phi Islands, and enjoy vibrant nightlife.
- **Weather**: Sunny days with occasional showers, perfect for beach activities.
- **Accommodation**: Choose a beachfront resort or a cozy villa for a relaxing stay.

#### Day 6-7: **Siem Reap, Cambodia**
- **Highlights**: Explore the ancient temples of Angkor Wat, visit Ta Prohm and Bayon, and experience Khmer cuisine.
- **Weather**: Sunny and warm weather with low chances of rain.
- **Accommodation**: Opt for a boutique hotel near the Angkor Archaeological Park.

### Additional Tips:
- **Transport**: Use domestic flights or express buses for travel between cities.
- **Visa**: Check visa requirements for Thailand and Cambodia in advance.
- **Activities**: Enjoy Thai massages in Bangkok, water sports in Phuket, and temple exploration in Siem Reap.

This itinerary offers a mix of cultural exploration, beach relaxation, and vibrant city experiences in Southeast Asia, ensuring you enjoy the sunny weather and avoid rainy areas during your 7-day trip in October. Let me know if you need more details or modifications to the plan!`
  },
  {
    response: `Based on your preferences for a cultural experience in Japan during spring, here's a detailed 5-day itinerary focusing on Tokyo and Kyoto:

### Day 1-3: Tokyo
- **Morning**: Visit Senso-ji Temple and explore Asakusa
- **Afternoon**: Experience modern Tokyo in Shibuya and Harajuku
- **Evening**: Enjoy dinner at Tsukiji Outer Market

### Day 4-5: Kyoto
- **Morning**: Visit the Golden Pavilion and Arashiyama Bamboo Grove
- **Afternoon**: Tea ceremony experience in Gion
- **Evening**: Explore Pontocho alley and try local cuisine

### Travel Tips:
- Get a JR Pass for train travel
- Book accommodations near major stations
- Try local specialties like sushi, ramen, and matcha

Let me know if you'd like any adjustments to this itinerary!`
  }
];

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, RESPONSE_DELAY));
  
  // Randomly select a response
  const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
  
  return {
    text: randomResponse.response
  };
};

export default {
  getAIResponse
};