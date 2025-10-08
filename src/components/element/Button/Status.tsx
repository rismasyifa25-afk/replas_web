import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        green:
          "bg-[#93DA97] text-black text-xs xl:w-1/3 md:w-1/2 w-fit font-light",
        yellow:
          "bg-[#FFCB61] text-black px-2 text-xs xl:w-1/3 md:w-1/2 w-fit font-light",
        red: "bg-[#FB4141] text-white text-xs xl:w-1/3 md:w-1/2 w-fit font-light",
      },
      size: {
        default: "px-4 py-1 rounded",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "red",
      size: "default",
    },
  }
);

function StatusButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  let buttonText = children;
  if (variant === "green") {
    buttonText = "Dibayar";
  } else if (variant === "yellow") {
    buttonText = "Menunggu";
  } else if (variant === "red") {
    buttonText = "Gagal";
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {buttonText}
    </Comp>
  );
}

export default StatusButton;
