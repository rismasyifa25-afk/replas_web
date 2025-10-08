import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import { Input } from "@/components/ui/input";
import { ChevronDown, File } from "lucide-react";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "a4",
    label: "A4",
  },
  {
    value: "a3",
    label: "A3",
  },
  {
    value: "berwarna",
    label: "Berwarna",
  },
  {
    value: "hitamputih",
    label: "Hitam Putih",
  },
];

function ServicePage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center py-10">
        <div className="flex flex-col md:flex-row gap-2 w-full lg:mx-0 mx-10 max-w-4xl p-4 rounded-xl border border-[#CD242C]">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-full py-12 md:py-0 border-2 border-dashed border-red-600 flex flex-col items-center justify-center text-center cursor-pointer rounded-lg">
              <File className="w-16 h-16 text-red-600 mx-auto mb-2" />
              <span className="text-[color:var(--tulisan-nonprimary)]">Tambahkan File</span>
            </div>
          </div>
          <form className="flex-1 flex flex-col gap-4 justify-center">
            <Input
              type="text"
              name="name"
              className="bg-transparent border-[#CD242C] placeholder:text-[#CD242C] font-bold"
              placeholder="Nama"
            />
            <Input
              type="number"
              name="contact"
              className="bg-transparent border-[#CD242C] placeholder:text-[#CD242C] font-bold overflow-hidden 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
                [-moz-appearance:textfield]"
              placeholder="Nomor Telepon"
            />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-[#DC2626] cursor-pointer"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Jenis Cetak"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 ">
                <Command>
                  <CommandInput placeholder="Cari Jenis Cetak..." />
                  <CommandEmpty>Not Found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue: any) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              type="number"
              name="jumlah"
              className="bg-transparent border-[#CD242C] placeholder:text-[#CD242C] font-bold overflow-hidden 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
                [-moz-appearance:textfield]"
                placeholder="Jumlah Print"
            />
            <div className="flex w-full md:w-1/3">
              <Button variant={'default'} className="font-bold w-full"> Buat Pesanan</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ServicePage;
