// Legacy components - reexported with different names to avoid conflicts
import { Button as LegacyButton } from "./Button";
import type { ButtonProps as LegacyButtonProps } from "./Button";
import { Card as LegacyCard } from "./Card";
import { Form as LegacyForm } from "./Form";
import { Input as LegacyInput } from "./Input";
import type { InputProps as LegacyInputProps } from "./Input";
import { Spinner } from "./Spinner";

export { LegacyButton, LegacyCard, LegacyForm, LegacyInput, Spinner };

export type { LegacyButtonProps, LegacyInputProps };

// shadcn/ui components
export * from "./ui";
