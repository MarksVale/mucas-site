'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQ_KEYS = ['1', '2', '3', '4', '5'] as const

export function FaqSection() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<string>('1')

  return (
    <div className="page-section">
      <h2 className="stitle">
        <span className="stitle-icon"><HelpCircle size={22} strokeWidth={1.8} /></span>
        {t('title')}
      </h2>
      <div className="faq-list">
        {FAQ_KEYS.map((k) => {
          const isOpen = open === k
          return (
            <div className="faq-item" key={k}>
              <button
                className="faq-btn"
                onClick={() => setOpen(isOpen ? '' : k)}
                aria-expanded={isOpen}
              >
                <span className="faq-q">{t(`q${k}`)}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className="faq-chevron"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--primary)', flexShrink: 0 }}
                />
              </button>
              {isOpen && (
                <div className="faq-answer">{t(`a${k}`)}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
