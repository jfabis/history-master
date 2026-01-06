/**
 * Adapter dla serwisu "Google Nano Banana".
 * Implementuje wzorzec Adaptera, aby odizolować logikę zewnętrznego API.
 */

export class GoogleNanoBananaAdapter {
    
    /**
     * Symuluje generowanie obrazu historycznego na podstawie promptu.
     * W przyszłości tutaj trafi prawdziwe wywołanie API (np. OpenAI DALL-E lub Vertex AI).
     */
    async generateImage(prompt: string): Promise<string> {
      console.log(`[NanoBanana] Generating image for prompt: "${prompt}"...`);
  
      // Symulacja opóźnienia API (1.5 sekundy)
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      // Zwracamy losowy obrazek z Unsplash pasujący do tematyki historycznej/architektury
      // Używamy losowego seeda, żeby obrazki były różne
      const randomSeed = Math.floor(Math.random() * 1000);
      const mockUrl = `https://picsum.photos/seed/${randomSeed}/800/600`;
  
      console.log(`[NanoBanana] Image generated: ${mockUrl}`);
      return mockUrl;
    }
  }