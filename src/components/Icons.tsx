// Consistent icon set used throughout the site
// Using Lucide React for clean, professional, uniform icons

import {
  Ruler, Clock, BarChart2, Bus, Waves, Map, Star, Camera,
  Info, Package, Sun, AlertTriangle, Navigation, Anchor,
  Wind, Layers, ChevronRight, Phone, Mail, MapPin, Calendar,
  User, Users, ArrowRight, TreePine, Mountain, ShoppingCart,
  Shield, MessageCircle, Sailboat,
  Globe, Handshake, Accessibility
} from 'lucide-react'

export {
  Ruler as IconDistance,
  Clock as IconDuration,
  BarChart2 as IconDifficulty,
  Bus as IconTransport,
  Waves as IconWater,
  Map as IconMap,
  Star as IconHighlight,
  Camera as IconGallery,
  Info as IconInfo,
  Package as IconIncluded,
  Sun as IconSeason,
  AlertTriangle as IconNote,
  Navigation as IconRoute,
  Anchor as IconBoat,
  Wind as IconSUP,
  Layers as IconRaft,
  ChevronRight as IconArrow,
  Phone as IconPhone,
  Mail as IconEmail,
  MapPin as IconPin,
  Calendar as IconCalendar,
  User as IconSeat,
  Users as IconSeats,
  ArrowRight as IconNext,
  TreePine as IconNature,
  Mountain as IconTerrain,
  ShoppingCart as IconCart,
  User as IconAccount,
  Shield as IconSafety,
  MessageCircle as IconExpertise,
  Sailboat as IconSailboat,
  Globe as IconGlobe,
  Handshake as IconHandshake,
  Accessibility as IconAccessibility,
}

// Boat type icons — consistent throughout the site
export function BoatIcon({ category, size = 20 }: { category: string; size?: number }) {
  const cat = category.toLowerCase()
  const props = { size, strokeWidth: 1.8, style: { color: 'var(--primary)' } }

  if (cat.includes('kayak')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12 C6 7, 18 7, 22 12" />
        <path d="M2 12 C6 17, 18 17, 22 12" />
        <line x1="12" y1="12" x2="12" y2="5" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </svg>
    )
  }
  if (cat.includes('canoe') || cat.includes('kanoe')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14 Q12 8, 21 14" />
        <path d="M3 14 Q12 18, 21 14" />
        <line x1="12" y1="10" x2="14" y2="17" />
        <line x1="12" y1="17" x2="16" y2="17" />
      </svg>
    )
  }
  if (cat.includes('sup')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="13" width="16" height="3" rx="1.5" />
        <circle cx="12" cy="8" r="2.5" />
        <line x1="12" y1="10.5" x2="12" y2="13" />
        <line x1="9" y1="8" x2="6" y2="11" />
      </svg>
    )
  }
  if (cat.includes('raft')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="12" width="20" height="5" rx="2" />
        <line x1="6" y1="12" x2="6" y2="17" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="18" y1="12" x2="18" y2="17" />
        <path d="M8 7 L12 4 L16 7" />
        <line x1="12" y1="4" x2="12" y2="12" />
      </svg>
    )
  }
  // Default boat icon
  return <Anchor size={size} strokeWidth={1.8} style={{ color: 'var(--primary)' }} />
}
