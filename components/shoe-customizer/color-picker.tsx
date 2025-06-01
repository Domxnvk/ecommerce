"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/react";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(color);

  useEffect(() => {
    setHexInput(color);
  }, [color]);

  const presetColors = [
    "#000000",
    "#ffffff",
    "#6b7280",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#0ea5e9",
    "#8b5cf6",
    "#ec4899",
  ];

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          className="w-20 h-12 rounded-md border-0 cursor-pointer overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-md appearance-none bg-transparent flex-shrink-0"
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          className="flex-1"
          classNames={{
            inputWrapper: "rounded-md",
          }}
          placeholder="#000000"
          size="sm"
          startContent={
            <div
              className="w-4 h-4 rounded-md border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: color }}
            />
          }
          value={hexInput}
          onValueChange={handleHexChange}
        />
      </div>

      <div className="grid grid-cols-5 gap-1">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className={`h-7 min-w-[1.75rem] rounded-md border-2 hover:scale-110 transition-transform ${
              color === presetColor
                ? "border-blue-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            style={{ backgroundColor: presetColor }}
            title={`Select ${presetColor}`}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </div>
  );
}
