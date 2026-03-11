/**
 * ABOUTME: Dynamic route for brand vertical landing pages.
 * Renders use-case-specific marketing pages with benefits, use cases, and CTAs.
 * Marked as force-dynamic to support cookie-dependent features (analytics, themes).
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getVerticalBySlug, getAllVerticalSlugs } from '@/lib/verticals';

/**
 * Force dynamic rendering to avoid static generation errors when
 * upstream providers (analytics, theme, session) access cookies.
 */
export const dynamic = 'force-dynamic';

interface VerticalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generates static params for all known verticals.
 * Even with force-dynamic, this hints to Next.js which pages exist.
 */
export async function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({ slug }));
}

/**
 * Generates metadata for each vertical page.
 */
export async function generateMetadata({
  params,
}: VerticalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vertical = getVerticalBySlug(slug);

  if (!vertical) {
    return {
      title: 'Not Found',
      description: 'This vertical page does not exist.',
    };
  }

  return {
    title: vertical.title,
    description: vertical.description,
    openGraph: {
      title: `${vertical.title} | Ralph TUI`,
      description: vertical.description,
    },
  };
}

/**
 * Vertical landing page component.
 * Renders a marketing page targeting a specific use case or audience.
 */
export default async function VerticalPage({ params }: VerticalPageProps) {
  const { slug } = await params;
  const vertical = getVerticalBySlug(slug);

  if (!vertical) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent-primary/10 blur-[100px]" />
        <div
          className="absolute right-1/4 top-1/3 h-[400px] w-[400px] translate-x-1/2 animate-pulse rounded-full bg-accent-secondary/10 blur-[80px]"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122, 162, 247, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122, 162, 247, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Hero section */}
      <section className="container mx-auto px-4 pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-1.5 font-mono text-xs font-medium tracking-wider text-accent-primary">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-success"
                aria-hidden="true"
              />
              USE CASE
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-fg-primary via-accent-primary to-accent-tertiary bg-clip-text text-transparent">
              {vertical.title}
            </span>
          </h1>

          {/* Tagline */}
          <p className="mb-8 text-lg leading-relaxed text-fg-secondary sm:text-xl">
            {vertical.tagline}
          </p>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-fg-muted">
            {vertical.description}
          </p>
        </div>
      </section>

      {/* Benefits section */}
      <section className="container mx-auto px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-mono text-2xl font-bold text-fg-primary sm:text-3xl">
            Key Benefits
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {vertical.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-sm border border-border-primary/50 bg-bg-secondary/50 p-6 backdrop-blur-sm transition-colors hover:border-accent-primary/30"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-primary"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-fg-secondary">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="container mx-auto px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-mono text-2xl font-bold text-fg-primary sm:text-3xl">
            Use Cases
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {vertical.useCases.map((useCase) => (
              <div
                key={useCase}
                className="rounded-sm border border-border-primary/50 bg-bg-secondary/50 p-6 backdrop-blur-sm transition-colors hover:border-accent-secondary/30"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 font-mono text-xs text-accent-secondary"
                    aria-hidden="true"
                  >
                    &gt;
                  </span>
                  <p className="text-sm leading-relaxed text-fg-secondary">
                    {useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 h-px max-w-md bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
          <h2 className="mb-4 font-mono text-2xl font-bold text-fg-primary sm:text-3xl">
            Get Started with Ralph TUI
          </h2>
          <p className="mb-8 text-fg-secondary">
            Install Ralph TUI and start orchestrating AI agents in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs"
              className={[
                'group inline-flex items-center justify-center gap-2',
                'font-mono font-medium tracking-wide',
                'rounded-sm',
                'transition-all duration-150 ease-out',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                'select-none',
                'h-12 px-7 text-base',
                'bg-accent-primary text-bg-primary',
                'hover:bg-accent-primary/90 hover:shadow-[0_0_20px_rgba(122,162,247,0.4)]',
                'active:bg-accent-primary/80 active:shadow-[0_0_10px_rgba(122,162,247,0.3)]',
                'border border-accent-primary/50',
                'min-w-[180px]',
              ].join(' ')}
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/subsy/ralph-tui"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center justify-center gap-2',
                'font-mono font-medium tracking-wide',
                'rounded-sm',
                'transition-all duration-150 ease-out',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                'select-none',
                'h-12 px-7 text-base',
                'bg-transparent text-accent-primary',
                'border-2 border-accent-primary/60',
                'hover:bg-accent-primary/10 hover:border-accent-primary hover:shadow-[0_0_15px_rgba(122,162,247,0.2)]',
                'active:bg-accent-primary/20',
                'min-w-[180px]',
              ].join(' ')}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
