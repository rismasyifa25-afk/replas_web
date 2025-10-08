import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

function UploadItem() {
  const [selectedKelas, setSelectedKelas] = useState<string[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  interface Product {
    id: string;
    nama: string;
    harga: string;
    stok: string;
    kelas: string[];
    kategori: string[];
    deskripsi: string;
    images: { name: string; size: number; url: string }[];
    createdAt: Date;
  }
  const [products, setProducts] = useState<Product[]>([]);

  const kelasOptions = [
    { value: "kelas-10", label: "Kelas 10" },
    { value: "kelas-11", label: "Kelas 11" },
    { value: "kelas-12", label: "Kelas 12" },
    { value: "kelas-13", label: "Kelas 13" },
  ];
  const kategoriOptions = [
    { value: "makanan", label: "Makanan" },
    { value: "buku", label: "Buku" },
    { value: "seragam", label: "Seragam" },
    { value: "alat-tulis", label: "Alat Tulis" },
  ];

  const toggle = (
    value: string,
  _list: string[], // underscore to indicate intentionally unused (only setter's functional update arg used)
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(curr =>
      curr.includes(value)
        ? curr.filter(v => v !== value)
        : curr.length < 2
          ? [...curr, value]
          : curr
    );
  };

  const displayValue = () => {
    const map: Record<string, string> = {};
    [...kelasOptions, ...kategoriOptions].forEach(o => (map[o.value] = o.label));
    const all = [...selectedKelas, ...selectedKategori].map(v => map[v]);
    return all.length ? all.join(", ") : "Type";
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const next = [...images, ...incoming].slice(0, 10); // limit 10
    setImages(next);
  };

  useEffect(() => {
    const urls = images.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => { urls.forEach(u => URL.revokeObjectURL(u)); };
  }, [images]);

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama) return;
    const prod: Product = {
      id: crypto.randomUUID(),
      nama,
      harga,
      stok,
      kelas: [...selectedKelas],
      kategori: [...selectedKategori],
      deskripsi,
      images: previews.map((p, i) => ({ name: images[i].name, size: images[i].size, url: p })),
      createdAt: new Date()
    };
    setProducts(prev => [prod, ...prev]);
    // reset form
    setNama("");
    setHarga("");
    setStok("");
    setDeskripsi("");
    setSelectedKelas([]);
    setSelectedKategori([]);
    setImages([]);
    setPreviews([]);
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Removed unused formatBytes helper to satisfy TS6133 (unused variable) error.

  return (
    <Layout>
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Responsive form container */}
          <div className="flex flex-col md:flex-row lg:grid lg:grid-cols-[minmax(260px,340px)_1fr] xl:grid-cols-[minmax(300px,380px)_1fr] w-full gap-6 items-start md:items-stretch">
            <div className="flex-1 max-w-full md:max-w-none w-full md:sticky md:top-4">
              {/* Upload / Carousel */}
              {/* (aspect ratio responsif 4/3 di mobile, 3/4 >= sm) */}
              {previews.length === 0 && (
                <label
                  htmlFor="upload-images"
                  className="w-full aspect-[4/3] sm:aspect-[3/4] cursor-pointer rounded-lg border border-dashed border-gray-400/60 flex flex-col items-center justify-center gap-2 text-[11px] text-gray-600 hover:bg-gray-100/40 transition"
                  onDragOver={e => { e.preventDefault(); }}
                  onDrop={e => {
                    e.preventDefault();
                    handleFiles(e.dataTransfer.files);
                  }}
                >
                  <span className="text-xs font-medium">Tambah Gambar</span>
                  <span className="opacity-70">Klik / Drop file</span>
                  <input
                    id="upload-images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => handleFiles(e.target.files)}
                  />
                </label>
              )}

              {previews.length > 0 && (
                <div className="space-y-3">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {previews.map((src, i) => (
                        <CarouselItem key={i} className="basis-full">
                          <div className="relative group">
                            <img
                              src={src}
                              alt={`preview-${i}`}
                              className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              Hapus
                            </button>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>

                  {/* Tombol aksi menggantikan thumbnail grid */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 text-xs rounded-md h-full border border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)]/10 transition"
                    >
                      Tambah Gambar
                    </button>
                    <button
                      type="button"
                      disabled={!images.length}
                      onClick={() => images.length && setImages(prev => prev.slice(0, -1))}
                      className="px-3 py-2 text-xs rounded-md border border-red-400 text-red-400 hover:bg-red-400/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Hapus Terakhir
                    </button>
                    <button
                      type="button"
                      disabled={!images.length}
                      onClick={() => setImages([])}
                      className="px-3 py-2 text-xs rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden file input always available */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />

              <input type="hidden" name="imagesCount" value={images.length} />
            </div>

            {/* Kolom form teks */}
            <div className="flex flex-col flex-1 w-full gap-5 mt-6 md:mt-0">
              {/* Nama */}
              <Input
                name="nama"
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Nama Produk"
                className="w-full border-[color:var(--primary)] bg-transparent placeholder:text-[color:var(--primary)] text-sm sm:text-base"
              />
              {/* Harga */}
              <Input
                name="harga"
                type="number"
                inputMode="decimal"
                value={harga}
                onChange={e => setHarga(e.target.value)}
                placeholder="Harga Produk"
                className="w-full border-[color:var(--primary)] bg-transparent placeholder:text-[color:var(--primary)] text-sm sm:text-base"
              />
              {/* Stok */}
              <Input
                name="stok"
                type="number"
                inputMode="numeric"
                value={stok}
                onChange={e => setStok(e.target.value)}
                placeholder="Stok"
                className="w-full border-[color:var(--primary)] bg-transparent placeholder:text-[color:var(--primary)] text-sm sm:text-base"
              />

              {/* Multi-select */}
              {/* ...existing Popover (no logic change) just minor width tweak */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full border-[color:var(--primary)] border bg-transparent text-[color:var(--text-color)] py-2 rounded-md px-3 text-left focus:outline-none text-sm sm:text-base"
                  >
                    <span className={displayValue() === "Type" ? "text-[color:var(--primary)]" : ""}>
                      {displayValue()}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="border-[color:var(--primary)] bg-background/90 backdrop-blur-sm w-[92vw] max-w-[320px] sm:w-[300px] p-4 space-y-4"
                >
                  <div>
                    <p className="text-xs mb-2 opacity-80">Kelas (maks 2)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {kelasOptions.map(o => {
                        const active = selectedKelas.includes(o.value);
                        const disabled = !active && selectedKelas.length >= 2;
                        return (
                          <button
                            key={o.value}
                            type="button"
                            onClick={() => !disabled && toggle(o.value, selectedKelas, setSelectedKelas)}
                            className={`text-xs border rounded-md px-2 py-1 transition ${
                              active
                                ? "bg-[color:var(--primary)] text-black border-[color:var(--primary)]"
                                : "border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)]/10"
                            } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs mb-2 opacity-80">Kategori (maks 2)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {kategoriOptions.map(o => {
                        const active = selectedKategori.includes(o.value);
                        const disabled = !active && selectedKategori.length >= 2;
                        return (
                          <button
                            key={o.value}
                            type="button"
                            onClick={() => !disabled && toggle(o.value, selectedKategori, setSelectedKategori)}
                            className={`text-xs border rounded-md px-2 py-1 transition ${
                              active
                                ? "bg-[color:var(--primary)] text-black border-[color:var(--primary)]"
                                : "border-[color:var(--primary)] text-[color:var,--primary)] hover:bg-[color:var(--primary)]/10"
                            } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-[10px] opacity-60">
                    Terpilih: {selectedKelas.length}/2 kelas, {selectedKategori.length}/2 kategori
                  </p>
                </PopoverContent>
              </Popover>

              {/* Hidden inputs */}
              <input type="hidden" name="kelas" value={selectedKelas.join(",")} />
              <input type="hidden" name="kategori" value={selectedKategori.join(",")} />

              {/* Deskripsi */}
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={deskripsi}
                onChange={e => setDeskripsi(e.target.value)}
                placeholder="Deskripsi"
                rows={4}
                className="w-full min-h-30 border resize-vertical border-[color:var(--primary)] bg-transparent placeholder:text-[color:var(--primary)] text-sm rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
              />
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button
                  type="submit"
                  variant="default"
                  name="uploadItem"
                  className="cursor-pointer w-full xs:w-auto sm:w-auto"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </form>

        <hr className="my-5" />

        {/* Daftar Produk */}
        <div>
          <h3 className="text-sm font-medium mb-3">Daftar Produk</h3>

          {/* Desktop Table (unchanged logic) */}
          <div className="hidden md:block overflow-x-auto border border-[color:var(--primary)]/30 rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10 text-xs">No</TableHead>
                  <TableHead className="text-xs w-40">Nama</TableHead>
                  <TableHead className="text-xs w-24">Harga</TableHead>
                  <TableHead className="text-xs w-16">Stok</TableHead>
                  <TableHead className="text-xs w-40 hidden md:table-cell">Kelas</TableHead>
                  <TableHead className="text-xs w-48 hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="text-xs w-52 hidden md:table-cell">Deskripsi</TableHead>
                  <TableHead className="text-xs w-24 hidden md:table-cell">Gambar</TableHead>
                  <TableHead className="text-xs w-24 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p, i) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-xs">{i + 1}</TableCell>
                    <TableCell className="text-xs font-medium">{p.nama}</TableCell>
                    <TableCell className="text-xs">{p.harga}</TableCell>
                    <TableCell className="text-xs">{p.stok}</TableCell>
                    <TableCell className="text-[10px] hidden md:table-cell">
                      {p.kelas.length ? p.kelas.join(", ") : "-"}
                    </TableCell>
                    <TableCell className="text-[10px] hidden md:table-cell">
                      {p.kategori.length ? p.kategori.join(", ") : "-"}
                    </TableCell>
                    <TableCell className="text-[10px] truncate max-w-[180px] hidden md:table-cell" title={p.deskripsi}>
                      {p.deskripsi || "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {p.images.length ? (
                        <div className="flex -space-x-2">
                          {p.images.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={img.name}
                              className="h-8 w-8 object-cover rounded border bg-black/10"
                            />
                          ))}
                          {p.images.length > 3 && (
                            <span className="h-8 w-8 flex items-center justify-center text-[10px] rounded border bg-background">
                              +{p.images.length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] opacity-60">Tidak ada</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => removeProduct(p.id)}
                        className="text-[10px] px-2 py-1 rounded border border-red-400 text-red-400 hover:bg-red-400/10 transition"
                      >
                        Hapus
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                {!products.length && (
                  <TableRow>
                    <TableCell colSpan={9} className="py-6 text-center text-xs opacity-60">
                      Belum ada produk
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile / Small Cards */}
          <div className="md:hidden grid gap-4 sm:grid-cols-2">
            {/* Empty state */}
            {products.length === 0 && (
              <div className="text-center text-xs opacity-60 py-6 border rounded-md">
                Belum ada produk
              </div>
            )}
            {products.map((p, i) => (
              <div
                key={p.id}
                className="border border-[color:var(--primary)]/30 rounded-md p-3 flex flex-col bg-background/70 backdrop-blur-sm h-full"
              >
                <div className="w-full h-40 rounded overflow-hidden border bg-black/10 flex items-center justify-center mb-2">
                  {p.images[0] ? (
                    <img
                      src={p.images[0].url}
                      alt={p.images[0].name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-[10px] opacity-50 text-center px-1">No Image</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-semibold leading-snug line-clamp-2">{i + 1}. {p.nama}</p>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="text-[10px] px-2 py-0.5 rounded border border-red-400 text-red-400 hover:bg-red-400/10 transition flex-shrink-0"
                      aria-label={`Hapus ${p.nama}`}
                    >
                      Hapus
                    </button>
                  </div>
                  <p className="text-[10px]"><span className="opacity-60">Harga:</span> {p.harga || "-"}</p>
                  <p className="text-[10px]"><span className="opacity-60">Stok:</span> {p.stok || "-"}</p>
                  {p.kelas.length > 0 && (
                    <p className="text-[10px]"><span className="opacity-60">Kelas:</span> {p.kelas.join(", ")}</p>
                  )}
                  {p.kategori.length > 0 && (
                    <p className="text-[10px]"><span className="opacity-60">Kategori:</span> {p.kategori.join(", ")}</p>
                  )}
                  {!!p.deskripsi && (
                    <p className="text-[10px] line-clamp-3">
                      <span className="opacity-60">Desk:</span> {p.deskripsi}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UploadItem;
