'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Do I need any experience to go on a river trip?',
    a: 'No experience is needed for most of our routes. The Gauja and Salaca rivers are calm and suitable for complete beginners and families with children. We provide a short briefing before every trip. For the Brasla and Amata rivers, some basic paddling experience is recommended due to rapids.',
  },
  {
    q: 'What should I bring?',
    a: 'Wear clothes you don\'t mind getting wet, and bring sunscreen, a hat, water, and snacks. We recommend waterproof bags for phones and valuables. In colder months, bring a change of dry clothes. We provide all boats, paddles, and life vests.',
  },
  {
    q: 'What\'s included in the price?',
    a: 'The boat rental price includes the boat, paddles, life vests, and a waterproof barrel for your belongings. Transport to the start point and pickup from the finish is charged separately (shown at booking). We handle all logistics - just show up and paddle.',
  },
  {
    q: 'How long do the trips take?',
    a: 'One-day routes typically take 3–6 hours of paddling time, depending on the route length and your pace. Multi-day routes (2–3 days) include overnight camping along the river. We recommend starting in the morning to have plenty of daylight.',
  },
  {
    q: 'Can I book for a large group?',
    a: 'Absolutely. We regularly handle groups of 20–50+ people for team building events, birthday parties, and school trips. For large groups, contact us directly and we\'ll arrange a custom package with the right mix of boats and logistics.',
  },
  {
    q: 'What happens if the weather is bad?',
    a: 'Light rain is actually great for paddling - fewer people on the river and beautiful atmosphere. In case of storms or dangerous conditions, we\'ll contact you to reschedule. Bookings can be moved to another date free of charge.',
  },
  {
    q: 'How does payment work?',
    a: 'After you submit a booking, we review it and send a confirmation email with the total price and a payment link. You can pay by bank transfer or card (via MakeCommerce). Payment is required to confirm your reservation.',
  },
  {
    q: 'Can I cancel or change my booking?',
    a: 'Yes. Free cancellation or date changes up to 48 hours before the trip. For changes within 48 hours, contact us directly and we\'ll do our best to accommodate.',
  },
]

export function RiverFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className={`faq-item${isOpen ? ' faq-open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <svg
                className={`faq-chevron${isOpen ? ' faq-chevron-open' : ''}`}
                width="20" height="20" viewBox="0 0 20 20" fill="none"
              >
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
