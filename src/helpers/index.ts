class Helper {
  static formatPriceToRp(price: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(price);
  }

  // Tambahkan fungsi helper lain di sini jika diperlukan
}

export default Helper;
