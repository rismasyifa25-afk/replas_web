import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  SquareUser,
  User,
  History,
  Printer,
  Store,
  SquarePen,
} from "lucide-react";

function UserEdit() {
  return (
    <>
      <Navbar />
      <div className="w-full h-fit md:h-screen flex justify-center items-center py-5 px-4 md:px-0 lg:-mt-12">
        <div className="w-full h-fit md:w-4/5 lg:w-3/5 xl:w-2/4 border border-[color:var(--primary)] rounded-lg flex flex-col md:flex-row">
          <div className="w-full md:w-2/4 justify-center flex flex-col bg-gradient-to-b from-[color:var(--gradient-card)] to-[color:var(--gradient-card-second)] p-5 rounded-t-lg md:rounded-l-lg md:rounded-tr-none text-white">
            <div className="flex flex-col items-center">
              <div className="rounded-full mb-4 border-2 border-[color:var(--primary)] w-32 h-32 overflow-hidden">
                <img src="" alt="" />
              </div>
              <h1 className="text-2xl font-semibold text-[color:var(--text-color)]">
                Siswa Berprestasi
              </h1>
              <p className="text-xl font-medium text-[color:var(--text-color)]">
                @Username
              </p>
            </div>

            <div className="w-full text-left flex flex-col font-medim">
              <div className="flex items-center gap-2 text-lg mt-5">
                <Mail
                  className="bg-[color:var(--bg-circle)] rounded-xl p-2"
                  color="#CD242C"
                  size={32}
                />
                <h1 className="text-[color:var(--text-color)]">
                  example@gmail.com
                </h1>
              </div>
              <div className="flex items-center gap-2 text-lg mt-5">
                <User
                  className="bg-[color:var(--bg-circle)] rounded-xl p-2"
                  color="#CD242C"
                  size={32}
                />
                <h1 className="text-[color:var(--text-color)]">
                  Siswa Berprestasi
                </h1>
              </div>
              <div className="flex items-center gap-2 text-lg mt-5">
                <Phone
                  className="bg-[color:var(--bg-circle)] rounded-xl p-2"
                  color="#CD242C"
                  size={32}
                />
                <h1 className="text-[color:var(--text-color)]">
                  example@gmail.com
                </h1>
              </div>
              <div className="flex items-center gap-2 text-lg mt-5">
                <SquareUser
                  className="bg-[color:var(--bg-circle)] rounded-xl p-2"
                  color="#CD242C"
                  size={32}
                />
                <h1 className="text-[color:var(--text-color)] bg-[color:var(--bg-circle)] px-2 rounded-sm">
                  SISWA
                </h1>
              </div>
              <Button variant={"default"} className="rounded-sm mt-5">
                <SquarePen />Edit profile
              </Button>
            </div>
          </div>

          <div className="w-full border-r-1 border flex flex-col p-4 justify-center color-[color:var(--text-color)] rounded-b-lg md:rounded-b-none md:rounded-r-lg">
            <h1 className="text-2xl font-semibold">Your Information</h1>
            <hr className="w-full border-1/2 border-[color:var(--placeholder)] my-2" />
            <div className="w-full gap-2 flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 h-fit flex bg-gray p-2 rounded-lg bg-[color:var(--card)] border gap-2">
                <History
                  className="bg-[color:var(--bg-circle)] rounded-lg p-2"
                  color="#CD242C"
                  size={52}
                />
                <div>
                  <h1 className="text-lg font-bold color-[color:var(--text-color)]">
                    History Barang
                  </h1>
                  <p className="text-md font-bold color-[color:var(--text-color)]">
                    10 Barang
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-fit flex bg-gray p-2 rounded-lg bg-[color:var(--card)] border gap-2">
                <Printer
                  className="bg-[color:var(--bg-circle)] rounded-lg p-2"
                  color="#CD242C"
                  size={52}
                />
                <div>
                  <h1 className="text-lg font-bold color-[color:var(--text-color)]">
                    History Print
                  </h1>
                  <p className="text-md font-bold color-[color:var(--text-color)]">
                    10 Barang
                  </p>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mt-34">Quick Actions</h1>
            <hr className="w-full border-1/2 border-[color:var(--placeholder)] my-2" />
            <div className="w-full flex gap-2">
              <div className="border border-[color:var(--primary)] w-1/2 flex flex-col justify-center items-center text-center py-2">
                <Store
                  className="[color:var(--primary)]"
                  size={52}
                  strokeWidth={0.5}
                />
                <h1 className="text-lg">Store</h1>
              </div>
              <div className="border border-[color:var(--primary)] w-1/2 flex flex-col justify-center items-center text-center py-2">
                <Printer
                  className="[color:var(--primary)]"
                  size={52}
                  strokeWidth={0.5}
                />
                <h1 className="text-lg">Printing</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserEdit;
