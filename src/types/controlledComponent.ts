interface ControlledComponent {
  labelText?: string;
  value: string | null | [];
  onChange: (val: string, name: string) => void;
  placeholder?: string;
  name: string;
  disabled?: boolean;
}

export type {
  ControlledComponent
}