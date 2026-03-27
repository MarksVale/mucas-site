export interface BlogPost {
  slug: string
  title: string
  titleLv: string
  excerpt: string
  excerptLv: string
  category: string
  categoryLv: string
  date: string
  readTime: string
  heroEmoji: string
  content: string
  contentLv: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-to-wear-kayaking-latvia',
    title: 'What to Wear Kayaking in Latvia: A Complete Guide',
    titleLv: 'Ko Valkāt Kajaka Braucienā Latvijā: Pilnīgs Ceļvedis',
    excerpt: "From spring to autumn - what to pack, what to wear, and how to stay comfortable on Latvia's rivers.",
    excerptLv: 'No pavasara līdz rudenim — ko ņemt līdzi, ko valkāt un kā justies komfortabli uz Latvijas upēm.',
    category: 'Tips',
    categoryLv: 'Padomi',
    date: '2026-03-20',
    readTime: '5 min',
    heroEmoji: '👕',
    content: `
      <h2>Dress for the Water, Not the Weather</h2>
      <p>The number one mistake first-time paddlers make is dressing for the air temperature. On the river, you're close to the water - spray, splashes, and the occasional accidental dip are all part of the experience. Dress for the water temperature, and you'll stay comfortable all day.</p>
      <h2>Spring (May – Early June)</h2>
      <p>Water temperatures are still cool (10–16°C). Wear quick-dry synthetic layers - avoid cotton. A lightweight waterproof jacket is essential. Neoprene shoes or old sneakers that can get wet are ideal for footwear. Bring a beanie and thin gloves for early-season trips.</p>
      <h2>Summer (Late June – August)</h2>
      <p>This is the prime paddling season. Water warms to 18–22°C. Quick-dry shorts, a UV-protection long-sleeve shirt, and sandals with heel straps work perfectly. Bring sunscreen (SPF 50+), sunglasses with a retainer strap, and a hat.</p>
      <h2>Autumn (September – October)</h2>
      <p>Similar to spring - layers are key. A fleece or merino base layer under a waterproof shell keeps you warm. Water drops to 12–16°C. The autumn foliage along the Gauja and Salaca is spectacular, so it's worth dressing warm for the experience.</p>
      <h2>What We Provide</h2>
      <p>Every boat rental includes life jackets, paddles, and a waterproof dry barrel for your belongings. You just need to bring yourself, appropriate clothing, and a sense of adventure.</p>
      <h2>Our Packing Checklist</h2>
      <ul><li>Quick-dry clothing (no cotton)</li><li>Waterproof jacket or rain shell</li><li>Water shoes, sandals, or old sneakers</li><li>Sunscreen and sunglasses</li><li>Hat or cap</li><li>Change of dry clothes for after the trip</li><li>Water bottle and snacks</li><li>Phone in a waterproof pouch</li></ul>
    `,
    contentLv: `
      <h2>Ģērbies Ūdens, Nevis Laika Dēļ</h2>
      <p>Lielākā kļūda, ko pieļauj iesācēji, ir ģērbšanās atbilstoši gaisa temperatūrai. Uz upes tu esi tuvu ūdenim — šļakatas, piezemēšanās ūdenī ir daļa no pieredzes. Ģērbies atbilstoši ūdens temperatūrai un visu dienu jutīsies komfortabli.</p>
      <h2>Pavasaris (maijs – jūnija sākums)</h2>
      <p>Ūdens temperatūra joprojām ir vēsa (10–16°C). Valkā ātri žūstošus sintētiskos slāņus — izvairieties no kokvilnas. Viegla ūdensnecaurlaidīga jaka ir obligāta. Neoprēna apavi vai veci sporta kurpes, kas var samirkt, ir ideāli. Ņem līdzi cepuri un plānas cimdiņas agrīnajiem sezonas braucieniem.</p>
      <h2>Vasara (jūnija beigas – augusts)</h2>
      <p>Tā ir galvenā airēšanas sezona. Ūdens sasilst līdz 18–22°C. Ātri žūstoši šorti, UV aizsardzības garpiedurkņu krekls un sandales ar papēža siksnu ir ideāls apģērbs. Ņem līdzi sauļošanās krēmu (SPF 50+), saulesbrilles ar siksniņu un cepuri.</p>
      <h2>Rudens (septembris – oktobris)</h2>
      <p>Līdzīgi kā pavasarī — slāņi ir galvenais. Flīsa vai merino bāzes slānis zem ūdensnecaurlaidīgas jakas uzturēs siltumu. Ūdens atdziest līdz 12–16°C. Rudens lapotne gar Gauju un Salacu ir iespaidīga.</p>
      <h2>Ko Mēs Nodrošinām</h2>
      <p>Katra laivas noma ietver glābšanas vestes, airis un ūdensnecaurlaidīgu mucu jūsu mantām. Jums vajag tikai sevi, piemērotu apģērbu un piedzīvojumu kāri.</p>
      <h2>Iepakošanas Kontrolsaraksts</h2>
      <ul><li>Ātri žūstoši apģērbi (bez kokvilnas)</li><li>Ūdensnecaurlaidīga jaka</li><li>Ūdens apavi vai veci sporta apavi</li><li>Sauļošanās krēms un saulesbrilles</li><li>Cepure</li><li>Sausas rezerves drēbes pēc brauciena</li><li>Ūdens pudele un uzkodas</li><li>Telefons ūdensnecaurlaidīgā maciņā</li></ul>
    `,
  },
  {
    slug: 'first-time-kayaking-guide',
    title: 'First Time Kayaking? Everything You Need to Know',
    titleLv: 'Pirmo Reizi Kajakā? Viss, kas Jums Jāzina',
    excerpt: "Never paddled before? Here's our honest guide to what to expect, how to prepare, and why you'll love it.",
    excerptLv: 'Nekad neesi airējis? Šeit ir mūsu godīgs ceļvedis par to, ko sagaidīt, kā sagatavoties un kāpēc tev tas patiks.',
    category: 'Beginners',
    categoryLv: 'Iesācējiem',
    date: '2026-03-18',
    readTime: '6 min',
    heroEmoji: '🚣',
    content: `
      <h2>You Don't Need Experience</h2>
      <p>Seriously - you don't. The vast majority of our customers are first-time paddlers. Latvia's rivers are calm, wide, and forgiving. We give you a safety briefing before you go, and the boats are stable and easy to control.</p>
      <h2>Which Boat Should You Choose?</h2>
      <p>For beginners, we recommend our sit-on-top kayaks or canoes for groups. Kayaks are faster and more agile; canoes carry more people and gear. For families, a canoe is usually the best choice.</p>
      <h2>What to Expect on the River</h2>
      <p>Most routes take 4–8 hours of actual paddling time. The current does a lot of the work. Expect to see wildlife, stunning sandstone cliffs on the Gauja, and peaceful forest stretches.</p>
      <h2>The Logistics</h2>
      <p>We handle everything. You arrive at the meeting point, we transport you and the boats to the start. You paddle to the finish, and we pick you up. All gear is included.</p>
      <h2>Tips for First-Timers</h2>
      <ul><li>Start with a shorter route (4–6 hours)</li><li>Paddle with the current, not against it</li><li>Keep your center of gravity low if you feel unsteady</li><li>Take breaks at any sandbar or bank</li><li>Bring more water than you think you'll need</li><li>Relax and enjoy - this isn't a race</li></ul>
    `,
    contentLv: `
      <h2>Pieredze Nav Nepieciešama</h2>
      <p>Nopietni — nav. Lielākā daļa mūsu klientu airē pirmo reizi. Latvijas upes ir mierīgas, platas un piedodošas. Mēs dodam drošības instruktāžu pirms brauciena, un laivas ir stabilas un viegli vadāmas.</p>
      <h2>Kuru Laivu Izvēlēties?</h2>
      <p>Iesācējiem iesakām mūsu sit-on-top kajaki vai kanoe grupām. Kajaki ir ātrāki un veiklāki; kanoe ietilpst vairāk cilvēku un mantu. Ģimenēm kanoe parasti ir labākā izvēle.</p>
      <h2>Ko Sagaidīt Uz Upes</h2>
      <p>Lielākā daļa maršrutu aizņem 4–8 stundas. Straume dara lielu daļu darba. Sagaidiet, ka redzēsiet savvaļas dzīvniekus, iespaidīgas smilšakmens klintis uz Gaujas un mierīgus meža posmus.</p>
      <h2>Loģistika</h2>
      <p>Mēs par visu parūpējamies. Tu ierodas tikšanās vietā, mēs nogādājam tevi un laivas līdz startam. Tu airē līdz finišam, un mēs tevi paņemam. Viss inventārs ir iekļauts.</p>
      <h2>Padomi Iesācējiem</h2>
      <ul><li>Sāc ar īsāku maršrutu (4–6 stundas)</li><li>Airē pa straumi, nevis pret to</li><li>Saglabā zemu smaguma centru, ja jūties nestabili</li><li>Atpūties pie jebkuras smilšu joslas</li><li>Ņem vairāk ūdens nekā domā vajadzīgs</li><li>Atslābinies un baudi — tā nav sacensība</li></ul>
    `,
  },
  {
    slug: 'best-rivers-latvia-kayaking',
    title: 'The 4 Best Rivers for Kayaking in Latvia',
    titleLv: '4 Labākās Upes Kajaka Braucieniem Latvijā',
    excerpt: "Gauja, Salaca, Brasla, or Amata? We break down what makes each river unique and who it's best for.",
    excerptLv: 'Gauja, Salaca, Brasla vai Amata? Mēs izskaidrojam, kas padara katru upi unikālu un kam tā ir piemērotākā.',
    category: 'Guide',
    categoryLv: 'Ceļvedis',
    date: '2026-03-15',
    readTime: '7 min',
    heroEmoji: '🏞️',
    content: `
      <h2>Gauja - The Classic</h2>
      <p>Latvia's most famous paddling river. The Gauja runs through Gauja National Park, past sandstone cliffs, caves, dense forests, and medieval castle ruins. Best for: first-timers, families, multi-day adventures.</p>
      <h2>Brasla - The Hidden Gem</h2>
      <p>A narrow, winding tributary of the Gauja. The Brasla is intimate and peaceful. Shorter routes (3–5 hours) make it perfect for a morning or afternoon outing. Best for: nature lovers, half-day trips.</p>
      <h2>Salaca - Wild and Scenic</h2>
      <p>Starting from Lake Burtnieks, the Salaca flows north through Latvia's wildest landscapes. Fewer paddlers, more wildlife. Best for: those seeking solitude, birdwatchers, intermediate paddlers.</p>
      <h2>Amata - The Adrenaline River</h2>
      <p>The Amata is Latvia's most challenging paddling river. Fast current, tight turns, Class I–II rapids. We only run raft trips here. Best for: thrill-seekers, experienced paddlers.</p>
    `,
    contentLv: `
      <h2>Gauja — Klasika</h2>
      <p>Latvijas slavenākā airēšanas upe. Gauja tek cauri Gaujas Nacionālajam parkam, garām smilšakmens klintīm, alām, blīviem mežiem un viduslaiku pils drupām. Piemērota: iesācējiem, ģimenēm, daudzdienu piedzīvojumiem.</p>
      <h2>Brasla — Slēptā Dārgakmens</h2>
      <p>Šaura, līkumaina Gaujas pieteka. Brasla ir intīma un mierīga. Īsāki maršruti (3–5 stundas) padara to ideālu rīta vai pēcpusdienas izbraucienam. Piemērota: dabas mīļotājiem, pusdienas braucieniem.</p>
      <h2>Salaca — Savvaļas Ainava</h2>
      <p>Salaca tek uz ziemeļiem cauri Latvijas savvaļainākajiem ainavas. Mazāk airētāju, vairāk savvaļas dzīvnieku. Piemērota: tiem, kas meklē vientulību, putnu vērotājiem, vidēja līmeņa airētājiem.</p>
      <h2>Amata — Adrenalīna Upe</h2>
      <p>Amata ir Latvijas izaicinošākā airēšanas upe. Ātra straume, šauri līkumi, I–II klases krāces. Šeit rīkojam tikai plosta braucienus. Piemērota: adrenalīna meklētājiem, pieredzējušiem airētājiem.</p>
    `,
  },
  {
    slug: 'overnight-kayak-camping-gauja',
    title: 'How to Plan an Overnight Kayak Camping Trip on the Gauja',
    titleLv: 'Kā Plānot Nakšņošanas Kajaka Kempinga Braucienu Pa Gauju',
    excerpt: "Multi-day paddle trips are the ultimate Latvian river experience. Here's how to plan your first one.",
    excerptLv: 'Daudzdienu airēšanas braucieni ir labākā Latvijas upes pieredze. Lūk, kā plānot savu pirmo.',
    category: 'Guide',
    categoryLv: 'Ceļvedis',
    date: '2026-03-10',
    readTime: '6 min',
    heroEmoji: '🏕️',
    content: `
      <h2>Why Go Multi-Day?</h2>
      <p>There's something magical about camping on a riverbank after a day of paddling. Our multi-day routes on the Gauja are our most popular trips.</p>
      <h2>What We Provide</h2>
      <p>Your boat rental includes the boat, paddles, life jackets, and a waterproof barrel. For multi-day trips, bring your own tent, sleeping bag, cooking gear, and food.</p>
      <h2>Camping Spots</h2>
      <p>There are designated campfire spots along the Gauja managed by the national park. You can also wild camp on many riverbank sections.</p>
      <h2>Essential Multi-Day Gear</h2>
      <ul><li>Tent or hammock with rain fly</li><li>Sleeping bag (rated to 5°C)</li><li>Gas stove and fuel</li><li>Headlamp</li><li>First aid kit</li><li>Garbage bags</li></ul>
    `,
    contentLv: `
      <h2>Kāpēc Doties Uz Vairākām Dienām?</h2>
      <p>Kempings uz upes krasta pēc dienas airēšanas ir kas maģisks. Mūsu daudzdienu maršruti pa Gauju ir mūsu populārākie braucieni.</p>
      <h2>Ko Mēs Nodrošinām</h2>
      <p>Laivas noma ietver laivu, airis, glābšanas vestes un ūdensnecaurlaidīgu mucu. Daudzdienu braucieniem ņem pats telti, guļammaisu, gatavošanas piederumus un pārtiku.</p>
      <h2>Kempinga Vietas</h2>
      <p>Gar Gauju ir apzīmētas ugunskura vietas, ko pārvalda nacionālais parks. Var arī nakšņot savvaļā daudzos upes krasta posmos.</p>
      <h2>Obligātais Daudzdienu Inventārs</h2>
      <ul><li>Telts vai šūpuļtīkls ar lietus jumtu</li><li>Guļammais (5°C rated)</li><li>Gāzes plīts un degviela</li><li>Lukturītis</li><li>Pirmās palīdzības komplekts</li><li>Atkritumu maisi</li></ul>
    `,
  },
  {
    slug: 'kayaking-with-kids-latvia',
    title: 'Kayaking with Kids: Family-Friendly Routes in Latvia',
    titleLv: 'Kajaks ar Bērniem: Ģimenēm Piemēroti Maršruti Latvijā',
    excerpt: "Yes, you can bring the kids! Here are our top tips and the best routes for families with children.",
    excerptLv: 'Jā, vari ņemt bērnus līdzi! Šeit ir mūsu labākie padomi un labākie maršruti ģimenēm ar bērniem.',
    category: 'Tips',
    categoryLv: 'Padomi',
    date: '2026-03-05',
    readTime: '5 min',
    heroEmoji: '👨‍👩‍👧‍👦',
    content: `
      <h2>What Age Can Kids Start?</h2>
      <p>We recommend children be at least 5 years old. Kids ride in a canoe with parents. Children under 12 must wear a life jacket at all times.</p>
      <h2>Best Family Routes</h2>
      <ul><li>Sigulda – Rāmkalni (Gauja, ~4 hours) - Easy, beautiful</li><li>Līgatne – Sigulda (Gauja, ~4 hours) - Gentle current</li><li>Rozula – Vējiņi (Brasla, ~3 hours) - Short forest river</li></ul>
      <h2>Tips for Paddling with Kids</h2>
      <ul><li>Choose a canoe - more stable</li><li>Bring extra snacks and drinks</li><li>Plan for stops at sandbars</li><li>Let them help paddle</li><li>Start early when energy is high</li><li>Bring a change of clothes</li></ul>
      <h2>Safety</h2>
      <p>Every trip starts with a briefing. All boats include life jackets sized for children. Our rivers are calm on family routes.</p>
    `,
    contentLv: `
      <h2>No Kāda Vecuma Bērni Var Sākt?</h2>
      <p>Iesakām bērniem būt vismaz 5 gadus veciem. Bērni brauc kanoe kopā ar vecākiem. Bērniem līdz 12 gadiem vienmēr jāvalkā glābšanas veste.</p>
      <h2>Labākie Ģimenes Maršruti</h2>
      <ul><li>Sigulda – Rāmkalni (Gauja, ~4 stundas) — viegls, skaists</li><li>Līgatne – Sigulda (Gauja, ~4 stundas) — maiga straume</li><li>Rozula – Vējiņi (Brasla, ~3 stundas) — īss meža upes maršruts</li></ul>
      <h2>Padomi Airēšanai ar Bērniem</h2>
      <ul><li>Izvēlies kanoe — stabilāks</li><li>Ņem papildu uzkodas un dzērienus</li><li>Plāno pieturas pie smilšu joslām</li><li>Ļauj bērniem palīdzēt airēt</li><li>Sāc agri, kad enerģija ir augsta</li><li>Ņem rezerves drēbes</li></ul>
      <h2>Drošība</h2>
      <p>Katrs brauciens sākas ar instruktāžu. Visas laivas ietver bērniem piemērotas glābšanas vestes. Mūsu upes ir mierīgas ģimenes maršrutos.</p>
    `,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
