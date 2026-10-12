export interface SafetyAnswers {
  pregnantOrNursing: boolean;
  medicalConditions: boolean;
  regularMedication: boolean;
  eatingDisorder: boolean;
  allergies: boolean;
}

export interface BodyAnswers {
  age: number;
  heightCm: number;
  weightKg: number;
}

export interface ScreeningResult {
  isEligible: boolean;
  reason?: string;
  hasWarning?: boolean;
  warningMessage?: string;
  bmi: number;
}

export function calculateBmi(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function evaluateSafety(answers: SafetyAnswers): { isEligible: boolean; reason?: string } {
  if (answers.pregnantOrNursing) {
    return { isEligible: false, reason: "Phụ nữ mang thai hoặc đang cho con bú cần chế độ dinh dưỡng đầy đủ và liên tục." };
  }
  if (answers.medicalConditions) {
    return { isEligible: false, reason: "Người có bệnh nền về gan, thận, tim mạch, huyết áp hoặc dạ dày nặng không nên nhịn ăn uống nước ép." };
  }
  if (answers.regularMedication) {
    return { isEligible: false, reason: "Người đang sử dụng thuốc điều trị cần duy trì chế độ ăn ổn định để tránh tương tác thuốc." };
  }
  if (answers.eatingDisorder) {
    return { isEligible: false, reason: "Người có tiền sử rối loạn ăn uống không nên thực hiện các chế độ hạn chế calo đột ngột." };
  }
  return { isEligible: true };
}

export function evaluateBody(body: BodyAnswers): { isEligible: boolean; reason?: string; hasWarning?: boolean; warningMessage?: string; bmi: number } {
  const bmi = calculateBmi(body.heightCm, body.weightKg);

  if (body.age < 18) {
    return { isEligible: false, reason: "Chương trình chỉ dành cho người từ 18 tuổi trở lên.", bmi };
  }
  if (bmi > 0 && bmi < 18.5) {
    return { isEligible: false, reason: "Chỉ số BMI dưới 18.5 (thiếu cân) cần bổ sung dinh dưỡng thay vì giảm năng lượng.", bmi };
  }

  const hasWarning = body.age >= 60 || bmi >= 30;
  const warningMessage = hasWarning
    ? "Thể trạng của bạn nên tham khảo ý kiến bác sĩ hoặc chuyên gia y tế trước khi bắt đầu liệu trình."
    : undefined;

  return {
    isEligible: true,
    hasWarning,
    warningMessage,
    bmi,
  };
}
