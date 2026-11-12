/**
 * The couple as reusable anime-style SVG characters.
 *
 * Consistency comes from construction: every scene uses the SAME head
 * components, palette and outfit colours below, so the bride and groom look
 * identical in every illustration. Change a colour here and it updates everywhere.
 *
 * Coordinates: each head is drawn around (0,0) — face centre — at ~60px wide.
 * Scenes position them with <g transform="translate(x y) scale(s)">.
 */

export const PALETTE = {
  brideSkin: '#7B4A30',
  brideSkinShade: '#673C26',
  groomSkin: '#5E3B27',
  groomSkinShade: '#4C2F1F',
  hair: '#1D1413',
  hairShine: '#3A2A2A',
  iris: '#3A2216',
  blush: '#E58C9C',
  lip: '#8E4A4A',
  dress: '#CDB6E4',
  dressShade: '#B394D3',
  cardigan: '#FBF5EA',
  cardiganShade: '#EADFCB',
  shirt: '#E6E4EA',
  shirtShade: '#CFCBD6',
  trousers: '#5B5568',
  flower: '#C3A0CF',
  line: '#3E2342',
} as const;

export type EyeState = 'open' | 'happy' | 'teary';
export type MouthState = 'smile' | 'open' | 'none';

interface HeadProps {
  /** Shift irises left/right (-1 … 1) to show where they are looking. */
  look?: number;
  eyes?: EyeState;
  mouth?: MouthState;
}

/** Big glossy anime eye. `lash` controls lash weight (bride heavier). */
function Eye({ x, look, state, lash }: { x: number; look: number; state: EyeState; lash: number }) {
  if (state === 'happy') {
    return <path d={`M${x - 6} 0 Q ${x} -6 ${x + 6} 0`} stroke={PALETTE.line} strokeWidth={lash} fill="none" strokeLinecap="round" />;
  }
  const ix = x + look * 1.8;
  return (
    <g>
      <ellipse cx={x} cy={0} rx={6.2} ry={7.6} fill="#FFFFFF" />
      <ellipse cx={ix} cy={0.8} rx={4.6} ry={6.4} fill={PALETTE.iris} />
      <ellipse cx={ix} cy={2.6} rx={3.2} ry={3.6} fill="#6B4430" opacity={0.75} />
      <circle cx={ix} cy={1} r={1.8} fill="#140C08" />
      <circle cx={ix - 1.8} cy={-2.2} r={1.7} fill="#FFFFFF" />
      <circle cx={ix + 1.9} cy={3} r={0.8} fill="#FFFFFF" />
      {state === 'teary' && <path d={`M${x - 5} 7.5 Q ${x} 9.5 ${x + 5} 7.5`} stroke="#FFFFFF" strokeWidth={1.4} fill="none" opacity={0.9} />}
      {/* upper lash line */}
      <path d={`M${x - 7} -4 Q ${x} -10 ${x + 7} -4`} stroke={PALETTE.line} strokeWidth={lash} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Mouth({ state, y = 17 }: { state: MouthState; y?: number }) {
  if (state === 'none') return null;
  if (state === 'open') return <path d={`M-4 ${y} Q 0 ${y + 6} 4 ${y} Z`} fill={PALETTE.lip} />;
  return <path d={`M-4 ${y} Q 0 ${y + 3.5} 4 ${y}`} stroke={PALETTE.lip} strokeWidth={1.4} fill="none" strokeLinecap="round" />;
}

/** Lilac flower hair clip — the bride's signature detail in every scene. */
export function FlowerClip({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-4.5} rx={3.4} ry={5} fill={PALETTE.flower} transform={`rotate(${a})`} />
      ))}
      <circle r={2.2} fill="#FBF5EA" />
    </g>
  );
}

/** Coily shoulder-length hair as a cloud of overlapping curls. */
const CURLS_BACK: [number, number, number][] = [
  [-30, -26, 14], [-14, -40, 15], [6, -42, 15], [24, -32, 14], [34, -14, 13], [36, 6, 12], [32, 24, 11],
  [-36, -8, 13], [-38, 12, 12], [-33, 28, 11], [-22, 36, 9], [22, 36, 9],
];
const CURLS_FRONT: [number, number, number][] = [
  [-22, -30, 9], [-8, -35, 9.5], [8, -35, 9.5], [21, -29, 9], [-28, -18, 7], [28, -17, 7],
];

export function BrideHead({ look = 0, eyes = 'open', mouth = 'smile' }: HeadProps) {
  return (
    <g>
      {CURLS_BACK.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={PALETTE.hair} />)}
      <rect x={-7} y={24} width={14} height={14} fill={PALETTE.brideSkinShade} />
      <path d="M-25 -8 C -25 -33, 25 -33, 25 -8 C 25 13, 12 28, 0 30 C -12 28, -25 13, -25 -8 Z" fill={PALETTE.brideSkin} />
      <ellipse cx={-25} cy={2} rx={3} ry={5} fill={PALETTE.brideSkinShade} />
      <ellipse cx={25} cy={2} rx={3} ry={5} fill={PALETTE.brideSkinShade} />
      <circle cx={-25} cy={9} r={1.8} fill="#FBF5EA" />
      <circle cx={25} cy={9} r={1.8} fill="#FBF5EA" />
      {CURLS_FRONT.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={PALETTE.hair} />)}
      <circle cx={-6} cy={-38} r={3} fill={PALETTE.hairShine} opacity={0.7} />
      <circle cx={12} cy={-37} r={2.2} fill={PALETTE.hairShine} opacity={0.6} />
      {/* brows */}
      <path d="M-17 -15 Q -11 -18 -5 -15.5" stroke={PALETTE.hair} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <path d="M5 -15.5 Q 11 -18 17 -15" stroke={PALETTE.hair} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <g transform="translate(0 -2)">
        <Eye x={-11} look={look} state={eyes} lash={2.4} />
        <Eye x={11} look={look} state={eyes} lash={2.4} />
      </g>
      <ellipse cx={-15} cy={9} rx={4.5} ry={2.5} fill={PALETTE.blush} opacity={0.45} />
      <ellipse cx={15} cy={9} rx={4.5} ry={2.5} fill={PALETTE.blush} opacity={0.45} />
      <path d="M-1.5 8 Q 0 10 1.5 8" stroke={PALETTE.brideSkinShade} strokeWidth={1.2} fill="none" />
      <Mouth state={mouth} />
      <FlowerClip x={-24} y={-26} />
    </g>
  );
}

export function GroomHead({ look = 0, eyes = 'open', mouth = 'smile' }: HeadProps) {
  return (
    <g>
      <rect x={-8} y={24} width={16} height={16} fill={PALETTE.groomSkinShade} />
      <path d="M-25 -10 C -25 -36, 25 -36, 25 -10 C 25 13, 14 31, 0 33 C -14 31, -25 13, -25 -10 Z" fill={PALETTE.groomSkin} />
      <ellipse cx={-25} cy={0} rx={3.4} ry={6} fill={PALETTE.groomSkinShade} />
      <ellipse cx={25} cy={0} rx={3.4} ry={6} fill={PALETTE.groomSkinShade} />
      {/* short hair with a soft fade at the sides */}
      <path d="M-27 -8 C -31 -46, 31 -50, 27 -8 C 25 -20, 20 -26, 10 -27 C 2 -24, -8 -27, -16 -25 C -22 -22, -25 -16, -27 -8 Z" fill={PALETTE.hair} />
      <path d="M-27 -8 C -27 -2, -26 2, -25 4 L -23 -10 Z M27 -8 C 27 -2, 26 2, 25 4 L 23 -10 Z" fill={PALETTE.hair} opacity={0.55} />
      <path d="M-10 -34 Q 2 -38 13 -33" stroke={PALETTE.hairShine} strokeWidth={2} fill="none" opacity={0.7} strokeLinecap="round" />
      {/* trimmed beard + moustache */}
      <path d="M-24 2 C -22 18, -12 32, 0 34 C 12 32, 22 18, 24 2 C 21 14, 14 22, 7 22 C 3 20, -3 20, -7 22 C -14 22, -21 14, -24 2 Z" fill={PALETTE.hair} opacity={0.85} />
      <path d="M-7 13.5 Q 0 10.5 7 13.5 Q 0 12.8 -7 13.5 Z" fill={PALETTE.hair} stroke={PALETTE.hair} strokeWidth={1.6} strokeLinejoin="round" />
      {/* brows — thicker */}
      <path d="M-18 -15 Q -11 -19 -4 -16" stroke={PALETTE.hair} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <path d="M4 -16 Q 11 -19 18 -15" stroke={PALETTE.hair} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <g transform="translate(0 -3) scale(0.92)">
        <Eye x={-12} look={look} state={eyes} lash={1.8} />
        <Eye x={12} look={look} state={eyes} lash={1.8} />
      </g>
      <path d="M-1.5 6 Q 0 8.5 1.5 6" stroke={PALETTE.groomSkinShade} strokeWidth={1.3} fill="none" />
      <Mouth state={mouth} y={17} />
    </g>
  );
}

/** Simple rounded hand. */
export const Hand = ({ x, y, skin, r = 5.5, outline }: { x: number; y: number; skin: string; r?: number; outline?: string }) => (
  <ellipse cx={x} cy={y} rx={r} ry={r * 0.85} fill={skin} stroke={outline} strokeWidth={outline ? 1.2 : 0} />
);
