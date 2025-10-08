  import ButtonKelas from "@/components/element/Button/Kelas";
  import Counter from "@/components/element/Counter";
  import Footer from "@/components/layouts/FooterLayouts";
  import Navbar from "@/components/layouts/NavbarLayout";

  export default function ProductDetailPage() {

    return (
      <>
        <Navbar/>
          <div className="mx-50 flex gap-10 justify-center">
            <img src="../images/product.jpeg" alt="" className="w-xs rounded-2xl" width={200} height={240} />
            <div className="w-md ">
              <p className="text-4xl font-bold">LKS</p>
              <p>Terjual <span>100+</span></p>
              <p className="my-4 text-5xl font-bold text-[#CD242C]">Rp14.0000</p>
              <p className="font-bold mb-2">Pilih kelas:</p>
              <ButtonKelas/>
              <p className="my-2 font-bold text-gray-300">Deskripsi :</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dignissimos error magnam quidem, aperiam possimus culpa eveniet! Illum ad harum natus, exercitationem, beatae odit quae eius rerum omnis iusto molestias!</p>
            </div>
            <div className="flex flex-col p-4 gap-4 border border-red-500 rounded-md w-64 bg-transparent text-white">
              <h2 className="text-lg font-semibold">Buat pesanan anda</h2>
              <div className="flex items-center gap-2">
                <img src="../images/product.jpeg" width={48} height={48} alt="LKS" className="w-12 h-12 object-cover rounded-sm" />
                <p className="font-semibold">LKS</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex items-center ">
                <Counter/>
                <span className="ml-2 text-sm text-gray-400">Stok: 250</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Subtotal :</span>
                <span className="text-red-500 text-xl font-semibold">Rp 14.000</span>
              </div>
              <button className="w-full border border-gray-500 py-2 rounded-md hover:bg-red-500 hover:border-red-500 transition duration-300 font-semibold">
                Metode Pembayaran
              </button>
              <button className="w-full bg-red-500 py-2 rounded-md text-white font-semibold transition">
                Beli Sekarang
              </button>
            </div>
          </div>
        <Footer/>
      </>
    );
  }
