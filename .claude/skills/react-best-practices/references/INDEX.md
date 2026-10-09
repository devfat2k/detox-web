# React Performance Guidelines Index

Tra cứu nhanh các quy tắc tối ưu React 19 và Next.js App Router. Chỉ mở file chi tiết tương ứng trong `references/rules/` khi gặp vấn đề liên quan.

## 1. Eliminating Waterfalls (Async) - CRITICAL
- `rules/async-defer-await.md`: Khi có `await` đặt sớm trước các nhánh điều kiện không dùng tới kết quả.
- `rules/async-dependencies.md`: Khi cần parallel hóa các async tasks có quan hệ phụ thuộc từng phần.
- `rules/async-parallel.md`: Khi các lệnh `await` độc lập gọi tuần tự thay vì dùng `Promise.all()`.
- `rules/async-api-routes.md`: Khi Route Handler/API có các truy vấn async tuần tự gây nghẽn phản hồi.
- `rules/async-suspense-boundaries.md`: Khi trang bị chặn render toàn bộ, cần streaming layout qua Suspense.

## 2. Bundle Size Optimization (Bundle) - CRITICAL
- `rules/bundle-barrel-imports.md`: Khi import component hoặc icon từ barrel files (`index.ts`, `lucide-react`).
- `rules/bundle-conditional.md`: Khi module lớn chỉ dùng trong điều kiện hiếm gặp cần load theo nhu cầu.
- `rules/bundle-defer-third-party.md`: Khi script bên thứ ba làm chậm thời gian tương tác ban đầu (TTI).
- `rules/bundle-dynamic-imports.md`: Khi component nặng (chart, editor, modal) cần lazy-load với `next/dynamic`.
- `rules/bundle-preload.md`: Khi muốn tải trước module dựa trên tương tác chuột (hover) của người dùng.

## 3. Server-Side Performance (Server) - HIGH
- `rules/server-cache-lru.md`: Khi cần cache dữ liệu tính toán nặng dùng chung giữa nhiều request server.
- `rules/server-cache-react.md`: Khi cần deduplicate fetch/data calls trong cùng một lifecycle request bằng `React.cache()`.
- `rules/server-parallel-fetching.md`: Khi fetch dữ liệu song song qua composition lồng ghép component Server.
- `rules/server-serialization.md`: Khi truyền props qua ranh giới Server-Client (RSC) quá cồng kềnh.

## 4. Client-Side Data Fetching (Client) - MEDIUM-HIGH
- `rules/client-event-listeners.md`: Khi nhiều component gắn listener toàn cục (scroll/resize) gây trùng lặp.
- `rules/client-swr-dedup.md`: Khi cần tự động deduplicate request và caching dữ liệu ở client với SWR.

## 5. Re-render Optimization (Rerender) - MEDIUM
- `rules/rerender-defer-reads.md`: Khi state được đọc ở component cha nhưng chỉ component con thực sự dùng.
- `rules/rerender-dependencies.md`: Khi `useEffect`/`useMemo` phụ thuộc vào cả object lớn thay vì primitive field.
- `rules/rerender-derived-state.md`: Khi sao chép prop vào state thay vì tính toán trực tiếp derived state.
- `rules/rerender-lazy-state-init.md`: Khi `useState` nhận hàm khởi tạo phức tạp mà không truyền qua arrow function.
- `rules/rerender-memo.md`: Khi component tính toán render đắt đỏ cần bọc `React.memo` đúng cách.
- `rules/rerender-transitions.md`: Khi cập nhật state không khẩn cấp làm đơ UI, cần `useTransition`.

## 6. Rendering Performance (Rendering) - MEDIUM
- `rules/rendering-activity.md`: Khi muốn ẩn/hiện view mà vẫn giữ nguyên state DOM bằng React Activity.
- `rules/rendering-animate-svg-wrapper.md`: Khi animate phần tử SVG trực tiếp gây lag layout thay vì animate div bọc ngoài.
- `rules/rendering-conditional-render.md`: Khi dùng toán tử `&&` hiển thị số 0 vô ý trên giao diện.
- `rules/rendering-content-visibility.md`: Khi render danh sách dài trong DOM gây chậm initial paint.
- `rules/rendering-hoist-jsx.md`: Khi JSX element tĩnh nằm trong hàm component bị tạo lại mỗi lần render.
- `rules/rendering-hydration-no-flicker.md`: Khi giao diện client khác server gây lỗi hydration hoặc giật nhấp nháy.
- `rules/rendering-svg-precision.md`: Khi path SVG chứa tọa độ thập phân quá dài làm tăng kích thước DOM.

## 7. JavaScript Performance (JS) - LOW-MEDIUM
- `rules/js-batch-dom-css.md`: Khi thao tác DOM trực tiếp làm trigger reflow liên tục nhiều lần.
- `rules/js-cache-function-results.md`: Khi hàm tính toán đắt đỏ được gọi lặp lại với cùng input.
- `rules/js-cache-property-access.md`: Khi truy cập thuộc tính sâu lặp đi lặp lại trong vòng lặp lớn.
- `rules/js-cache-storage.md`: Khi đọc `localStorage`/`sessionStorage` nhiều lần mà không giữ bộ đệm RAM.
- `rules/js-combine-iterations.md`: Khi nối chuỗi `.map().filter()` lặp qua mảng nhiều vòng liên tiếp.
- `rules/js-early-exit.md`: Khi hàm thiếu guard clause ở đầu dẫn tới thực thi không cần thiết.
- `rules/js-hoist-regexp.md`: Khi biểu thức chính quy (RegExp) được khởi tạo lại trong vòng lặp hoặc render.
- `rules/js-index-maps.md`: Khi tìm kiếm phần tử nhiều lần bằng `.find()` thay vì dựng Map tra cứu O(1).
- `rules/js-length-check-first.md`: Khi so sánh hai mảng mà không kiểm tra độ dài `.length` trước.
- `rules/js-min-max-loop.md`: Khi tìm min/max bằng cách sắp xếp mảng (`.sort()`) thay vì duyệt một vòng.
- `rules/js-set-map-lookups.md`: Khi kiểm tra tồn tại trong mảng lớn với `.includes()` thay vì dùng Set.
- `rules/js-tosorted-immutable.md`: Khi sắp xếp mảng làm đột biến dữ liệu gốc thay vì dùng `.toSorted()`.

## 8. Advanced Patterns (Advanced) - LOW
- `rules/advanced-event-handler-refs.md`: Khi event handler cần đọc state mới nhất mà không làm trigger effect.
- `rules/advanced-use-latest.md`: Khi custom hook cần giữ callback ref ổn định qua các lần render.
