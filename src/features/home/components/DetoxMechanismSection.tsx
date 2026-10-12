"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Section,
  Heading,
  LinkButton,
  DetoxBottle,
  DisclaimerNote,
} from "@/components/ui";
import { ROUTES } from "@/config/routes";
import {
  ArrowRight,
  HelpCircle,
  Sparkles,
  Droplets,
  Activity,
  Smile,
  Check,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  GraphicMealVsJuice,
  GraphicWaterRetention,
  GraphicFreshVsPackaged,
  GraphicPacingCycles,
  GraphicGentleRecovery,
} from "./MythGraphics";

interface DaySimulation {
  day: number;
  title: string;
  focus: string;
  bodyFeeling: string;
  mechanism: string;
  dailyBottles: {
    time: string;
    name: string;
    color: "green" | "warm" | "soft";
    level: number;
    benefit: string;
  }[];
}

const THREE_DAY_FLOW: DaySimulation[] = [
  {
    day: 1,
    title: "Ngày 1: Thích ứng & Nhẹ bụng",
    focus: "Chuyển giao năng lượng · Giảm tải đường ruột",
    bodyFeeling:
      "Bụng bớt ậm ạch sau bữa trưa, cơ thể đi nhẹ nhiều hơn do cần tây và dưa leo kích thích bài tiết lượng muối và nước thừa.",
    mechanism:
      "Thay vì tốn 3-4 tiếng để co bóp tiêu hóa cơm, thịt, dầu mỡ, dạ dày được nghỉ ngơi. Nước ép rau củ thẩm thấu trực tiếp vào ruột chỉ trong 20 phút.",
    dailyBottles: [
      { time: "07:00", name: "Xanh Cần Tây Táo", color: "green", level: 60, benefit: "Xả muối thừa, khởi động ruột" },
      { time: "10:00", name: "Cam Cà Rốt Gừng", color: "warm", level: 75, benefit: "Giữ ấm bao tử, chống đói" },
      { time: "13:00", name: "Kale Dưa Leo Tươi", color: "green", level: 70, benefit: "Khoáng chất kiềm thanh mát" },
      { time: "16:00", name: "Đỏ Củ Dền Thơm", color: "warm", level: 80, benefit: "Bổ sung năng lượng chiều" },
      { time: "19:00", name: "Sữa Hạt Ấm Dịu", color: "soft", level: 85, benefit: "Chất béo tốt, êm bụng ngủ" },
    ],
  },
  {
    day: 2,
    title: "Ngày 2: Rút nước thừa & Vòng bụng gọn",
    focus: "Đào thải ứ đọng · Vòng bụng xẹp tự nhiên",
    bodyFeeling:
      "Cảm nhận rõ nhất khi cài nút quần hoặc đứng trước gương. Cơ thể bớt phù nề ở mặt và bắp chân, không còn cảm giác thèm ngọt hay cồn cào.",
    mechanism:
      "Lượng glycogen dự trữ cùng nước liên kết trong cơ bắp bắt đầu được giải phóng. Men bromelain từ thơm và pectin từ táo giúp làm sạch cặn bã tiêu hóa.",
    dailyBottles: [
      { time: "07:00", name: "Xanh Đậm Diệp Lục", color: "green", level: 65, benefit: "Thanh lọc sâu đường ruột" },
      { time: "10:00", name: "Cam Bưởi Tươi Mát", color: "warm", level: 70, benefit: "Vitamin C tăng đề kháng" },
      { time: "13:00", name: "Cần Tây Dứa Táo", color: "green", level: 75, benefit: "Phân giải cặn đạm thừa" },
      { time: "16:00", name: "Cà Rốt Củ Dền", color: "warm", level: 80, benefit: "Chống oxy hóa, sáng da" },
      { time: "19:00", name: "Sữa Hạnh Nhân Sen", color: "soft", level: 85, benefit: "Thư giãn hệ thần kinh" },
    ],
  },
  {
    day: 3,
    title: "Ngày 3: Thiết lập lại nhịp sinh học",
    focus: "Cơ thể thanh thoát · Phục hồi tươi tỉnh",
    bodyFeeling:
      "Thức dậy sảng khoái, không còn uể oải. Vị giác trở nên nhạy cảm hơn, cảm nhận rõ vị ngọt nguyên bản của rau củ và sẵn sàng ăn uống lành mạnh.",
    mechanism:
      "Chu kỳ 72 giờ hoàn tất giúp hệ vi sinh đường ruột cân bằng lại. Cân nặng giảm 0.5 - 1.5kg là kết quả của việc giải phóng nước ứ và thanh lọc cặn tiêu hóa.",
    dailyBottles: [
      { time: "07:00", name: "Xanh Bạc Hà Táo", color: "green", level: 60, benefit: "Đánh thức mọi giác quan" },
      { time: "10:00", name: "Chanh Gừng Mật Ong", color: "warm", level: 75, benefit: "Làm ấm & ổn định tiêu hóa" },
      { time: "13:00", name: "Rau Má Táo Xanh", color: "green", level: 70, benefit: "Thanh mát từ bên trong" },
      { time: "16:00", name: "Thơm Cà Rốt Tươi", color: "warm", level: 80, benefit: "Cân bằng năng lượng cuối ngày" },
      { time: "19:00", name: "Sữa Hạt Yến Mạch", color: "soft", level: 85, benefit: "Kết thúc liệu trình trọn vẹn" },
    ],
  },
];

const MYTHS_DATA = [
  {
    id: 1,
    tag: "Sai lầm #01",
    shortLabel: "01. Bỏ đói cơ thể?",
    myth: "Detox là nhịn ăn hoàn toàn, bỏ đói cơ thể?",
    realitySummary: "Không bỏ đói — Nạp đều 5 cữ dinh dưỡng lỏng sạch",
    explanation:
      "Cơ thể bạn vẫn tiếp nhận liên tục vitamin, khoáng chất và enzym thực vật tự nhiên từ 5 chai nước ép chia đều mỗi 2,5 - 3 tiếng. Đây là cách giúp dạ dày và gan tạm nghỉ ngơi sau chuỗi ngày tiêu hóa đạm và dầu mỡ nặng bụng.",
    keyTakeaway: "Dạ dày tiết kiệm 4-5 tiếng co bóp thức ăn nặng, ruột hấp thu nhanh trong 20 phút.",
    graphic: <GraphicMealVsJuice />,
  },
  {
    id: 2,
    tag: "Sai lầm #02",
    shortLabel: "02. Giảm mỡ cấp tốc?",
    myth: "Chỉ cần uống nước ép là giảm mỡ thừa thần tốc?",
    realitySummary: "Giảm 0.5 - 1.5kg là giải phóng nước thừa & cặn bã",
    explanation:
      "Mỡ thừa tích tụ lâu năm không thể biến mất sau vài ngày. Cân nặng giảm ban đầu là do cơ thể đào thải lượng muối thừa gây sưng phù và xả cặn tiêu hóa ứ đọng, giúp vòng bụng xẹp xuống tự nhiên.",
    keyTakeaway: "Vòng bụng phẳng rõ rệt khi cài nút quần, người nhẹ bẫng chứ không phải mất cơ hay kiệt sức.",
    graphic: <GraphicWaterRetention />,
  },
  {
    id: 3,
    tag: "Sai lầm #03",
    shortLabel: "03. Chai siêu thị?",
    myth: "Nước ép đóng chai sẵn ở siêu thị cũng dùng để detox được?",
    realitySummary: "Phải là nước ép chậm tươi sống, nguyên chất 100%",
    explanation:
      "Nước ép công nghiệp đóng chai thường phải qua xử lý nhiệt thanh trùng làm mất men enzym sống và có thêm đường bảo quản. Detox chuẩn cần nước ép chậm từ rau củ tươi mỗi sáng, không đường cát, không phụ gia.",
    keyTakeaway: "Chỉ rau củ quả tươi ép chậm mới giữ trọn enzym thực vật tự nhiên hỗ trợ đường ruột.",
    graphic: <GraphicFreshVsPackaged />,
  },
  {
    id: 4,
    tag: "Sai lầm #04",
    shortLabel: "04. Càng lâu càng tốt?",
    myth: "Detox càng nhiều ngày liên tục thì càng tốt?",
    realitySummary: "Cơ thể cần nhịp thích ứng 1 đến 3 ngày vừa vặn",
    explanation:
      "Ép cơ thể detox dài ngày khi chưa quen dễ gây hụt năng lượng và mệt mỏi. Ép Xanh luôn khuyến khích bắt đầu từ 1 ngày làm quen, hoặc 3 ngày cân bằng để nhịp sinh học tự nhiên thích nghi nhẹ nhàng.",
    keyTakeaway: "Đúng nhịp sinh học quan trọng hơn ép số ngày. 3 ngày là chu kỳ vàng cho đường ruột.",
    graphic: <GraphicPacingCycles />,
  },
  {
    id: 5,
    tag: "Sai lầm #05",
    shortLabel: "05. Ăn bù xả láng?",
    myth: "Sau khi detox xong có thể ăn uống thả ga bù lại?",
    realitySummary: "Cần 1-2 ngày ăn dặm nhẹ nhàng để giữ trọn hiệu quả",
    explanation:
      "Đường ruột vừa được làm sạch và nghỉ ngơi rất nhạy cảm. Nạp ngay đồ chiên rán cay nóng sẽ gây sốc tiêu hóa. Bạn chỉ cần ăn dặm 1-2 ngày với súp rau củ, cháo yến mạch và trái cây tươi để duy trì vòng eo gọn.",
    keyTakeaway: "Ăn nhẹ sau detox giúp cơ thể giữ được cảm giác sảng khoái và thiết lập lối sống lành mạnh.",
    graphic: <GraphicGentleRecovery />,
  },
];

export function DetoxMechanismSection() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeMythIndex, setActiveMythIndex] = useState<number>(0);

  const currentSimulation =
    THREE_DAY_FLOW.find((item) => item.day === activeDay) ?? THREE_DAY_FLOW[0];
  const currentMyth = MYTHS_DATA[activeMythIndex];

  const handlePrevMyth = () => {
    setActiveMythIndex((prev) => (prev > 0 ? prev - 1 : MYTHS_DATA.length - 1));
  };

  const handleNextMyth = () => {
    setActiveMythIndex((prev) => (prev < MYTHS_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <Section spacing="lg" className="border-b border-border bg-surface/30">
      <Container className="space-y-12 sm:space-y-16">
        {/* Phần 1: Tiêu đề & Lời mở đầu */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-soft text-primary font-heading font-medium text-xs border border-primary/20">
            <HelpCircle size={13} className="text-primary" />
            <span>Hiểu đúng để chăm sóc cơ thể</span>
          </div>
          <Heading
            level={2}
            size="3xl"
            className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-text leading-tight tracking-tight"
          >
            Tại sao cơ thể lại nhẹ nhõm hơn sau khi Detox?
          </Heading>
          <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed">
            Nhiều chị em lần đầu tìm hiểu thường băn khoăn: liệu detox có phải là bỏ đói cơ thể, hay uống nước ép là giảm mỡ thần tốc? Dưới đây là cách cơ thể thực sự phản hồi, rất tự nhiên và dễ hiểu:
          </p>
        </div>

        {/* Phần 2: Slider 5 Hiểu lầm thường gặp (Bố cục ngang + Nút Left/Right + Card tròn mềm mại chữ to) */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                Góc giải tỏa băn khoăn cho chị em
              </span>
              <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text">
                5 hiểu lầm phổ biến nhất khi lần đầu detox
              </h3>
            </div>

            {/* Bộ điều hướng Left - Right & Chỉ số trang */}
            <div className="flex items-center gap-3 self-start sm:self-auto select-none">
              <span className="text-xs font-heading font-semibold text-text-muted bg-surface px-3 py-1.5 rounded-full border border-border">
                {activeMythIndex + 1} / {MYTHS_DATA.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevMyth}
                  aria-label="Xem hiểu lầm trước"
                  className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/50 transition-all duration-200 active:scale-90 shadow-2xs"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleNextMyth}
                  aria-label="Xem hiểu lầm tiếp theo"
                  className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-primary/50 transition-all duration-200 active:scale-90 shadow-2xs"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Card trình bày lớn, tròn mềm mại rounded-3xl sm:rounded-4xl, chữ to rõ ràng */}
          <div className="w-full rounded-3xl sm:rounded-4xl bg-surface border border-primary/30 p-6 sm:p-9 lg:p-10 shadow-2xs transition-all duration-300 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Cột trái: Nội dung chữ to, dễ đọc, đọc nhanh */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-soft text-primary font-heading font-semibold text-xs border border-primary/20">
                    <Sparkles size={12} className="text-primary" />
                    <span>{currentMyth.tag}</span>
                  </div>

                  {/* Tiêu đề hiểu lầm to rõ */}
                  <h4 className="font-heading font-semibold text-xl sm:text-2xl lg:text-3xl text-text leading-snug">
                    &ldquo;{currentMyth.myth}&rdquo;
                  </h4>

                  {/* Khối Sự thật & Lời giải thích */}
                  <div className="space-y-2.5 pt-2 border-t border-border/80">
                    <div className="flex items-center gap-2 text-primary font-heading font-semibold text-base sm:text-lg">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="shrink-0 text-primary" />
                      <span>{currentMyth.realitySummary}</span>
                    </div>

                    <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
                      {currentMyth.explanation}
                    </p>
                  </div>
                </div>

                {/* Khối Tóm tắt ý chính 1-chạm (Skimming Box) */}
                <div className="p-4 rounded-2xl bg-accent-soft/40 border border-primary/20 flex items-start gap-2.5 text-xs sm:text-sm text-text font-body leading-relaxed">
                  <Check size={16} strokeWidth={2.5} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <b className="font-semibold text-primary">Đúc kết nhanh: </b>
                    {currentMyth.keyTakeaway}
                  </span>
                </div>
              </div>

              {/* Cột phải: Component hình ảnh minh họa tương ứng (căn giữa theo chiều dọc) */}
              <div className="lg:col-span-6 flex items-center justify-center w-full">
                {currentMyth.graphic}
              </div>
            </div>
          </div>

          {/* Quick-select chips bên dưới để bấm chuyển nhanh giữa 5 sai lầm */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 select-none">
            {MYTHS_DATA.map((item, idx) => {
              const isSelected = idx === activeMythIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMythIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-bg font-semibold shadow-2xs scale-105"
                      : "bg-surface text-text-muted border border-border hover:border-primary/40 hover:text-text"
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Phần 3: Sơ đồ dòng chảy cơ chế (Redux-style Flow) */}
        <div className="p-6 sm:p-9 rounded-4xl bg-bg border border-border space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
              Quy trình chuyển hóa tự nhiên
            </span>
            <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text">
              4 bước cơ thể phản hồi khi tiếp nhận 5 chai nước ép
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 space-y-2.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 text-primary">
                <div className="h-7 w-7 rounded-full bg-accent-soft flex items-center justify-center font-heading font-semibold text-xs">
                  01
                </div>
                <Droplets size={16} strokeWidth={2} />
              </div>
              <h4 className="font-heading font-semibold text-base text-text">Nạp dinh dưỡng lỏng</h4>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Nước ép tươi giữ nguyên vitamin và khoáng chất, thẩm thấu nhanh vào máu mà không bắt dạ dày co bóp nặng.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 space-y-2.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 text-primary">
                <div className="h-7 w-7 rounded-full bg-accent-soft flex items-center justify-center font-heading font-semibold text-xs">
                  02
                </div>
                <RefreshCw size={16} strokeWidth={2} />
              </div>
              <h4 className="font-heading font-semibold text-base text-text">Đường ruột nghỉ ngơi</h4>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Hệ tiêu hóa tiết kiệm năng lượng, chuyển hóa năng lượng dự trữ để tự làm sạch các cặn bã lâu ngày.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 space-y-2.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 text-primary">
                <div className="h-7 w-7 rounded-full bg-accent-soft flex items-center justify-center font-heading font-semibold text-xs">
                  03
                </div>
                <Activity size={16} strokeWidth={2} />
              </div>
              <h4 className="font-heading font-semibold text-base text-text">Xả nước thừa ứ đọng</h4>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Kali tự nhiên từ cần tây và dưa leo đào thải lượng muối natri thừa, giảm sưng mặt và phù nề chân tay.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 space-y-2.5 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-2 text-primary">
                <div className="h-7 w-7 rounded-full bg-accent-soft flex items-center justify-center font-heading font-semibold text-xs">
                  04
                </div>
                <Smile size={16} strokeWidth={2} />
              </div>
              <h4 className="font-heading font-semibold text-base text-text">Bụng phẳng nhẹ nhõm</h4>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Vòng eo gọn gàng, giảm 0.5 - 1.5kg nước thừa, tinh thần tươi tỉnh và phục hồi nhịp ăn uống thanh đạm.
              </p>
            </div>
          </div>
        </div>

        {/* Phần 4: Mô phỏng tương tác trực quan Lộ Trình 3 Ngày */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                Mô phỏng trải nghiệm thực tế
              </span>
              <Heading level={3} size="2xl" className="font-semibold text-xl sm:text-2xl text-text">
                Cơ thể thay đổi như thế nào qua 3 ngày?
              </Heading>
              <p className="font-body text-sm text-text-muted">
                Bấm chọn từng ngày để xem nhịp độ 5 chai nước ép và cảm nhận cơ thể thực tế:
              </p>
            </div>

            {/* 3 Tabs chuyển ngày tương tác tròn mềm */}
            <div className="inline-flex p-1 rounded-full bg-surface border border-border gap-1 self-start sm:self-auto select-none shadow-2xs">
              {[1, 2, 3].map((d) => {
                const isActive = activeDay === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDay(d)}
                    className={`px-5 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                      isActive
                        ? "bg-primary text-bg shadow-2xs"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    Ngày 0{d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Khối hiển thị chi tiết ngày đang chọn */}
          <div className="p-6 sm:p-9 rounded-4xl bg-surface border border-border space-y-6 transition-all duration-300 shadow-2xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/70 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent-soft text-primary font-heading font-semibold text-xs border border-border">
                  <Sparkles size={11} className="text-primary" />
                  <span>{currentSimulation.focus}</span>
                </div>
                <h4 className="font-heading font-semibold text-lg sm:text-xl text-text">
                  {currentSimulation.title}
                </h4>
              </div>

              <div className="text-xs text-text-muted bg-bg px-3.5 py-1.5 rounded-full border border-border">
                Nhịp 5 chai phân bổ nhịp nhàng trong ngày
              </div>
            </div>

            {/* Cơ chế & Cảm nhận cơ thể */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-border/80 space-y-1.5">
                <span className="font-heading font-semibold text-xs text-primary uppercase tracking-wide block">
                  Cảm nhận cơ thể của bạn
                </span>
                <p className="font-body text-xs sm:text-sm text-text leading-relaxed">
                  {currentSimulation.bodyFeeling}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-bg border border-border/80 space-y-1.5">
                <span className="font-heading font-semibold text-xs text-text-muted uppercase tracking-wide block">
                  Cơ chế sinh học tự nhiên
                </span>
                <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                  {currentSimulation.mechanism}
                </p>
              </div>
            </div>

            {/* Trực quan 5 chai nước ép trong ngày */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-text">
                  Lịch 5 chai nước ép phân bổ nhịp nhàng:
                </span>
                <span className="text-xs text-text-muted">Mỗi cữ cách nhau 2.5 - 3 tiếng</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {currentSimulation.dailyBottles.map((bottle) => (
                  <div
                    key={bottle.time}
                    className="p-3.5 rounded-2xl bg-bg border border-border/80 flex sm:flex-col items-center justify-center sm:text-center text-left gap-3 transition-all duration-200 hover:border-primary/50 group"
                  >
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                      <DetoxBottle
                        size="sm"
                        color={bottle.color}
                        level={bottle.level}
                        label={bottle.name}
                      />
                    </div>
                    <div className="space-y-0.5 flex-1 sm:flex-initial min-w-0 sm:flex sm:flex-col sm:items-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-heading font-semibold bg-accent-soft text-primary inline-block">
                        {bottle.time}
                      </span>
                      <span className="font-body text-xs font-semibold text-text block truncate mt-1">
                        {bottle.name}
                      </span>
                      <p className="text-[11px] text-text-muted font-body leading-tight">
                        {bottle.benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút tư vấn và xem gói */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/70">
              <LinkButton
                href={ROUTES.CONSULTATION}
                variant="primary"
                rounded="full"
                className="w-full sm:w-auto min-h-12 px-7 text-sm font-semibold justify-center transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <span>Tư vấn lộ trình 3 ngày cho thể trạng của bạn</span>
                <ArrowRight size={16} strokeWidth={2} />
              </LinkButton>

              <Link
                href="/plans/3-day"
                className="text-xs font-medium text-text-muted hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Xem chi tiết thực đơn gói 3 ngày &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Ghi chú miễn trừ trách nhiệm dùng chung */}
        <DisclaimerNote className="max-w-xl mx-auto pt-2" />
      </Container>
    </Section>
  );
}
