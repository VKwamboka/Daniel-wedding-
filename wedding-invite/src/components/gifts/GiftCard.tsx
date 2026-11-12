/** One payment option: logo, name, copyable details and an optional pay link. */
import { motion } from 'framer-motion';
import type { GiftMethod } from '@/config/types';
import { CopyButton } from '@/components/common/CopyButton';
import { ExternalIcon } from '@/components/common/Icons';
import { PaymentLogo } from './PaymentLogo';

export function GiftCard({ method, index }: { method: GiftMethod; index: number }) {
  return (
    <motion.article
      className="card flex h-full flex-col p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      aria-labelledby={`gift-${method.id}`}
    >
      <div className="flex items-center gap-4">
        <PaymentLogo logo={method.logo} name={method.name} />
        <div>
          <h3 id={`gift-${method.id}`} className="font-serif text-2xl text-plum-800">{method.name}</h3>
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-plum-500">{method.tagline}</p>
        </div>
      </div>

      <dl className="mt-5 flex-1 divide-y divide-lavender-200 border-t border-lavender-200">
        {method.details.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-3 py-2.5">
            <dt className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-plum-500">{d.label}</dt>
            <dd className="flex min-w-0 max-w-[65%] items-center gap-1 text-right font-serif text-lg text-plum-900">
              <span className="break-words">{d.value}</span>
              {d.copyable && <CopyButton value={d.value} label={`${method.name} ${d.label}`} />}
            </dd>
          </div>
        ))}
      </dl>

      {method.link && (
        <a href={method.link.url} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5 w-full">
          {method.link.label} <ExternalIcon className="h-3.5 w-3.5" />
        </a>
      )}
    </motion.article>
  );
}
