import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { Container, Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
      <Container className="max-w-md space-y-6">
        <div className="text-center">
          <span className="inline-block text-xs font-medium text-text-muted">
            {SITE_CONFIG.name}
          </span>
        </div>
        <div role="status" className="space-y-4">
          <span className="sr-only">{FIXED_LABELS.LOADING_TEXT}</span>
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
          <div className="pt-2 flex justify-center">
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </Container>
    </div>
  );
}
