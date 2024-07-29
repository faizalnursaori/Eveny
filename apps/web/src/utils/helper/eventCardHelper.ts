const baseUrl = "http://localhost:8000";

export const getFullImageUrl = (imageUrl: string | undefined): string => {
  return imageUrl ? `${baseUrl}${imageUrl}` : "/placeholder.jpg";
};

export const convertToNumber = (price: number | string): number => {
  return typeof price === "string" ? parseFloat(price) : price;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatPrice = (
  price: number | string,
  isFree: boolean,
): string => {
  if (isFree) return "Free";
  const numPrice = convertToNumber(price);
  if (!isNaN(numPrice)) {
    return numPrice.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  }
  return price.toString();
};
