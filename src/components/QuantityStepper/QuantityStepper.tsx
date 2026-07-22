import { memo } from "react";

interface QuantityStepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  canIncrease?: boolean;
  canDecrease?: boolean;
  size?: "md" | "sm";
  ariaLabel?: string;
}

function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  canIncrease = true,
  canDecrease = true,
  size = "md",
  ariaLabel,
}: QuantityStepperProps) {
  return (
    <div className={`stepper stepper--${size}`} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className="stepper__btn"
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
      >
        &#8722;
      </button>
      <span className="stepper__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="stepper__btn"
        onClick={onIncrease}
        disabled={!canIncrease}
        aria-label="Increase quantity"
      >
        &#43;
      </button>
    </div>
  );
}

export default memo(QuantityStepper);
