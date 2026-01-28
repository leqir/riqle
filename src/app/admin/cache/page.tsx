import { RevalidateForm } from '@/components/admin/RevalidateForm';
import { Card } from '@/components/admin/ui/Card';

export default function CachePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Cache Management</h1>
        <p className="mt-2 text-slate-600">Revalidate Next.js cache after content updates</p>
      </div>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-slate-900">Revalidate Cache</h2>
        <p className="mt-2 text-sm text-slate-600">
          Choose to revalidate by path or tag. Paths start with / (e.g., /writing/my-post). Tags are
          cache identifiers used in your code (e.g., posts, projects).
        </p>

        <div className="mt-6">
          <RevalidateForm />
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-slate-900">Common Paths</h2>
        <div className="mt-4 space-y-2">
          <PathExample path="/writing" description="Writing index page" />
          <PathExample path="/work" description="Work index page" />
          <PathExample path="/resources" description="Resources index page" />
          <PathExample path="/startups" description="Startups index page" />
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-slate-900">Common Tags</h2>
        <div className="mt-4 space-y-2">
          <PathExample path="posts" description="All writing content" />
          <PathExample path="projects" description="All work projects" />
          <PathExample path="products" description="All products" />
          <PathExample path="startups" description="All startups" />
        </div>
      </Card>
    </div>
  );
}

function PathExample({ path, description }: { path: string; description: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3">
      <div>
        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-900">
          {path}
        </code>
      </div>
      <div className="text-sm text-slate-600">{description}</div>
    </div>
  );
}
