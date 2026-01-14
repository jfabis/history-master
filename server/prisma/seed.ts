import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Rozpoczynam seedowanie bazy wiedzy HistoryMaster...');

  // --- 1. DEFINICJA DANYCH DLA WSZYSTKICH TEMATÓW (Min. 7 fiszek i 7 pytań) ---

  const allTopicsData = [
    {
      name: 'Starożytny Egipt',
      description: 'Cywilizacja nad Nilem, faraonowie, piramidy i bogowie.',
      order: 1,
      cards: [
        { frontContent: '3100 p.n.e.', backContent: 'Zjednoczenie Górnego i Dolnego Egiptu przez Narmera (Menesa).', type: 'DATE' },
        { frontContent: 'Hieroglify', backContent: 'Święte znaki - pismo obrazkowe starożytnych Egipcjan.', type: 'TERM' },
        { frontContent: 'Ra', backContent: 'Bóg Słońca, stwórca świata i najważniejsze bóstwo w panteonie.', type: 'FIGURE' },
        { frontContent: 'Tutenchamon', backContent: 'Młody faraon, którego nienaruszony grobowiec odkrył Howard Carter w 1922 r.', type: 'FIGURE' },
        { frontContent: 'Piramida Cheopsa', backContent: 'Największa z piramid w Gizie, jeden z siedmiu cudów świata.', type: 'EVENT' },
        { frontContent: 'Ozyrys', backContent: 'Władca świata podziemnego i sędzia zmarłych.', type: 'FIGURE' },
        { frontContent: 'Kamień z Rosetty', backContent: 'Zabytek, który pozwolił odczytać hieroglify (dzięki inskrypcji w trzech językach).', type: 'TERM' },
        { frontContent: 'Hatszepsut', backContent: 'Kobieta-faraon, która rządziła Egiptem jako mężczyzna.', type: 'FIGURE' },
        { frontContent: 'Nil', backContent: 'Rzeka, której wylewy zapewniały żyzność ziemi i rozwój cywilizacji.', type: 'TERM' },
      ],
      questions: [
        { content: 'Kto odkrył grobowiec Tutenchamona?', correctAnswer: 'Howard Carter', options: ['Napoleon Bonaparte', 'Howard Carter', 'Jean-François Champollion', 'Indiana Jones'], difficulty: 1, explanation: 'Brytyjski archeolog Howard Carter odkrył nienaruszony grób młodego faraona w Dolinie Królów w 1922 roku, co było największym znaleziskiem archeologicznym XX wieku.' },
        { content: 'Jak nazywa się pismo starożytnych Egipcjan?', correctAnswer: 'Hieroglify', options: ['Klinowe', 'Hieroglify', 'Łacina', 'Fenickie'], difficulty: 1, explanation: 'Hieroglify to starożytne pismo obrazkowe używane w Egipcie przez ponad 3000 lat. Nazwa pochodzi z greckiego i oznacza "święte znaki rzeźbione".' },
        { content: 'Jak nazywa się bóg słońca w mitologii egipskiej?', correctAnswer: 'Ra', options: ['Ozyrys', 'Anubis', 'Ra', 'Horus'], difficulty: 1, explanation: 'Ra był najważniejszym bogiem w panteonie egipskim, uosobieniem słońca i stwórcą świata. Płynął codziennie swoją barką przez niebo.' },
        { content: 'Co pozwoliło na odczytanie hieroglifów?', correctAnswer: 'Kamień z Rosetty', options: ['Kamień Filozoficzny', 'Piramida Cheopsa', 'Kamień z Rosetty', 'Złota Maska'], difficulty: 2, explanation: 'Kamień z Rosetty zawierał ten sam tekst w trzech wersjach: hieroglifach, piśmie demotycznym i grekach. To pozwoliło Champollionowi rozszyfrować hieroglify w 1822 roku.' },
        { content: 'Która rzeka była sercem cywilizacji egipskiej?', correctAnswer: 'Nil', options: ['Tygrys', 'Eufrat', 'Nil', 'Amazonka'], difficulty: 1, explanation: 'Nil to najdłuższa rzeka świata. Jej coroczne wylewy nawadniały i użyźniały ziemię, umożliwiając rolnictwo i rozwój cywilizacji egipskiej.' },
        { content: 'Proces konserwacji zwłok w starożytnym Egipcie to:', correctAnswer: 'Mumifikacja', options: ['Balsamowanie', 'Mumifikacja', 'Kremacja', 'Sarkofagowanie'], difficulty: 1, explanation: 'Mumifikacja to proces konserwacji ciała przez usunięcie narządów wewnętrznych i wysuszenie żywicami. Egipcjanie wierzyli, że zachowanie ciała jest niezbędne do życia pozagrobowego.' },
        { content: 'Kto był sędzią zmarłych w świecie podziemnym?', correctAnswer: 'Ozyrys', options: ['Anubis', 'Izyda', 'Ozyrys', 'Set'], difficulty: 2, explanation: 'Ozyrys był bogiem zmarłych i odrodzenia. Przewodniczył ceremonii ważenia serca, która decydowała o losie duszy w zaświatach. Anubis natomiast przeprowadzał sam proces mumifikacji.' },
      ]
    },
    {
      name: 'Starożytna Grecja',
      description: 'Kolebka demokracji, filozofii, teatru i igrzysk olimpijskich.',
      order: 2,
      cards: [
        { frontContent: '776 p.n.e.', backContent: 'Pierwsze odnotowane starożytne igrzyska olimpijskie.', type: 'DATE' },
        { frontContent: 'Demokracja', backContent: 'Ustrój polityczny Aten ("rządy ludu"), wprowadzony przez Kleistenesa.', type: 'TERM' },
        { frontContent: 'Leonidas', backContent: 'Król Sparty, który zginął broniąc wąwozu Termopile.', type: 'FIGURE' },
        { frontContent: 'Sokrates', backContent: 'Wielki filozof ateński, skazany na śmierć przez wypicie cykuty.', type: 'FIGURE' },
        { frontContent: 'Akropol', backContent: 'Wzgórze w Atenach, na którym znajduje się Partenon.', type: 'TERM' },
        { frontContent: 'Wojna Peloponeska', backContent: 'Konflikt między Atenami a Spartą o hegemonię w Grecji.', type: 'EVENT' },
        { frontContent: 'Aleksander Wielki', backContent: 'Macedoński król, twórca jednego z największych imperiów w historii.', type: 'FIGURE' },
        { frontContent: 'Homer', backContent: 'Niewidomy poeta, autor "Iliady" i "Odysei".', type: 'FIGURE' },
      ],
      questions: [
        { content: 'Skąd pochodził Aleksander Wielki?', correctAnswer: 'Macedonia', options: ['Ateny', 'Sparta', 'Macedonia', 'Persja'], difficulty: 1, explanation: 'Aleksander był królem Macedonii, państwa na północy Grecji. Jego ojciec Filip II zjednoczył greckie poleis, a Aleksander stworzył imperium sięgające od Grecji po Indie.' },
        { content: 'Kto wprowadził demokrację w Atenach?', correctAnswer: 'Kleistenes', options: ['Perykles', 'Platon', 'Kleistenes', 'Leonidas'], difficulty: 3, explanation: 'Kleistenes przeprowadził reformy w 508 p.n.e., wprowadzając system demokratyczny oparty na równości obywateli. Perykles później rozwinął tę demokrację do jej szczytowej formy.' },
        { content: 'Gdzie odbywały się starożytne igrzyska?', correctAnswer: 'W Olimpii', options: ['W Atenach', 'W Sparcie', 'W Olimpii', 'W Delfach'], difficulty: 1, explanation: 'Igrzyska olimpijskie odbywały się co 4 lata w Olimpii na cześć Zeusa. Tradycja trwała ponad tysiąc lat, od 776 p.n.e. do 393 n.e.' },
        { content: 'Jak zginął Sokrates?', correctAnswer: 'Wypił cykutę', options: ['Został ścięty', 'Wypił cykutę', 'Zginął w bitwie', 'Zmarł ze starości'], difficulty: 2, explanation: 'Sokrates został skazany na śmierć za "demoralizowanie młodzieży" i "nieposzanowanie bogów". Odmówił ucieczki i wypił truciznę z cykuty w 399 p.n.e.' },
        { content: 'Co znajduje się na Akropolu?', correctAnswer: 'Partenon', options: ['Koloseum', 'Partenon', 'Piramida', 'Forum Romanum'], difficulty: 1, explanation: 'Partenon to główna świątynia na ateńskim Akropolu, poświęcona bogini Atenie. Zbudowany w V wieku p.n.e., reprezentuje szczyt architektury greckiej.' },
        { content: 'Kto napisał "Iliadę" i "Odyseję"?', correctAnswer: 'Homer', options: ['Sokrates', 'Arystoteles', 'Homer', 'Sofokles'], difficulty: 1, explanation: 'Homer to legendarny grecki poeta z VIII wieku p.n.e. Jego epopeje opisują wojnę trojańską i powrót Odyseusza, stanowiąc fundament literatury europejskiej.' },
        { content: 'Z kim walczyli Spartanie pod Termopilami?', correctAnswer: 'Z Persami', options: ['Z Rzymianami', 'Z Persami', 'Z Kartaginą', 'Z Egipcjanami'], difficulty: 2, explanation: 'W 480 p.n.e. król Leonidas z 300 Spartanami bronił wąwozu przed ogromną armią perską Kserksesa. Wszyscy zginęli, ale ich heroizm stał się legendą.' },
      ]
    },
    {
      name: 'Starożytny Rzym',
      description: 'Od legendarnego założenia miasta, przez Republikę, aż po upadek Cesarstwa.',
      order: 3,
      cards: [
        { frontContent: '753 p.n.e.', backContent: 'Tradycyjna data założenia Rzymu przez Romulusa.', type: 'DATE' },
        { frontContent: 'Hannibal', backContent: 'Wódz Kartaginy, który przeprawił się ze słoniami przez Alpy.', type: 'FIGURE' },
        { frontContent: 'Juliusz Cezar', backContent: 'Rzymski wódz i dyktator, zamordowany w Idy Marcowe.', type: 'FIGURE' },
        { frontContent: 'Pax Romana', backContent: 'Długi okres pokoju i stabilizacji wewnątrz Imperium.', type: 'TERM' },
        { frontContent: 'Koloseum', backContent: 'Amfiteatr Flawiuszów, miejsce walk gladiatorów.', type: 'TERM' },
        { frontContent: 'Legion', backContent: 'Podstawowa jednostka armii rzymskiej (ok. 5-6 tys. żołnierzy).', type: 'TERM' },
        { frontContent: 'Rubikon', backContent: 'Rzeka, której przekroczenie przez Cezara oznaczało początek wojny domowej.', type: 'EVENT' },
        { frontContent: 'Oktawian August', backContent: 'Pierwszy cesarz rzymski.', type: 'FIGURE' },
      ],
      questions: [
        { content: 'Co oznacza "Alea iacta est"?', correctAnswer: 'Kości zostały rzucone', options: ['Kości zostały rzucone', 'Przybyliśmy, zobaczyliśmy', 'Biada zwyciężonym', 'Chwytaj dzień'], difficulty: 2, explanation: 'Słowa wypowiedziane przez Cezara podczas przekraczania Rubikonu w 49 p.n.e. To był punkt bez powrotu - rozpoczynał wojnę domową z senatem.' },
        { content: 'Kto był pierwszym cesarzem Rzymu?', correctAnswer: 'Oktawian August', options: ['Juliusz Cezar', 'Neron', 'Oktawian August', 'Trajan'], difficulty: 2, explanation: 'Oktawian, adoptowany syn Cezara, po wygraniu wojen domowych przyjął tytuł "Augustus" w 27 p.n.e i oficjalnie rozpoczął cesarstwo, choć formalnie zachował pozory republiki.' },
        { content: 'Z jakimi zwierzętami Hannibal przeprawił się przez Alpy?', correctAnswer: 'Ze słoniami', options: ['Z wielbłądami', 'Ze słoniami', 'Z niedźwiedziami', 'Z tygrysami'], difficulty: 1, explanation: 'Hannibal podczas II wojny punickiej przeszedł przez Alpy z 37 słoniami bojowymi. Ten śmiały manewr zaskoczył Rzymian, choć większość słoni zginęła w górach.' },
        { content: 'W jakim celu zbudowano Koloseum?', correctAnswer: 'Walki gladiatorów', options: ['Wyścigi rydwanów', 'Walki gladiatorów', 'Obrady senatu', 'Targowisko'], difficulty: 1, explanation: 'Koloseum (Amfiteatr Flawiuszów) mogło pomieścić 50 tysięcy widzów. Organizowano tam walki gladiatorów, polowania na dzikie zwierzęta i inscenizacje bitew morskich (naumachie).' },
        { content: 'Ile żołnierzy liczył rzymski legion?', correctAnswer: 'Około 5-6 tysięcy', options: ['100', '1000', 'Około 5-6 tysięcy', '50 tysięcy'], difficulty: 3, explanation: 'Standardowy legion składał się z około 5-6 tysięcy żołnierzy piechoty podzielonych na kohorty i centurie, plus kawaleria i wojska pomocnicze.' },
        { content: 'Z kim walczył Rzym w Wojnach Punickich?', correctAnswer: 'Z Kartaginą', options: ['Z Kartaginą', 'Z Grecją', 'Z Galią', 'Z Egiptem'], difficulty: 2, explanation: 'Wojny punickie (264-146 p.n.e.) to seria konfliktów między Rzymem a Kartaginą o dominację w basenie Morza Śródziemnego. Zakończyły się całkowitym zniszczeniem Kartaginy.' },
        { content: 'Jak zginął Juliusz Cezar?', correctAnswer: 'Został zasztyletowany', options: ['Został zasztyletowany', 'Zatruty winem', 'Zginął w bitwie', 'Spadł z konia'], difficulty: 1, explanation: 'Cezar został zamordowany 15 marca 44 p.n.e. (Idy Marcowe) przez grupę senatorów, wśród których był jego przyjaciel Brutus. Zadano mu 23 ciosy sztyletem.' },
      ]
    },
    {
      name: 'Wikingowie',
      description: 'Wojownicy, żeglarze i odkrywcy ze Skandynawii.',
      order: 4,
      cards: [
        { frontContent: 'Drakkar', backContent: 'Długa łódź wikingów z rzeźbionym dziobem (często głową smoka).', type: 'TERM' },
        { frontContent: 'Ragnarok', backContent: 'W mitologii nordyckiej: koniec świata i ostateczna bitwa bogów.', type: 'Event' },
        { frontContent: 'Lindisfarne (793 r.)', backContent: 'Atak na klasztor uznawany za początek epoki wikingów.', type: 'DATE' },
        { frontContent: 'Walhalla', backContent: 'Pałac Odyna, do którego trafiają polegli w chwale wojownicy.', type: 'TERM' },
        { frontContent: 'Leif Eriksson', backContent: 'Odkrywca, który dotarł do Ameryki Północnej przed Kolumbem.', type: 'FIGURE' },
        { frontContent: 'Thor', backContent: 'Bóg burzy i piorunów, dzierżący młot Mjolnir.', type: 'FIGURE' },
        { frontContent: 'Runy', backContent: 'Alfabet używany przez ludy germańskie i wikingów.', type: 'TERM' },
      ],
      questions: [
        { content: 'Jak nazywał się statek używany przez wikingów do wypraw wojennych?', correctAnswer: 'Drakkar', options: ['Drakkar', 'Karawela', 'Galeon', 'Trirema'], difficulty: 1, explanation: 'Drakkary to długie, smukłe łodzie wikingów z rzeźbionym dziobem w kształcie smoka. Dzięki płytkiemu zanurzeniu mogły płynąć zarówno po morzu, jak i rzekach.' },
        { content: 'Kto jest uważany za odkrywcę Ameryki Północnej przed Kolumbem?', correctAnswer: 'Leif Eriksson', options: ['Eryk Rudy', 'Leif Eriksson', 'Ragnar Lodbrok', 'Ivar Bez Kości'], difficulty: 2, explanation: 'Leif Eriksson około roku 1000 dotarł do Ameryki Północnej i założył osadę w "Winlandii" (prawdopodobnie Nowa Fundlandia), prawie 500 lat przed Kolumbem.' },
        { content: 'Co oznacza termin "Ragnarok"?', correctAnswer: 'Zmierzch Bogów', options: ['Święto plonów', 'Narodziny Odyna', 'Zmierzch Bogów', 'Pierwsza wiozna'], difficulty: 2, explanation: 'Ragnarok w mitologii nordyckiej to apokaliptyczna bitwa, w której bogowie zmierzą się z gigantami i potworami. Świat spłonie, ale odrodzi się na nowo.' },
        { content: 'Jak nazywa się młot boga Thora?', correctAnswer: 'Mjolnir', options: ['Gungnir', 'Mjolnir', 'Excalibur', 'Szczerbiec'], difficulty: 2, explanation: 'Mjolnir to magiczny młot wykuty przez krasnoludy, który zawsze wraca do ręki Thora po rzucie. Symbol mocy, ochrony i święcenia.' },
        { content: 'Kto włada Walhallą?', correctAnswer: 'Odyn', options: ['Thor', 'Loki', 'Odyn', 'Freja'], difficulty: 1, explanation: 'Odyn, najwyższy z bogów nordyckich, gromadził w Walhalli dusze poległych wojowników (Einherjarów), którzy mieli walczyć u jego boku podczas Ragnaroku.' },
        { content: 'W którym roku miał miejsce atak na Lindisfarne?', correctAnswer: '793 r.', options: ['966 r.', '793 r.', '1000 r.', '1066 r.'], difficulty: 3, explanation: 'Napad na klasztor Lindisfarne w 793 r. uznawany jest za symboliczny początek epoki wikingów. Brutalność ataku na święte miejsce zszokowała całą Europę.' },
        { content: 'Jak nazywali się wojownicy wpadający w szał bojowy?', correctAnswer: 'Berserkowie', options: ['Huskrolowie', 'Berserkowie', 'Jarl', 'Hoplita'], difficulty: 2, explanation: 'Berserkowie to elitarni wojownicy wikińscy, którzy wpadali w trans bojowy. Walczyli bez zbroi, nie czując bólu - stąd współczesne słowo "wściekły" (berserk).' },
      ]
    },
    {
      name: 'Polska Piastów',
      description: 'Początki państwowości polskiej, od Mieszka I do Kazimierza Wielkiego.',
      order: 5,
      cards: [
        { frontContent: '966 r.', backContent: 'Chrzest Polski przyjęty przez Mieszka I.', type: 'DATE' },
        { frontContent: 'Bolesław Chrobry', backContent: 'Pierwszy koronowany król Polski (1025 r.).', type: 'FIGURE' },
        { frontContent: 'Zjazd Gnieźnieński', backContent: 'Spotkanie Ottona III i Chrobrego (1000 r.).', type: 'EVENT' },
        { frontContent: 'Kazimierz Wielki', backContent: 'Zastał Polskę drewnianą, a zostawił murowaną.', type: 'FIGURE' },
        { frontContent: 'Rozbicie dzielnicowe', backContent: 'Podział Polski na księstwa po śmierci Krzywoustego (1138 r.).', type: 'TERM' },
        { frontContent: 'Bitwa pod Cedynią (972 r.)', backContent: 'Pierwsze zwycięstwo oręża polskiego (Mieszko I).', type: 'EVENT' },
        { frontContent: 'Szczerbiec', backContent: 'Miecz koronacyjny królów Polski.', type: 'TERM' },
      ],
      questions: [
        { content: 'Które wydarzenie symbolicznie zakończyło okres rozbicia dzielnicowego?', correctAnswer: 'Koronacja Władysława Łokietka', options: ['Śmierć Krzywoustego', 'Bitwa pod Legnicą', 'Koronacja Władysława Łokietka', 'Sprowadzenie Krzyżaków'], difficulty: 3, explanation: 'Koronacja Władysława Łokietka w 1320 roku w Krakowie oznaczała odzyskanie korony królewskiej i symboliczne zjednoczenie ziem polskich po 182 latach rozbicia.' },
        { content: 'Który król był synem Mieszka I i Dobrawy?', correctAnswer: 'Bolesław Chrobry', options: ['Mieszko II', 'Bolesław Chrobry', 'Kazimierz Odnowiciel', 'Bolesław Śmiały'], difficulty: 1, explanation: 'Bolesław Chrobry był pierwszym koronowanym królem Polski (1025). Za jego panowania Polska osiągnęła szczyt potęgi, obejmując Kraków, Morawy i Kijów.' },
        { content: 'Czym był Zjazd Gnieźnieński w 1000 roku?', correctAnswer: 'Spotkaniem sojuszników', options: ['Bitwą z Niemcami', 'Spotkaniem sojuszników', 'Wyborem papieża', 'Hołdem lennym'], difficulty: 2, explanation: 'Cesarz Otton III przybył do Gniezna jako pielgrzym do grobu św. Wojciecha. Spotkanie potwierdziło równoprawny sojusz Polski i Niemiec oraz utworzenie arcybiskupstwa w Gnieźnie.' },
        { content: 'W którym roku Mieszko I przyjął chrzest?', correctAnswer: '966 r.', options: ['996 r.', '966 r.', '1000 r.', '1025 r.'], difficulty: 1, explanation: 'Chrzest Polski w 966 roku włączył państwo Mieszka I do cywilizacji chrześcijańskiej Europy i zabezpieczył przed krucjatami misyjnymi niemieckimi.' },
        { content: 'O kim mówi się, że "zastał Polskę drewnianą, a zostawił murowaną"?', correctAnswer: 'Kazimierz Wielki', options: ['Bolesław Chrobry', 'Kazimierz Wielki', 'Władysław Łokietek', 'Mieszko I'], difficulty: 1, explanation: 'Kazimierz Wielki (1333-1370) rozbudował infrastrukturę Polski: założył 27 miast, wybudował ponad 50 zamków i skodyfikował prawo. "Ostatni z Piastów, pierwszy z królów".' },
        { content: 'Jakie było pierwsze historyczne zwycięstwo Mieszka I?', correctAnswer: 'Bitwa pod Cedynią', options: ['Bitwa pod Grunwaldem', 'Bitwa pod Cedynią', 'Bitwa pod Legnicą', 'Odsiecz Wiedeńska'], difficulty: 3, explanation: 'Bitwa pod Cedynią w 972 roku była pierwszym udokumentowanym zwycięstwem polskiego oręża. Mieszko I pokonał margrabiego Hodona, broniąc swojego państwa.' },
        { content: 'Jak nazywa się miecz koronacyjny królów Polski?', correctAnswer: 'Szczerbiec', options: ['Excalibur', 'Zulfikar', 'Szczerbiec', 'Durandal'], difficulty: 2, explanation: 'Szczerbiec to najważniejsze insygnia koronacyjne Rzeczypospolitej. Nazwa pochodzi od szczerby na ostrzu, według legend powstałej podczas uderzenia w Złotą Bramę Kijowa.' },
      ]
    },
    {
      name: 'Polska Jagiellonów',
      description: 'Złoty wiek kultury polskiej, unia z Litwą i potęga Rzeczypospolitej.',
      order: 6,
      cards: [
        { frontContent: '1385 r.', backContent: 'Unia w Krewie - początek unii polsko-litewskiej.', type: 'DATE' },
        { frontContent: 'Władysław Jagiełło', backContent: 'Wielki Książę Litewski i Król Polski, zwycięzca spod Grunwaldu.', type: 'FIGURE' },
        { frontContent: 'Hołd Pruski (1525)', backContent: 'Albrecht Hohenzollern składa hołd lenny Zygmuntowi Staremu.', type: 'EVENT' },
        { frontContent: 'Zygmunt August', backContent: 'Ostatni Jagiellon na tronie, doprowadził do Unii Lubelskiej (1569).', type: 'FIGURE' },
        { frontContent: 'Mikołaj Kopernik', backContent: '"Wstrzymał Słońce, ruszył Ziemię". Autor teorii heliocentrycznej.', type: 'FIGURE' },
        { frontContent: 'Stańczyk', backContent: 'Błazen królewski na dworze ostatnich Jagiellonów, symbol mądrości.', type: 'FIGURE' },
        { frontContent: 'Zygmunt Stary', backContent: 'Król Polski, za którego panowania nastąpił "Złoty Wiek".', type: 'FIGURE' },
      ],
      questions: [
        { content: 'Skąd pochodził Władysław Jagiełło?', correctAnswer: 'Z Litwy', options: ['Z Węgier', 'Z Litwy', 'Z Rusi', 'Z Czech'], difficulty: 1, explanation: 'Jagiełło był Wielkim Księciem Litewskim przed objęciem tronu polskiego. Związek Polski i Litwy przez unię personalną stworzył potężne państwo w Europie Wschodniej.' },
        { content: 'Kto złożył Hołd Pruski w 1525 roku?', correctAnswer: 'Albrecht Hohenzollern', options: ['Urlich von Jungingen', 'Albrecht Hohenzollern', 'Fryderyk Wielki', 'Bismarck'], difficulty: 2, explanation: 'Albrecht Hohenzollern, ostatni Wielki Mistrz Zakonu Krzyżackiego, zsekularyzował państwo zakonne i jako książę pruski złożył hołd lenny Zygmuntowi Staremu w Krakowie.' },
        { content: 'Jakie ważne wydarzenie miało miejsce w 1569 roku?', correctAnswer: 'Unia Lubelska', options: ['Bitwa pod Grunwaldem', 'Unia Lubelska', 'Konstytucja 3 Maja', 'Potop Szwedzki'], difficulty: 2, explanation: 'Unia Lubelska utworzyła Rzeczpospolitą Obojga Narodów - federację Polski i Litwy ze wspólnym sejmem i królem. Była to jedna z największych potęg ówczesnej Europy.' },
        { content: 'Czego dotyczyła teoria Mikołaja Kopernika?', correctAnswer: 'Heliocentryzmu', options: ['Geocentryzmu', 'Płaskiej Ziemi', 'Heliocentryzmu', 'Grawitacji'], difficulty: 1, explanation: 'Kopernik udowodnił, że to Ziemia krąży wokół Słońca, a nie odwrotnie. Jego dzieło "De revolutionibus" (1543) wywołało rewolucję naukową i zmieniło spojrzenie na wszechświat.' },
        { content: 'Kto był ostatnim Jagiellonem na tronie Polski?', correctAnswer: 'Zygmunt August', options: ['Zygmunt Stary', 'Zygmunt August', 'Władysław Warneńczyk', 'Anna Jagiellonka'], difficulty: 2, explanation: 'Zygmunt II August (1548-1572) był ostatnim męskim przedstawicielem dynastii. Jego śmierć oznaczała koniec dynastii i początek wolnej elekcji w Rzeczypospolitej.' },
        { content: 'Kim był Stańczyk?', correctAnswer: 'Królewskim błaznem', options: ['Generałem', 'Biskupem', 'Królewskim błaznem', 'Malarzem'], difficulty: 1, explanation: 'Stańczyk był nadwornym błaznem ostatnich Jagiellonów. Jako jedyny pozwalał sobie na otwartą krytykę władzy - stał się symbolem mądrego patriotyzmu i troski o państwo.' },
        { content: 'Kto zwyciężył pod Grunwaldem?', correctAnswer: 'Władysław Jagiełło', options: ['Kazimierz Wielki', 'Władysław Jagiełło', 'Jan III Sobieski', 'Stefan Batory'], difficulty: 1, explanation: 'W bitwie pod Grunwaldem (1410) wojska polsko-litewskie pod wodzą Władysława Jagiełły rozbiły zakon krzyżacki, kończąc jego ekspansję na wschód.' },
      ]
    },
    {
      name: 'Epoka Napoleońska',
      description: 'Czas wielkich podbojów, Legionów Polskich i Księstwa Warszawskiego.',
      order: 7,
      cards: [
        { frontContent: 'Mazurek Dąbrowskiego', backContent: 'Pieśń Legionów Polskich we Włoszech, dzisiejszy hymn Polski.', type: 'TERM' },
        { frontContent: '1812 r.', backContent: 'Wyprawa Napoleona na Moskwę, początek jego upadku.', type: 'DATE' },
        { frontContent: 'Księstwo Warszawskie', backContent: 'Państwo polskie utworzone przez Napoleona w 1807 r.', type: 'TERM' },
        { frontContent: 'Józef Poniatowski', backContent: 'Marszałek Francji i wódz naczelny wojsk Księstwa Warszawskiego. Zginął pod Lipskiem.', type: 'FIGURE' },
        { frontContent: 'Bitwa pod Waterloo', backContent: 'Ostateczna klęska Napoleona w 1815 roku.', type: 'EVENT' },
        { frontContent: 'Kodeks Napoleona', backContent: 'Zbiór praw cywilnych, który wprowadził nowoczesne zasady prawne w Europie.', type: 'TERM' },
        { frontContent: 'Elba', backContent: 'Wyspa, na którą Napoleon został zesłany po raz pierwszy.', type: 'TERM' },
      ],
      questions: [
        { content: 'Gdzie zginął książę Józef Poniatowski?', correctAnswer: 'W nurtach Elstery (Lipsk)', options: ['Pod Waterloo', 'Pod Raszynem', 'Pod Samosierrą', 'W nurtach Elstery (Lipsk)'], difficulty: 3, explanation: 'Józef Poniatowski, jedyny Polak - marszałek Francji, zginął podczas "Bitwy Narodów" pod Lipskiem w 1813 roku, osłaniając odwrót napoleońskich wojsk przez rzekę Elsterę.' },
        { content: 'Co utworzył Napoleon na ziemiach polskich w 1807 roku?', correctAnswer: 'Księstwo Warszawskie', options: ['Królestwo Polskie', 'Księstwo Warszawskie', 'Rzeczpospolitą', 'Galicję'], difficulty: 1, explanation: 'Księstwo Warszawskie było namiastką niepodległego państwa polskiego, utworzoną po pokoju w Tylży. Istniało w latach 1807-1815 pod protektoratem Francji.' },
        { content: 'Kto jest autorem słów Mazurka Dąbrowskiego?', correctAnswer: 'Józef Wybicki', options: ['Jan Henryk Dąbrowski', 'Józef Wybicki', 'Adam Mickiewicz', 'Juliusz Słowacki'], difficulty: 1, explanation: 'Józef Wybicki napisał "Pieśń Legionów Polskich we Włoszech" w 1797 roku. Od 1927 roku Mazurek Dąbrowskiego jest hymnem narodowym Polski.' },
        { content: 'Gdzie Napoleon poniósł ostateczną klęskę?', correctAnswer: 'Pod Waterloo', options: ['Pod Lipskiem', 'Pod Austerlitz', 'Pod Waterloo', 'Pod Borodino'], difficulty: 1, explanation: 'Bitwa pod Waterloo 18 czerwca 1815 roku zakończyła się klęską Napoleona. Pokonały go połączone siły Wellington\'a i Blüchera, kończąc "Sto Dni" i karierę cesarza.' },
        { content: 'Jaki tytuł nosił Napoleon Bonaparte?', correctAnswer: 'Cesarz Francuzów', options: ['Król Francji', 'Cesarz Francuzów', 'Prezydent', 'Konsul'], difficulty: 1, explanation: 'Napoleon koronował się na "Cesarza Francuzów" 2 grudnia 1804 roku w Notre Dame. Był najpierw I Konsulem (1799-1804), potem cesarzem (1804-1814, 1815).' },
        { content: 'Dokąd udał się Napoleon w 1812 roku?', correctAnswer: 'Na Moskwę', options: ['Do Egiptu', 'Na Londyn', 'Na Moskwę', 'Do Hiszpanii'], difficulty: 1, explanation: 'Wyprawa na Rosję w 1812 roku była początkiem upadku Napoleona. Wielka Armia zdobyła Moskwę, ale katastrofalny odwrót w zimie zniszczył jego potęgę militarną.' },
        { content: 'Jakie było hasło Legionów Polskich?', correctAnswer: 'Wolni ludzie są braćmi', options: ['Bóg, Honor, Ojczyzna', 'Wolni ludzie są braćmi', 'Za naszą wolność i waszą', 'Jeszcze Polska nie zginęła'], difficulty: 3, explanation: 'Hasło "Wolni ludzie są braćmi" wyrażało republikańskie ideały Legionów Dąbrowskiego. Legioniści walczyli u boku Napoleona, wierząc że pomoże odbudować Polskę.' },
      ]
    },
    {
      name: 'II Wojna Światowa',
      description: 'Globalny konflikt totalny (1939-1945).',
      order: 8,
      cards: [
        { frontContent: '1 września 1939', backContent: 'Atak Niemiec na Polskę, początek II wojny światowej.', type: 'DATE' },
        { frontContent: 'Holokaust', backContent: 'Systematyczna zagłada Żydów dokonana przez III Rzeszę.', type: 'TERM' },
        { frontContent: 'Powstanie Warszawskie', backContent: 'Największy zryw ruchu oporu w okupowanej Europie (1944).', type: 'EVENT' },
        { frontContent: 'Monte Cassino', backContent: 'Wzgórze zdobyte przez 2. Korpus Polski gen. Andersa.', type: 'EVENT' },
        { frontContent: 'Hiroshima', backContent: 'Miasto zniszczone przez pierwszą bombę atomową (1945).', type: 'TERM' },
        { frontContent: 'Bitwa o Anglię', backContent: 'Powietrzna bitwa, w której sławę zyskał Dywizjon 303.', type: 'EVENT' },
        { frontContent: 'D-Day (1944)', backContent: 'Lądowanie aliantów w Normandii, otwarcie drugiego frontu.', type: 'EVENT' },
      ],
      questions: [
        { content: 'Jaka operacja zapoczątkowała inwazję III Rzeszy na ZSRR?', correctAnswer: 'Barbarossa', options: ['Overlord', 'Barbarossa', 'Cytadela', 'Market Garden'], difficulty: 2, explanation: 'Operacja Barbarossa, rozpoczęta 22 czerwca 1941, była największą inwazją w historii wojen. Niemcy złamały pakt Ribbentrop-Mołotow, atakując Związek Radziecki.' },
        { content: 'Która bitwa jest uznawana za punkt zwrotny wojny na Pacyfiku?', correctAnswer: 'Bitwa o Midway', options: ['Pearl Harbor', 'Bitwa o Midway', 'Iwo Jima', 'Okinawa'], difficulty: 2, explanation: 'Bitwa o Midway (czerwiec 1942) zakończyła się zniszczeniem 4 japońskich lotniskowców. Od tego momentu Japonia utraciła inicjatywę strategiczną na Pacyfiku.' },
        { content: 'Kto był przywódcą III Rzeszy?', correctAnswer: 'Adolf Hitler', options: ['Joseph Goebbels', 'Heinrich Himmler', 'Adolf Hitler', 'Hermann Göring'], difficulty: 1, explanation: 'Adolf Hitler, dyktator III Rzeszy, był odpowiedzialny za wybuch II wojny światowej oraz zbrodnie ludobójstwa, w tym Holokaust.' },
        { content: 'Kiedy wybuchła II wojna światowa?', correctAnswer: '1 września 1939', options: ['17 września 1939', '1 września 1939', '11 listopada 1918', '8 maja 1945'], difficulty: 1, explanation: '1 września 1939 roku niemiecki pancernik Schleswig-Holstein ostrzelał Westerplatte, a wojska niemieckie przekroczyły granice Polski, rozpoczynając globalny konflikt.' },
        { content: 'Jakie miasto zostało zniszczone pierwszą bombą atomową?', correctAnswer: 'Hiroshima', options: ['Nagasaki', 'Tokio', 'Hiroshima', 'Kioto'], difficulty: 1, explanation: '6 sierpnia 1945 roku amerykańska superforteca Enola Gay zrzuciła bombę "Little Boy" na Hiroshimę, co doprowadziło do natychmiastowej śmierci dziesiątek tysięcy ludzi.' },
        { content: 'Kto dowodził polskimi wojskami pod Monte Cassino?', correctAnswer: 'Władysław Anders', options: ['Władysław Sikorski', 'Stanisław Maczek', 'Władysław Anders', 'Michał Karaszewicz-Tokarzewski'], difficulty: 2, explanation: 'Generał Władysław Anders dowodził 2. Korpusem Polskim, który w maju 1944 roku zdobył kluczowe wzgórze Monte Cassino, otwierając aliantom drogę na Rzym.' },
        { content: 'Jakim kryptonimem określano godzinę wybuchu Powstania Warszawskiego?', correctAnswer: 'Godzina "W"', options: ['Godzina "Z"', 'Godzina "W"', 'Godzina "P"', 'Godzina "X"'], difficulty: 2, explanation: 'Godzina "W" (Wybuch/Wolność) została wyznaczona na 17:00, 1 sierpnia 1944 roku. Był to sygnał do rozpoczęcia walki przeciwko niemieckiemu okupantowi w Warszawie.' },
      ]
    },
  ];

  // --- 2. AKTUALIZACJA TEMATÓW (UPSERT + REPLACE CHILDREN) ---

  for (const topicData of allTopicsData) {
    console.log(`Processing topic: ${topicData.name}...`);
    // Najpierw tworzymy lub aktualizujemy sam temat
    const topic = await prisma.topic.upsert({
      where: { name: topicData.name },
      update: {
        description: topicData.description,
        order: topicData.order,
      },
      create: {
        name: topicData.name,
        description: topicData.description,
        order: topicData.order,
      }
    });

    // Teraz USUWAMY stare karty i pytania (wymuszenie pełnej aktualizacji)
    await prisma.studyCard.deleteMany({ where: { topicId: topic.id } });
    await prisma.question.deleteMany({ where: { topicId: topic.id } }); // Zadziała, bo mamy onDelete: Cascade w UserAnswer

    // TWORZYMY nowe
    await prisma.studyCard.createMany({
      data: topicData.cards.map(c => ({ topicId: topic.id, ...c, type: c.type as any }))
    });

    await prisma.question.createMany({
      data: topicData.questions.map(q => ({ topicId: topic.id, ...q }))
    });
  }

  // --- 3. SEEDOWANIE OSI CZASU, BITEW I STROJÓW (BEZ ZMIAN) ---
  console.log('⏳ Tworzenie Wielkiej Osi Czasu...');
  try { await prisma.timelineEvent.deleteMany({}); } catch (e) { }

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

  console.log('⚔️ Tworzenie Bazy Bitew (Tryb AI)...');
  try { await prisma.historicalBattle.deleteMany({}); } catch (e) { }

  await prisma.historicalBattle.createMany({
    data: [
      {
        name: 'Bitwa pod Grunwaldem',
        year: '1410',
        winner: 'Polska i Litwa',
        loser: 'Zakon Krzyżacki',
        forces: 'Unia Polsko-Litewska vs Zakon Krzyżacki',
        description: 'Jedna z największych bitew średniowiecznej Europy. Złamano potęgę Zakonu.',
        prompt: 'Battle of Grunwald year 1410, EXTREME WIDE ANGLE PANORAMIC VIEW from above (aerial perspective). Massive scale battle scene showing THOUSANDS of medieval armored knights in full plate armor fighting on horses with swords lances and maces. Polish and Lithuanian banners versus Teutonic Knights white mantles with black crosses. Epic cinematic composition similar to Jan Matejko paintings but in PHOTOREALISTIC style. Entire battlefield visible, horizon in distance. Hyper-realistic, 8K, highly detailed, dramatic lighting, war photography.',
      },
      {
        name: 'Bitwa pod Termopilami',
        year: '480 p.n.e.',
        winner: 'Persowie',
        loser: 'Spartanie',
        forces: '300 Spartan vs Armia Perska',
        description: 'Heroiczna obrona wąwozu przez króla Leonidasa i jego 300 wojowników.',
        prompt: 'Battle of Thermopylae year 480 BC ancient Greece, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing 300 Spartan hoplites in bronze helmets and red cloaks defending narrow mountain pass against THOUSANDS of Persian soldiers. Ancient warfare, shield walls, long spears. Epic cinematic composition, photojournalism style. Hyper-realistic, 8K, highly detailed, dust and action.',
      },
      {
        name: 'Bitwa pod Waterloo',
        year: '1815',
        winner: 'Koalicja',
        loser: 'Francja',
        forces: 'Napoleon vs Wellington i Blücher',
        description: 'Ostateczna klęska Napoleona Bonaparte, kończąca jego panowanie.',
        prompt: 'Battle of Waterloo year 1815, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle scenic showing masses of Napoleonic soldiers in bicorne hats and blue coats fighting British redcoats. Cavalry charges of Cuirassiers, artillery cannons firing smoke, infantry squares. Epic cinematic composition similar to classical paintings but in PHOTOREALISTIC style. Entire battlefield visible. Hyper-realistic, 8K, dramatic lighting.',
      },
      {
        name: 'Bitwa pod Stalingradem',
        year: '1942-1943',
        winner: 'ZSRR',
        loser: 'III Rzesza',
        forces: 'Wehrmacht vs Armia Czerwona',
        description: 'Najkrwawsza bitwa II wojny światowej, punkt zwrotny na froncie wschodnim.',
        prompt: 'Battle of Stalingrad year 1942 World War 2, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive urban warfare scene showing Soviet soldiers fighting German Wehrmacht in ruined city. Destroyed concrete buildings, rubble, tanks bombing, winter snow smoke. Epic cinematic composition, dark and gritty war photography style. Hyper-realistic, 8K, highly detailed action scene.',
      },
      {
        name: 'Odsiecz Wiedeńska',
        year: '1683',
        winner: 'Rzeczpospolita i Austria',
        loser: 'Imperium Osmańskie',
        forces: 'Husaria i koalicja vs Armia Turecka',
        description: 'Król Jan III Sobieski ratuje Europę przed inwazją turecką. Szarża husarii.',
        prompt: 'Battle of Vienna 1683, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing the largest cavalry charge in history. Winged Hussars (Polish heavy cavalry with wings on backs) charging down hill against Ottoman Turkish army camps. Epic cinematic composition similar to Jan Matejko paintings but in PHOTOREALISTIC style. Horses running, lances, armor shining in sun. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Hastings',
        year: '1066',
        winner: 'Normanowie',
        loser: 'Anglicy',
        forces: 'Wilhelm Zdobywca vs Harold Godwinson',
        description: 'Ustanowienie panowania normańskiego w Anglii. Śmierć króla Harolda.',
        prompt: 'Battle of Hastings year 1066, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Norman knights on horses with chainmail armor charging uphill against Saxon shield wall infantry with axes. Green grassy hill terrain. Epic cinematic composition, authentic medieval warfare. Hyper-realistic, 8K, highly detailed.',
      },
      {
        name: 'Bitwa pod Kircholmem',
        year: '1605',
        winner: 'Rzeczpospolita',
        loser: 'Szwecja',
        forces: 'Husaria (Chodkiewicz) vs Szwedzi',
        description: 'Genialne zwycięstwo małych sił polskich nad przeważającą armią szwedzką.',
        prompt: 'Battle of Kircholm 1605, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Polish Winged Hussars charging into Swedish pike formations. Dust stirring, horses galloping, sun shining on armor. Epic cinematic composition, dynamic action. Hyper-realistic, 8K, detailed historical reconstruction.',
      },
      {
        name: 'Bitwa pod Trafalgarem',
        year: '1805',
        winner: 'Wielka Brytania',
        loser: 'Francja i Hiszpania',
        forces: 'Flota Nelsona vs Flota Napoleona',
        description: 'Największa bitwa morska ery żaglowców. Śmierć admirała Nelsona.',
        prompt: 'Battle of Trafalgar 1805, EXTREME WIDE ANGLE PANORAMIC VIEW from above ocean. Massive naval battle showing dozens of huge wooden sailing warships with white sails firing cannons at each other on blue sea. Smoke from gunpowder, broken masts, ships crashing. Epic cinematic composition, seascape painting style but PHOTOREALISTIC. Hyper-realistic, 8K, highly detailed.',
      },
      {
        name: 'Bitwa pod Midway',
        year: '1942',
        winner: 'USA',
        loser: 'Japonia',
        forces: 'Lotniskowce US Navy vs IJN',
        description: 'Bitwa lotniskowców, która złamała potęgę japońskiej floty na Pacyfiku.',
        prompt: 'Battle of Midway 1942 World War 2, EXTREME WIDE ANGLE PANORAMIC VIEW from high aerial perspective over ocean. Massive naval battle showing aircraft carriers burning on blue sea, fighter planes diving and dogfighting in sky. Smoke columns rising, explosions on ships. Epic cinematic war photography action. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Kannami',
        year: '216 p.n.e.',
        winner: 'Kartagina',
        loser: 'Rzym',
        forces: 'Hannibal vs Republika Rzymska',
        description: 'Genialny manewr oskrzydlający Hannibala, całkowite zniszczenie rzymskiej armii.',
        prompt: 'Battle of Cannae 216 BC, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Carthaginian army of Hannibal (including war elephants) surrounding and crushing Roman Legions in a dust plain. Ancient warfare, thousands of soldiers fighting. Epic cinematic composition, historical reconstruction. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Issos',
        year: '333 p.n.e.',
        winner: 'Macedonia',
        loser: 'Persja',
        forces: 'Aleksander Wielki vs Dariusz III',
        description: 'Decydujące starcie Aleksandra z królem królów, otwierające drogę do Azji.',
        prompt: 'Battle of Issus 333 BC, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Alexander the Great cavalry charging against huge Persian army with chariots. River bank terrain. Epic cinematic composition similar to ancient mosaics but in PHOTOREALISTIC style. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa Warszawska',
        year: '1920',
        winner: 'Polska',
        loser: 'Rosja Sowiecka',
        forces: 'Wojsko Polskie vs Armia Czerwona',
        description: 'Cud nad Wisłą - powstrzymanie ekspansji bolszewizmu na Zachód.',
        prompt: 'Battle of Warsaw 1920, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Polish soldiers defending trenches near river Vistula against charging Soviet cavalry masses. Early 20th century warfare, uniforms, biplanes in sky. Epic cinematic composition, patriotic war photography style. Hyper-realistic, 8K, highly detailed.',
      },
      {
        name: 'Bitwa pod Gaugamelą',
        year: '331 p.n.e.',
        winner: 'Macedonia',
        loser: 'Persja',
        forces: 'Aleksander Wielki vs Dariusz III',
        description: 'Ostateczne starcie, w którym Aleksander rozbił perskie rydwany i zdobył imperium.',
        prompt: 'Battle of Gaugamela 331 BC, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle on dusty plain showing Macedonian phalanx formations with long pikes versus Persian army with scythed CHARIOTS and war elephants. Epic cinematic composition, ancient warfare chaos. Hyper-realistic, 8K, highly detailed, dramatic lighting.',
      },
      {
        name: 'Bitwa pod Kadesz',
        year: '1274 p.n.e.',
        winner: 'Nierozstrzygnięta',
        loser: 'Nierozstrzygnięta',
        forces: 'Egipt vs Hetyci',
        description: 'Największa bitwa rydwanów w historii starożytnej. Ramzes II kontra Muwatallis II.',
        prompt: 'Battle of Kadesh 1274 BC Ancient Egypt, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing THOUSANDS of Egyptian war chariots with horses fighting Hittite chariots near Orontes river. Desert dust, golden armor, pharaoh Ramzes II leading charge. Epic cinematic composition, ancient history masterpiece. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Akcjum',
        year: '31 p.n.e.',
        winner: 'Oktawian August',
        loser: 'Antoniusz i Kleopatra',
        forces: 'Rzym (Oktawian) vs Rzym (Antoniusz) i Egipt',
        description: 'Decydująca bitwa morska, po której Rzym stał się Cesarstwem.',
        prompt: 'Battle of Actium 31 BC, EXTREME WIDE ANGLE PANORAMIC VIEW from above ocean. Massive ancient naval battle showing hundreds of Roman galleys (triremes) and heavy Egyptian warships clashing on blue Mediterranean sea. Sails, rowing oars, catapults firing. Epic cinematic composition, seascape history. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa na Polach Katalaunijskich',
        year: '451',
        winner: 'Rzym i Wizygoci',
        loser: 'Hunowie',
        forces: 'Aecjusz i Teodoryk vs Attyla',
        description: 'Powstrzymanie inwazji Hunów na Galię. "Ostatnie wielkie zwycięstwo Rzymu".',
        prompt: 'Battle of the Catalaunian Plains 451 AD, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Roman legions and Visigoth warriors fighting Hunnish horse archers on vast grassy plain. Late antiquity warfare, chaos, burning wagons. Epic cinematic composition, historical drama. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Poitiers',
        year: '732',
        winner: 'Frankowie',
        loser: 'Kalifat Umajjadów',
        forces: 'Karol Młot vs Abd ar-Rahman',
        description: 'Zatrzymanie arabskiej ekspansji w Europie Zachodniej przez frankijską piechotę.',
        prompt: 'Battle of Tours (Poitiers) 732 AD, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Frankish infantry shield wall defending hill against Arab heavy cavalry charge. Early medieval warfare, chainmail, swords. Epic cinematic composition, clash of civilizations. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa pod Lipskiem',
        year: '1813',
        winner: 'Koalicja',
        loser: 'Francja',
        forces: 'Napoleon vs Rosja, Prusy, Austria, Szwecja',
        description: '"Bitwa Narodów" - największa bitwa w historii Europy przed I wojną światową.',
        prompt: 'Battle of Leipzig 1813, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive scale battle showing Napoleonic French army surrounded by allied armies (Russian, Prussian, Austrian). Thousands of soldiers, cannons firing smoke, cavalry charges, city of Leipzig in background. Epic cinematic composition, war painting style. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Bitwa o Anglię',
        year: '1940',
        winner: 'Wielka Brytania',
        loser: 'III Rzesza',
        forces: 'RAF vs Luftwaffe',
        description: 'Pierwsza wielka bitwa toczona wyłącznie w powietrzu. Obrona Wielkiej Brytanii.',
        prompt: 'Battle of Britain 1940 World War 2, EXTREME WIDE ANGLE PANORAMIC VIEW of the sky. Massive aerial battle showing dozens of Spitfire and Hurricane fighter planes dogfighting with German Messerschmitts and Heinkel bombers above English Channel / Dover cliffs. Contrails, smoke trails, explosions in sky. Epic cinematic composition, aviation art. Hyper-realistic, 8K, detailed.',
      },
      {
        name: 'Lądowanie w Normandii (D-Day)',
        year: '1944',
        winner: 'Alianci',
        loser: 'III Rzesza',
        forces: 'USA, UK, Kanada vs Niemcy',
        description: 'Największa operacja desantowa w historii. Otwarcie drugiego frontu w Europie.',
        prompt: 'D-Day Normandy Landings 1944, EXTREME WIDE ANGLE PANORAMIC VIEW from above beach. Massive scale invasion scene showing thousands of American soldiers storning Omaha Beach from landing crafts (Higgins boats). German bunkers on cliffs firing, explosions in sand, obstacles. Epic cinematic war movie style (Saving Private Ryan). Hyper-realistic, 8K, gritty detail.',
      },
      {
        name: 'Bitwa pod Azincourt',
        year: '1415',
        winner: 'Anglia',
        loser: 'Francja',
        forces: 'Henryk V vs Francuskie Rycerstwo',
        description: 'Triumf angielskich łuczników nad ciężką jazdą francuską w błocie.',
        prompt: 'Battle of Agincourt 1415, EXTREME WIDE ANGLE PANORAMIC VIEW from above. Massive medieval battle showing English longbowmen firing volleys of arrows at French armored knights stuck in deep mud. Wet autumn weather, grey sky. Epic cinematic composition, authenticity. Hyper-realistic, 8K, highly detailed.',
      },
      {
        name: 'Bitwa pod Salaminą',
        year: '480 p.n.e.',
        winner: 'Grecy',
        loser: 'Persowie',
        forces: 'Temistokles vs Kserkses I',
        description: 'Morskie zwycięstwo Greków, które uratowało ich cywilizację przed inwazją.',
        prompt: 'Battle of Salamis 480 BC, EXTREME WIDE ANGLE PANORAMIC VIEW from above sea straits. Massive ancient naval battle showing Greek triremes ramming and sinking Persian ships in narrow straits between islands. Chaos of broken wood, sails, oars. Epic cinematic composition, ancient history. Hyper-realistic, 8K, detailed.',
      },
    ]
  });

  console.log('👗 Tworzenie Bazy Strojów (Tryb AI)...');
  try { await prisma.historicalCostume.deleteMany({}); } catch (e) { }

  await prisma.historicalCostume.createMany({
    data: [
      {
        name: 'Nemes (Faraon)',
        era: 'Starożytny Egipt',
        class: 'Władca',
        description: 'Ikoniczne pasiaste nakrycie głowy noszone przez faraonów, symbolizujące władzę.',
        prompt: 'Full body portrait of an Egyptian Pharaoh wearing gold and blue striped Nemes headdress and royal kilt. Ancient Egypt 1300 BC. Museum quality costume documentation, studio lighting, neutral dark background, 8K, hyper-realistic, gold jewelry details.',
      },
      {
        name: 'Kalasiris (Królowa)',
        era: 'Starożytny Egipt',
        class: 'Arystokracja',
        description: 'Długa, obcisła lniana suknia noszona przez kobiety w starożytnym Egipcie.',
        prompt: 'Full body portrait of an Egyptian Queen wearing white linen Kalasiris dress and gold collar necklace. Ancient Egypt. Museum quality costume documentation, studio lighting, neutral background, 8K, detailed fabric texture.',
      },
      {
        name: 'Toga (Senator)',
        era: 'Starożytny Rzym',
        class: 'Patrycjusz',
        description: 'Obszerna wełniana szata, oznaka rzymskiego obywatelstwa i wysokiego statusu.',
        prompt: 'Full body portrait of a Roman Senator wearing white wool Toga with purple stripe. Ancient Rome. Museum quality costume documentation, studio lighting, neutral dark background, 8K, highly detailed fabric folds.',
      },
      {
        name: 'Lorica Segmentata (Centurion)',
        era: 'Starożytny Rzym',
        class: 'Wojskowy',
        description: 'Pancerz folgowy używany przez rzymskich legionistów, zapewniający świetną ochronę.',
        prompt: 'Full body portrait of a Roman Centurion wearing Lorica Segmentata armor, red tunic and galeap helmet with transverse crest. Ancient Rome. Museum quality costume documentation, studio lighting, neutral dark background, 8K, shining steel texture.',
      },
      {
        name: 'Zbroja Płytowa',
        era: 'Średniowieczna Europa',
        class: 'Rycerstwo',
        description: 'Pełna zbroja z hartowanej stali, szczytowe osiągnięcie płatnerstwa XV wieku.',
        prompt: 'Full body portrait of a medieval Knight in shining full plate armor (Milanese style). 15th Century Europe. Holding a sword. Museum quality costume documentation, studio lighting, neutral dark background, 8K, hyper-realistic metal reflection, no helmet.',
      },
      {
        name: 'Suknia Gotycka',
        era: 'Średniowieczna Europa',
        class: 'Arystokracja',
        description: 'Reprezentacyjna suknia z wysokim stanem i długimi rękawami.',
        prompt: 'Full body portrait of a medieval Noblewoman wearing detailed Gothic Dress made of velvet and silk with hennin hat. 15th Century Europe. Museum quality costume documentation, studio lighting, neutral dark background, 8K, rich colors.',
      },
      {
        name: 'Kolczuga i Futro (Jarl)',
        era: 'Wikingowie',
        class: 'Wódz',
        description: 'Ciężka kolczuga i futro niedźwiedzia, typowe dla wodzów północy.',
        prompt: 'Full body portrait of a Viking Jarl wearing chainmail armor, heavy fur cloak and holding an axe. 9th Century Scandinavia. Museum quality costume documentation, studio lighting, neutral dark background, 8K, rugged beard, weather beaten face.',
      },
      {
        name: 'Skórzany Pancerz (Tarczowniczka)',
        era: 'Wikingowie',
        class: 'Wojowniczka',
        description: 'Lekki pancerz skórzany zapewniający mobilność w walce.',
        prompt: 'Full body portrait of a Viking Shieldmaiden wearing leather armor and holding a round wooden shield. 9th Century. Museum quality costume documentation, studio lighting, neutral dark background, 8K, braided hair, fierce expression.',
      },
      {
        name: 'Zbroja O-Yoroi',
        era: 'Japonia Edo',
        class: 'Samuraj',
        description: 'Klasyczna zbroja samurajska składająca się z małych płytek łączonych jedwabiem.',
        prompt: 'Full body portrait of a Samurai warrior wearing O-Yoroi armor and holding a Katana. Feudal Japan. Museum quality costume documentation, studio lighting, neutral dark background, 8K, intricate lacing details, kabuto helmet.',
      },
      {
        name: 'Kimono Jedwabne',
        era: 'Japonia Edo',
        class: 'Gejsza/Dama',
        description: 'Kunsztownie zdobione jedwabne kimono z pasem obi.',
        prompt: 'Full body portrait of a Japanese woman wearing elaborate floral silk Kimono and Obi sash. Edo Period Japan. Museum quality costume documentation, studio lighting, neutral dark background, 8K, traditional hairstyle, white makeup.',
      },
      {
        name: 'Płaszcz Duster',
        era: 'Dziki Zachód',
        class: 'Rewolwerowiec',
        description: 'Długi płaszcz chroniący przed kurzem prerii, popularny wśród jeźdźców.',
        prompt: 'Full body portrait of a Wild West Cowboy wearing long duster coat, stetson hat and leather boots. 1880s American Frontier. holding a revolver. Museum quality costume documentation, studio lighting, neutral dark background, 8K, weathered leather texture.',
      },
      {
        name: 'Kamizelka i Gwiazda',
        era: 'Dziki Zachód',
        class: 'Szeryf',
        description: 'Formalny strój stróża prawa na Dzikim Zachodzie.',
        prompt: 'Full body portrait of a Wild West Sheriff wearing vest with silver star badge, white shirt and black trousers. 1880s. Museum quality costume documentation, studio lighting, neutral dark background, 8K, serious expression, mustache.',
      },
      {
        name: 'Mundur Huzara',
        era: 'Czasy Napoleońskie',
        class: 'Kawaleria',
        description: 'Bogato zdobiony mundur z dolmanem i szamerunkiem.',
        prompt: 'Full body portrait of a Napoleonic Hussar wearing intricate dolman jacket with gold braiding (frogging) and fur pelisse. 19th Century. Museum quality costume documentation, studio lighting, neutral dark background, 8K, colorful uniform.',
      },
      {
        name: 'Suknia w stylu Empire',
        era: 'Czasy Napoleońskie',
        class: 'Dama',
        description: 'Lekka, zwiewna suknia z podwyższonym stanem, wzorowana na antyku.',
        prompt: 'Full body portrait of a Lady wearing white muslin Empire style dress with high waist. Regency Era 1810. Museum quality costume documentation, studio lighting, neutral dark background, 8K, elegant pose.',
      },
      {
        name: 'Żupan i Kontusz',
        era: 'Polska Szlachecka',
        class: 'Szlachcic',
        description: 'Narodowy strój polskiej szlachty, symbol sarmatyzmu.',
        prompt: 'Full body portrait of a Polish Nobleman (Szlachcic) wearing crimson Kontusz robe over Zupan with decorative sash (Pas kontuszowy). 17th Century Poland. Museum quality costume documentation, studio lighting, neutral dark background, 8K, holding a saber (karabela), mustache.',
      },
      {
        name: 'Zbroja Husarska',
        era: 'Polska Szlachecka',
        class: 'Husaria',
        description: 'Półpancerz z charakterystycznymi skrzydłami mocowanymi do pleców.',
        prompt: 'Full body portrait of a Polish Winged Hussar wearing steel breastplate and jaguar skin, with large eagle wings attached to back. 17th Century. Museum quality costume documentation, studio lighting, neutral dark background, 8K, shining armor, holding a lance.',
      },
      {
        name: 'Suknia z Frędzlami (Flapper)',
        era: 'Lata 20.',
        class: 'Nowoczesna Kobieta',
        description: 'Luźna sukienka z obniżonym stanem, symbol emancypacji.',
        prompt: 'Full body portrait of a Flapper girl wearing 1920s beaded dress with fringe and headband. Roaring Twenties. Museum quality costume documentation, studio lighting, neutral dark background, 8K, bobbed hair, pearls.',
      },
      {
        name: 'Linothorax (Hoplita)',
        era: 'Starożytna Grecja',
        class: 'Wojownik',
        description: 'Pancerz wykonany z wielu warstw klejonego lnu.',
        prompt: 'Full body portrait of a Greek Hoplite wearing white Linothorax armor and bronze Corinthian helmet. Ancient Greece. Holding a large round shield (aspis) and spear. Museum quality costume documentation, studio lighting, neutral dark background, 8K, historical accuracy.',
      },
      {
        name: 'Himation (Filozof)',
        era: 'Starożytna Grecja',
        class: 'Obywatel',
        description: 'Prosty płaszcz noszony przez filozofów i mówców.',
        prompt: 'Full body portrait of a Greek Philosopher wearing simple wool Himation robe. Ancient Greece. Museum quality costume documentation, studio lighting, neutral dark background, 8K, bearded old man, wisdom.',
      },
      {
        name: 'Surdut i Cylinder',
        era: 'Wiek XIX',
        class: 'Dżentelmen',
        description: 'Elegancki strój miejski z epoki wiktoriańskiej.',
        prompt: 'Full body portrait of a Victorian Gentleman wearing black Frock coat, top hat and holding a cane. 19th Century London. Museum quality costume documentation, studio lighting, neutral dark background, 8K, pocket watch chain.',
      }
    ]
  });

  console.log('🕵️ Tworzenie Bazy Detektywa Czasu (Tryb AI)...');
  try { await prisma.timeDetectiveScenario.deleteMany({}); } catch (e) { }

  await prisma.timeDetectiveScenario.createMany({
    data: [
      // STAROŻYTNY EGIPT
      { era: 'Starożytny Egipt', description: 'Rolnictwo nad Nilem', prompt: 'Historical scene from Ancient Egypt: Egyptian farmers harvesting wheat near the Nile River, traditional white schenti clothes, Great Pyramids of Giza clearly visible in the background, sunny day. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Egipt', description: 'Targ w Tebach', prompt: 'Historical scene from Ancient Egypt: Busy marketplace in Thebes with Sphinx avenue in background, people wearing egyptian makeup and linen clothes, selling papyrus and pottery, hieroglyphs on walls. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Egipt', description: 'Skrybowie w świątyni', prompt: 'Historical scene from Ancient Egypt: Scribes writing on papyrus scrolls inside a temple with massive columns painted with hieroglyphs, distinct Ancient Egyptian architectural style, pharaoh statue. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Egipt', description: 'Królewska barka', prompt: 'Historical scene from Ancient Egypt: Royal barge sailing on the Nile, golden decorations, distinct Egyptian style sails, palm trees on river bank, sunny Egyptian landscape. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // STAROŻYTNY RZYM
      { era: 'Starożytny Rzym', description: 'Forum Romanum', prompt: 'Historical scene from Ancient Rome: Citizens walking in the Roman Forum, men in white togas, Roman senators, marble temples with corinthian columns, Colosseum visible in the distance. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Rzym', description: 'Uczta rzymska', prompt: 'Historical scene from Ancient Rome: Roman street feast using triclinium (reclining dining), people eating grapes and drinking wine from ceramic jugs, women in stola dresses, Roman villa architecture. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Rzym', description: 'Patrol legionistów', prompt: 'Historical scene from Ancient Rome: Roman soldiers (Legionaries) in lorica segmentata armor patrolling a paved stone road, red tunics, rectangular scutum shields, aqueduct in background. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Starożytny Rzym', description: 'Termy rzymskie', prompt: 'Historical scene from Ancient Rome: Inside a Roman Bathhouse (Thermae), marble statues, mosaic floors, people relaxing in togas, classic Roman arches and architecture. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // ŚREDNIOWIECZNA JAPONIA
      { era: 'Średniowieczna Japonia', description: 'Samuraj i wiśnie', prompt: 'Historical scene from Medieval Japan: Samurai walking through a village with Cherry Blossom (Sakura) trees falling, traditional wooden japanese architecture, Katana sword at waist, Mount Fuji in distance. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Średniowieczna Japonia', description: 'Gejsze w Kyoto', prompt: 'Historical scene from Medieval Japan: Geishas in colorful Kimonos walking on a wooden bridge in Kyoto, paper umbrellas, lanterns, traditional Japanese garden with pagoda. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Średniowieczna Japonia', description: 'Ogród Zen', prompt: 'Historical scene from Medieval Japan: Zen garden with raked gravel and bonsai trees, Buddhist monk in robes meditating, wooden temple with curved roof, peaceful Japanese atmosphere. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Średniowieczna Japonia', description: 'Pola ryżowe', prompt: 'Historical scene from Medieval Japan: Rice paddy workers in conical straw hats, traditional Japanese farmhouse with thatched roof, misty mountains, classic feudal Japan landscape. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // WIKINGOWIE
      { era: 'Wikingowie', description: 'Drakkary w fiordzie', prompt: 'Historical scene from Viking Age: Viking Longships (Drakkar) docked in a fjord, warriors with round wooden shields and axes, wooden village with smoke rising, dramatic cloudy sky. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Wikingowie', description: 'Uczta w długim domu', prompt: 'Historical scene from Viking Age: Viking feast inside a wooden Longhouse, warriors drinking mead from horns, wearing furs and heavy cloaks, fire in central hearth, runic carvings on wood. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Wikingowie', description: 'Kowal wikiński', prompt: 'Historical scene from Viking Age: Norse blacksmith forging an axe, wearing beard and fur tunic, wooden stave church visible in background, snowy Scandinavian landscape. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Wikingowie', description: 'Handel na plaży', prompt: 'Historical scene from Viking Age: Vikings trading on a beach, furs and amber, longships pulled onto sand, rugged warriors with braided beards, northern lights in sky. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // II WOJNA ŚWIATOWA
      { era: 'II Wojna Światowa', description: 'Willys Jeep', prompt: 'Historical scene from World War 2: Soldiers in 1940s uniforms driving a Willys Jeep through a ruined European town, vintage American star on vehicle, rubble, World War 2 era signs. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'II Wojna Światowa', description: 'Cywile przy radiu', prompt: 'Historical scene from World War 2: Civilian family in 1940s clothing listening to vintage radio, "Keep Calm and Carry On" poster on wall, gas masks hanging on coat rack, wartime atmosphere. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'II Wojna Światowa', description: 'Odpoczynek GI', prompt: 'Historical scene from World War 2: American GIs taking a break in a French village, smoking cigarettes, holding M1 Garand rifles, vintage 1940s surroundings, tank parked nearby. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'II Wojna Światowa', description: 'Szpital polowy', prompt: 'Historical scene from World War 2: Field hospital tents with Red Cross symbol, nurses in WW2 era uniforms, vintage ambulance truck, soldiers resting, wartime camp. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // DZIKI ZACHÓD
      { era: 'Dziki Zachód', description: 'Saloon', prompt: 'Historical scene from Wild West: Classic Western Saloon exterior, wooden facade, cowboys tied horses to rail, dusty main street, people in Stetsons and boots, tumbleweed. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Dziki Zachód', description: 'Stado bydła', prompt: 'Historical scene from Wild West: Cowboys herding cattle on the open prairie, wearing leather chaps and cowboy hats, riding horses, lasso rope, monumental scenery like Monument Valley. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Dziki Zachód', description: 'Biuro szeryfa', prompt: 'Historical scene from Wild West: Sheriff standing in front of Jail office, wearing metal star badge and gun belt with revolver, wooden boardwalk, wanted posters on wall. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Dziki Zachód', description: 'Parowóz na stacji', prompt: 'Historical scene from Wild West: Steam Train (Locomotive) arriving at a wooden station, steam and smoke, passengers in Victorian western clothing, luggage, desert landscape. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // CZASY NAPOLEOŃSKIE
      { era: 'Czasy Napoleońskie', description: 'Marsz piechoty', prompt: 'Historical scene from Napoleonic Era: French Army soldiers in blue uniforms and shako hats marching, holding muskets with bayonets, tricolor flag, Napoleon on white horse in distance. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Czasy Napoleońskie', description: 'Bal w pałacu', prompt: 'Historical scene from Napoleonic Era: Elegant ball in a 19th century palace, ladies in Empire style dresses, men in military gala uniforms with gold embroidery, crystal chandeliers. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Czasy Napoleońskie', description: 'Huzar na koniu', prompt: 'Historical scene from Napoleonic Era: Cavalry officer (Hussar) on horse, colorful uniform with braids (dolman), sabre, snowy landscape (Retreat from Moscow context), 19th century painting style. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Czasy Napoleońskie', description: 'Artyleria', prompt: 'Historical scene from Napoleonic Era: Cannon crew preparing artillery piece, wearing bicorne hats, gunpowder smoke, wheel carriages, battlefield background. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },

      // POLSKA PIASTÓW
      { era: 'Polska Piastów', description: 'Gród drewniany', prompt: 'Historical scene from Medieval Poland: Medieval wooden stronghold (Gród) with palisade walls, Slavic warriors in chainmail and nasal helmets guarding gate, wooden huts inside. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Polska Piastów', description: 'Mysia Wieża', prompt: 'Historical scene from Medieval Poland: Legendary King Popiel\'s tower (Mysia Wieża) context, wooden Slavic architecture, people in linen tunics, Kruszwica lake background. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Polska Piastów', description: 'Drużyna książęca', prompt: 'Historical scene from Medieval Poland: Early Polish knighthood (Druzhina) riding horses through forest, round shields with simple patterns, spears, medieval Slavic clothing. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
      { era: 'Polska Piastów', description: 'Osada w Biskupinie', prompt: 'Historical scene from Medieval Poland: Biskupin style settlement reconstruction, wooden log paths suitable for Iron Age/Early Medieval transition, thatched roofs, lake settlement, smoke. Photorealistic style, highly detailed, 8K, cinematic lighting, museum quality.' },
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