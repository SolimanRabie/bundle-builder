import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M3 8.5a2 2 0 0 1 2-2h2l1.2-1.8A2 2 0 0 1 9.9 4h4.2a2 2 0 0 1 1.7.9L17 6.5h2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12.5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PlanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 3.5 5 6v5.2c0 4.4 2.9 8.2 7 9.3 4.1-1.1 7-4.9 7-9.3V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.2l1.9 1.9 3.7-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SensorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.8 5.8a9 9 0 0 0 0 12.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18.2 5.8a9 9 0 0 1 0 12.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 3.5 5 6v5.2c0 4.4 2.9 8.2 7 9.3 4.1-1.1 7-4.9 7-9.3V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 8.2v4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function ChevronIcon({
  direction = "down",
  ...props
}: IconProps & { direction?: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{
        transition: "transform 0.2s ease",
        transform: direction === "up" ? "rotate(180deg)" : "rotate(0deg)",
      }}
      {...props}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckBadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <path
        d="M12 3.5 5 6v5.2c0 4.4 2.9 8.2 7 9.3 4.1-1.1 7-4.9 7-9.3V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.2l1.9 1.9 3.7-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path d="M3 7h10v8H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function AccessoryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export const STEP_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  camera: CameraIcon,
  plan: PlanIcon,
  sensor: SensorIcon,
  shield: ShieldIcon,
};

export const CATEGORY_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  Cameras: CameraIcon,
  Sensors: SensorIcon,
  Accessories: AccessoryIcon,
  Plan: PlanIcon,
};
