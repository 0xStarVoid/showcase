import styles from "@/styles/Btn.module.css";

const CELL_COUNT = 20;

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon: Icon = null,
  iconPos = "right",
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  gradient,
  color,
  background,
  style = {},
  ...rest
}) {
  const alt = variant === "outline";
  const Component = href ? "a" : "button";

  const sz = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";
  const classes = [styles.btn, alt && styles.reverse, sz, className].filter(Boolean).join(" ");

  const vars = {
    ...(gradient && { "--btnGradient": gradient }),
    ...(color && { "--btnColor": color }),
    ...(background && { "--btnBackground": background }),
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      type={Component === "button" ? type : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      style={{ ...vars, ...style }}
      {...rest}
    >
      <span className={styles.content}>
        {Icon && iconPos === "left" && <Icon size={18} />}
        {children}
        {Icon && iconPos === "right" && <Icon size={18} />}
      </span>
      <div className={styles.cells} aria-hidden="true">
        {Array.from({ length: CELL_COUNT }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </Component>
  );
}
