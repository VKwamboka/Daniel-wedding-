/** Layout for the standalone gallery pages (no envelope): header + back link. */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { coupleNames } from '@/config/wedding.config';
import { routes } from '@/utils/links';
import { FloralCorner, FloralDivider } from '@/components/decor/Florals';

export function PageShell({ eyebrow, title, script, children }: { eyebrow: string; title: string; script?: string; children: ReactNode }) {
  return (
    <div className="band-lavender relative min-h-screen overflow-hidden">
      <FloralCorner className="-left-8 -top-6 opacity-70" />
      <FloralCorner className="-right-8 -top-6 opacity-70" flip />
      <header className="relative z-10 px-4 pb-8 pt-6 text-center sm:pt-8">
        <Link to={routes.home} className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-plum-500 hover:text-plum-800">
          ← {coupleNames} · Invitation
        </Link>
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="title mt-2">{title}</h1>
        {script && <p className="script mt-1 text-3xl text-lilac-deep">{script}</p>}
        <FloralDivider className="mt-4" />
      </header>
      <main className="relative z-10 px-4 pb-24 sm:px-6">{children}</main>
    </div>
  );
}
