/**
 * ABOUTME: Data definitions and lookup functions for brand vertical landing pages.
 * Each vertical represents a use-case-specific marketing page targeting specific audiences.
 */

/**
 * Represents a brand vertical landing page with marketing content.
 */
export interface Vertical {
  /** URL slug for the vertical page */
  slug: string;
  /** Display title for the page */
  title: string;
  /** Short tagline shown below the title */
  tagline: string;
  /** Meta description for SEO */
  description: string;
  /** Key benefits or features highlighted for this vertical */
  benefits: string[];
  /** Example use cases relevant to this vertical */
  useCases: string[];
}

/**
 * All available brand verticals.
 * Add new entries here to create new vertical landing pages.
 */
export const verticals: Vertical[] = [
  {
    slug: 'backend-as-a-service-realtime',
    title: 'Backend-as-a-Service & Realtime',
    tagline: 'Orchestrate AI agents for realtime backend development',
    description:
      'Ralph TUI helps BaaS and realtime platform teams ship faster with AI-powered task orchestration for backend services, APIs, and realtime infrastructure.',
    benefits: [
      'Automate repetitive backend scaffolding and boilerplate',
      'Parallel agent execution for independent microservice tasks',
      'PRD-driven development keeps agents aligned with product goals',
      'Git worktree isolation prevents conflicts across parallel tasks',
    ],
    useCases: [
      'Scaffolding new API endpoints and database migrations',
      'Generating realtime event handlers and WebSocket services',
      'Automating test coverage for backend services',
      'Refactoring legacy services with AI-assisted code transforms',
    ],
  },
  {
    slug: 'developer-tools',
    title: 'Developer Tools',
    tagline: 'Build better developer tools with AI-assisted workflows',
    description:
      'Ralph TUI accelerates developer tooling teams by orchestrating autonomous coding agents for CLI tools, SDKs, and developer experience improvements.',
    benefits: [
      'Ship CLI tools and SDKs faster with parallel agent execution',
      'Maintain consistent code quality across tooling repositories',
      'Automate documentation generation alongside code changes',
      'Intelligent task routing matches work to the right AI agent',
    ],
    useCases: [
      'Building and maintaining CLI applications',
      'Generating SDK clients from API specifications',
      'Automating changelog and documentation updates',
      'Cross-platform compatibility testing and fixes',
    ],
  },
  {
    slug: 'saas-platforms',
    title: 'SaaS Platforms',
    tagline: 'Scale your SaaS engineering with autonomous AI agents',
    description:
      'Ralph TUI helps SaaS platform teams manage complex feature development by breaking PRDs into parallelizable tasks executed by autonomous coding agents.',
    benefits: [
      'Break complex features into manageable parallel tasks',
      'Continuous delivery with automated PR creation and merging',
      'Multi-agent support lets you use the best AI for each task',
      'Full audit trail of agent actions and code changes',
    ],
    useCases: [
      'Implementing multi-tenant features across service layers',
      'Automating integration test suites for API endpoints',
      'Migrating between frameworks or library versions',
      'Building admin dashboards and internal tooling',
    ],
  },
  {
    slug: 'open-source',
    title: 'Open Source Projects',
    tagline: 'Maintain open source projects with AI-powered automation',
    description:
      'Ralph TUI helps open source maintainers manage contributions, automate releases, and keep codebases healthy with orchestrated AI agent workflows.',
    benefits: [
      'Automate issue triage and PR review workflows',
      'Keep documentation in sync with code changes',
      'Parallelize release preparation across packages',
      'Consistent code style enforcement via agent templates',
    ],
    useCases: [
      'Automating release processes across monorepo packages',
      'Generating and updating API documentation',
      'Batch-processing community issue reports',
      'Cross-platform CI/CD pipeline maintenance',
    ],
  },
];

/**
 * Finds a vertical by its URL slug.
 * Returns undefined if no matching vertical exists.
 */
export function getVerticalBySlug(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

/**
 * Returns all vertical slugs for static param generation.
 */
export function getAllVerticalSlugs(): string[] {
  return verticals.map((v) => v.slug);
}
