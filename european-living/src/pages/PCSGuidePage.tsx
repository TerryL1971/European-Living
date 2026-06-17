// src/pages/PCSGuidePage.tsx
// PCS Guide — Germany Edition
// Designed for the USO lounge partnership: readable on tablet/phone,
// downloadable resources per phase, clean enough for kiosk display.

import { useState } from 'react';
import SEO, { BreadcrumbSchema } from '../components/SEO';

// ── Feature flags ──────────────────────────────────────────────────────────
// Set to true once the USO partnership is officially confirmed.
const SHOW_USO_BANNER = false;

// ── Types ──────────────────────────────────────────────────────────────────

interface Resource {
  label: string;
  url: string;
  type: 'official' | 'download' | 'guide';
  description: string;
  comingSoon?: boolean;
}

interface Phase {
  id: string;
  timing: string;
  title: string;
  subtitle: string;
  color: string;
  steps: string[];
  resources: Resource[];
  warning?: string;
  tip?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: 'orders',
    timing: 'When orders arrive',
    title: 'You Got Orders',
    subtitle: 'The first 72 hours after orders drop are the most important.',
    color: '#1B3A5C',
    steps: [
      'Read your orders carefully — confirm your gaining unit, report date, and authorized dependents.',
      'Contact your gaining unit\'s sponsorship coordinator immediately. If none is assigned, ask your gaining unit\'s S1.',
      'Schedule your in-person or virtual PCS briefing with your losing unit\'s transportation office.',
      'Apply for your no-fee passport (and tourist passport if you don\'t have one) at your installation passport office.',
      'Begin researching housing: on-post vs. off-post BAH and COLA rates for your gaining installation.',
      'Notify your children\'s school of the upcoming move and request official school records.',
      'Pull all medical and dental records for every family member. Germany requires vaccination documentation.',
    ],
    resources: [
      {
        label: 'Military OneSource — PCS Planning',
        url: 'https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/',
        type: 'official',
        description: 'Official DoD resource for PCS planning. Start here.',
      },
      {
        label: 'USAREUR-AF BAH / COLA Calculator',
        url: 'https://www.eur.army.mil',
        type: 'official',
        description: 'Look up current housing allowance rates for your gaining installation.',
      },
      {
        label: 'No-Fee Passport Application (DS-11)',
        url: 'https://travel.state.gov/content/travel/en/passports/need-passport/military.html',
        type: 'official',
        description: 'Official State Department guidance for military no-fee passports.',
      },
      {
        label: 'European Living: PCS Germany Checklist',
        url: '/articles/pcs-germany-checklist?print=true',
        type: 'download',
        description: 'Full phase-by-phase checklist. Opens print dialog — save as PDF or print.',
      },
    ],
    tip: 'Your sponsor is supposed to contact you within 30 days of your orders being published. If they don\'t, reach out to your gaining unit\'s rear detachment or S1 office directly.',
  },
  {
    id: 'prepare',
    timing: '60–30 days before departure',
    title: 'Preparing to Leave',
    subtitle: 'This window closes fast. Do these in order.',
    color: '#2A5F8F',
    steps: [
      'Schedule your household goods (HHG) and unaccompanied baggage (UAB) shipments through your transportation office. UAB arrives first — pack accordingly.',
      'Arrange pet travel. Germany requires EU pet passport, rabies vaccination, and microchip. This takes time — start immediately.',
      'Obtain an International Driving Permit (IDP) from AAA. You have 6 months to get a USAREUR license after arrival — the IDP covers you in the meantime.',
      'Set up international banking. USAA, Navy Federal, and Charles Schwab all have zero-fee international ATM options.',
      'Arrange power of attorney for your spouse if needed (SCRA protections, car sales, legal decisions).',
      'Notify your US bank, credit cards, and any subscription services of your address change.',
      'Research schools for your children. DoDEA schools are on-post and free. German public schools and private international schools are options if living off-post.',
      'Arrange temporary lodging (TLA) for your first 30–60 days. Book Army lodging or approved TLA housing before you leave.',
    ],
    resources: [
      {
        label: 'DoDEA School Finder — Europe',
        url: 'https://www.dodea.edu/europe',
        type: 'official',
        description: 'Find DoDEA schools near your gaining installation.',
      },
      {
        label: 'AAA International Driving Permit',
        url: 'https://www.aaa.com/vacation/idpf.html',
        type: 'official',
        description: 'Apply in person at any AAA location. Bring two passport photos.',
      },
      {
        label: 'Army.mil — PCS to Germany with Pets',
        url: 'https://www.army.mil/article/256103/how_to_pcs_to_germany_with_pets',
        type: 'official',
        description: 'Official Army guidance on microchip, vaccination, health certificate, and breed restrictions.',
      },
      {
        label: 'Military OneSource — Pet Travel',
        url: 'https://www.militaryonesource.mil/moving-housing/moving/planning-your-move/',
        type: 'official',
        description: 'DoD resource for moving with pets overseas.',
      },
      {
        label: 'European Living: Germany Banking Guide',
        url: '/articles/banking-in-germany',
        type: 'guide',
        description: 'Which US banks work in Germany and how to set up a German account.',
      },
    ],
    warning: 'Certain dog breeds (Kampfhunde) are prohibited or restricted in Germany and on US installations in Germany. Check breed restrictions before making travel arrangements. This is not reversible at the border.',
    tip: 'Pack a "first night bag" with 3–5 days of essentials for every family member. HHG can take 6–10 weeks. UAB typically takes 3–4 weeks. Plan for the gap.',
  },
  {
    id: 'transit',
    timing: 'Travel day & first 72 hours',
    title: 'In Transit',
    subtitle: 'You\'re moving. Here\'s what to do the moment you land.',
    color: '#1B3A5C',
    steps: [
      'Land at Frankfurt (FRA) or Ramstein (RAX) if flying Space-A. USO lounges are available at FRA — this guide was made for you.',
      'Contact your sponsor or gaining unit POC immediately upon landing.',
      'Check into Army lodging or TLA. You are authorized TLA from the moment you report — keep all receipts.',
      'In-process at your gaining unit\'s S1 within 24–48 hours of reporting. Bring: orders, ID cards, passports, and dependents\' documents.',
      'Visit the SOFA registration office. SOFA status in Germany grants significant legal protections — don\'t skip this step.',
      'Get a German SIM card or activate an international plan. Signal on US military networks can be unreliable outside of gates.',
      'Visit the Welcome Center (ACS or Army Community Service) on your installation. They have a checklist for everything.',
    ],
    resources: [
      {
        label: 'USO Airport Lounges — Find a Lounge',
        url: 'https://www.uso.org/locations',
        type: 'official',
        description: 'Find the nearest USO lounge in any airport. Available to all active duty, Guard, Reserve, and dependents.',
      },
      {
        label: 'Frankfurt Airport (FRA) — Military Terminal Guide',
        url: 'https://www.frankfurt-airport.com',
        type: 'official',
        description: 'Terminal maps, USO location, customs information.',
      },
      {
        label: 'European Living: First 72 Hours in Germany',
        url: '/articles/first-72-hours-germany',
        type: 'guide',
        description: 'What to do the moment you land — in the right order.',
      },
      {
        label: 'SOFA Status Explained',
        url: '/articles/sofa-status-germany',
        type: 'guide',
        description: 'What SOFA status means, what it covers, and what it doesn\'t.',
      },
    ],
    tip: 'You do not need to drive immediately. Most installations have shuttles. Get rest on night one — the in-processing paperwork starts on day two and there is a lot of it.',
  },
  {
    id: 'first30',
    timing: 'Days 1–30 after arrival',
    title: 'First 30 Days — Getting Mobile & Set Up',
    subtitle: 'Transportation first, then banking, then everything else. In that order.',
    color: '#2A5F8F',
    steps: [
      // ── Transportation (most urgent) ──────────────────────────
      'Get a rental car immediately if you did not ship a vehicle. On-post car rental (Enterprise, Hertz) accepts your US license for the first 6 months. Off-post German rental agencies also accept it. Book ahead — availability near bases is limited during PCS season (June–August).',
      'Get your USAREUR driver\'s license within your first 6 months — this is the clock that starts the day you report, not the day you arrive in Germany. Bring your US license, orders, and a USAREUR Form 190-1 to your installation\'s vehicle registration office. A written test on German traffic law is required.',
      'Decide: buy on-post or buy off-post? On-post car lots (like the Grafenwöhr or Kaiserslautern auto sales) sell US-spec vehicles — easier to finance with USAA or Navy Federal, no German paperwork. Off-post German vehicles are cheaper and better suited for German roads and autobahn driving but require more documentation and a German bank account.',
      'If buying a German vehicle off-post: understand the market before you walk onto any lot. The "lemon lot" — private sales on post — is full of vehicles being offloaded by families PCSing out. Prices look attractive but there is no warranty, no recourse, and no inspection requirement. Many of these vehicles have deferred maintenance that the seller knows about and you won\'t discover until after you\'ve driven off. A €6,000 lemon lot car that needs €3,000 in repairs immediately is not a deal. Reputable dealers near US bases who specialize in military families — such as Used Car Guys GmbH (usedcarguys.net) — offer both US-spec and EU-spec vehicles with a 1-year warranty and a guaranteed buyback program, which matters enormously when you PCS out in 3 years. They also allow you to reserve a vehicle before you arrive and handle most of the paperwork in advance, so you are not scrambling for transportation in your first week. Whatever you buy, make sure your insurance is in place before you drive it off the lot.',
      'If buying on-post: bring your orders, military ID, a pre-approval letter from USAA or Navy Federal, and your IDP. Financing is available through the auto sales office. US-spec vehicles require USAREUR plates and on-post insurance (available through USAA or Armed Forces Insurance).',
      'Get USAREUR vehicle insurance before you drive anything off the lot — this is not optional and is not negotiable. Your US insurance policy does not cover you in Germany. Options include USAA, GEICO Military, Armed Forces Insurance, and American Auto Nation Insurance (americanautonation.com), which specializes in coverage for military families buying vehicles in Germany and can often have you covered same-day. Minimum required liability coverage in Germany is €7.5 million — higher than anything you carried in the US, but standard here.',
      // ── Phone & connectivity ──────────────────────────────────
      'Get a German SIM card or activate an international phone plan on Day 1. Without a local number you cannot call landlords, doctors, or German businesses. Aldi Talk, Congstar, and Telekom all sell prepaid SIMs at any supermarket or electronics store — no German ID required for prepaid. Bring your unlocked phone.',
      'Set up internet at your off-post home. Deutsche Telekom, Vodafone, and o2 are the main providers. Contracts are 24 months — start the process early because installation takes 2–4 weeks. In the meantime, a mobile hotspot (available at the PX) bridges the gap.',
      // ── Banking ───────────────────────────────────────────────
      'Open a German bank account if living off-post. Your landlord will require SEPA bank transfers — US wire transfers are not accepted for rent. Deutsche Bank and Commerzbank have English-speaking staff near most bases. N26 is a digital option that opens entirely online and works immediately.',
      'Apply for your SOFA tax exemption card (VAT Form 7600) at your installation\'s Vehicle Registration / SOFA office. This card exempts you from Germany\'s 19% VAT on most purchases. Bring it every time you shop — you will save hundreds of euros per year.',
      // ── Housing ───────────────────────────────────────────────
      'If living off-post, complete the Anmeldung (address registration) at your local Einwohnermeldeamt within 14 days of moving in. Bring your passport, lease agreement, and a Wohnungsgeberbestätigung (landlord confirmation form — your landlord must provide this). This is required by German law and unlocks access to German services.',
      'Walk through your rental property with your landlord and complete the Übergabeprotokoll (move-in inspection form) on day one. Document every scratch, scuff, and imperfection with photos. German landlords can charge for pre-existing damage at move-out if it is not documented at move-in. This is the most common financial mistake military families make in Germany.',
      // ── Medical & family ─────────────────────────────────────
      'Register with TRICARE Europe within your first week. Your coverage carries over but you must register locally to use German providers, make appointments, and get referrals. Keep your US TRICARE card — you will need it for stateside care during leave.',
      'Find an English-speaking doctor and dentist near your installation before you need one. European Living\'s services directory has verified English-speaking providers near every major US base in Germany. Do not wait until someone is sick.',
      'Enroll your children in school immediately. DoDEA schools are on-post, free, and follow a US curriculum — enrollment is through your installation\'s DoDEA school office. If attending a German or international school off-post, contact the school directly as soon as your address is confirmed.',
      // ── Grocery & daily life ──────────────────────────────────
      'Learn the local grocery stores. REWE, Edeka, and Kaufland are the main German supermarkets — most have basic English-speaking staff near bases. ALDI and Lidl are excellent for produce and everyday items. The commissary on-post carries US products but can be expensive for non-staples. Germans shop daily or every few days — refrigerators are smaller than US ones.',
      'Understand German shopping hours. Most stores close by 8–10pm and are closed on Sundays. Gas stations stay open Sundays for basics. Plan your weekly shopping accordingly — running out of something Sunday afternoon is a rite of passage for every American family in Germany.',
    ],
    resources: [
      {
        label: 'USAA Auto Insurance — Overseas Coverage',
        url: 'https://www.usaa.com/insurance/overseas/?akredirect=true',
        type: 'official',
        description: 'USAA offers USAREUR-compliant coverage. Get a quote before you buy a vehicle.',
      },
      {
        label: 'European Living Services Directory',
        url: '/services-directory',
        type: 'guide',
        description: 'English-speaking mechanics, doctors, dentists, and more — verified near your base.',
      },
      {
        label: 'TRICARE Europe — Enrollment',
        url: 'https://www.tricare-overseas.com',
        type: 'official',
        description: 'Register with TRICARE Europe and find authorized local providers.',
      },
      {
        label: 'USAREUR Vehicle Registration',
        url: 'https://www.eur.army.mil',
        type: 'official',
        description: 'Visit eur.army.mil and search Vehicle Registration for your installation\'s requirements.',
      },
      {
        label: 'N26 — Online German Bank Account',
        url: 'https://n26.com/en-eu',
        type: 'official',
        description: 'Opens fully online with a passport. Good English support. Accepted by German landlords.',
      },
      {
        label: 'Used Car Guys GmbH — Military Specialist Dealer',
        url: 'https://www.usedcarguys.net',
        type: 'official',
        description: 'US and EU-spec vehicles with 1-year warranty and guaranteed buyback. Reserve before you arrive.',
      },
      {
        label: 'American Auto Nation Insurance',
        url: 'https://www.americanautonation.com',
        type: 'official',
        description: 'USAREUR-compliant vehicle insurance for military families in Germany. Same-day coverage available.',
      },
      {
        label: 'European Living: Buying a Car in Germany Guide',
        url: '/articles/buying-car-germany-military',
        type: 'guide',
        description: 'On-post vs. off-post, what to look for, and how to avoid the common mistakes.',
      },
      {
        label: 'European Living: German Lease & Move-In Guide',
        url: '/articles/renting-off-post-germany',
        type: 'guide',
        description: 'Übergabeprotokoll explained, what to document, and your rights as a SOFA tenant.',
      },
      {
        label: 'DoDEA Europe — School Enrollment',
        url: 'https://www.dodea.edu/europe',
        type: 'official',
        description: 'Find your installation\'s DoDEA school and start the enrollment process.',
      },
    ],
    warning: 'The Anmeldung deadline is 14 days after moving into your off-post address. Missing it is a fineable offense under German law — SOFA status does not exempt you. Your landlord must provide a Wohnungsgeberbestätigung form for you to complete the registration. Ask for it before you sign the lease.',
    tip: 'The single biggest quality-of-life unlock in your first week is getting mobile. Whether that\'s a rental, a loaner from your sponsor, or buying on-post — do not wait. Without a car in Germany you are dependent on installation shuttles and the train network, which are fine but limiting. Everything else — banking, doctors, school — is easier once you can drive yourself.',
  },
  {
    id: 'settled',
    timing: 'Days 30–90 and beyond',
    title: 'Getting Settled',
    subtitle: 'You\'re past the sprint. Now make it home.',
    color: '#1B3A5C',
    steps: [
      'Explore your local area. Germany\'s train network (Deutsche Bahn) connects you to all of Europe. A Deutschland-Ticket (€49/month) covers local and regional trains.',
      'Learn basic German phrases. Most Germans near US bases speak English, but effort is appreciated and opens doors.',
      'Join your installation\'s Family Readiness Group (FRG) or Spouses\' Club. These are your fastest path to trusted local knowledge.',
      'Set up your PCS-out timeline mentally. The average tour in Germany is 3 years. Understand when your DEROS is and what flexibility you have.',
      'Register for Soldier for Life (SFL) briefings if nearing the end of your career.',
      'Use European Living to find local community events, day trips, and family adventures within driving distance.',
    ],
    resources: [
      {
        label: 'Deutsche Bahn — Germany Train Network',
        url: 'https://www.bahn.de/en',
        type: 'official',
        description: 'Book trains across Germany and Europe. The DB Navigator app is essential.',
      },
      {
        label: 'European Living: Day Trips from Germany',
        url: '/day-trips',
        type: 'guide',
        description: 'Weekend trips and family adventures within driving or train distance.',
      },
      {
        label: 'European Living: Family Adventures',
        url: '/family-adventures',
        type: 'guide',
        description: 'Family-friendly activities, parks, and experiences across Germany.',
      },
      {
        label: 'ACS Germany — Army Community Service',
        url: 'https://www.armyresilience.army.mil/ACS/index.html',
        type: 'official',
        description: 'On-post programs for families — financial counseling, employment assistance, deployment support.',
      },
    ],
    tip: 'Your first winter in Germany will be grey and cold. This is normal. Germans call it Gemütlichkeit — embrace the warmth of Christmas markets, Glühwein, and local traditions. Spring in Germany is extraordinary.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is SOFA status and why does it matter in Germany?',
    answer: 'SOFA stands for Status of Forces Agreement. It is a bilateral agreement between the US and Germany that defines the legal status of US military personnel and their dependents living in Germany. SOFA status grants significant protections: exemption from German income tax on military pay, exemption from German VAT on many purchases (via the VAT form), the right to use on-post facilities, and special provisions for driving, importing vehicles, and registering your address. Your SOFA status is tied to your orders — it applies to active duty service members, GS civilians on orders, and authorized dependents.',
  },
  {
    question: 'How long does it take for household goods to arrive in Germany?',
    answer: 'Unaccompanied baggage (UAB) — your priority shipment — typically takes 3–5 weeks to arrive in Germany. Household goods (HHG) — your main shipment — typically takes 6–12 weeks depending on origin, season, and shipping lane congestion. Plan to live out of suitcases and your UAB shipment for up to 3 months. Pack your UAB with items you need daily: medications, kitchen basics, children\'s comfort items, and work uniforms.',
  },
  {
    question: 'Do I need to learn German before moving to Germany?',
    answer: 'No, but it helps significantly off-post. Most Germans near US military installations speak functional English, particularly in stores, medical offices, and restaurants. However, landlords, local government offices (Einwohnermeldeamt), and neighbors often communicate in German. Learning basic phrases — greetings, numbers, please and thank you — goes a long way. DuoLingo and Pimsleur are both used by military families in the weeks before departure.',
  },
  {
    question: 'Can I bring my pet to Germany?',
    answer: 'Yes, but with strict requirements. Dogs and cats must have: a microchip, a valid rabies vaccination (given after the microchip), and an EU pet passport or official health certificate. Certain dog breeds are prohibited in Germany entirely (including on US installations) — these include American Pit Bull Terriers, American Staffordshire Terriers, Staffordshire Bull Terriers, and Bull Terriers. Breed restrictions apply even if your installation\'s policy is different. Start the pet travel process at least 3 months before your departure date.',
  },
  {
    question: 'What is TLA and how long can I receive it?',
    answer: 'TLA stands for Temporary Lodging Allowance. It is a daily allowance paid to service members and their families to cover the cost of temporary housing while waiting for permanent housing (either on-post or off-post). TLA begins on the day you report and continues until you move into permanent housing, up to a maximum of 60 days (extendable in some cases with commander approval). Keep all receipts — TLA is reimbursed against actual lodging costs.',
  },
  {
    question: 'Are US driver\'s licenses valid in Germany?',
    answer: 'Your US state driver\'s license is valid in Germany for 6 months after you arrive. Within those 6 months, you must obtain a USAREUR (US Army Europe) driver\'s license to continue driving. The USAREUR license requires a written test based on German traffic law. Before your USAREUR license is issued, an International Driving Permit (IDP) from AAA — obtained before you leave the US — serves as an additional document alongside your US license. The IDP is a translation only, not a standalone license.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function ResourceBadge({ type }: { type: Resource['type'] }) {
  const config = {
    official: { label: 'Official', bg: '#1B3A5C', color: '#fff' },
    download: { label: '⬇ Download', bg: '#9da586', color: '#fff' },
    guide: { label: 'EL Guide', bg: '#C9733A', color: '#fff' },
  }[type];
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '10px',
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: config.bg,
      color: config.color,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      flexShrink: 0,
    }}>
      {config.label}
    </span>
  );
}

function PhaseCard({ phase, isOpen, onToggle }: {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={`phase-${phase.id}`}
      style={{
        marginBottom: '2px',
        borderRadius: isOpen ? '12px' : '12px',
        overflow: 'hidden',
        boxShadow: isOpen ? '0 4px 24px rgba(27,58,92,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease',
      }}>
      {/* Phase header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          backgroundColor: isOpen ? phase.color : '#fff',
          color: isOpen ? '#fff' : '#1B3A5C',
          border: `1.5px solid ${isOpen ? phase.color : '#e5e7eb'}`,
          borderBottom: isOpen ? 'none' : undefined,
          borderRadius: isOpen ? '12px 12px 0 0' : '12px',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{
          flexShrink: 0,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: isOpen ? 'rgba(255,255,255,0.15)' : `${phase.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          {['📋','📦','✈️','🏠','🌍'][PHASES.indexOf(phase)]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            opacity: isOpen ? 0.75 : 1,
            color: isOpen ? '#fff' : '#9da586',
            marginBottom: '2px',
          }}>
            {phase.timing}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.2 }}>
            {phase.title}
          </div>
          <div style={{
            fontSize: '13px',
            opacity: 0.8,
            marginTop: '2px',
            display: isOpen ? 'none' : 'block',
            color: '#6b7280',
          }}>
            {phase.subtitle}
          </div>
        </div>
        <div style={{
          flexShrink: 0,
          fontSize: '20px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          opacity: 0.6,
        }}>
          ↓
        </div>
      </button>

      {/* Phase body */}
      {isOpen && (
        <div style={{
          border: `1.5px solid ${phase.color}`,
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          backgroundColor: '#fff',
          padding: '0 0 24px',
        }}>
          {/* Subtitle */}
          <div style={{
            padding: '16px 24px 0',
            fontSize: '14px',
            color: '#374151',
            fontStyle: 'italic',
          }}>
            {phase.subtitle}
          </div>

          {/* Warning */}
          {phase.warning && (
            <div style={{
              margin: '16px 24px 0',
              padding: '12px 16px',
              backgroundColor: '#FEF3C7',
              borderLeft: '4px solid #D97706',
              borderRadius: '0 8px 8px 0',
              fontSize: '13px',
              color: '#92400E',
              lineHeight: 1.5,
            }}>
              <strong>⚠ Important: </strong>{phase.warning}
            </div>
          )}

          {/* Steps */}
          <div style={{ padding: '20px 24px 0' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: phase.color,
              marginBottom: '12px',
            }}>
              Action Steps
            </div>
            <ol style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
              {phase.steps.map((step, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  fontSize: '14px',
                  lineHeight: 1.55,
                  color: '#374151',
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: `${phase.color}18`,
                    color: phase.color,
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Tip */}
          {phase.tip && (
            <div style={{
              margin: '16px 24px 0',
              padding: '12px 16px',
              backgroundColor: `${phase.color}0C`,
              borderLeft: `4px solid ${phase.color}`,
              borderRadius: '0 8px 8px 0',
              fontSize: '13px',
              color: '#374151',
              lineHeight: 1.5,
            }}>
              <strong style={{ color: phase.color }}>💡 Tip: </strong>{phase.tip}
            </div>
          )}

          {/* Resources */}
          <div style={{ padding: '20px 24px 0' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: phase.color,
              marginBottom: '12px',
            }}>
              Resources & Downloads
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {phase.resources.map((r, i) => {
                const isExternal = r.url.startsWith('http');
                const Tag = r.comingSoon ? 'div' : 'a';
                const linkProps = r.comingSoon ? {} : {
                  href: r.url,
                  target: isExternal ? '_blank' : undefined,
                  rel: isExternal ? 'noopener noreferrer' : undefined,
                };
                return (
                  <Tag
                    key={i}
                    {...linkProps}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 14px',
                      backgroundColor: r.comingSoon ? '#f3f4f6' : '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      textDecoration: 'none',
                      color: 'inherit',
                      opacity: r.comingSoon ? 0.65 : 1,
                      cursor: r.comingSoon ? 'default' : 'pointer',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: r.comingSoon ? '#6b7280' : '#1B3A5C',
                        marginBottom: '3px',
                      }}>
                        {r.label}
                        {r.comingSoon && (
                          <span style={{
                            marginLeft: '8px',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}>
                            Coming soon
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        lineHeight: 1.4,
                      }}>
                        {r.description}
                      </div>
                    </div>
                    {!r.comingSoon && <ResourceBadge type={r.type} />}
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FAQItem({ item }: { item: typeof FAQ_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1px solid #e5e7eb',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '15px',
          fontWeight: 600,
          color: '#1B3A5C',
          lineHeight: 1.4,
        }}
      >
        {item.question}
        <span style={{
          flexShrink: 0,
          fontSize: '18px',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
          color: '#9da586',
          marginTop: '2px',
        }}>↓</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: '18px',
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#374151',
        }}>
          {item.answer}
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function PCSGuidePage() {
  const [openPhase, setOpenPhase] = useState<string | null>('orders');

  const togglePhase = (id: string) => {
    setOpenPhase(prev => prev === id ? null : id);
    // Prevent browser from jumping when expanding bottom phases
    const el = document.getElementById(`phase-${id}`);
    if (el) {
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      <SEO
        title="PCS to Germany Guide — Everything You Need Before You Land"
        description="The complete guide for US military families PCSing to Germany. Phase-by-phase action steps, downloadable checklists, and verified resources from orders to settled in."
        keywords="PCS to Germany, PCS guide Germany, military move Germany, SOFA status Germany, USAREUR, Ramstein, Stuttgart, Grafenwöhr, PCS checklist Germany, military family Germany"
        faqItems={FAQ_ITEMS}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'PCS Guide to Germany', url: '/pcs-guide' },
      ]} />

      <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#111827' }}>

        {/* ── USO Partnership Banner — hidden until partnership is confirmed ── */}
        {SHOW_USO_BANNER && (
          <div style={{
            backgroundColor: '#1B3A5C',
            color: '#fff',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 500,
            flexWrap: 'wrap',
            textAlign: 'center',
          }}>
            <span style={{ opacity: 0.75 }}>Available at USO Lounges across the United States</span>
            <span style={{
              backgroundColor: '#9da586',
              color: '#fff',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              USO Partnership
            </span>
          </div>
        )}

        {/* ── Hero ──────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1B3A5C 0%, #2A5F8F 60%, #9da586 100%)',
          padding: 'clamp(48px, 8vw, 96px) 24px',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background texture pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(157,165,134,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(157,165,134,0.25)',
              border: '1px solid rgba(157,165,134,0.4)',
              color: '#d4dbc8',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '20px',
            }}>
              Germany Edition · All Bases Covered
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: '0 0 16px',
              letterSpacing: '-0.02em',
            }}>
              Your PCS to Germany.<br />
              <span style={{ color: '#c8d4b4' }}>Step by step.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: 1.6,
              opacity: 0.85,
              margin: '0 0 32px',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              From the day your orders drop to the day you feel at home in Germany.
              Verified steps, official resources, and honest advice — whether your
              sponsor is excellent or completely MIA.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#phases" style={{
                backgroundColor: '#9da586',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}>
                Start the Guide ↓
              </a>
              <a href="/services-directory" style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.3)',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}>
                Find Services Near Your Base
              </a>
            </div>
          </div>
        </div>

        {/* ── Quick stats strip ──────────────────────────────── */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          padding: '20px 24px',
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            textAlign: 'center',
          }}>
            {[
              { num: '5', label: 'PCS Phases Covered' },
              { num: '30+', label: 'Action Steps' },
              { num: '20+', label: 'Official Resources' },
              { num: '6', label: 'FAQs Answered' },
              { num: 'All', label: 'Major Bases in Germany' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#1B3A5C' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Who this is for ───────────────────────────────── */}
        <div style={{ padding: 'clamp(40px, 6vw, 72px) 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '8px',
          }}>
            <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9da586',
                marginBottom: '8px',
              }}>
                Who this guide is for
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1B3A5C', margin: 0 }}>
                Every American family headed to Germany
              </h2>
            </div>
            {[
              { icon: '🎖', title: 'Active Duty', desc: 'Service members and families on PCS orders to any installation in Germany.' },
              { icon: '🏛', title: 'GS Civilians', desc: 'DoD federal employees on orders. LQA, TQSA, and FERS rules are noted where they differ.' },
              { icon: '🔧', title: 'Contractors', desc: 'DoD contractors with SOFA status. Doors that are closed to you are clearly marked.' },
              { icon: '💼', title: 'NAF Civilians', desc: 'MWR, AAFES, and FSS employees. NAF-specific differences are called out explicitly.' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '20px',
                backgroundColor: '#fff',
                border: '1.5px solid #e5e7eb',
                borderRadius: '12px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{p.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1B3A5C', marginBottom: '6px' }}>{p.title}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Phase guide ───────────────────────────────────── */}
        <div id="phases" style={{
          backgroundColor: '#f9fafb',
          padding: 'clamp(40px, 6vw, 72px) 24px',
          borderTop: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#9da586',
              marginBottom: '8px',
            }}>
              Phase-by-phase guide
            </div>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              color: '#1B3A5C',
              margin: '0 0 8px',
            }}>
              Select your phase
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 32px',
              lineHeight: 1.6,
            }}>
              Open the phase that matches where you are right now. Each phase has verified action steps, official resource links, and downloadable guides.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PHASES.map(phase => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  isOpen={openPhase === phase.id}
                  onToggle={() => togglePhase(phase.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Important numbers ─────────────────────────────── */}
        <div style={{ padding: 'clamp(40px, 6vw, 72px) 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#9da586',
            marginBottom: '8px',
          }}>
            Keep these saved
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1B3A5C', margin: '0 0 24px' }}>
            Key contacts for Germany
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}>
            {[
              { label: 'US Army Europe Emergency', number: 'DSN: 118 / 0611-143-537-1476', note: 'On-post emergency line' },
              { label: 'TRICARE Europe', number: '1-888-777-8343', note: 'Available 24/7 from Germany' },
              { label: 'Frankfurt Airport (FRA)', number: '+49 69 690 0', note: 'Main passenger terminal' },
              { label: 'German Emergency Services', number: '112 (Fire/Medical) / 110 (Police)', note: 'Works from any phone in Germany' },
              { label: 'US Embassy Berlin', number: '+49 30 8305 0', note: 'Consular services and emergencies' },
              { label: 'USAREUR Transportation', number: 'DSN: 537-7249', note: 'HHG and vehicle shipping questions' },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '16px',
                backgroundColor: '#fff',
                border: '1.5px solid #e5e7eb',
                borderRadius: '10px',
              }}>
                <div style={{ fontSize: '12px', color: '#9da586', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{c.label}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1B3A5C', marginBottom: '3px' }}>{c.number}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          padding: 'clamp(40px, 6vw, 72px) 24px',
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#9da586',
              marginBottom: '8px',
            }}>
              Common questions
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#1B3A5C', margin: '0 0 8px' }}>
              Things families ask before they land
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 32px', lineHeight: 1.6 }}>
              Sourced from real questions in military Facebook groups, ACS offices, and FRG meetings — with verified answers.
            </p>
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Services CTA ──────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1B3A5C 0%, #2A5F8F 100%)',
          padding: 'clamp(48px, 8vw, 80px) 24px',
          textAlign: 'center',
          color: '#fff',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🇩🇪</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, margin: '0 0 14px', lineHeight: 1.2 }}>
              Ready to find your community?
            </h2>
            <p style={{ fontSize: '15px', opacity: 0.85, lineHeight: 1.6, margin: '0 0 28px' }}>
              Once you're on the ground, European Living's services directory connects
              you with English-speaking doctors, mechanics, lawyers, housing agents,
              and more — verified near your base.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/services-directory" style={{
                backgroundColor: '#9da586',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
                Browse the Services Directory
              </a>
              <a
                href="https://www.facebook.com/EuropeanLivingOfficial"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>

        {/* ── Disclaimer ────────────────────────────────────── */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          padding: '20px 24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            European Living is an independent resource and is not affiliated with
            the U.S. Department of Defense, the U.S. Army, USAREUR-AF, or any military
            branch. Information is provided for general guidance only. Regulations change —
            always verify requirements with your unit, S1, and official sources before
            making decisions.
          </p>
        </div>

      </div>
    </>
  );
}