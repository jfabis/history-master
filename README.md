# HistoryMaster 📜✨

> **Odkryj przeszłość na nowo.**  
> Interaktywna platforma edukacyjna łącząca naukę historii z grywalizacją i sztuczną inteligencją.


## 🌟 O Projekcie

**HistoryMaster** to nowoczesna aplikacja webowa, która zmienia naukę historii w pasjonującą przygodę. Użytkownicy zdobywają wiedzę poprzez interaktywne moduły, rywalizują o punkty doświadczenia (XP) i awansują na kolejne poziomy wtajemniczenia – od prostego Kronikarza po Mistrza Historii.

Projekt wykorzystuje **Sztuczną Inteligencję (GenAI)** do odtwarzania historycznych scen w trybie "Detektyw Czasu", pozwalając użytkownikom na wizualne obcowanie z przeszłością.

## 🚀 Główne Funkcjonalności

### 📚 Moduły Edukacyjne
- **Wielki Test (Drill Mode)**: Adaptacyjne quizy sprawdzające wiedzę. Każda poprawna odpowiedź nagradzana jest punktami XP.
- **Księga Wiedzy (Study Mode)**: Interaktywne fiszki do nauki faktów, dat i postaci.
- **Oś Czasu (Timeline)**: Wizualna podróż przez epoki – od starożytności po czasy współczesne.
- **Wizje AI (Time Detective)**: Unikalny tryb gry, w którym gracz musi odgadnąć epokę lub wydarzenie na podstawie obrazu wygenerowanego przez AI.

### 👤 System Progresji (RPG)
- **Punkty Doświadczenia (XP)**: Zdobywane za każdą aktywność.
- **Poziomy (Levels)**: Progresywny system awansu (system wykładniczy).
- **Dni Aktywności (Streak)**: Motywator do codziennej nauki.
- **Profil Użytkownika**: Statystyki, awatary i historia osiągnięć.

### 🛠️ Bezpieczeństwo i Technologia
- **Autentykacja**: Pełne logowanie email/hasło oraz **Google OAuth**.
- **Sesje**: Bezpieczne tokeny JWT + Refresh Tokens (HttpOnly Cookies).
- **Testy**: Kompleksowe testy jednostkowe i integracyjne (Vitest + Jest).

---

## 💻 Stack Technologiczny

### Frontend (Client)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Design System)
- **State/Data**: React Router, Axios
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT, Google Auth Library
- **AI**: OpenAI API
- **Testing**: Jest

---

## ⚙️ Instalacja i Konfiguracja

Postępuj zgodnie z poniższymi krokami, aby uruchomić projekt lokalnie.

### Wymagania wstępne
- **Node.js** (v18 lub nowszy)
- **PostgreSQL** (uruchomiona instancja bazy danych)
- **Klucz OpenAI API** (opcjonalnie, dla trybu AI)

### 1. Klonowanie Repozytorium
```bash
git clone https://github.com/jfabis/history-master.git
cd history-master
```

### 2. Konfiguracja Backendu
Przejdź do folderu serwera i zainstaluj zależności:

```bash
cd server
npm install
```

Utwórz plik `.env` w folderze `server/` i uzupełnij go wg wzoru:

```env
# Port serwera
PORT=3000

# Konfiguracja Bazy Danych (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/history_master?schema=public"

# Autentykacja (JWT)
JWT_SECRET="twoj_bardzo_dlugi_i_tajny_sekret_jwt"
JWT_REFRESH_SECRET="twoj_jeszcze_dluzszy_sekret_odswiezania"

# Google OAuth (Logowanie przez Google)
GOOGLE_CLIENT_ID="twoj-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="twoj-client-secret"

# Frontend URL (CORS)
CLIENT_URL="http://localhost:5173"
```

Uruchom migracje bazy danych i (opcjonalnie) wypełnij ją danymi testowymi:

```bash
npx prisma generate
npx prisma db push
npm run seed  # Wypełnia bazę tematami i pytaniami
```

Uruchom serwer w trybie deweloperskim:
```bash
npm run dev
```

### 3. Konfiguracja Frontendu
W nowym oknie terminala przejdź do folderu klienta:

```bash
cd client
npm install
```

Uruchom aplikację:
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

---

## 🧪 Testowanie

Projekt posiada skonfigurowane środowisko testowe.

**Uruchomienie wszystkich testów:**
```bash
npm test
```
*(Uruchamia sekwencyjnie testy klienta i serwera)*

**Osobne uruchamianie:**
```bash
# Backend (Jest)
cd server && npm test

# Frontend (Vitest)
cd client && npm test
```

## 👥 Autorzy

- Jasiek Fabisiak - *Główny Deweloper*

---
*HistoryMaster © 2026. Wszystkie prawa zastrzeżone.*
