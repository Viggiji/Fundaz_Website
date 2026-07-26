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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthContext";

const EMPTY_SIGNUP = { name: "", email: "", regNo: "", phone: "", course: "", password: "", confirmPassword: "" };
const EMPTY_LOGIN = { identifier: "", password: "" };

export const AuthDialog = ({ open, onOpenChange, defaultTab = "login" }) => {
  const { signup, login } = useAuth();
  const [signupForm, setSignupForm] = useState(EMPTY_SIGNUP);
  const [loginForm, setLoginForm] = useState(EMPTY_LOGIN);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setS = (k) => (e) => setSignupForm((f) => ({ ...f, [k]: e.target.value }));
  const setL = (k) => (e) => setLoginForm((f) => ({ ...f, [k]: e.target.value }));

  const validateSignup = () => {
    const errs = {};
    if (!signupForm.name.trim()) errs.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(signupForm.email)) errs.email = "Enter a valid email";
    if (!signupForm.regNo.trim()) errs.regNo = "Required";
    if (!/^\d{10}$/.test(signupForm.phone.replace(/\s/g, ""))) errs.phone = "10-digit number";
    if (!signupForm.course.trim()) errs.course = "Required";
    if (signupForm.password.length < 6) errs.password = "At least 6 characters";
    if (signupForm.password !== signupForm.confirmPassword) errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateLogin = () => {
    const errs = {};
    if (!loginForm.identifier.trim()) errs.identifier = "Enter email or registration number";
    if (!loginForm.password) errs.password = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setLoading(true);
    try {
      await signup(signupForm);
      toast.success("Account created!", { description: "Welcome to FUNDAZ. You can now register for events." });
      setSignupForm(EMPTY_SIGNUP);
      setErrors({});
      onOpenChange(false);
    } catch (err) {
      toast.error("Signup failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    try {
      await login(loginForm);
      toast.success("Logged in!", { description: "Welcome back to FUNDAZ." });
      setLoginForm(EMPTY_LOGIN);
      setErrors({});
      onOpenChange(false);
    } catch (err) {
      toast.error("Login failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel max-w-md border-border sm:rounded-xl" data-testid="auth-dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">Join FUNDAZ</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Sign up or log in to register for events.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 border border-border bg-secondary/60">
            <TabsTrigger value="login" className="font-mono-tech text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" className="font-mono-tech text-[10px] uppercase tracking-[0.15em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4" data-testid="login-form">
              <div className="grid gap-1.5">
                <Label htmlFor="login-id">Email or Registration No.</Label>
                <Input id="login-id" value={loginForm.identifier} onChange={setL("identifier")} placeholder="you@srmist.edu.in or RA2311…" data-testid="login-input-id" />
                {errors.identifier && <p className="text-xs text-destructive">{errors.identifier}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="login-pw">Password</Label>
                <Input id="login-pw" type="password" value={loginForm.password} onChange={setL("password")} placeholder="••••••" data-testid="login-input-pw" />
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>
              <DialogFooter className="mt-2">
                <Button type="button" variant="ghostSilver" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" variant="silver" disabled={loading} data-testid="login-submit">
                  {loading ? "Logging in…" : "Log In"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="mt-4 flex flex-col gap-4" data-testid="signup-form">
              <div className="grid gap-1.5">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" value={signupForm.name} onChange={setS("name")} placeholder="Ada Lovelace" data-testid="signup-input-name" />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-regno">Registration No.</Label>
                  <Input id="signup-regno" value={signupForm.regNo} onChange={setS("regNo")} placeholder="RA2311…" data-testid="signup-input-regno" />
                  {errors.regNo && <p className="text-xs text-destructive">{errors.regNo}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-phone">Phone</Label>
                  <Input id="signup-phone" value={signupForm.phone} onChange={setS("phone")} placeholder="98765 43210" data-testid="signup-input-phone" />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" value={signupForm.email} onChange={setS("email")} placeholder="you@srmist.edu.in" data-testid="signup-input-email" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="signup-course">Course / Department</Label>
                <Input id="signup-course" value={signupForm.course} onChange={setS("course")} placeholder="B.Tech CSE" data-testid="signup-input-course" />
                {errors.course && <p className="text-xs text-destructive">{errors.course}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-pw">Password</Label>
                  <Input id="signup-pw" type="password" value={signupForm.password} onChange={setS("password")} placeholder="••••••" data-testid="signup-input-pw" />
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-cpw">Confirm Password</Label>
                  <Input id="signup-cpw" type="password" value={signupForm.confirmPassword} onChange={setS("confirmPassword")} placeholder="••••••" data-testid="signup-input-cpw" />
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>
              </div>
              <DialogFooter className="mt-2">
                <Button type="button" variant="ghostSilver" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" variant="silver" disabled={loading} data-testid="signup-submit">
                  {loading ? "Creating…" : "Create Account"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
