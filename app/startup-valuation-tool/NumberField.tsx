"use client";

import { useEffect, useState } from "react";
import { group, parseNum } from "./lib/format";

interface Props {
  value: number | null;
  onChange: (n: number | null) => void;
  placeholder?: string;
  prefix?: string;
  className?: string; // wrapper class, e.g. "inp" or "cell-inp"
  inputClassName?: string;
  ariaLabel?: string;
}

// Self-contained numeric input: keeps its own display buffer so it can show
// grouped thousands when idle and the raw number while focused, while reporting
// a parsed number (or null) to the parent.
export default function NumberField({
  value,
  onChange,
  placeholder,
  prefix,
  className = "inp",
  inputClassName,
  ariaLabel,
}: Props) {
  const [text, setText] = useState<string>(value == null ? "" : group(value));
  const [focused, setFocused] = useState(false);

  // Resync display when the value changes from outside (Load example / Reset)
  // and the field is not being edited.
  useEffect(() => {
    if (!focused) setText(value == null ? "" : group(value));
  }, [value, focused]);

  return (
    <div className={className}>
      {prefix && <span className="pre">{prefix}</span>}
      <input
        type="text"
        inputMode="decimal"
        className={inputClassName}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(parseNum(e.target.value));
        }}
        onFocus={() => {
          setFocused(true);
          setText(value == null ? "" : String(value));
        }}
        onBlur={() => {
          setFocused(false);
          setText(value == null ? "" : group(value));
        }}
      />
    </div>
  );
}
