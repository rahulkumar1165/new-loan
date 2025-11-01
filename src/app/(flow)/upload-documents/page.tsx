'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { File, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const documentTypes = [
  { id: 'gas', name: 'Gas Bill' },
  { id: 'water', name: 'Water Bill' },
  { id: 'bank', name: 'Bank Statement' },
];

export default function UploadDocumentsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({ ...prev, [docId]: e.target.files![0] }));
    }
  };
  
  const removeFile = (docId: string) => {
    setUploadedFiles(prev => ({ ...prev, [docId]: null }));
    const input = document.getElementById(`file-input-${docId}`) as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(uploadedFiles).some(file => file !== null)) {
      router.push('/bank-account');
    } else {
      toast({
        variant: "destructive",
        title: "No document uploaded",
        description: "Please upload at least one document to continue.",
      });
    }
  };

  return (
    <div className="flex h-full flex-col animate-in fade-in-50 duration-500">
      <div className="flex-1">
        <h2 className="font-headline text-2xl font-bold tracking-tight">Upload Documents</h2>
        <p className="mt-2 text-muted-foreground">Upload any one of the following for address verification.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {documentTypes.map(doc => (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  {!uploadedFiles[doc.id] ? (
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 p-6 text-center text-muted-foreground transition-colors hover:border-accent hover:bg-accent/10">
                      <UploadCloud size={32} className="text-accent"/>
                      <span>{doc.name}</span>
                      <p className="text-xs">Click to upload</p>
                      <input id={`file-input-${doc.id}`} type="file" className="hidden" onChange={(e) => handleFileChange(e, doc.id)} accept="image/*,.pdf"/>
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border bg-secondary/50 p-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                           <File className="h-6 w-6 flex-shrink-0 text-primary" />
                           <span className="truncate text-sm font-medium">{uploadedFiles[doc.id]?.name}</span>
                        </div>
                       <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeFile(doc.id)}>
                         <X size={16} />
                       </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </div>
    </div>
  );
}
