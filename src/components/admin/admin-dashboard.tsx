import ProductTable from "../products-table";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="text-destructive-foreground px-4 py-2 rounded-lg hover:opacity-90"
          >
            Logout
          </button>
        </header>
        <ProductTable />
      </div>
    </div>
  );
}
