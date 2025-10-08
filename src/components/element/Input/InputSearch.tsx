
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function InputSearch(props: any) {
    const { type, placeholder, name } = props;
  return (
    <div className="relative w-full max-w-lg items-center ">
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        className="pl-10 bg-transparent border-black dark:border-white placeholder-[color:var(--placeholder)]"
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search strokeWidth={4} className="h-4 w-4 text-muted-foreground" />
      </span>
    </div>
  );
}

export default InputSearch;