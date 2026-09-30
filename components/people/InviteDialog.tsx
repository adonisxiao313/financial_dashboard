"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { DEPARTMENTS, ROLES, isDepartment, isRole, type InviteInput, type Person } from "@/lib/people";
import { useFocusTrap } from "@/lib/use-focus-trap";

type Field = "name" | "role" | "department";

export function InviteDialog({
  people,
  onClose,
  onInvite,
}: {
  people: Person[];
  onClose: () => void;
  onInvite: (input: InviteInput) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  useFocusTrap(true, panelRef, onClose);

  function clearError(field: Field) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    const trimmedName = name.trim();

    if (!trimmedName) next.name = "Enter a name.";
    else if (people.some((person) => person.name.toLowerCase() === trimmedName.toLowerCase())) {
      next.name = "That name already has a seat.";
    }
    if (!isRole(role)) next.role = "Choose a role.";
    if (!isDepartment(department)) next.department = "Choose a department.";

    setErrors(next);
    if (Object.values(next).some(Boolean) || !isRole(role) || !isDepartment(department)) return;

    onInvite({ name: trimmedName, role, department });
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button type="button" aria-label="Close invite dialog" className="animate-fade absolute inset-0 bg-[#14343C]/30" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-title"
        aria-describedby="invite-description"
        tabIndex={-1}
        className="animate-dialog relative z-[1] max-h-[calc(100vh-2rem)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-hairline bg-white p-6 shadow-card"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="invite-title" className="text-[28px] font-semibold tracking-tight text-ink">
              Invite a colleague
            </h2>
            <p id="invite-description" className="mt-1 text-[14px] text-secondary">
              They get a seat on Northwind Capital. Access follows the role.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 shrink-0 cursor-pointer place-items-center text-secondary hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form className="mt-5 space-y-3.5" onSubmit={submit} noValidate>
          <Field label="Full name" htmlFor="invite-name" error={errors.name}>
            <input
              id="invite-name"
              data-autofocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              autoComplete="name"
              className="h-10 w-full rounded-xl border border-hairline bg-paper px-3 text-[14px] text-ink"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "invite-name-error" : undefined}
            />
          </Field>
          <div className="grid gap-3 min-[560px]:grid-cols-2">
            <div>
              <Select
                id="invite-role"
                label="Role"
                labelled
                quiet={role === ""}
                value={role}
                onChange={(value) => {
                  setRole(value);
                  clearError("role");
                }}
                options={[{ value: "", label: "Choose a role" }, ...ROLES.map((item) => ({ value: item, label: item }))]}
              />
              {errors.role ? (
                <p id="invite-role-error" role="alert" className="mt-1 text-[12px] text-suspended-fg">
                  {errors.role}
                </p>
              ) : null}
            </div>
            <div>
              <Select
                id="invite-department"
                label="Department"
                labelled
                quiet={department === ""}
                value={department}
                onChange={(value) => {
                  setDepartment(value);
                  clearError("department");
                }}
                options={[
                  { value: "", label: "Choose a department" },
                  ...DEPARTMENTS.map((item) => ({ value: item, label: item })),
                ]}
              />
              {errors.department ? (
                <p id="invite-department-error" role="alert" className="mt-1 text-[12px] text-suspended-fg">
                  {errors.department}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="quiet" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Send invite</Button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-secondary">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-[12px] text-suspended-fg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
