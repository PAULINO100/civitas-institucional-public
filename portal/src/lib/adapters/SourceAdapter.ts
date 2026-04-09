import { SurveyWorksheet } from "../../core/survey-generator";

export type SourceType = 'pdf' | 'docx' | 'spreadsheet' | 'google_forms';

export interface SourceBlueprint {
  title: string;
  questions: SurveyWorksheet['questions'];
  contentHash: string;
  metadata: SurveyWorksheet['source_metadata'];
}

export abstract class SourceAdapter {
  abstract process(input: File | string): Promise<SourceBlueprint>;
  
  protected async generateHash(content: string): Promise<string> {
    // Basic SHA-256 simulation for the demo
    const msgBuffer = new TextEncoder().encode(content + Date.now().toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export class DocumentAdapter extends SourceAdapter {
  async process(file: File): Promise<SourceBlueprint> {
    // Simulating extraction from PDF/DOCX
    const content = `Mock content extracted from ${file.name}`;
    const hash = await this.generateHash(content);
    
    return {
      title: file.name.replace(/\.[^/.]+$/, ""),
      questions: [
        { id: 'q1', text: 'Baseado no documento, você aprova a nova diretriz?', type: 'binary' },
        { id: 'q2', text: 'Qual ponto do documento é mais relevante?', type: 'choice' }
      ],
      contentHash: hash,
      metadata: {
        type: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx',
        filename: file.name
      }
    };
  }
}

export class SpreadsheetAdapter extends SourceAdapter {
  async process(file: File): Promise<SourceBlueprint> {
    // Simulating CSV/XLSX processing
    const content = `Mock rows from spreadsheet ${file.name}`;
    const hash = await this.generateHash(content);

    return {
      title: `Dados de ${file.name}`,
      questions: [
        { id: 'row1', text: 'Valor da primeira métrica está correto?', type: 'binary' },
        { id: 'row2', text: 'Selecione a categoria de erro encontrada.', type: 'choice' }
      ],
      contentHash: hash,
      metadata: {
        type: 'spreadsheet',
        filename: file.name
      }
    };
  }
}

export class ExternalURLAdapter extends SourceAdapter {
  async process(url: string): Promise<SourceBlueprint> {
    // Simulating Google Forms structural import
    const content = `Structure fetched from ${url}`;
    const hash = await this.generateHash(content);

    return {
      title: "Importação Google Forms",
      questions: [
        { id: 'g1', text: 'Pergunta importada do formulário 1', type: 'choice' },
        { id: 'g2', text: 'Pergunta importada do formulário 2', type: 'binary' }
      ],
      contentHash: hash,
      metadata: {
        type: 'google_forms',
        url: url
      }
    };
  }
}

export class SourceAdapterFactory {
  static getAdapter(type: SourceType): SourceAdapter {
    switch (type) {
      case 'pdf':
      case 'docx':
        return new DocumentAdapter();
      case 'spreadsheet':
        return new SpreadsheetAdapter();
      case 'google_forms':
        return new ExternalURLAdapter();
      default:
        throw new Error("Unsupported source type");
    }
  }
}
