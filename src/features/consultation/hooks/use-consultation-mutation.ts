import { useMutation } from "@tanstack/react-query";
import {
  submitConsultation,
  type ConsultationSubmissionInput,
} from "@/services/consultation.service";
import type { ConsultationResult } from "@/types/api";

export function useConsultationMutation() {
  return useMutation<ConsultationResult, Error, ConsultationSubmissionInput>({
    mutationFn: (input: ConsultationSubmissionInput) => submitConsultation(input),
  });
}
