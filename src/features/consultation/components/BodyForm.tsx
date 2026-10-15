"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Section,
  Heading,
  Card,
  Button,
  Input,
} from "@/components/ui";
import { useConsultation } from "../context";
import { evaluateBody, getAsianBmiAssessment } from "@/domain/screening";
import { FIXED_LABELS } from "@/config/copy";
import { routes } from "@/config/routes";
import { bodySchema } from "../schemas/consultation.schema";
import {
  ACTIVITY_OPTIONS,
  AGE_PRESETS,
  HEIGHT_PRESETS,
  WEIGHT_PRESETS,
} from "../constants";
import { MetricInputCard } from "./MetricInputCard";
import { BmiAssessmentCard } from "./BmiAssessmentCard";
import { GenderSelector } from "./GenderSelector";
import { ActivityLevelSelector } from "./ActivityLevelSelector";

type BodyFormInput = z.input<typeof bodySchema>;
type BodyFormOutput = z.output<typeof bodySchema>;

export function BodyForm() {
  const router = useRouter();
  const { body, updateBody, setIneligible } = useConsultation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<BodyFormInput, unknown, BodyFormOutput>({
    resolver: zodResolver(bodySchema),
    mode: "onChange",
    defaultValues: {
      name: body?.name ?? "",
      gender: body?.gender ?? "female",
      age: body?.age ? String(body.age) : "",
      heightCm: body?.heightCm ? String(body.heightCm) : "",
      weightKg: body?.weightKg ? String(body.weightKg) : "",
      activityLevel: body?.activityLevel ?? undefined,
    },
  });

  const gender = useWatch({ control, name: "gender" }) as
    "female" | "male" | undefined;
  const ageValue = useWatch({ control, name: "age" }) as
    string | number | undefined;
  const heightValue = useWatch({ control, name: "heightCm" }) as
    string | number | undefined;
  const weightValue = useWatch({ control, name: "weightKg" }) as
    string | number | undefined;

  const heightNum = Number(heightValue);
  const weightNum = Number(weightValue);

  const assessment = useMemo(() => {
    if (
      heightNum >= 120 &&
      heightNum <= 220 &&
      weightNum >= 35 &&
      weightNum <= 180
    ) {
      return getAsianBmiAssessment(heightNum, weightNum);
    }
    return null;
  }, [heightNum, weightNum]);

  const onSubmit = (data: BodyFormOutput) => {
    const evaluation = evaluateBody({
      age: data.age,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
    });

    if (!evaluation.isEligible) {
      setIneligible(
        evaluation.reason || "Thể trạng chưa phù hợp với liệu trình.",
      );
      router.push(routes.consultationIneligible());
      return;
    }

    updateBody(data, evaluation.warningMessage);
    router.push(routes.consultationGoals());
  };

  return (
    <Section className="py-8 sm:py-12">
      <Container className="max-w-7xl space-y-6">
        <Card className="p-6 sm:p-10 space-y-8">
          <header className="space-y-1 border-b border-border/60 pb-5">
            <span className="text-md font-mono font-semibold text-primary tracking-wider block">
              Bước 1/4 · Khảo sát thể trạng
            </span>
            <Heading
              level={1}
              className="text-2xl sm:text-3xl font-semibold text-text"
            >
              Thông tin cơ thể
            </Heading>
            <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
              Ước tính chỉ số BMI và mức năng lượng phù hợp với bạn.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1">
              <label
                htmlFor="customer-name"
                className="font-body text-md font-medium text-text select-none block"
              >
                Tên bạn: <span className="text-error">*</span>
              </label>
              <Input
                id="customer-name"
                placeholder="Ví dụ: Oanh, Hạnh, ..."
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <GenderSelector
              value={gender}
              onChange={(val) =>
                setValue("gender", val, { shouldValidate: true })
              }
            />

            <div className="space-y-2">
              <span className="font-body text-md font-medium text-text select-none block">
                Chỉ số thể trạng cá nhân:
              </span>

              <MetricInputCard
                id="customer-age"
                label="Tuổi"
                unit="tuổi"
                placeholder="Ví dụ: 18"
                value={ageValue}
                error={errors.age?.message}
                presets={AGE_PRESETS}
                onPresetSelect={(val) =>
                  setValue("age", String(val), { shouldValidate: true })
                }
                inputProps={register("age")}
              />

              <MetricInputCard
                id="customer-height"
                label="Chiều cao"
                unit="cm"
                placeholder="Ví dụ: 160"
                value={heightValue}
                error={errors.heightCm?.message}
                presets={HEIGHT_PRESETS}
                onPresetSelect={(val) =>
                  setValue("heightCm", String(val), { shouldValidate: true })
                }
                inputProps={register("heightCm")}
              />

              <MetricInputCard
                id="customer-weight"
                label="Cân nặng"
                unit="kg"
                placeholder="Ví dụ: 52"
                value={weightValue}
                error={errors.weightKg?.message}
                presets={WEIGHT_PRESETS}
                onPresetSelect={(val) =>
                  setValue("weightKg", String(val), { shouldValidate: true })
                }
                inputProps={register("weightKg")}
              />
            </div>

            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <ActivityLevelSelector
                  options={ACTIVITY_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.activityLevel?.message}
                />
              )}
            />

            {assessment && (
              <BmiAssessmentCard assessment={assessment} heightCm={heightNum} />
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 min-h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{FIXED_LABELS.ACTION_CONTINUE}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Button>
              {!isValid && (
                <p className="font-body text-xs text-text-muted/70 text-center pt-2">
                  Vui lòng điền đủ tên, tuổi, chiều cao, cân nặng và chọn mức
                  vận động để tiếp tục.
                </p>
              )}
            </div>
          </form>
        </Card>
      </Container>
    </Section>
  );
}
