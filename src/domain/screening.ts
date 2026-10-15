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

export interface AsianBmiAssessment {
  bmi: number;
  category: string;
  statusLabel: string;
  explanation: string;
  recommendation: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
}

/**
 * Tính khoảng cân nặng cân đối theo chuẩn người Châu Á (WHO-WPRO & Bộ Y tế Việt Nam).
 * Tiêu chuẩn BMI bình thường: 18.5 - 22.9
 */
export function calculateHealthyWeightRange(heightCm: number): { minKg: number; maxKg: number } {
  if (heightCm <= 0) return { minKg: 0, maxKg: 0 };
  const heightM = heightCm / 100;
  const heightSq = heightM * heightM;
  const minKg = Math.round(18.5 * heightSq * 10) / 10;
  const maxKg = Math.round(22.9 * heightSq * 10) / 10;
  return { minKg, maxKg };
}

/**
 * Đánh giá chi tiết thể trạng theo chuẩn BMI dành riêng cho người Châu Á / Việt Nam.
 */
export function getAsianBmiAssessment(heightCm: number, weightKg: number): AsianBmiAssessment | null {
  const bmi = calculateBmi(heightCm, weightKg);
  if (bmi <= 0) return null;

  const { minKg, maxKg } = calculateHealthyWeightRange(heightCm);

  if (bmi < 18.5) {
    return {
      bmi,
      category: "Thiếu cân nhẹ (BMI < 18.5)",
      statusLabel: "Thiếu cân",
      explanation: `Với chỉ số BMI là ${bmi}, thể trạng của bạn đang ở mức thiếu cân nhẹ so với chuẩn người Việt Nam.`,
      recommendation: "Cơ thể bạn cần ưu tiên nạp đủ năng lượng và bổ sung dưỡng chất tự nhiên, không nên áp dụng chế độ giảm calo.",
      healthyWeightMin: minKg,
      healthyWeightMax: maxKg,
    };
  }

  if (bmi <= 22.9) {
    return {
      bmi,
      category: "Thể trạng cân đối (BMI 18.5 – 22.9)",
      statusLabel: "Cân đối",
      explanation: `Với chỉ số BMI là ${bmi}, bạn đang có thể trạng rất cân đối và lý tưởng theo chuẩn người Việt Nam.`,
      recommendation: "Rất thích hợp để duy trì lối sống lành mạnh, bổ sung vi chất và thanh lọc đường ruột êm dịu.",
      healthyWeightMin: minKg,
      healthyWeightMax: maxKg,
    };
  }

  if (bmi <= 24.9) {
    return {
      bmi,
      category: "Hơi đầy đặn (BMI 23 – 24.9)",
      statusLabel: "Hơi đầy đặn",
      explanation: `Với chỉ số BMI là ${bmi}, cơ thể bạn đang ở mức hơi đầy đặn (tiền thừa cân nhẹ) theo chuẩn người Việt Nam.`,
      recommendation: "Lộ trình nước ép và sinh tố xanh sẽ giúp xoa dịu hệ tiêu hóa, nhẹ bụng và giải phóng năng lượng dư thừa hiệu quả.",
      healthyWeightMin: minKg,
      healthyWeightMax: maxKg,
    };
  }

  if (bmi < 30) {
    return {
      bmi,
      category: "Thừa cân (BMI 25 – 29.9)",
      statusLabel: "Thừa cân",
      explanation: `Với chỉ số BMI là ${bmi}, bạn đang ở mức thừa cân theo chuẩn thể trạng người Việt Nam.`,
      recommendation: "Nên bắt đầu với nhịp độ êm dịu để cơ thể làm quen mà không tạo áp lực đói mệt hay căng thẳng.",
      healthyWeightMin: minKg,
      healthyWeightMax: maxKg,
    };
  }

  return {
    bmi,
    category: "Thừa cân nhiều (BMI ≥ 30)",
    statusLabel: "Cần lưu ý",
    explanation: `Với chỉ số BMI là ${bmi}, cơ thể bạn đang ở mức tích trữ năng lượng cao.`,
    recommendation: "Nên tham khảo ý kiến chuyên gia dinh dưỡng hoặc bác sĩ để có kế hoạch chăm sóc sức khỏe an toàn và phù hợp nhất.",
    healthyWeightMin: minKg,
    healthyWeightMax: maxKg,
  };
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
