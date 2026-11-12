/** Consistent section header: eyebrow → title → optional script line → divider. */
import { FloralDivider } from '@/components/decor/Florals';
import { Reveal } from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  script?: string;
  light?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, title, script, light = false, id }: Props) {
  return (
    <Reveal className="mb-12 text-center">
      <p className={`eyebrow ${light ? '!text-lavender-200' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`title mt-3 ${light ? '!text-ivory' : ''}`}>{title}</h2>
      {script && <p className={`script mt-2 text-3xl ${light ? 'text-lavender-200' : 'text-lilac-deep'}`}>{script}</p>}
      <FloralDivider className="mt-5" light={light} />
    </Reveal>
  );
}
