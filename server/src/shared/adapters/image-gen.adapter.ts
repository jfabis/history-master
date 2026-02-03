import { GoogleAuth } from 'google-auth-library';
import path from 'path';

export class GoogleVertexAIAdapter {
  private auth: GoogleAuth;
  private projectId: string = '';
  private location: string = 'us-central1';

  constructor() {
    let credentials;

    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }
      } catch (e) {
        console.error('[VertexAI] Failed to parse GOOGLE_CREDENTIALS_JSON:', e);
      }
    }

    if (!credentials) {
      try {
        credentials = require(path.join(__dirname, '../../../google-credentials.json'));
      } catch (e) {
      }
    }

    if (!credentials) {
      console.error('[VertexAI] CRITICAL: No Google credentials found (ENV or file)');
      this.auth = new GoogleAuth();
    } else {
      this.projectId = credentials.project_id;

      this.auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });

      console.log(`[VertexAI] Initialized with project: ${this.projectId}`);
    }
  }

  async generateImage(params: { prompt: string; mode?: string }): Promise<string> {
    console.log(`[VertexAI] ===== PROMPT =====`);
    console.log(params.prompt);
    console.log(`[VertexAI] ================`);

    try {
      const client = await this.auth.getClient();
      const accessToken = await client.getAccessToken();

      if (!accessToken.token) {
        throw new Error('Failed to get access token from Google Auth');
      }

      const endpoint = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/imagen-3.0-generate-001:predict`;

      console.log('[VertexAI] Calling Vertex AI Imagen 3...');

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
        console.error('[VertexAI] Vertex AI Error:', errorText);
        throw new Error(`Vertex AI returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      const base64Image = data.predictions?.[0]?.bytesBase64Encoded;

      if (base64Image) {
        console.log('[VertexAI] ✅ Professional historical image generated!');
        return `data:image/png;base64,${base64Image}`;
      } else {
        throw new Error('No image data in Vertex AI response');
      }

    } catch (error: any) {
      console.error('[VertexAI] Error:', error.message);
      throw error;
    }
  }
}