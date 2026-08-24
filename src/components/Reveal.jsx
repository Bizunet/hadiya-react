import { useReveal } from "../hooks/useReveal";

/**
 * variant: "up" | "scale" | "left" | "right"
 */
export default function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  const variantClass = { up: "reveal", scale: "reveal-scale", left: "reveal-left", right: "reveal-right" }[variant];

  return (
    <Tag
      ref={ref}
      className={`${variantClass}${visible ? " in-view" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
