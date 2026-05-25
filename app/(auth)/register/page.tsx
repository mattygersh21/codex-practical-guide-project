import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="w-full max-w-[34rem] rounded-[1.35rem] border border-cyan-200/20 bg-[#133f66]/85 p-8 text-slate-100 shadow-[0_24px_70px_rgba(0,5,20,0.65)] md:p-10">
      <h1 className="text-5xl font-semibold tracking-tight">Register</h1>
      <p className="mt-2 text-2xl text-slate-300">Create an account to start writing notes.</p>

      <form className="mt-8 space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-2xl font-semibold text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="h-15 w-full rounded-xl border border-cyan-200/20 bg-[#0a3258] px-4 text-xl text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-2xl font-semibold text-slate-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="h-15 w-full rounded-xl border border-cyan-200/20 bg-[#0a3258] px-4 text-xl text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
          />
        </div>

        <button
          type="submit"
          className="h-15 w-full rounded-xl bg-gradient-to-r from-[#56cbc0] to-[#61d4c8] text-3xl font-semibold text-[#072a45] transition hover:brightness-105"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-2xl text-slate-300">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#63d1c7] underline underline-offset-4 hover:text-[#7ddfd6]"
        >
          Login
        </Link>
      </p>
    </main>
  );
}
