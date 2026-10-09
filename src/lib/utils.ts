/**
 * Nối các tên class CSS an toàn và loại bỏ các giá trị falsy.
 * Hàm thuần TypeScript, không phụ thuộc thư viện ngoài.
 */
export function cn(
  ...classes: Array<string | number | boolean | undefined | null>
): string {
  return classes.filter(Boolean).join(" ");
}
