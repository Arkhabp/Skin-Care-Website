const dataProduct: Product[] = [
  {
    id: 1,
    productName: "Whitening Series",
    category: "Cleanser",
    description:
      "Whitening Series Gentle Cleansing Foam dirancang untuk penggunaan harian, memberikan awal yang menyegarkan untuk rutinitas perawatan kulit Anda. Pembersih ini efektif menghilangkan kotoran dan minyak berlebih tanpa menghilangkan kelembaban alami kulit Anda. Diperkaya dengan bahan-bahan pencerah, pembersih ini membantu meratakan warna kulit, memberikan kulit yang lebih bercahaya dan bersinar. Formula ringan memastikan kulit Anda terasa bersih dan segar tanpa rasa kering. Cocok untuk semua jenis kulit, pembersih ini adalah langkah pertama yang penting untuk mendapatkan kulit yang bercahaya.",
    price: 120000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613259/skincare/prrh4wk2jb7qfevfznfg.png"
  },
  {
    id: 2,
    productName: "MS Glow Whitening Day Cream",
    category: "Moisturizer",
    description:
      "MS Glow Whitening Day Cream adalah krim pelembab yang cocok untuk semua jenis kulit, dirancang untuk menjaga kulit tetap lembab sepanjang hari. Krim siang ini memberikan kelembaban yang tahan lama sambil mencerahkan dan meratakan warna kulit Anda. Formula uniknya melindungi dari stres lingkungan, memastikan kulit Anda tetap sehat dan bercahaya. Dengan penggunaan teratur, Anda akan melihat peningkatan tekstur kulit dan kecerahan keseluruhan. Formula non-berminyak menyerap dengan cepat, menjadikannya sempurna untuk digunakan di bawah makeup atau sendiri.",
    price: 180000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613258/skincare/fzdhy2kw0jx1y6ipo2rg.png"
  },
  {
    id: 3,
    productName: "MS Glow Whitening Night Cream",
    category: "Serum",
    description:
      "MS Glow Whitening Night Cream adalah serum pencerah yang kuat dengan vitamin C, diformulasikan untuk bekerja saat Anda tidur. Krim malam ini memperbaiki dan meremajakan kulit Anda, membantu mengurangi bintik hitam dan meningkatkan tekstur kulit. Bahan-bahan yang kuat menembus dalam ke kulit untuk mempromosikan kulit yang lebih cerah dan tampak lebih muda. Dengan penggunaan teratur, Anda akan bangun dengan kulit yang lebih halus dan bercahaya. Formula yang menutrisi memastikan kulit Anda menerima kelembaban yang dibutuhkan untuk tetap sehat dan berkilau semalaman.",
    price: 250000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613258/skincare/apaunorbd2cvfo4vm4o0.png"
  },
  {
    id: 4,
    productName: "Toner Glowing MS Glow",
    category: "Sunscreen",
    description:
      "Toner Glowing MS Glow adalah tabir surya dengan perlindungan tinggi yang dirancang untuk penggunaan sehari-hari. Ini menawarkan perlindungan spektrum luas terhadap sinar UVA dan UVB, memastikan kulit Anda terlindungi dari kerusakan matahari yang berbahaya. Formula ringan dan tidak berminyak membuatnya ideal untuk penggunaan sehari-hari, memberikan dasar yang halus untuk makeup atau tampilan alami. Tabir surya ini juga termasuk bahan-bahan pelembab yang menjaga kulit Anda tetap lembab sambil melindunginya dari matahari. Cocok untuk semua jenis kulit, membuat kulit Anda tampak dan terasa bercahaya.",
    price: 150000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613258/skincare/t0sdqcyi3t99tni1jqru.png"
  },
  {
    id: 5,
    productName: "Peeling Serum",
    category: "Exfoliator",
    description:
      "Peeling Serum adalah scrub eksfoliasi lembut yang dirancang untuk memberikan kulit yang lebih halus dan bercahaya. Serum ini membantu menghilangkan sel kulit mati, membersihkan pori-pori, dan meratakan tekstur kulit, mempromosikan kulit yang lebih merata. Dengan penggunaan teratur, ini membantu mengungkap kulit segar dan bercahaya serta mengurangi penampilan noda. Formula ini mencakup bahan-bahan yang menenangkan untuk mencegah iritasi, membuatnya cocok untuk semua jenis kulit. Gunakan sebagai bagian dari rutinitas perawatan kulit mingguan Anda untuk mempertahankan kulit yang bersih dan bercahaya.",
    price: 100000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613258/skincare/xblaeamqibu9uob5evpy.png"
  },
  {
    id: 6,
    productName: "Sunglow Daily Cream",
    category: "Toner",
    description:
      "Sunglow Daily Cream adalah toner yang menyegarkan untuk melembabkan dan menyeimbangkan kulit Anda. Toner ini mengembalikan kelembaban, mengencangkan pori-pori, dan mempersiapkan kulit Anda untuk langkah-langkah selanjutnya dalam rutinitas perawatan kulit Anda. Diperkaya dengan bahan-bahan yang menenangkan, ini menenangkan dan menyegarkan kulit Anda, menjadikannya bagian penting dari regimen harian Anda. Ini membantu meningkatkan tekstur dan penampilan kulit, membuat kulit Anda terasa halus dan segar kembali. Cocok untuk semua jenis kulit, toner ini memastikan kulit Anda tetap terhidrasi dan seimbang sepanjang hari.",
    price: 90000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613257/skincare/ub0irca2qyqqbj7ya88f.png"
  },
  {
    id: 7,
    productName: "MS Glow Facial Wash",
    category: "Treatment",
    description:
      "MS Glow Facial Wash adalah gel perawatan bintik yang dirancang untuk kulit berjerawat. Pembersih wajah ini efektif membersihkan kulit Anda, menghilangkan kotoran dan minyak sambil membantu mencegah jerawat. Formula lembutnya memastikan kulit Anda terasa bersih dan segar tanpa membuatnya kering. Dengan penggunaan teratur, ini membantu mengurangi penampilan jerawat dan noda, mempromosikan kulit yang lebih bersih. Bahan-bahan yang menenangkan membuatnya cocok untuk penggunaan sehari-hari, menjaga kulit Anda seimbang dan sehat.",
    price: 80000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613257/skincare/vwtyzxhb60wd9k6jz48s.png"
  },
  {
    id: 8,
    productName: "Green Tea Clay Mask",
    category: "Eye Care",
    description:
      "Green Tea Clay Mask adalah krim mata yang dirancang untuk mengurangi garis-garis halus dan kerutan di sekitar mata. Masker ini membersihkan dan memurnikan kulit Anda secara mendalam, mengeluarkan kotoran dan minyak berlebih. Diperkaya dengan ekstrak teh hijau, ini menenangkan dan meremajakan kulit Anda, membuatnya tampak dan terasa segar kembali. Masker tanah liat ini membantu mengencangkan dan menguatkan kulit, mengurangi penampilan bengkak dan lingkaran hitam. Sempurna untuk sesi perawatan mingguan, masker ini merevitalisasi area mata yang halus.",
    price: 220000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613257/skincare/o5idpixfqwh4xnzyyavo.png"
  },
  {
    id: 9,
    productName: "Acne Spot Treatment",
    category: "Mask",
    description:
      "Acne Spot Treatment adalah masker lembar yang dirancang untuk mencerahkan dan meratakan warna kulit. Perawatan ini menargetkan bintik-bintik jerawat, membantu mengurangi penampilannya dan mencegah jerawat baru. Diformulasikan dengan bahan-bahan kuat, ini menenangkan peradangan, mengurangi kemerahan, dan mempromosikan kulit yang lebih jelas. Masker lembar ini memberikan semburan hidrasi yang intens, membuat kulit Anda terasa lembut dan segar. Gunakan secara teratur untuk mempertahankan kulit yang bersih dan bercahaya, bebas dari noda.",
    price: 30000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613257/skincare/mcx5yvserdhl9e2jztky.png"
  },
  {
    id: 10,
    productName: "Acne Fight Toner",
    category: "Serum",
    description:
      "Acne Fight Toner adalah serum hidrasi yang mengandung asam hialuronat. Toner ini membantu melawan jerawat sambil memberikan hidrasi yang intens, memastikan kulit Anda tetap lembab dan seimbang. Ini menyeimbangkan produksi minyak, mengencangkan pori-pori, dan membuat kulit Anda terasa segar dan bersih. Dengan penggunaan teratur, ini membantu mengurangi penampilan jerawat dan mempromosikan kulit yang lebih sehat. Formula ringan menyerap dengan cepat, membuatnya sempurna untuk digunakan dalam rutinitas pagi dan malam Anda.",
    price: 180000,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dz89dbnbh/image/upload/v1716613257/skincare/gweuyez0ov2p3dyyy5ym.png"
  }
];

export default dataProduct;
