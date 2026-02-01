"use client";

import { useState } from 'react';
import type { GenerateApiSchemaFromDescriptionOutput } from '@/ai/flows/generate-api-schema-from-description';
import { Header } from '@/components/header';
import { HeroForm } from '@/components/home/hero-form';
import { AgentActivity } from '@/components/home/agent-activity';
import { SchemaDisplay } from '@/components/home/schema-display';
import { ApiPlayground } from '@/components/home/api-playground';

type Step = 'input' | 'generating' | 'approval' | 'complete';

export default function Home() {
  const [step, setStep] = useState<Step>('input');
  const [schema, setSchema] = useState<GenerateApiSchemaFromDescriptionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerationStart = () => {
    setStep('generating');
    setError(null);
  };

  const handleGenerationSuccess = (generatedSchema: GenerateApiSchemaFromDescriptionOutput) => {
    setSchema(generatedSchema);
    setStep('approval');
  };

  const handleGenerationError = (errorMessage: string) => {
    setError(errorMessage);
    setStep('input');
  };

  const handleApproval = () => {
    setStep('complete');
  };
  
  const handleReset = () => {
    setStep('input');
    setSchema(null);
    setError(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
        {step === 'input' && (
          <HeroForm
            onGenerationStart={handleGenerationStart}
            onGenerationSuccess={handleGenerationSuccess}
            onGenerationError={handleGenerationError}
            error={error}
          />
        )}
        {step === 'generating' && <AgentActivity />}
        {step === 'approval' && schema && (
          <SchemaDisplay
            jsonSchema={schema.jsonSchema}
            openApiSpec={schema.openApiSpec}
            onApprove={handleApproval}
            onReset={handleReset}
          />
        )}
        {step === 'complete' && schema && (
          <ApiPlayground openApiSpec={schema.openApiSpec} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
