import { SITE_CONFIG } from "@/config/site";
import { FIXED_LABELS } from "@/config/copy";
import { ROUTES } from "@/config/routes";
import { Container, Heading, LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-12">
      <Container className="max-w-md text-center space-y-6">
        <span className="inline-block text-xs font-medium text-text-muted">
          {SITE_CONFIG.name}
        </span>
        <div className="space-y-2">
          <Heading level={1} size="2xl">
            {FIXED_LABELS.NOT_FOUND_TITLE}
          </Heading>
          <p className="text-text-muted font-body text-base leading-relaxed">
            {FIXED_LABELS.NOT_FOUND_DESCRIPTION}
          </p>
        </div>
        <div>
          <LinkButton href={ROUTES.HOME} variant="primary">
            {FIXED_LABELS.ACTION_BACK_TO_HOME}
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
