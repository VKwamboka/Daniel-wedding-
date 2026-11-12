/**
 * The three Love Story illustrations, composed from the shared characters.
 * Each scene is a 400×300 SVG (4:3) so it can be swapped 1:1 for a raster
 * image (e.g. the Canva renders) via `chapter.image` in the config.
 */
import type { StoryScene } from '@/config/types';
import { BrideHead, GroomHead, Hand, PALETTE as C } from './Characters';

/* ── shared scenery bits ─────────────────────────────────────────────── */

const FallingPetals = ({ seed = 1 }: { seed?: number }) => (
  <g opacity={0.85}>
    {Array.from({ length: 14 }, (_, i) => {
      const x = (i * 71 + seed * 37) % 400;
      const y = (i * 43 + seed * 19) % 260;
      return <ellipse key={i} cx={x} cy={y} rx={3.2} ry={1.8} fill={i % 2 ? '#E3D5F1' : '#CDB6E4'} transform={`rotate(${(i * 47) % 180} ${x} ${y})`} />;
    })}
  </g>
);

const Sparkle = ({ x, y, s = 1, c = '#FFFFFF' }: { x: number; y: number; s?: number; c?: string }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4 Z" fill={c} />
);

/** Thick rounded limb segment (sleeve or forearm). */
const Limb = ({ d, color, w }: { d: string; color: string; w: number }) => (
  <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
);

/* ── Scene 1: meeting in the bookshop café ───────────────────────────── */

function MeetingScene() {
  const books = ['#CDB6E4', '#E3D5F1', '#B394D3', '#EADFCB', '#9B72AE', '#F0E8F8', '#C3A0CF', '#DCC9A8'];
  return (
    <>
      <defs>
        <linearGradient id="m-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3ECF9" />
          <stop offset="1" stopColor="#E6D9F2" />
        </linearGradient>
        <radialGradient id="m-light" cx="0.15" cy="0.15" r="0.8">
          <stop offset="0" stopColor="#FFF4DD" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF4DD" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#m-wall)" />
      {/* rainy window */}
      <rect x="18" y="22" width="92" height="104" rx="46" fill="#DCE3F0" stroke="#FBF8F2" strokeWidth="5" />
      <path d="M64 24 V124 M20 76 H108" stroke="#FBF8F2" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={28 + (i * 7) % 76} y1={40 + (i * 13) % 70} x2={25 + (i * 7) % 76} y2={50 + (i * 13) % 70} stroke="#A9B4CC" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      {/* bookshelf */}
      <rect x="140" y="30" width="120" height="270" fill="#EADFCB" />
      {[30, 92, 154, 216].map((y) => <rect key={y} x="136" y={y + 58} width="128" height="6" fill="#DCC9A8" />)}
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {Array.from({ length: 9 }, (_, i) => {
            const h = 40 + ((i * 7 + row * 5) % 14);
            const x = 146 + i * 12.5;
            const isTheBook = row === 1 && i === 4;
            return (
              <rect key={i} x={x} y={88 + row * 62 - h} width="10.5" height={h} rx="1.5"
                fill={isTheBook ? '#9B72AE' : books[(i + row * 3) % books.length]}
                stroke={isTheBook ? '#FBF8F2' : 'none'} strokeWidth="1.2" />
            );
          })}
        </g>
      ))}
      {/* steaming chai on the top shelf */}
      <g transform="translate(230 18)">
        <path d="M0 6 h16 v10 a8 8 0 0 1 -16 0 Z" fill="#FBF8F2" />
        <path d="M16 9 a4 4 0 0 1 0 7" stroke="#FBF8F2" strokeWidth="2.4" fill="none" />
        <path d="M5 2 q -3 -5 0 -9 M11 2 q -3 -5 0 -9" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.8" />
      </g>
      <rect width="400" height="300" fill="url(#m-light)" />

      {/* Bride (left) */}
      <g>
        <path d="M60 300 C 58 230, 70 190, 105 182 C 140 190, 152 230, 150 300 Z" fill={C.dress} />
        <path d="M60 300 C 58 230, 70 190, 98 183 L 104 300 Z" fill={C.cardigan} />
        <path d="M150 300 C 152 230, 140 190, 112 183 L 108 300 Z" fill={C.cardigan} />
        <path d="M98 183 L 105 205 L 112 183" fill={C.brideSkin} />
        <Limb d="M70 200 C 64 236, 70 262, 86 276" color={C.cardiganShade} w={15} />
        <Hand x={88} y={278} skin={C.brideSkin} />
        <Limb d="M140 198 C 160 186, 178 168, 192 156" color={C.cardigan} w={14} />
        <Hand x={196} y={153} skin={C.brideSkin} r={6} />
        <g transform="translate(105 128) scale(1.3)"><BrideHead look={1} /></g>
      </g>

      {/* Groom (right) */}
      <g>
        <path d="M245 300 C 244 225, 258 186, 298 178 C 340 186, 354 225, 352 300 Z" fill={C.shirt} />
        <path d="M285 180 L 298 204 L 311 180 Z" fill={C.groomSkin} />
        <path d="M283 180 L 296 196 L 290 182 Z M313 180 L 300 196 L 306 182 Z" fill={C.shirtShade} />
        {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={298} cy={214 + i * 20} r={1.6} fill={C.shirtShade} />)}
        <Limb d="M340 196 C 352 232, 348 262, 336 280" color={C.shirtShade} w={17} />
        <Hand x={334} y={283} skin={C.groomSkin} r={6.5} />
        <Limb d="M258 196 C 246 184, 236 176, 230 170" color={C.shirt} w={17} />
        <Limb d="M232 171 C 224 164, 216 158, 210 154" color={C.groomSkin} w={11} />
        <Hand x={206} y={152} skin={C.groomSkin} r={6.5} />
        <g transform="translate(298 122) scale(1.36)"><GroomHead look={-1} /></g>
      </g>

      <Sparkle x={201} y={140} s={1.1} c="#FBF8F2" />
      <FallingPetals seed={1} />
    </>
  );
}

/* ── Scene 2: walking under the jacarandas ───────────────────────────── */

const Jacaranda = ({ x, flip = false }: { x: number; flip?: boolean }) => {
  const s = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} 0) scale(${s} 1)`}>
      <path d="M0 300 C 4 240, -4 180, 8 120 M6 170 C 20 150, 34 140, 50 130 M4 200 C -10 180, -24 172, -40 166" stroke="#7A6070" strokeWidth="7" fill="none" strokeLinecap="round" />
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx={-50 + ((i * 37) % 110)} cy={70 + ((i * 23) % 90)} r={16 + (i % 4) * 4}
          fill={['#B394D3', '#C3A0CF', '#CDB6E4', '#9B72AE'][i % 4]} opacity={0.88} />
      ))}
    </g>
  );
};

function JourneyScene() {
  return (
    <>
      <defs>
        <linearGradient id="j-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF3E2" />
          <stop offset="0.6" stopColor="#F0E8F8" />
          <stop offset="1" stopColor="#E3D5F1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#j-sky)" />
      <circle cx="200" cy="96" r="60" fill="#FFF8EC" opacity="0.8" />
      <path d="M0 250 C 120 236, 280 236, 400 250 V300 H0 Z" fill="#E3D5F1" />
      <path d="M150 300 C 175 262, 225 262, 250 300 Z" fill="#F4EEE3" opacity="0.8" />
      {/* petals carpeting the path */}
      {Array.from({ length: 30 }, (_, i) => (
        <ellipse key={i} cx={(i * 53) % 400} cy={256 + (i * 7) % 40} rx={3} ry={1.6} fill={i % 2 ? '#B394D3' : '#CDB6E4'} />
      ))}
      <Jacaranda x={40} />
      <Jacaranda x={362} flip />

      {/* Bride (left), laughing */}
      <g>
        <path d="M144 270 L 146 288 M162 270 L 160 288" stroke={C.brideSkin} strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={145} cy={289} rx={6} ry={3} fill="#9B72AE" />
        <ellipse cx={160} cy={289} rx={6} ry={3} fill="#9B72AE" />
        <path d="M134 150 C 126 200, 116 240, 112 272 C 140 280, 168 280, 194 272 C 188 240, 178 200, 172 150 Z" fill={C.dress} />
        <path d="M134 150 C 126 200, 116 240, 112 272 C 120 275, 128 276, 136 277 C 140 240, 146 200, 150 152 Z" fill={C.dressShade} opacity={0.35} />
        <path d="M133 120 C 124 124, 122 140, 124 196 L 140 196 L 146 132 Z" fill={C.cardigan} />
        <path d="M173 120 C 182 124, 184 140, 182 196 L 166 196 L 160 132 Z" fill={C.cardigan} />
        <path d="M140 118 C 146 116, 160 116, 166 118 L 162 152 L 144 152 Z" fill={C.dress} />
        <Limb d="M128 128 C 120 150, 118 168, 122 186" color={C.cardiganShade} w={12} />
        <Hand x={122} y={190} skin={C.brideSkin} r={5} />
        <Limb d="M178 128 C 186 146, 192 162, 196 174" color={C.cardigan} w={12} />
        <Hand x={198} y={177} skin={C.brideSkin} r={5} />
        <g transform="translate(153 84)"><BrideHead eyes="happy" mouth="open" look={1} /></g>
      </g>

      {/* Groom (right), looking at her */}
      <g>
        <path d="M228 196 L 226 284 M252 196 L 256 284" stroke={C.trousers} strokeWidth="15" strokeLinecap="round" />
        <ellipse cx={224} cy={288} rx={9} ry={4} fill="#2F2A38" />
        <ellipse cx={259} cy={288} rx={9} ry={4} fill="#2F2A38" />
        <path d="M216 120 C 210 150, 212 180, 216 204 L 264 204 C 268 180, 270 150, 264 120 C 254 114, 226 114, 216 120 Z" fill={C.shirt} />
        <path d="M232 117 L 240 132 L 248 117 Z" fill={C.groomSkin} />
        <Limb d="M262 126 C 272 150, 274 170, 270 188" color={C.shirtShade} w={14} />
        <Hand x={270} y={192} skin={C.groomSkin} r={5.5} />
        <Limb d="M218 126 C 212 140, 208 152, 206 160" color={C.shirt} w={14} />
        <Limb d="M206 160 C 204 166, 203 172, 202 176" color={C.groomSkin} w={9} />
        <Hand x={202} y={178} skin={C.groomSkin} r={5.5} />
        <g transform="translate(240 80)"><GroomHead look={-1} /></g>
      </g>

      <FallingPetals seed={2} />
    </>
  );
}

/* ── Scene 3: the proposal at sunset ─────────────────────────────────── */

function ProposalScene() {
  const bulbs = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    return { x: 10 + t * 380, y: 26 + Math.sin(t * Math.PI) * 30 };
  });
  return (
    <>
      <defs>
        <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B394D3" />
          <stop offset="0.45" stopColor="#E9C6D9" />
          <stop offset="0.75" stopColor="#FFD9B8" />
          <stop offset="1" stopColor="#FFE9CF" />
        </linearGradient>
        <radialGradient id="p-glow">
          <stop offset="0" stopColor="#FFF6D8" />
          <stop offset="1" stopColor="#FFF6D8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#p-sky)" />
      <circle cx="200" cy="150" r="70" fill="url(#p-glow)" />
      <circle cx="200" cy="152" r="22" fill="#FFF1D2" />
      <path d="M0 150 C 60 128, 110 138, 160 150 L 0 150 Z M240 150 C 290 132, 350 126, 400 146 V150 Z" fill="#9B72AE" opacity="0.55" />
      <rect x="0" y="150" width="400" height="60" fill="#C9AEDD" />
      {[160, 170, 182, 196].map((y, i) => (
        <path key={y} d={`M${170 - i * 10} ${y} H${230 + i * 10}`} stroke="#FFF1D2" strokeWidth="2" opacity={0.7 - i * 0.12} strokeLinecap="round" />
      ))}
      <path d="M0 210 C 100 196, 300 196, 400 212 V300 H0 Z" fill="#B7A3C9" />
      <path d="M0 232 C 120 220, 280 222, 400 236 V300 H0 Z" fill="#A58EBB" />
      {/* string lights */}
      <path d={`M${bulbs.map((b) => `${b.x} ${b.y}`).join(' L ')}`} stroke="#5A2E63" strokeWidth="1" fill="none" opacity="0.6" />
      {bulbs.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y + 5} r="7" fill="#FFF3C9" opacity="0.35" />
          <circle cx={b.x} cy={b.y + 5} r="2.8" fill="#FFF3C9" />
        </g>
      ))}

      {/* Bride (left), hands over mouth */}
      <g>
        <path d="M128 280 L 130 294 M146 280 L 144 294" stroke={C.brideSkin} strokeWidth="5" strokeLinecap="round" />
        <path d="M120 170 C 110 210, 100 250, 96 282 C 124 290, 152 290, 178 282 C 172 250, 162 210, 154 170 Z" fill={C.dress} />
        <path d="M118 140 C 110 146, 108 160, 110 214 L 124 214 L 128 150 Z" fill={C.cardigan} />
        <path d="M156 140 C 164 146, 166 160, 164 214 L 150 214 L 146 150 Z" fill={C.cardigan} />
        <path d="M124 138 C 130 136, 144 136, 150 138 L 146 172 L 128 172 Z" fill={C.dress} />
        <g transform="translate(137 98)"><BrideHead eyes="teary" mouth="none" look={1} /></g>
        {/* arms drawn over the head so both hands rest over her mouth */}
        <Limb d="M116 146 C 106 140, 110 128, 126 122" color={C.cardigan} w={11} />
        <Limb d="M158 146 C 168 140, 164 128, 148 122" color={C.cardiganShade} w={11} />
        <Hand x={131} y={117} skin={C.brideSkinShade} r={6.5} outline={C.brideSkinShade} />
        <Hand x={143} y={118} skin={C.brideSkin} r={6.5} outline={C.brideSkinShade} />
        <path d="M118 104 l 4 -2 M156 104 l -4 -2" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
      </g>

      {/* Groom (right), on one knee */}
      <g>
        {/* back leg kneeling */}
        <path d="M270 222 L 284 262 L 316 264" stroke={C.trousers} strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={322} cy={266} rx={9} ry={4} fill="#2F2A38" />
        {/* front leg, knee up */}
        <path d="M262 222 L 228 222 L 226 262" stroke={C.trousers} strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={220} cy={266} rx={10} ry={4} fill="#2F2A38" />
        <path d="M244 160 C 238 184, 240 208, 246 228 L 286 228 C 292 208, 292 184, 286 160 C 276 154, 254 154, 244 160 Z" fill={C.shirt} />
        <path d="M257 157 L 265 172 L 273 157 Z" fill={C.groomSkin} />
        <Limb d="M248 168 C 236 178, 222 184, 212 186" color={C.shirt} w={13} />
        <Limb d="M282 168 C 270 182, 248 190, 222 190" color={C.shirtShade} w={13} />
        <Hand x={210} y={188} skin={C.groomSkin} r={6} />
        {/* ring box */}
        <rect x="192" y="178" width="16" height="12" rx="2" fill="#7A4A84" />
        <path d="M192 178 L 196 168 H 204 L 208 178 Z" fill="#9B72AE" />
        <circle cx="200" cy="178" r="3.4" fill="none" stroke="#E8D8A8" strokeWidth="1.6" />
        <Sparkle x={200} y={170} s={1.2} c="#FFF8E1" />
        <g transform="translate(265 122)"><GroomHead look={-1} /></g>
      </g>

      {/* lilac flowers in the foreground */}
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`translate(${(i * 26) % 400} ${284 + (i % 3) * 5})`}>
          <path d="M0 0 V-16" stroke="#8E9A80" strokeWidth="1.6" />
          {[0, 1, 2, 3].map((k) => <circle key={k} cx={(k % 2 ? 2.5 : -2.5)} cy={-16 - k * 4} r={3} fill={k % 2 ? '#C3A0CF' : '#E3D5F1'} />)}
        </g>
      ))}
      <Sparkle x={60} y={90} s={0.8} />
      <Sparkle x={340} y={100} s={0.9} />
      <FallingPetals seed={3} />
    </>
  );
}

const SCENES: Record<StoryScene, () => JSX.Element> = {
  meeting: MeetingScene,
  journey: JourneyScene,
  proposal: ProposalScene,
};

/** Renders a chapter illustration — a supplied image if present, otherwise the SVG scene. */
export function StoryIllustration({ scene, image, alt }: { scene: StoryScene; image?: string; alt: string }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />;
  }
  const Scene = SCENES[scene];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={alt} className="block h-full w-full">
      <Scene />
    </svg>
  );
}
