import { Funnel } from "lucide-react";
import InputSearch from "../element/Input/InputSearch";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";

function SearchBar(props: any) {
  const { placeholder } = props;
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const summary =
    (selectedClass ? `K${selectedClass}` : "") +
    (selectedCategory ? (selectedClass ? " | " : "") + selectedCategory : "");

  return (
    <>
      <div className="w-full h-auto flex justify-center items-center gap-2 px-6 md:px-0">
        <InputSearch placeholder={placeholder} />
        <Button variant={"default"} size="lg" name="search">
          <h1 className="font-bold">Search</h1>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"default"} size="lg" name="filter" aria-label="Filter">
              <Funnel className="h-4 w-4" />
              {summary && <span className="ml-2 text-xs md:text-sm">{summary}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Pilih Kelas</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedClass}
              onValueChange={(v) => setSelectedClass(v)}
            >
              {["10", "11", "12", "13"].map((k) => (
                <DropdownMenuRadioItem key={k} value={k}>
                  Kelas {k}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v)}
            >
              {["Atk", "buku", "makanan", "seragam"].map((cat) => (
                <DropdownMenuRadioItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default SearchBar;
