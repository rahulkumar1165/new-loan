'use client';

import { videoVerificationWithPhrase } from '@/ai/flows/video-verification-with-phrase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Camera, CheckCircle, Loader2, Video, VideoOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const PHRASE_TO_SPEAK = "The quick brown fox jumps over the lazy dog";

type VerificationStatus = 'idle' | 'recording' | 'processing' | 'verified' | 'failed';

export default function VideoVerificationClient() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);

  const setupCamera = async () => {
    if (stream) return;
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userMediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userMediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        variant: 'destructive',
        title: 'Camera Error',
        description: 'Could not access your camera. Please check permissions and try again.',
      });
    }
  };
  
  useEffect(() => {
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      startRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  const handleStartCountdown = () => {
    setCountdown(3);
  };
  
  const startRecording = () => {
    if (!stream) return;
    setStatus('recording');
    setCountdown(null);
    setRecordedChunks([]);
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.start();
    
    setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
            handleStopRecording();
        }
    }, 7000); // Auto stop after 7 seconds
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStatus('processing');
    }
  };

  useEffect(() => {
    if (status === 'processing' && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        try {
          const result = await videoVerificationWithPhrase({
            videoDataUri: base64data,
            phrase: PHRASE_TO_SPEAK,
          });
          if (result.isVerified) {
            setStatus('verified');
            setTimeout(() => router.push('/success'), 2000);
          } else {
            setStatus('failed');
            toast({
              variant: 'destructive',
              title: 'Verification Failed',
              description: result.reason || 'Please try again.',
            });
          }
        } catch (error) {
          console.error("Verification error:", error);
          setStatus('failed');
          toast({
            variant: 'destructive',
            title: 'An Error Occurred',
            description: 'Something went wrong during verification. Please try again.',
          });
        }
      };
    }
  }, [status, recordedChunks, router, toast]);
  
  const resetVerification = () => {
    setStatus('idle');
    setRecordedChunks([]);
    setupCamera();
  };

  const renderContent = () => {
    switch(status) {
      case 'recording':
      case 'idle':
        return (
          <>
            <p className="text-muted-foreground text-center">Please say the following phrase clearly:</p>
            <Card className="my-4 bg-secondary">
              <CardContent className="p-4">
                <p className="font-headline text-lg font-semibold text-center text-primary">{PHRASE_TO_SPEAK}</p>
              </CardContent>
            </Card>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black border">
                <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover scale-x-[-1]" />
                {countdown !== null && countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-8xl font-bold text-white">{countdown}</span>
                    </div>
                )}
                {status === 'recording' && (
                    <div className="absolute top-2 right-2 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm text-white">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        REC
                    </div>
                )}
            </div>
            <div className="mt-6">
                {status === 'idle' ? (
                  <div className="space-y-2">
                    <Button onClick={handleStartCountdown} disabled={!stream || countdown !== null} className="w-full">
                      <Camera className="mr-2 h-4 w-4" /> Start Recording
                    </Button>
                    <Button onClick={() => router.push('/success')} variant="outline" className="w-full">
                      Skip for now
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleStopRecording} variant="destructive" className="w-full">
                    <VideoOff className="mr-2 h-4 w-4" /> Stop Recording
                  </Button>
                )}
            </div>
          </>
        );
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Processing Video...</h3>
            <p className="text-muted-foreground mt-1">This might take a moment.</p>
          </div>
        );
      case 'verified':
        return (
          <div className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Verification Successful!</h3>
            <p className="text-muted-foreground mt-1">Redirecting you to the next step...</p>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-xl font-semibold">Verification Failed</h3>
            <p className="text-muted-foreground mt-1">Please check the notification and try again.</p>
            <Button onClick={resetVerification} className="mt-6">
              <Video className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Video Verification</h2>
        <p className="mt-2 text-muted-foreground">
          Record a short video of yourself to complete the verification.
        </p>
        <div className="mt-8">
            {renderContent()}
        </div>
      </div>
    </div>
  );
}
