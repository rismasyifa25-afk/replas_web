import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusButton from "@/components/element/Button/Status";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const InputTable = [
  {
    noResi: "0000000000211111",
    media: "/images/product.jpeg",
    jenis: "A4",
    jumlah: 1,
    download: "",
    date: "22-12-2025",
    status: "success",
  },
  {
    noResi: "0000000000211111",
    media: "/images/smk6.jpeg",
    jenis: "A4",
    jumlah: 1,
    download: "",
    date: "22-12-2025",
    status: "pending",
  },
  {
    noResi: "0000000000211111",
    media: "/images/jobsheet3.pdf",
    jenis: "A4",
    jumlah: 1,
    download: "",
    date: "22-12-2025",
    status: "failed",
  },
  
];

function PrintingDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(InputTable.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InputTable.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Map status string to color and label
  const statusMap: Record<
    string,
    { variant: "green" | "yellow" | "red"; label: string }
  > = {
    success: { variant: "green", label: "Dibayar" },
    pending: { variant: "yellow", label: "Menunggu" },
    gagal: { variant: "red", label: "Gagal" },
  };

  // helper: ambil nama file dari path (basename)
  const getFileNameFromPath = (path: string) => {
    if (!path) return "";
    const parts = path.split("/");
    return parts[parts.length - 1] || "";
  };

  return (
    <>
      <div className="border rounded-xl mt-2 w-full h-fit overflow-x-auto font-bold mb-8">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor Resi</TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal Pesanan</TableHead>
                <TableHead>Unduh File</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hapus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.noResi} className="even:bg-muted/50">
                  <TableCell>{item.noResi}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                        const url = item.media || item.download;
                        if (!url) return;

                        const getExt = (u: string) =>
                          (u.split("?")[0].split(".").pop() || "").toLowerCase();

                        const ext = getExt(url);
                        const isImage = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext);
                        const isPdf = ext === "pdf";
                        const isVideo = ["mp4", "webm", "ogg"].includes(ext);
                        const isAudio = ["mp3", "wav", "ogg"].includes(ext);

                        // create overlay
                        const overlay = document.createElement("div");
                        overlay.style.position = "fixed";
                        overlay.style.inset = "0";
                        overlay.style.display = "flex";
                        overlay.style.alignItems = "center";
                        overlay.style.justifyContent = "center";
                        overlay.style.background = "rgba(0,0,0,0.7)";
                        overlay.style.zIndex = "9999";
                        overlay.style.padding = "1rem";
                        overlay.style.cursor = "zoom-out";

                        // create container to prevent clicks inside from closing
                        const container = document.createElement("div");
                        container.style.maxWidth = "90%";
                        container.style.maxHeight = "90%";
                        container.style.display = "flex";
                        container.style.alignItems = "center";
                        container.style.justifyContent = "center";
                        container.style.flexDirection = "column";
                        container.style.gap = "0.5rem";
                        container.addEventListener("click", (e) => e.stopPropagation());

                        let previewEl: HTMLElement;

                        const fileIconSvg = `
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <path d="M14 2v6h6"></path>
                          <path d="M9 13h6M9 17h6M9 9h6"></path>
                          </svg>
                        `;

                        if (isImage) {
                          const img = document.createElement("img");
                          img.src = url;
                          img.alt = getFileNameFromPath(url);
                          img.style.maxWidth = "100%";
                          img.style.maxHeight = "100%";
                          img.style.borderRadius = "8px";
                          img.style.boxShadow = "0 8px 30px rgba(0,0,0,0.5)";
                          // handle broken image: replace with svg icon
                          img.onerror = () => {
                          const placeholder = document.createElement("div");
                          placeholder.innerHTML = fileIconSvg;
                          placeholder.style.display = "flex";
                          placeholder.style.alignItems = "center";
                          placeholder.style.justifyContent = "center";
                          placeholder.style.background = "rgba(255,255,255,0.03)";
                          placeholder.style.borderRadius = "8px";
                          placeholder.style.padding = "1rem";
                          if (container.contains(img)) container.replaceChild(placeholder, img);
                          };
                          previewEl = img;
                        } else if (isPdf) {
                          const iframe = document.createElement("iframe");
                          iframe.src = url;
                          iframe.style.width = "85vw";
                          iframe.style.height = "85vh";
                          iframe.style.border = "none";
                          iframe.style.borderRadius = "8px";
                          previewEl = iframe;
                        } else if (isVideo) {
                          const video = document.createElement("video");
                          video.src = url;
                          video.controls = true;
                          video.style.maxWidth = "100%";
                          video.style.maxHeight = "100%";
                          video.style.borderRadius = "8px";
                          previewEl = video;
                        } else if (isAudio) {
                          const audio = document.createElement("audio");
                          audio.src = url;
                          audio.controls = true;
                          audio.style.width = "100%";
                          previewEl = audio;
                        } else {
                          // generic file display with download/open button
                          const info = document.createElement("div");
                          info.style.display = "flex";
                          info.style.flexDirection = "column";
                          info.style.alignItems = "center";
                          info.style.gap = "0.5rem";
                          info.style.padding = "1rem";
                          info.style.background = "rgba(255,255,255,0.03)";
                          info.style.borderRadius = "8px";

                          const name = document.createElement("div");
                          name.textContent = getFileNameFromPath(url);
                          name.style.color = "white";
                          name.style.fontSize = "0.95rem";

                          const btns = document.createElement("div");
                          btns.style.display = "flex";
                          btns.style.gap = "0.5rem";

                          const openBtn = document.createElement("a");
                          openBtn.href = url;
                          openBtn.target = "_blank";
                          openBtn.rel = "noopener noreferrer";
                          openBtn.textContent = "Buka";
                          openBtn.style.padding = "0.4rem 0.6rem";
                          openBtn.style.background = "white";
                          openBtn.style.color = "black";
                          openBtn.style.borderRadius = "6px";
                          openBtn.style.textDecoration = "none";

                          const dlBtn = document.createElement("a");
                          dlBtn.href = url;
                          dlBtn.setAttribute("download", getFileNameFromPath(url));
                          dlBtn.textContent = "Unduh";
                          dlBtn.style.padding = "0.4rem 0.6rem";
                          dlBtn.style.background = "rgba(255,255,255,0.12)";
                          dlBtn.style.color = "white";
                          dlBtn.style.borderRadius = "6px";
                          dlBtn.style.textDecoration = "none";

                          btns.appendChild(openBtn);
                          btns.appendChild(dlBtn);
                          info.appendChild(name);
                          info.appendChild(btns);
                          previewEl = info;
                        }

                        const fileLabel = document.createElement("div");
                        fileLabel.textContent = getFileNameFromPath(url);
                        fileLabel.style.color = "white";
                        fileLabel.style.fontSize = "0.9rem";
                        fileLabel.style.marginTop = "0.4rem";

                        container.appendChild(previewEl);
                        // show filename for non-image previews (images already show visually)
                        if (!isImage) container.appendChild(fileLabel);

                        // close handler
                        const removeOverlay = () => {
                          if (document.body.contains(overlay)) document.body.removeChild(overlay);
                          document.removeEventListener("keydown", onKeyDown);
                        };

                        // close on Esc
                        const onKeyDown = (e: KeyboardEvent) => {
                          if (e.key === "Escape") removeOverlay();
                        };

                        overlay.addEventListener("click", removeOverlay);
                        document.addEventListener("keydown", onKeyDown);

                        overlay.appendChild(container);
                        document.body.appendChild(overlay);
                        }}
                        className="flex items-center gap-2 p-0 bg-transparent border-0 cursor-pointer"
                      >
                        {/* thumbnail + fallback icon */}
                        <img
                        src={item.media}
                        alt={getFileNameFromPath(item.media)}
                        className="w-8 h-8 object-cover rounded-md"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = "none";
                          const svg = img.nextElementSibling as HTMLElement | null;
                          if (svg) svg.style.display = "block";
                        }}
                        style={{ display: item.media ? undefined : "none" }}
                        />
                        {/* inline svg fallback icon, shown when image missing or broken */}
                        <span
                        className="w-8 h-8 inline-flex items-center justify-center bg-gray-100 rounded-md"
                        style={{ display: item.media ? "none" : "inline-flex" }}
                        aria-hidden
                        dangerouslySetInnerHTML={{
                          __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6M9 17h6M9 9h6"></path></svg>`,
                        }}
                        />
                        <span className="text-left">{getFileNameFromPath(item.media)}</span>
                      </button>
                      </div>
                    </TableCell>
                  <TableCell>{item.jumlah}</TableCell>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {
                        // show file size immediately (no hover) by using an invisible img to trigger async fetch,
                        // and a labeled span with a stable id so the fetch can write the result once.
                        (() => {
                          const url = item.download || item.media || "";
                          const safeId = `file-size-${getFileNameFromPath(url)}-${item.noResi}`.replace(
                            /[^a-z0-9-_]/gi,
                            "-"
                          );

                          const fetchFileSize = async (u: string, id: string) => {
                            const label = document.getElementById(id) as HTMLElement | null;
                            if (!label || label.dataset.loaded === "1") return;
                            const formatBytes = (bytes: number) => {
                              if (bytes === 0) return "0 B";
                              const k = 1024;
                              const sizes = ["B", "KB", "MB", "GB", "TB"];
                              const i = Math.floor(Math.log(bytes) / Math.log(k));
                              return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
                            };

                            if (!u) {
                              if (label) {
                                label.textContent = "—";
                                label.dataset.loaded = "1";
                              }
                              return;
                            }

                            try {
                              let size: number | null = null;
                              try {
                                const res = await fetch(u, { method: "HEAD" });
                                const cl = res.headers.get("content-length");
                                if (cl) size = parseInt(cl, 10);
                              } catch {
                                // ignore
                              }

                              if (size == null) {
                                try {
                                  const rangeRes = await fetch(u, {
                                    method: "GET",
                                    headers: { Range: "bytes=0-0" },
                                  });
                                  const cr = rangeRes.headers.get("content-range"); // e.g. "bytes 0-0/12345"
                                  if (cr) {
                                    const parts = cr.split("/");
                                    const total = parseInt(parts[1] || "", 10);
                                    if (!isNaN(total)) size = total;
                                  }
                                } catch {
                                  // ignore
                                }
                              }

                              if (label) label.textContent = size != null ? formatBytes(size) : "—";
                            } catch {
                              if (label) label.textContent = "—";
                            } finally {
                              if (label) label.dataset.loaded = "1";
                            }
                          };

                          return (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const filename = getFileNameFromPath(url);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.setAttribute("download", filename);
                                  document.body.appendChild(a);
                                  a.click();
                                  a.remove();
                                }}
                                className="px-4 py-1 border-[color:var(--primary)] border text-[color:var(--text-color)] rounded text-xs font-light hover:bg-[color:var(--primary)] cursor-pointer"
                              >
                                <span id={safeId} className="file-size-label" data-loaded="0">
                                  —
                                </span>
                              </button>

                              {/* invisible image used to trigger fetchFileSize after render.
                                  onLoad/onError will both call fetchFileSize; this avoids requiring hover. */}
                              <img
                                src={url}
                                alt=""
                                style={{ display: "none" }}
                                onLoad={() => fetchFileSize(url, safeId)}
                                onError={() => fetchFileSize(url, safeId)}
                                // in case the image is cached and events already fired, also schedule a microtask
                                onLoadCapture={() => {}}
                              />
                            </div>
                          );
                        })()
                      }
                    </TableCell>
                  <TableCell>
                    <StatusButton
                      variant={statusMap[item.status]?.variant || "red"}
                    >
                      {statusMap[item.status]?.label || "Gagal"}
                    </StatusButton>
                  </TableCell>
                    <TableCell>
                      <button
                      className="bg-red-400 text-[color:var(--text-color)] text-xs xl:w-1/3 md:w-1/2 w-fit font-light px-4 py-1 rounded justify-center flex"
                      onClick={(e) => {
                        e.preventDefault();

                        // build overlay
                        const overlay = document.createElement("div");
                        overlay.style.position = "fixed";
                        overlay.style.inset = "0";
                        overlay.style.display = "flex";
                        overlay.style.alignItems = "center";
                        overlay.style.justifyContent = "center";
                        overlay.style.background = "rgba(0,0,0,0.55)";
                        overlay.style.zIndex = "10000";
                        overlay.style.padding = "1rem";
                        overlay.style.animation = "fadeIn .12s ease-out";
                        overlay.style.backdropFilter = "blur(4px)";

                        // dialog container
                        const dialog = document.createElement("div");
                        dialog.style.width = "min(520px, 96%)";
                        dialog.style.background = "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))";
                        dialog.style.borderRadius = "12px";
                        dialog.style.boxShadow = "0 12px 40px rgba(2,6,23,0.6)";
                        dialog.style.padding = "1.25rem";
                        dialog.style.display = "flex";
                        dialog.style.flexDirection = "column";
                        dialog.style.gap = "0.75rem";
                        dialog.style.color = "white";
                        dialog.style.transform = "translateY(8px)";
                        dialog.style.transition = "transform .18s cubic-bezier(.2,.9,.3,1), opacity .12s ease";
                        dialog.style.opacity = "0";

                        // header
                        const head = document.createElement("div");
                        head.style.display = "flex";
                        head.style.alignItems = "center";
                        head.style.gap = "0.75rem";

                        const iconWrap = document.createElement("div");
                        iconWrap.style.width = "44px";
                        iconWrap.style.height = "44px";
                        iconWrap.style.borderRadius = "10px";
                        iconWrap.style.display = "grid";
                        iconWrap.style.placeItems = "center";
                        iconWrap.style.background = "linear-gradient(180deg,#ff7a7a,#ff4b4b)";

                        iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>`;

                        const title = document.createElement("div");
                        title.style.display = "flex";
                        title.style.flexDirection = "column";

                        const titleText = document.createElement("div");
                        titleText.textContent = "Hapus Item";
                        titleText.style.fontWeight = "700";
                        titleText.style.fontSize = "1rem";

                        const subtitle = document.createElement("div");
                        subtitle.textContent = `Yakin ingin menghapus "${getFileNameFromPath(item.media || item.download || "")}"?`;
                        subtitle.style.fontSize = "0.875rem";
                        subtitle.style.opacity = "0.85";
                        subtitle.style.marginTop = "2px";

                        title.appendChild(titleText);
                        title.appendChild(subtitle);
                        head.appendChild(iconWrap);
                        head.appendChild(title);

                        // body / note
                        const note = document.createElement("div");
                        note.textContent = "Tindakan ini hanya akan menghapus baris saat ini di tampilan. Untuk menghapus secara permanen, hapus pada sumber data.";
                        note.style.fontSize = "0.82rem";
                        note.style.opacity = "0.8";
                        note.style.paddingTop = "0.25rem";

                        // actions
                        const actions = document.createElement("div");
                        actions.style.display = "flex";
                        actions.style.justifyContent = "flex-end";
                        actions.style.gap = "0.5rem";
                        actions.style.marginTop = "0.25rem";

                        const cancelBtn = document.createElement("button");
                        cancelBtn.textContent = "Batal";
                        cancelBtn.style.padding = "0.5rem 0.9rem";
                        cancelBtn.style.borderRadius = "8px";
                        cancelBtn.style.background = "transparent";
                        cancelBtn.style.border = "1px solid rgba(255,255,255,0.08)";
                        cancelBtn.style.color = "white";
                        cancelBtn.style.cursor = "pointer";

                        const deleteBtn = document.createElement("button");
                        deleteBtn.textContent = "Hapus Sekarang";
                        deleteBtn.style.padding = "0.5rem 0.9rem";
                        deleteBtn.style.borderRadius = "8px";
                        deleteBtn.style.background = "linear-gradient(180deg,#ff6b6b,#ff3b3b)";
                        deleteBtn.style.border = "none";
                        deleteBtn.style.color = "white";
                        deleteBtn.style.cursor = "pointer";
                        deleteBtn.style.fontWeight = "600";

                        actions.appendChild(cancelBtn);
                        actions.appendChild(deleteBtn);

                        dialog.appendChild(head);
                        dialog.appendChild(note);
                        dialog.appendChild(actions);
                        overlay.appendChild(dialog);
                        document.body.appendChild(overlay);

                        // entrance animation (microtask to allow styles to apply)
                        requestAnimationFrame(() => {
                        dialog.style.transform = "translateY(0)";
                        dialog.style.opacity = "1";
                        });

                        // close helper
                        const removeOverlay = () => {
                        dialog.style.transform = "translateY(8px)";
                        dialog.style.opacity = "0";
                        overlay.style.background = "rgba(0,0,0,0.0)";
                        setTimeout(() => {
                          if (document.body.contains(overlay)) document.body.removeChild(overlay);
                          document.removeEventListener("keydown", onKey);
                        }, 140);
                        };

                        // keyboard handler
                        const onKey = (ev: KeyboardEvent) => {
                        if (ev.key === "Escape") removeOverlay();
                        if (ev.key === "Enter") {
                          // Enter triggers delete for convenience
                          deleteBtn.click();
                        }
                        };
                        document.addEventListener("keydown", onKey);

                        // click outside to close
                        overlay.addEventListener("click", (ev) => {
                        if (ev.target === overlay) removeOverlay();
                        });

                        cancelBtn.addEventListener("click", () => {
                        removeOverlay();
                        });

                        deleteBtn.addEventListener("click", () => {
                        // visual feedback: disable buttons
                        deleteBtn.disabled = true;
                        cancelBtn.disabled = true;
                        deleteBtn.style.opacity = "0.85";
                        deleteBtn.textContent = "Menghapus...";

                        // remove the row from the DOM for immediate feedback
                        const btn = e.currentTarget as HTMLElement;
                        const row = btn.closest("tr");
                        if (row) {
                          row.style.transition = "opacity .18s ease, transform .18s ease";
                          row.style.opacity = "0";
                          row.style.transform = "translateX(-6px)";
                          setTimeout(() => {
                          if (row.parentElement) row.remove();
                          }, 160);
                        }

                        // optional: try to remove any hidden elements like the invisible image used for size fetch
                        try {
                          const url = item.download || item.media || "";
                          const safeId = `file-size-${getFileNameFromPath(url)}-${item.noResi}`.replace(
                          /[^a-z0-9-_]/gi,
                          "-"
                          );
                          const label = document.getElementById(safeId);
                          if (label) label.remove();
                          const imgs = Array.from(document.querySelectorAll(`img[src="${url}"]`));
                          imgs.forEach((i) => i.remove());
                        } catch {
                          // ignore
                        }

                        // show quick success state then close
                        deleteBtn.textContent = "Terhapus";
                        deleteBtn.style.background = "linear-gradient(180deg,#4ade80,#16a34a)";
                        setTimeout(() => removeOverlay(), 700);
                        });

                        // small keyframes for fadeIn (scoped to this runtime)
                        const styleId = "custom-delete-modal-styles";
                        if (!document.getElementById(styleId)) {
                        const st = document.createElement("style");
                        st.id = styleId;
                        st.textContent = `
                          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                        `;
                        document.head.appendChild(st);
                        }
                      }}
                      >
                      Delete
                      </button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            ) : (
              <span className="px-3 py-1 text-gray-400 cursor-not-allowed">
                Prev
              </span>
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            ) : (
              <span className="px-3 py-1 text-gray-400 cursor-not-allowed">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default PrintingDashboard;
