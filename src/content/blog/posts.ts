export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string        // YYYY-MM-DD
  readTime: string    // e.g. "5 min"
  heroEmoji: string   // fallback until photos are added
  content: string     // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-to-wear-kayaking-latvia',
    title: 'What to Wear Kayaking in Latvia: A Complete Guide',
    excerpt: 'From spring to autumn — what to pack, what to wear, and how to stay comfortable on Latvia\'s rivers.',
    category: 'Tips',
    date: '2026-03-20',
    readTime: '5 min',
    heroEmoji: '👕',
    content: `
      <h2>Dress for the Water, Not the Weather</h2>
      <p>The number one mistake first-time paddlers make is dressing for the air temperature. On the river, you're close to the water — spray, splashes, and the occasional accidental dip are all part of the experience. Dress for the water temperature, and you'll stay comfortable all day.</p>

      <h2>Spring (May – Early June)</h2>
      <p>Water temperatures are still cool (10–16°C). Wear quick-dry synthetic layers — avoid cotton. A lightweight waterproof jacket is essential. Neoprene shoes or old sneakers that can get wet are ideal for footwear. Bring a beanie and thin gloves for early-season trips.</p>

      <h2>Summer (Late June – August)</h2>
      <p>This is the prime paddling season. Water warms to 18–22°C. Quick-dry shorts, a UV-protection long-sleeve shirt, and sandals with heel straps work perfectly. Bring sunscreen (SPF 50+), sunglasses with a retainer strap, and a hat.</p>

      <h2>Autumn (September – October)</h2>
      <p>Similar to spring — layers are key. A fleece or merino base layer under a waterproof shell keeps you warm. Water drops to 12–16°C. The autumn foliage along the Gauja and Salaca is spectacular, so it's worth dressing warm for the experience.</p>

      <h2>What We Provide</h2>
      <p>Every boat rental includes life jackets, paddles, and a waterproof dry barrel for your belongings. You just need to bring yourself, appropriate clothing, and a sense of adventure.</p>

      <h2>Our Packing Checklist</h2>
      <ul>
        <li>Quick-dry clothing (no cotton)</li>
        <li>Waterproof jacket or rain shell</li>
        <li>Water shoes, sandals, or old sneakers</li>
        <li>Sunscreen and sunglasses</li>
        <li>Hat or cap</li>
        <li>Change of dry clothes for after the trip</li>
        <li>Water bottle and snacks</li>
        <li>Phone in a waterproof pouch</li>
      </ul>
    `,
  },
  {
    slug: 'first-time-kayaking-guide',
    title: 'First Time Kayaking? Everything You Need to Know',
    excerpt: 'Never paddled before? Here\'s our honest guide to what to expect, how to prepare, and why you\'ll love it.',
    category: 'Beginners',
    date: '2026-03-18',
    readTime: '6 min',
    heroEmoji: '🚣',
    content: `
      <h2>You Don't Need Experience</h2>
      <p>Seriously — you don't. The vast majority of our customers are first-time paddlers. Latvia's rivers are calm, wide, and forgiving. We give you a safety briefing before you go, and the boats are stable and easy to control.</p>

      <h2>Which Boat Should You Choose?</h2>
      <p>For beginners, we recommend our sit-on-top kayaks (like the Perception Pescador) or canoes for groups. Kayaks are faster and more agile; canoes carry more people and gear. For families, a canoe is usually the best choice.</p>

      <h2>What to Expect on the River</h2>
      <p>Most routes take 4–8 hours of actual paddling time. The current does a lot of the work — you're steering more than powering. Expect to see wildlife (herons, kingfishers, beavers), stunning sandstone cliffs on the Gauja, and peaceful forest stretches where you won't see another person for an hour.</p>

      <h2>The Logistics</h2>
      <p>We handle everything. You arrive at the meeting point, we transport you and the boats to the start. You paddle to the finish, and we pick you up. All gear is included — just bring clothes and snacks.</p>

      <h2>Tips for First-Timers</h2>
      <ul>
        <li>Start with a shorter route (4–6 hours) to test your comfort level</li>
        <li>Paddle with the current, not against it — let the river do the work</li>
        <li>Keep your center of gravity low if you feel unsteady</li>
        <li>Take breaks — pull over to any sandbar or bank and stretch</li>
        <li>Bring more water than you think you'll need</li>
        <li>Relax and enjoy — this isn't a race</li>
      </ul>

      <h2>Best Beginner Routes</h2>
      <p>We recommend the Sigulda – Rāmkalni route on the Gauja (easy, 4–5 hours) or any of the Brasla routes (short, gentle, beautiful). Check our routes page for the full list with difficulty ratings.</p>
    `,
  },
  {
    slug: 'best-rivers-latvia-kayaking',
    title: 'The 4 Best Rivers for Kayaking in Latvia',
    excerpt: 'Gauja, Salaca, Brasla, or Amata? We break down what makes each river unique and who it\'s best for.',
    category: 'Guide',
    date: '2026-03-15',
    readTime: '7 min',
    heroEmoji: '🏞️',
    content: `
      <h2>Gauja — The Classic</h2>
      <p>Latvia's most famous paddling river and the backbone of our fleet. The Gauja runs through Gauja National Park, past sandstone cliffs, caves, dense forests, and medieval castle ruins. With 11 routes from easy half-day trips to 3-day expeditions, there's something for everyone. Best for: first-timers, families, multi-day adventures, photography.</p>

      <h2>Brasla — The Hidden Gem</h2>
      <p>A narrow, winding tributary of the Gauja that feels like paddling through a secret tunnel of green. The Brasla is intimate and peaceful — you're rarely more than a few meters from the bank. Shorter routes (3–5 hours) make it perfect for a morning or afternoon outing. Best for: nature lovers, half-day trips, experienced paddlers who want something different.</p>

      <h2>Salaca — Wild and Scenic</h2>
      <p>Starting from Lake Burtnieks, the Salaca flows north through some of Latvia's wildest landscapes. Fewer paddlers, more wildlife, and a real sense of adventure. Some sections have gentle rapids in spring. Best for: those seeking solitude, birdwatchers, intermediate paddlers.</p>

      <h2>Amata — The Adrenaline River</h2>
      <p>The Amata is Latvia's most challenging paddling river — and the most rewarding. Fast current, tight turns, overhanging trees, and Class I–II rapids make it exciting. We only run raft trips here — no kayaks. Best for: thrill-seekers, groups looking for excitement, experienced paddlers.</p>

      <h2>Not Sure Which to Choose?</h2>
      <p>Contact us and we'll recommend the perfect route based on your experience, group size, and how much time you have. Or check our rivers page for a detailed comparison.</p>
    `,
  },
  {
    slug: 'overnight-kayak-camping-gauja',
    title: 'How to Plan an Overnight Kayak Camping Trip on the Gauja',
    excerpt: 'Multi-day paddle trips are the ultimate Latvian river experience. Here\'s how to plan your first one.',
    category: 'Guide',
    date: '2026-03-10',
    readTime: '6 min',
    heroEmoji: '🏕️',
    content: `
      <h2>Why Go Multi-Day?</h2>
      <p>There's something magical about camping on a riverbank after a day of paddling. The fire, the stars, the sound of the river — it's the kind of experience that stays with you. Our multi-day routes on the Gauja (Valmiera–Cēsis, Cēsis–Sigulda, and the 3-day Valmiera–Sigulda) are our most popular trips.</p>

      <h2>What We Provide</h2>
      <p>Your boat rental includes the boat, paddles, life jackets, and a waterproof barrel. For multi-day trips, you'll need to bring your own tent, sleeping bag, cooking gear, and food. We transport everything to the start point — pack it in the barrel and go.</p>

      <h2>Camping Spots</h2>
      <p>There are designated campfire spots along the Gauja managed by the national park. These have fire rings and basic facilities. You can also wild camp on many riverbank sections — just be respectful and pack out everything you bring.</p>

      <h2>Food and Water</h2>
      <p>Bring all your food and cooking supplies. A small gas stove is the easiest option. The river water is not safe to drink untreated — bring a filter or carry enough water for the trip. There are a few small towns along the Gauja where you can resupply if needed.</p>

      <h2>Essential Multi-Day Gear</h2>
      <ul>
        <li>Tent or hammock with rain fly</li>
        <li>Sleeping bag (rated to 5°C for spring/autumn)</li>
        <li>Sleeping pad</li>
        <li>Gas stove and fuel</li>
        <li>Pots, utensils, firestarter</li>
        <li>Headlamp</li>
        <li>First aid kit</li>
        <li>Garbage bags (pack it out!)</li>
      </ul>

      <h2>Book Your Multi-Day Adventure</h2>
      <p>Our most popular multi-day routes are Cēsis–Sigulda (2 days) and Valmiera–Sigulda (3 days). Both offer incredible scenery and great camping spots. Book early for summer weekends — these fill up fast.</p>
    `,
  },
  {
    slug: 'kayaking-with-kids-latvia',
    title: 'Kayaking with Kids: Family-Friendly Routes in Latvia',
    excerpt: 'Yes, you can bring the kids! Here are our top tips and the best routes for families with children.',
    category: 'Tips',
    date: '2026-03-05',
    readTime: '5 min',
    heroEmoji: '👨‍👩‍👧‍👦',
    content: `
      <h2>What Age Can Kids Start?</h2>
      <p>We recommend children be at least 5 years old for kayaking trips. Kids ride in a canoe with parents — our 3-person canoes are stable and have room for small adventurers. Children under 12 must wear a life jacket at all times (we provide them).</p>

      <h2>Best Family Routes</h2>
      <p>Short routes with easy water are ideal for families. Our top picks:</p>
      <ul>
        <li><strong>Sigulda – Rāmkalni</strong> (Gauja, ~4 hours) — Easy, beautiful, ends near town for ice cream</li>
        <li><strong>Līgatne – Sigulda</strong> (Gauja, ~4 hours) — Gentle current, sandstone scenery</li>
        <li><strong>Rozula – Vējiņi</strong> (Brasla, ~3 hours) — Short and sweet, narrow forest river</li>
      </ul>

      <h2>Tips for Paddling with Kids</h2>
      <ul>
        <li>Choose a canoe, not a kayak — more stable and room for gear</li>
        <li>Bring extra snacks and drinks (hungry kids = unhappy kids)</li>
        <li>Plan for stops — kids love jumping in the water at sandbars</li>
        <li>Let them help paddle — even small kids can use a spare paddle</li>
        <li>Start early in the day when energy is high</li>
        <li>Bring a change of clothes — someone will get wet</li>
      </ul>

      <h2>Safety</h2>
      <p>Safety is our top priority. Every trip starts with a briefing. All boats include life jackets sized for children. Our rivers are calm — there are no dangerous rapids or currents on our family-recommended routes. The biggest risk is sunburn, so pack the sunscreen!</p>
    `,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
