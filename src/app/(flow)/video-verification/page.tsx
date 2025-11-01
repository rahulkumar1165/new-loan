import { ClientOnly } from '@/components/loanflow/ClientOnly';
import VideoVerificationClient from './VideoVerificationClient';

export default function VideoVerificationPage() {
  return (
    <ClientOnly>
      <VideoVerificationClient />
    </ClientOnly>
  );
}
