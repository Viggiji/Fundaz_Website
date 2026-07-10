import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const EMPTY = { name: "", regNo: "", email: "", phone: "", team: "" };

// MOCK registration — saves locally in the browser (prototype only)
export const RegisterDialog = ({ event, open, onOpenChange }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.regNo.trim()) errs.regNo = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "10-digit number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const existing = JSON.parse(localStorage.getItem("fundaz_registrations") || "[]");
    existing.push({ eventId: event?.id, eventName: event?.name, ...form, at: new Date().toISOString() });
    localStorage.setItem("fundaz_registrations", JSON.stringify(existing));
    toast.success(`Registered for ${event?.name}`, {
      description: "Your slot is locked in. See you at the arena.",
    });
    setForm(EMPTY);
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel max-w-md border-border sm:rounded-xl" data-testid="register-dialog">
        <DialogHeader>
          <Badge variant="outline" className="w-fit border-primary/40 font-mono-tech text-[10px] uppercase tracking-[0.25em] text-primary">
            Domain Event
          </Badge>
          <DialogTitle className="font-display text-xl text-foreground">{event?.name}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {event?.date} — lock your spot below. Team details can be edited at the venue desk.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="mt-2 flex flex-col gap-4" data-testid="register-form">
          <div className="grid gap-1.5">
            <Label htmlFor="reg-name">Full name</Label>
            <Input id="reg-name" value={form.name} onChange={set("name")} placeholder="Ada Lovelace" data-testid="reg-input-name" />
            {errors.name && <p className="text-xs text-destructive" data-testid="reg-error-name">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="reg-regno">Register no.</Label>
              <Input id="reg-regno" value={form.regNo} onChange={set("regNo")} placeholder="RA2311…" data-testid="reg-input-regno" />
              {errors.regNo && <p className="text-xs text-destructive">{errors.regNo}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="reg-phone">Phone</Label>
              <Input id="reg-phone" value={form.phone} onChange={set("phone")} placeholder="98765 43210" data-testid="reg-input-phone" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-email">Email</Label>
            <Input id="reg-email" type="email" value={form.email} onChange={set("email")} placeholder="you@srmist.edu.in" data-testid="reg-input-email" />
            {errors.email && <p className="text-xs text-destructive" data-testid="reg-error-email">{errors.email}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-team">Team name <span className="text-muted-foreground">(optional)</span></Label>
            <Input id="reg-team" value={form.team} onChange={set("team")} placeholder="Occam's Lazers" data-testid="reg-input-team" />
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="ghostSilver" onClick={() => onOpenChange(false)} data-testid="reg-cancel">
              Cancel
            </Button>
            <Button type="submit" variant="silver" data-testid="reg-submit">
              Confirm Registration
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
