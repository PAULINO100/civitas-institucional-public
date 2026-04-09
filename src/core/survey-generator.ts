/**
 * survey-generator.ts
 * Civitas Audience Selection and Survey Worksheet Generator (Phase 3)
 */

export interface AudienceCriteria {
  state?: string;     // UF (ex: SP, RJ)
  city?: string;      // Município
  neighborhood?: string; // Bairro
  voter_id_mask?: string; // Ex: 01******
}

export interface SurveyWorksheet {
  survey_id: string;
  title: string;
  questions: Array<{ id: string; text: string; type: 'choice' | 'binary' }>;
  audience_criteria: AudienceCriteria;
  authorized_skill_hash: string;
  trust_level_required: 'bronze' | 'prata' | 'ouro';
  expires_at: string;
  content_hash: string;
  source_metadata: {
    type: 'pdf' | 'docx' | 'spreadsheet' | 'google_forms';
    filename?: string;
    url?: string;
  };
}

/**
 * CivitasSurveyEngine
 * Handles creation and secure broadcasting of surveys.
 */
export class CivitasSurveyEngine {
  private static AUTHORIZED_SKILL_HASH = "SHA256_SKILL_ZKID_V0_1_1_PHASE5";

  /**
   * Generates a "Survey Worksheet" for the citizen.
   */
  public static async createSurvey(
    surveyId: string, 
    title: string, 
    criteria: AudienceCriteria,
    contentHash: string,
    sourceMetadata: SurveyWorksheet['source_metadata'],
    trustLevel: 'bronze' | 'prata' | 'ouro' = 'bronze'
  ): Promise<SurveyWorksheet> {
    console.log(`[CIVITAS-ENGINE] Generating Survey: ${title} (${surveyId})...`);
    console.log(`[CIVITAS-ENGINE] Target Audience: ${JSON.stringify(criteria)}`);

    const worksheet: SurveyWorksheet = {
      survey_id: surveyId,
      title: title,
      questions: [
        { id: 'q1', text: 'Você concorda com a renovação da frota de transporte local?', type: 'binary' },
        { id: 'q2', text: 'Qual o principal problema da sua região?', type: 'choice' }
      ],
      audience_criteria: criteria,
      authorized_skill_hash: this.AUTHORIZED_SKILL_HASH,
      trust_level_required: trustLevel,
      expires_at: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days TTL
      content_hash: contentHash,
      source_metadata: sourceMetadata,
    };

    console.log(`[CIVITAS-ENGINE] Worksheet Generated. Ready for anonymous broadcast.`);
    
    return worksheet;
  }
}
