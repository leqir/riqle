import { RevalidateForm } from '@/components/admin/RevalidateForm';

export default function CachePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Cache Management</h1>
        <p className="mt-1 text-stone-600">Revalidate Next.js cache after content updates</p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Revalidate Cache</h2>
        <p className="mt-1 text-sm text-stone-600">
          Choose to revalidate by path or tag. Paths start with / (e.g., /writing/my-post). Tags are
          cache identifiers used in your code (e.g., posts, projects).
        </p>

        <div className="mt-6">
          <RevalidateForm />
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Common Paths</h2>
        <div className="mt-4 space-y-2">
          <PathExample path="/writing" description="Writing index page" />
          <PathExample path="/work" description="Work index page" />
          <PathExample path="/resources" description="Resources index page" />
          <PathExample path="/startups" description="Startups index page" />
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Common Tags</h2>
        <div className="mt-4 space-y-2">
          <PathExample path="posts" description="All writing content" />
          <PathExample path="projects" description="All work projects" />
          <PathExample path="products" description="All products" />
          <PathExample path="startups" description="All startups" />
        </div>
      </div>
    </div>
  );
}

function PathExample({ path, description }: { path: string; description: string }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-100 py-2">
      <div>
        <code className="rounded bg-stone-100 px-2 py-1 font-mono text-sm text-stone-900">
          {path}
        </code>
      </div>
      <div className="text-sm text-stone-600">{description}</div>
    </div>
  );
}
