import { GoogleAuth } from 'google-auth-library';
import path from 'path';

export class GoogleNanoBananaAdapter {
  private auth: GoogleAuth;
  private projectId: string = '';
  private location: string = 'us-central1';

  constructor() {
    let credentials;

    // 1. Load credentials
    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
        // FIX: Sanitize private key - replace literal \n with actual newlines
        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }
      } catch (e) {
        console.error('[NanoBanana] Failed to parse GOOGLE_CREDENTIALS_JSON:', e);
      }
    }

    if (!credentials) {
      try {
        credentials = require(path.join(__dirname, '../../../google-credentials.json'));
      } catch (e) {
        // Ignorujemy błąd jeśli pliku nie ma (może działać tylko na ENV)
      }
    }

    if (!credentials) {
      console.error('[NanoBanana] CRITICAL: No Google credentials found (ENV or file)');
      // Pusty auth, to wywali błąd później przy próbie użycia, ale nie crashuje startu
      this.auth = new GoogleAuth();
    } else {
      this.projectId = credentials.project_id;

      // 2. Initialize Auth with SANITIZED credentials
      this.auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });

      console.log(`[NanoBanana] Initialized with project: ${this.projectId}`);
    }
  }

  async generateImage(params: { prompt: string; mode?: string }): Promise<string> {
    console.log(`[NanoBanana] ===== PROMPT =====`);
    console.log(params.prompt);
    console.log(`[NanoBanana] ================`);

    try {
      const client = await this.auth.getClient();
      const accessToken = await client.getAccessToken();

      if (!accessToken.token) {
        throw new Error('Failed to get access token from Google Auth');
      }

      const endpoint = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/imagen-3.0-generate-001:predict`;

      console.log('[NanoBanana] Calling Vertex AI Imagen 3...');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: params.prompt,
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: params.mode === 'costume' ? '3:4' : '1:1',
            safetyFilterLevel: 'block_some',
            personGeneration: 'allow_adult',
            negativePrompt: 'gore, extreme violence, blood, dead bodies, disturbing content, peaceful scene, buildings only, no people, no action, modern clothing, smartphones, cars, anachronisms, wrong historical period, wrong century, low quality, blurry, text, watermark'
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[NanoBanana] Vertex AI Error:', errorText);
        throw new Error(`Vertex AI returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      const base64Image = data.predictions?.[0]?.bytesBase64Encoded;

      if (base64Image) {
        console.log('[NanoBanana] ✅ Professional historical image generated!');
        return `data:image/png;base64,${base64Image}`;
      } else {
        throw new Error('No image data in Vertex AI response');
      }

    } catch (error: any) {
      console.error('[NanoBanana] Error:', error.message);
      throw error;
    }
  }
}