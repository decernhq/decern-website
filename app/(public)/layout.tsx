import { Navbar } from "@/components/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-app-bg">
      <Navbar />
      {children}
    </div>
  );
}
