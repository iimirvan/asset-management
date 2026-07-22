import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/error-state";

type RetryErrorStateProps = {
  title: string;
  description?: string;
  onRetry: () => void;
};

export function RetryErrorState({ description, onRetry, title }: RetryErrorStateProps) {
  return (
    <ErrorState
      description={description}
      retryAction={<Button onClick={onRetry}>Retry</Button>}
      title={title}
    />
  );
}
