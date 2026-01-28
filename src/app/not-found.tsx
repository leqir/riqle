import { ErrorPage } from '@/components/errors/ErrorPage';
import { ERROR_MESSAGES } from '@/lib/errors/messages';

export default function NotFound() {
  return (
    <ErrorPage
      title={ERROR_MESSAGES.notFound.title}
      message={ERROR_MESSAGES.notFound.message}
    />
  );
}
