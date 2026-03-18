import React from "react";
import { motion } from "framer-motion";
import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "holographic" | "glass" | "secondary" | "danger";
  size?: "sm" | "md";
  className?: string;
};

type LinkButtonProps = ButtonBaseProps &
  Omit<LinkProps, "to" | "className" | "children"> & {
    href: string;
    as?: "link";
  };

type NativeButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    as?: "button";
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full overflow-hidden group";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5",
  };

  const variants = {
    primary:
      "text-black bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40",
    holographic:
      "text-cyan-300 border-2 border-cyan-400/50 hover:border-cyan-400 hover:text-white",
    glass:
      "text-gray-200 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:text-white",
    secondary:
      "text-slate-200 bg-slate-700/80 border border-slate-600 hover:bg-slate-700",
    danger:
      "text-red-100 bg-red-700/80 border border-red-600 hover:bg-red-700",
  };

  const content = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
      {href ? (
        <Link
          to={href}
          className={clsx(baseClasses, sizes[size], variants[variant], className)}
          {...(props as Omit<LinkButtonProps, keyof ButtonBaseProps | "as" | "href">)}
        >
          {content}
        </Link>
      ) : (
        <button
          className={clsx(baseClasses, sizes[size], variants[variant], className)}
          {...(props as Omit<NativeButtonProps, keyof ButtonBaseProps | "as" | "href">)}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
};
