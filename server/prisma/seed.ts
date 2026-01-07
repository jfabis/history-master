import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Rozpoczynam seedowanie bazy wiedzy HistoryMaster...');

  // --- 1. TEMATY, FISZKI I PYTANIA ---

  // TEMAT 1: STAROŻYTNY RZYM
  await prisma.topic.upsert({
    where: { name: 'Starożytny Rzym' },
    update: {},
    create: {
      name: 'Starożytny Rzym',
      description: 'Od legendarnego założenia miasta, przez Republikę, aż po upadek Cesarstwa Zachodniego.',
      cards: {
        create: [
          { frontContent: '753 p.n.e.', backContent: 'Tradycyjna data założenia Rzymu przez legendarnego Romulusa.', type: 'DATE' },
          { frontContent: 'Prawo XII Tablic', backContent: 'Pierwsza kodyfikacja prawa rzymskiego (ok. 450 p.n.e.), stanowiąca fundament rzymskiej praworządności.', type: 'FACT' },
          { frontContent: 'Wojny Punickie', backContent: 'Seria trzech wojen między Rzymem a Kartaginą o dominację na Morzu Śródziemnym.', type: 'EVENT' },
          { frontContent: 'Hannibal', backContent: 'Wódz Kartaginy, który przeprawił się z armią i słoniami przez Alpy, zadając Rzymianom klęskę pod Kannami.', type: 'FIGURE' },
          { frontContent: 'Idy Marcowe (44 p.n.e.)', backContent: 'Zabójstwo Juliusza Cezara przez spiskowców (m.in. Brutusa i Kasjusza) w obronie Republiki.', type: 'DATE' },
          { frontContent: 'Oktawian August', backContent: 'Pierwszy cesarz rzymski. Jego panowanie zapoczątkowało okres Pax Romana.', type: 'FIGURE' },
          { frontContent: 'Pax Romana', backContent: 'Długi okres pokoju i stabilizacji wewnątrz Imperium (27 p.n.e. – 180 n.e.).', type: 'TERM' },
          { frontContent: 'Edykt Mediolański (313 n.e.)', backContent: 'Ogłoszony przez Konstantyna Wielkiego, wprowadził wolność wyznania w Cesarstwie, kończąc prześladowania chrześcijan.', type: 'DATE' },
          { frontContent: '476 n.e.', backContent: 'Symboliczna data upadku Cesarstwa Zachodniorzymskiego (detronizacja Romulusa Augustulusa przez Odoakra).', type: 'DATE' },
          { frontContent: 'Legion', backContent: 'Podstawowa i największa jednostka taktyczna armii rzymskiej, złożona głównie z ciężkozbrojnej piechoty.', type: 'TERM' },
        ]
      },
      questions: {
        create: [
          {
            content: 'Kto był pierwszym cesarzem rzymskim?',
            correctAnswer: 'Oktawian August',
            options: ['Juliusz Cezar', 'Oktawian August', 'Neron', 'Marek Aureliusz'],
            difficulty: 1,
            explanation: 'Po wojnie domowej Oktawian przyjął tytuł Augusta w 27 p.n.e., stając się pierwszym cesarzem.'
          },
          {
            content: 'W którym roku upadło Cesarstwo Zachodniorzymskie?',
            correctAnswer: '476 n.e.',
            options: ['395 n.e.', '476 n.e.', '1453 n.e.', '1054 n.e.'],
            difficulty: 2,
            explanation: 'Jest to umowna data kończąca starożytność.'
          },
          {
            content: 'Która bitwa jest uznawana za największą klęskę Rzymu w wojnach z Kartaginą?',
            correctAnswer: 'Bitwa pod Kannami',
            options: ['Bitwa pod Zamą', 'Bitwa pod Kannami', 'Bitwa pod Akcjum', 'Bitwa w Lesie Teutoburskim'],
            difficulty: 3,
            explanation: 'Hannibal okrążył i wybił liczniejszą armię rzymską w 216 p.n.e.'
          },
          {
            content: 'Co oznacza termin "Pax Romana"?',
            correctAnswer: 'Pokój rzymski',
            options: ['Pokój rzymski', 'Prawo rzymskie', 'Droga rzymska', 'Senat rzymski'],
            difficulty: 1,
            explanation: 'Był to stan pokoju i stabilizacji istniejący wewnątrz Imperium Rzymskiego.'
          }
        ]
      }
    },
  });

  // TEMAT 2: II WOJNA ŚWIATOWA
  await prisma.topic.upsert({
    where: { name: 'II Wojna Światowa' },
    update: {},
    create: {
      name: 'II Wojna Światowa',
      description: 'Największy konflikt zbrojny w dziejach świata (1939-1945).',
      cards: {
        create: [
          { frontContent: '1 września 1939', backContent: 'Atak Niemiec na Polskę, początek II wojny światowej.', type: 'DATE' },
          { frontContent: '17 września 1939', backContent: 'Agresja ZSRR na Polskę, realizacja tajnego protokołu paktu Ribbentrop-Mołotow.', type: 'DATE' },
          { frontContent: 'Blitzkrieg', backContent: '"Wojna błyskawiczna" – taktyka wojskowa polegająca na zmasowanym ataku sił pancernych i lotnictwa.', type: 'TERM' },
          { frontContent: 'Bitwa o Anglię (1940)', backContent: 'Kampania powietrzna, w której RAF (przy wsparciu polskich pilotów) odparł ataki Luftwaffe.', type: 'EVENT' },
          { frontContent: 'Operacja Barbarossa', backContent: 'Kryptonim ataku III Rzeszy na Związek Radziecki (22 czerwca 1941).', type: 'EVENT' },
          { frontContent: 'Pearl Harbor (7.12.1941)', backContent: 'Japoński atak na bazę USA na Hawajach, który spowodował przystąpienie Stanów Zjednoczonych do wojny.', type: 'DATE' },
          { frontContent: 'Bitwa pod Stalingradem', backContent: 'Punkt zwrotny na froncie wschodnim, zakończony klęską 6. Armii Paulusa.', type: 'EVENT' },
          { frontContent: 'D-Day (6.06.1944)', backContent: 'Lądowanie aliantów w Normandii (Operacja Overlord), otwarcie drugiego frontu w Europie.', type: 'DATE' },
          { frontContent: 'Konferencja w Jałcie', backContent: 'Spotkanie Wielkiej Trójki (1945), które ustaliło powojenny ład w Europie.', type: 'EVENT' },
          { frontContent: '8 maja 1945', backContent: 'Bezwarunkowa kapitulacja III Rzeszy, koniec wojny w Europie.', type: 'DATE' },
        ]
      },
      questions: {
        create: [
          {
            content: 'Kto był premierem Wielkiej Brytanii przez większość wojny?',
            correctAnswer: 'Winston Churchill',
            options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Franklin Roosevelt'],
            difficulty: 1,
            explanation: 'Churchill objął urząd w 1940 roku i zasłynął niezłomną postawą wobec Hitlera.'
          },
          {
            content: 'Jaki kryptonim nosiła inwazja w Normandii?',
            correctAnswer: 'Overlord',
            options: ['Barbarossa', 'Overlord', 'Market Garden', 'Burza'],
            difficulty: 2,
            explanation: 'Operacja ta rozpoczęła się lądowaniem na plażach 6 czerwca 1944 r.'
          },
          {
            content: 'W którym roku odbyło się Powstanie Warszawskie?',
            correctAnswer: '1944',
            options: ['1943', '1944', '1939', '1945'],
            difficulty: 1,
            explanation: 'Wybuchło 1 sierpnia 1944 roku i trwało 63 dni.'
          },
          {
            content: 'Która konferencja Wielkiej Trójki odbyła się pierwsza?',
            correctAnswer: 'Teheran',
            options: ['Teheran', 'Jałta', 'Poczdam', 'Casablanca'],
            difficulty: 3,
            explanation: 'Konferencja w Teheranie miała miejsce w 1943 roku.'
          }
        ]
      }
    },
  });

  // TEMAT 3: POLSKA PIASTÓW
  await prisma.topic.upsert({
    where: { name: 'Polska Piastów' },
    update: {},
    create: {
      name: 'Polska Piastów',
      description: 'Początki państwowości polskiej, od Mieszka I do Kazimierza Wielkiego.',
      cards: {
        create: [
          { frontContent: '966 r.', backContent: 'Chrzest Polski przyjęty przez Mieszka I. Włączenie Polski do kręgu kultury łacińskiej.', type: 'DATE' },
          { frontContent: 'Bolesław Chrobry', backContent: 'Pierwszy koronowany król Polski (1025 r.). Syn Mieszka I.', type: 'FIGURE' },
          { frontContent: 'Zjazd Gnieźnieński (1000 r.)', backContent: 'Pielgrzymka cesarza Ottona III do grobu św. Wojciecha. Ogłoszenie planów uniwersalistycznego cesarstwa.', type: 'EVENT' },
          { frontContent: 'Testament Krzywoustego (1138 r.)', backContent: 'Podział Polski na dzielnice, początek rozbicia dzielnicowego.', type: 'DATE' },
          { frontContent: 'Kazimierz Wielki', backContent: 'Ostatni król z dynastii Piastów (zm. 1370). "Zastał Polskę drewnianą, a zostawił murowaną".', type: 'FIGURE' },
          { frontContent: 'Statuty Wiślickie', backContent: 'Kodyfikacja prawa dokonana za czasów Kazimierza Wielkiego.', type: 'TERM' },
          { frontContent: 'Bitwa pod Płowcami (1331 r.)', backContent: 'Starcie wojsk Władysława Łokietka z Krzyżakami, ważne dla morale Polaków.', type: 'EVENT' },
          { frontContent: 'Św. Stanisław', backContent: 'Biskup krakowski, patron Polski, zabity z rozkazu króla Bolesława Śmiałego.', type: 'FIGURE' },
          { frontContent: 'Najazd Mongołów (1241 r.)', backContent: 'Bitwa pod Legnicą i śmierć księcia Henryka Pobożnego.', type: 'EVENT' },
          { frontContent: 'Koronacja Łokietka (1320 r.)', backContent: 'Symboliczny koniec rozbicia dzielnicowego i zjednoczenie Królestwa Polskiego.', type: 'DATE' },
        ]
      },
      questions: {
        create: [
          {
            content: 'Który władca był pierwszym królem Polski?',
            correctAnswer: 'Bolesław Chrobry',
            options: ['Mieszko I', 'Bolesław Chrobry', 'Mieszko II', 'Bolesław Śmiały'],
            difficulty: 1,
            explanation: 'Koronował się w 1025 roku, krótko przed śmiercią.'
          },
          {
            content: 'Kto zastał Polskę drewnianą, a zostawił murowaną?',
            correctAnswer: 'Kazimierz Wielki',
            options: ['Władysław Łokietek', 'Kazimierz Wielki', 'Bolesław Krzywousty', 'Władysław Jagiełło'],
            difficulty: 1,
            explanation: 'Kazimierz Wielki ufundował wiele zamków i miast oraz Akademię Krakowską.'
          },
          {
            content: 'W którym roku odbył się Zjazd Gnieźnieński?',
            correctAnswer: '1000',
            options: ['966', '1000', '1025', '1138'],
            difficulty: 2,
            explanation: 'Spotkanie Bolesława Chrobrego z cesarzem Ottonem III.'
          },
          {
            content: 'Na ile dzielnic (początkowo) podzielił Polskę Bolesław Krzywousty?',
            correctAnswer: '5',
            options: ['3', '4', '5', '7'],
            difficulty: 4,
            explanation: 'Wyznaczył dzielnice dla czterech synów oraz dzielnicę senioralną.'
          }
        ]
      }
    },
  });

  // --- 2. SEEDOWANIE OSI CZASU ---
  console.log('⏳ Tworzenie Wielkiej Osi Czasu...');
  
  // Czyścimy starą oś czasu, żeby nie dublować przy wielokrotnym uruchomieniu
  // Używamy try/catch, żeby nie wywaliło błędu jeśli tabela jeszcze nie istnieje (np. przy pierwszym uruchomieniu)
  try {
      await prisma.timelineEvent.deleteMany({});
  } catch (e) {
      console.log('Tabela timelineEvent może być pusta lub nie istnieć, kontynuuję...');
  }

  await prisma.timelineEvent.createMany({
    data: [
      { sortOrder: -4000, year: '4000 p.n.e.', title: 'Wynalezienie Pisma', description: 'Sumerowie tworzą pismo klinowe w Mezopotamii.', era: 'Starożytność' },
      { sortOrder: -2560, year: '2560 p.n.e.', title: 'Piramida Cheopsa', description: 'Ukończenie budowy Wielkiej Piramidy w Gizie.', era: 'Starożytność' },
      { sortOrder: -1754, year: '1754 p.n.e.', title: 'Kodeks Hammurabiego', description: 'Babiloński zbiór praw ("oko za oko").', era: 'Starożytność' },
      { sortOrder: -776, year: '776 p.n.e.', title: 'I Igrzyska Olimpijskie', description: 'Pierwsze odnotowane igrzyska w starożytnej Grecji.', era: 'Starożytność' },
      { sortOrder: -753, year: '753 p.n.e.', title: 'Założenie Rzymu', description: 'Legendarne początki Wiecznego Miasta.', era: 'Starożytność' },
      { sortOrder: -490, year: '490 p.n.e.', title: 'Bitwa pod Maratonem', description: 'Grecy pokonują Persów. Legenda o maratończyku.', era: 'Starożytność' },
      { sortOrder: -323, year: '323 p.n.e.', title: 'Śmierć Aleksandra', description: 'Koniec podbojów Aleksandra Wielkiego i początek epoki hellenistycznej.', era: 'Starożytność' },
      { sortOrder: -44, year: '44 p.n.e.', title: 'Śmierć Cezara', description: 'Zabójstwo dyktatora w Idach Marcowych.', era: 'Starożytność' },
      { sortOrder: 33, year: '33 n.e.', title: 'Ukrzyżowanie Jezusa', description: 'Początek chrześcijaństwa.', era: 'Starożytność' },
      { sortOrder: 476, year: '476', title: 'Upadek Rzymu', description: 'Koniec Cesarstwa Zachodniego. Symboliczny koniec starożytności.', era: 'Starożytność' },
      { sortOrder: 622, year: '622', title: 'Hidżra', description: 'Ucieczka Mahometa z Mekki do Medyny, początek ery muzułmańskiej.', era: 'Średniowiecze' },
      { sortOrder: 800, year: '800', title: 'Koronacja Karola Wielkiego', description: 'Odnowienie tytułu cesarskiego na Zachodzie.', era: 'Średniowiecze' },
      { sortOrder: 966, year: '966', title: 'Chrzest Polski', description: 'Mieszko I przyjmuje chrzest.', era: 'Średniowiecze' },
      { sortOrder: 1000, year: '1000', title: 'Zjazd Gnieźnieński', description: 'Pielgrzymka Ottona III do grobu św. Wojciecha.', era: 'Średniowiecze' },
      { sortOrder: 1054, year: '1054', title: 'Wielka Schizma', description: 'Rozłam między Kościołem katolickim a prawosławnym.', era: 'Średniowiecze' },
      { sortOrder: 1096, year: '1096', title: 'I Krucjata', description: 'Wyprawa rycerstwa zachodniego do Ziemi Świętej.', era: 'Średniowiecze' },
      { sortOrder: 1364, year: '1364', title: 'Akademia Krakowska', description: 'Założenie pierwszego uniwersytetu w Polsce.', era: 'Średniowiecze' },
      { sortOrder: 1410, year: '1410', title: 'Bitwa pod Grunwaldem', description: 'Zwycięstwo polsko-litewskie nad Krzyżakami.', era: 'Średniowiecze' },
      { sortOrder: 1453, year: '1453', title: 'Upadek Konstantynopola', description: 'Turcy zdobywają miasto. Koniec Bizancjum.', era: 'Średniowiecze' },
      { sortOrder: 1492, year: '1492', title: 'Odkrycie Ameryki', description: 'Wyprawa Krzysztofa Kolumba.', era: 'Nowożytność' },
      { sortOrder: 1517, year: '1517', title: 'Wystąpienie Lutra', description: 'Początek Reformacji.', era: 'Nowożytność' },
      { sortOrder: 1569, year: '1569', title: 'Unia Lubelska', description: 'Powstanie Rzeczpospolitej Obojga Narodów.', era: 'Nowożytność' },
      { sortOrder: 1683, year: '1683', title: 'Odsiecz Wiedeńska', description: 'Jan III Sobieski ratuje Wiedeń przed Turkami.', era: 'Nowożytność' },
      { sortOrder: 1789, year: '1789', title: 'Rewolucja Francuska', description: 'Szturm na Bastylię, hasła Wolność, Równość, Braterstwo.', era: 'Nowożytność' },
      { sortOrder: 1791, year: '1791', title: 'Konstytucja 3 Maja', description: 'Pierwsza w Europie nowoczesna konstytucja.', era: 'Nowożytność' },
      { sortOrder: 1914, year: '1914', title: 'Wybuch I WŚ', description: 'Zamach w Sarajewie rozpoczyna Wielką Wojnę.', era: 'XX Wiek' },
      { sortOrder: 1918, year: '1918', title: 'Niepodległość Polski', description: 'Polska wraca na mapę po 123 latach.', era: 'XX Wiek' },
      { sortOrder: 1939, year: '1939', title: 'Wybuch II WŚ', description: 'Niemiecka inwazja na Polskę.', era: 'XX Wiek' },
      { sortOrder: 1944, year: '1944', title: 'Powstanie Warszawskie', description: '63 dni walki o stolicę.', era: 'XX Wiek' },
      { sortOrder: 1969, year: '1969', title: 'Lądowanie na Księżycu', description: 'Neil Armstrong stawia stopę na Srebrnym Globie.', era: 'XX Wiek' },
      { sortOrder: 1989, year: '1989', title: 'Jesień Ludów', description: 'Upadek komunizmu w Europie Środkowej.', era: 'Współczesność' },
      { sortOrder: 2004, year: '2004', title: 'Polska w UE', description: 'Przystąpienie Polski do Unii Europejskiej.', era: 'Współczesność' },
    ]
  });

  console.log('✅ Baza HistoryMaster została w pełni zasilona!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });