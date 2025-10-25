import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactPage() {
  return (
    <div className="">
      <Navbar />
      <div className="w-7xl mx-auto">
        <div className="h-fit block justify-center py-10">
          <div className="text-center w-full ">
            <h1 className="xl:text-9xl lg:text-8xl sm:text-7xl text-4xl  font-extrabold text-[color:var(--text-color)">
              LET'S <span className="text-[color:var(--primary)]">CONNECT</span>
            </h1>
            <p className="sm:text-2xl text-md md:px-0 px-10  mt-2 text-[color:var(--tulisan-nonprimary)]">
              Ada Kendala? Silahkan hubungi kami melalui form dibawah ini.
            </p>
          </div>
          <form action="" className="flex flex-col w-full px-12 mt-10 gap-2">
            <Input
              className="bg-transparent border-[#CD242C] placeholder:text-[#CD242C] placeholder:text-xl text-xl font-bold h-14 file:text-xl"
              placeholder="Name"
              name="name"
              type="text"
            />
            <Input
              className="bg-transparent border-[#CD242C] placeholder:text-[#CD242C] placeholder:text-xl text-xl font-bold h-14 file:text-xl"
              placeholder="Email"
              name="email"
              type="email"
            />

            <Textarea
              className="border-[color:var(--primary)] placeholder:text-xl placeholder:text-[#CD242C] text-xl font-bold"
              placeholder="Message"
            />
            <div className="justify-end flex w-full">
              <Button className="text-xl font-bold px-6 py-5" type="submit" variant={'default'}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
