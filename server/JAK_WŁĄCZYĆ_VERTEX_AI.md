# Jak włączyć prawdziwe Nano Banana (Vertex AI)

## Aktualny stan
- ✅ Mock adapter z profesjonalnymi obrazami z Wikimedia Commons
- ✅ Profesjonalne prompty gotowe dla Vertex AI
- ⏳ Vertex AI wymaga włączenia billing

## Krok po kroku: Włączenie Vertex AI

### 1. Włącz billing w Google Cloud
1. Wejdź na: https://console.developers.google.com/billing/enable?project=historymaster-dev
2. Dodaj metodę płatności (karta kredytowa)
3. Google daje $300 darmowych kredytów na start
4. Vertex AI Imagen kosztuje ~$0.04 za obraz (bardzo tanio)

### 2. Przełącz adapter w kodzie
Otwórz: `server/src/modules/ai/ai.controller.ts`

**Zamień tę linijkę:**
```typescript
import { MockHistoricalImageAdapter } from '../../shared/adapters/mock-image-adapter';
const aiAdapter = new MockHistoricalImageAdapter();
```

**Na tę:**
```typescript
import { GoogleNanoBananaAdapter } from '../../shared/adapters/image-gen.adapter';
const aiAdapter = new GoogleNanoBananaAdapter();
```

### 3. Zrestartuj serwer
```bash
cd server
# Ctrl+C aby zatrzymać
npm run dev
```

### 4. Gotowe!
Nano Banana będzie teraz generował unikalne, profesjonalne obrazy historyczne używając Imagen 3.0.

## Profesjonalne prompty

Adapter automatycznie używa odpowiednich promptów dla każdego trybu:

**Detektyw Czasu:**
> "Create a photorealistic, historically accurate image depicting [subject] from [era].
> Professional historical documentation style, museum quality, 8K resolution..."

**Bitwa:**
> "Create an epic, historically accurate depiction of [battle name].
> Show battlefield terrain, period-appropriate military formations..."

**Strój przez Wieki:**
> "Create a detailed, museum-quality photograph of traditional historical costume: [item] from [era].
> Studio lighting, focus on fabric textures and intricate details..."

## Parametry bezpieczeństwa
- `safetyFilterLevel`: 'block_some' - blokuje nieodpowiednie treści
- `personGeneration`: 'allow_adult' - generuje tylko dorosłe postaci historyczne
- `negativePrompt`: blokuje nowoczesne elementy, anachronizmy, niską jakość

## Koszt użytkowania
- **Imagen 3.0**: ~$0.04/obraz (4 centy)
- **Free tier**: $300 kredytów = ~7500 obrazów
- Dla aplikacji edukacyjnej to bardzo opłacalne

## Jeśli chcesz używać mock na zawsze
Mock adapter jest w pełni funkcjonalny i używa kuratorowanych, profesjonalnych obrazów historycznych z Wikimedia Commons (darmowych, wysokiej jakości). Możesz go używać bez żadnych kosztów - tylko obrazy nie będą unikalne za każdym razem.
