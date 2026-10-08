"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  IndianRupee,
  LogOut,
  Menu,
  Package,
  Plus,
  Receipt,
  RefreshCw,
  Save,
  TrendingUp,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

type DashboardPeriod = {
  sales: number;
  expenses: number;
  profit: number;
};

type DashboardData = {
  today: DashboardPeriod;
  week: DashboardPeriod;
  month: DashboardPeriod;
};

type Sale = {
  id: string;
  date: string;
  amount: number;
  note: string;
};

type Expense = {
  id: string;
  date: string;
  category: string;
  amount: number;
  note: string;
};

type Product = {
  id: string;
  product: string;
  price: string | number;
  active: boolean;
  image: string;
};

function money(value: number) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function localDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function DashboardPage() {
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  async function loadAllData(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        dashboardResponse,
        salesResponse,
        expensesResponse,
        productsResponse,
      ] = await Promise.all([
        fetch("/api/admin/business?action=dashboard", {
          cache: "no-store",
        }),

        fetch("/api/admin/business?action=sales", {
          cache: "no-store",
        }),

        fetch("/api/admin/business?action=expenses", {
          cache: "no-store",
        }),

        fetch("/api/admin/business?action=products", {
          cache: "no-store",
        }),
      ]);

      if (
        !dashboardResponse.ok ||
        !salesResponse.ok ||
        !expensesResponse.ok ||
        !productsResponse.ok
      ) {
        throw new Error("Unable to load business data.");
      }

      const [
        dashboardResult,
        salesResult,
        expensesResult,
        productsResult,
      ] = await Promise.all([
        dashboardResponse.json(),
        salesResponse.json(),
        expensesResponse.json(),
        productsResponse.json(),
      ]);

      if (!dashboardResult.success) {
        throw new Error(
          dashboardResult.error || "Unable to load dashboard."
        );
      }

      if (!salesResult.success) {
        throw new Error(
          salesResult.error || "Unable to load sales."
        );
      }

      if (!expensesResult.success) {
        throw new Error(
          expensesResult.error || "Unable to load expenses."
        );
      }

      if (!productsResult.success) {
        throw new Error(
          productsResult.error || "Unable to load products."
        );
      }

      setData(dashboardResult.data);
      setSales(salesResult.data || []);
      setExpenses(expensesResult.data || []);
      setProducts(productsResult.data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadAllData();
  }, []);

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  function navigate(section: string) {
    setActiveSection(section);
    setMobileMenuOpen(false);
  }

  const sortedSales = useMemo(() => {
    return [...sales].sort((a, b) =>
      String(b.date).localeCompare(String(a.date))
    );
  }, [sales]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) =>
      String(b.date).localeCompare(String(a.date))
    );
  }, [expenses]);

  return (
    <main className="min-h-screen bg-[#080706] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0b09]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70 lg:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5b942]">
                Owner Dashboard
              </p>

              <h1 className="mt-1 text-lg font-black sm:text-xl">
                जय गणेश अमृततुल्य
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadAllData(true)}
              disabled={refreshing}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/70 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut size={17} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">

        {/* SIDEBAR */}
        <aside
          className={`
            fixed left-0 top-[73px] z-30 h-[calc(100vh-73px)] w-64
            border-r border-white/10 bg-[#0c0b09] p-4
            transition-transform lg:sticky lg:top-[73px] lg:block lg:translate-x-0
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="space-y-2">

            <SidebarButton
              active={activeSection === "overview"}
              icon={<BarChart3 size={18} />}
              label="Overview"
              onClick={() => navigate("overview")}
            />

            <SidebarButton
              active={activeSection === "sales"}
              icon={<TrendingUp size={18} />}
              label="Sales"
              onClick={() => navigate("sales")}
            />

            <SidebarButton
              active={activeSection === "expenses"}
              icon={<Receipt size={18} />}
              label="Expenses"
              onClick={() => navigate("expenses")}
            />

            <SidebarButton
              active={activeSection === "reports"}
              icon={<CalendarDays size={18} />}
              label="Reports"
              onClick={() => navigate("reports")}
            />

            <SidebarButton
              active={activeSection === "products"}
              icon={<Package size={18} />}
              label="Products"
              onClick={() => navigate("products")}
            />

          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
              Quick Actions
            </p>

            <div className="mt-3 space-y-2">

              <button
                onClick={() => {
                  setShowSaleForm(true);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/60 transition hover:bg-[#f5b942]/10 hover:text-[#f5b942]"
              >
                <Plus size={17} />
                Add Sale
              </button>

              <button
                onClick={() => {
                  setShowExpenseForm(true);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/60 transition hover:bg-[#f5b942]/10 hover:text-[#f5b942]"
              >
                <Plus size={17} />
                Add Expense
              </button>

            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="min-w-0 flex-1 px-5 py-8 lg:px-8">

          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
              <span>{error}</span>

              <button
                onClick={() => loadAllData(true)}
                className="rounded-lg bg-red-500/10 px-3 py-2 font-semibold hover:bg-red-500/20"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <LoadingState />
          ) : (
            <>
              {activeSection === "overview" && data && (
                <OverviewSection
                  data={data}
                  sales={sortedSales}
                  expenses={sortedExpenses}
                  onAddSale={() => setShowSaleForm(true)}
                  onAddExpense={() => setShowExpenseForm(true)}
                  onNavigate={navigate}
                />
              )}

              {activeSection === "sales" && (
                <SalesSection
                  sales={sortedSales}
                  onAdd={() => setShowSaleForm(true)}
                />
              )}

              {activeSection === "expenses" && (
                <ExpensesSection
                  expenses={sortedExpenses}
                  onAdd={() => setShowExpenseForm(true)}
                />
              )}

              {activeSection === "reports" && data && (
                <ReportsSection
                  data={data}
                  sales={sortedSales}
                  expenses={sortedExpenses}
                />
              )}

              {activeSection === "products" && (
                <ProductsSection
                  products={products}
                  onAdd={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  onEdit={(product) => {
                    setEditingProduct(product);
                    setShowProductForm(true);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* SALE MODAL */}
      {showSaleForm && (
        <Modal
          title="Add Daily Sale"
          subtitle="Record the shop's sales for a date."
          onClose={() => setShowSaleForm(false)}
        >
          <SaleForm
            onClose={() => setShowSaleForm(false)}
            onSaved={async () => {
              setShowSaleForm(false);
              await loadAllData(true);
            }}
          />
        </Modal>
      )}

      {/* EXPENSE MODAL */}
      {showExpenseForm && (
        <Modal
          title="Add Expense"
          subtitle="Record a business expense."
          onClose={() => setShowExpenseForm(false)}
        >
          <ExpenseForm
            onClose={() => setShowExpenseForm(false)}
            onSaved={async () => {
              setShowExpenseForm(false);
              await loadAllData(true);
            }}
          />
        </Modal>
      )}

      {/* PRODUCT MODAL */}
      {showProductForm && (
        <Modal
          title={editingProduct ? "Edit Product" : "Add Product"}
          subtitle={
            editingProduct
              ? "Update product details."
              : "Add a new item to the menu."
          }
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        >
          <ProductForm
            product={editingProduct}
            onClose={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            onSaved={async () => {
              setShowProductForm(false);
              setEditingProduct(null);
              await loadAllData(true);
            }}
          />
        </Modal>
      )}
    </main>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function OverviewSection({
  data,
  sales,
  expenses,
  onAddSale,
  onAddExpense,
  onNavigate,
}: {
  data: DashboardData;
  sales: Sale[];
  expenses: Expense[];
  onAddSale: () => void;
  onAddExpense: () => void;
  onNavigate: (section: string) => void;
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Business Overview"
        title="Dashboard"
        description="Track your sales, expenses and profit in one place."
      />

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Today's Sales"
          value={money(data.today.sales)}
          icon={<TrendingUp size={20} />}
          positive
        />

        <StatCard
          title="Today's Expenses"
          value={money(data.today.expenses)}
          icon={<Receipt size={20} />}
          positive={false}
        />

        <StatCard
          title="Today's Profit"
          value={money(data.today.profit)}
          icon={<IndianRupee size={20} />}
          positive={data.today.profit >= 0}
        />

        <StatCard
          title="This Week's Sales"
          value={money(data.week.sales)}
          icon={<BarChart3 size={20} />}
          positive
        />

        <StatCard
          title="This Month's Sales"
          value={money(data.month.sales)}
          icon={<ArrowUpRight size={20} />}
          positive
        />

        <StatCard
          title="This Month's Profit"
          value={money(data.month.profit)}
          icon={<IndianRupee size={20} />}
          positive={data.month.profit >= 0}
        />

      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-8">

        <div className="mb-4">
          <h3 className="text-xl font-bold">
            Quick Actions
          </h3>

          <p className="mt-1 text-sm text-white/40">
            Manage your daily business activities.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <ActionCard
            title="Add Sale"
            description="Record today's sales"
            icon={<TrendingUp size={20} />}
            onClick={onAddSale}
          />

          <ActionCard
            title="Add Expense"
            description="Record a business expense"
            icon={<Receipt size={20} />}
            onClick={onAddExpense}
          />

          <ActionCard
            title="Sales History"
            description="View previous sales"
            icon={<BarChart3 size={20} />}
            onClick={() => onNavigate("sales")}
          />

          <ActionCard
            title="Manage Products"
            description="Update menu and prices"
            icon={<Package size={20} />}
            onClick={() => onNavigate("products")}
          />

        </div>
      </section>

      {/* SUMMARY */}
      <section className="mt-8 grid gap-5 lg:grid-cols-2">

        <SummaryCard
          title="This Week"
          sales={data.week.sales}
          expenses={data.week.expenses}
          profit={data.week.profit}
        />

        <SummaryCard
          title="This Month"
          sales={data.month.sales}
          expenses={data.month.expenses}
          profit={data.month.profit}
        />

      </section>

      {/* RECENT ACTIVITY */}
      <section className="mt-8 grid gap-5 xl:grid-cols-2">

        <RecentSales sales={sales.slice(0, 5)} />

        <RecentExpenses expenses={expenses.slice(0, 5)} />

      </section>
    </div>
  );
}

/* =========================================================
   SALES
========================================================= */

function SalesSection({
  sales,
  onAdd,
}: {
  sales: Sale[];
  onAdd: () => void;
}) {
  const total = sales.reduce(
    (sum, sale) => sum + Number(sale.amount || 0),
    0
  );

  return (
    <div>

      <PageHeading
        eyebrow="Sales Management"
        title="Sales History"
        description="View and manage recorded daily sales."
        action={
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-[#f5b942] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffd166]"
          >
            <Plus size={18} />
            Add Sale
          </button>
        }
      />

      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm text-white/40">
          Total Recorded Sales
        </p>

        <p className="mt-1 text-3xl font-black text-[#f5b942]">
          {money(total)}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
        {sales.length === 0 ? (
          <EmptyState
            title="No sales recorded"
            description="Add your first daily sale to start tracking revenue."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.025]">
                <tr>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Note</TableHead>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <span className="font-bold text-[#f5b942]">
                        {money(sale.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {sale.note || "—"}
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   EXPENSES
========================================================= */

function ExpensesSection({
  expenses,
  onAdd,
}: {
  expenses: Expense[];
  onAdd: () => void;
}) {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  return (
    <div>

      <PageHeading
        eyebrow="Expense Management"
        title="Expense History"
        description="Track purchases and operating expenses."
        action={
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-[#f5b942] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffd166]"
          >
            <Plus size={18} />
            Add Expense
          </button>
        }
      />

      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm text-white/40">
          Total Recorded Expenses
        </p>

        <p className="mt-1 text-3xl font-black text-red-300">
          {money(total)}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
        {expenses.length === 0 ? (
          <EmptyState
            title="No expenses recorded"
            description="Add your first expense to start tracking costs."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.025]">
                <tr>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Note</TableHead>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      <span className="font-bold text-red-300">
                        {money(expense.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {expense.note || "—"}
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsSection({
  data,
  sales,
  expenses,
}: {
  data: DashboardData;
  sales: Sale[];
  expenses: Expense[];
}) {
  const maxValue = Math.max(
    data.month.sales,
    data.month.expenses,
    Math.abs(data.month.profit),
    1
  );

  const salesCount = sales.length;
  const expenseCount = expenses.length;

  return (
    <div>

      <PageHeading
        eyebrow="Business Reports"
        title="Reports & Analytics"
        description="Understand your sales, expenses and profitability."
      />

      <div className="grid gap-5 lg:grid-cols-3">

        <ReportCard
          title="Today"
          sales={data.today.sales}
          expenses={data.today.expenses}
          profit={data.today.profit}
        />

        <ReportCard
          title="This Week"
          sales={data.week.sales}
          expenses={data.week.expenses}
          profit={data.week.profit}
        />

        <ReportCard
          title="This Month"
          sales={data.month.sales}
          expenses={data.month.expenses}
          profit={data.month.profit}
        />

      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold">
              Monthly Performance
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Sales, expenses and profit comparison.
            </p>
          </div>

          <div className="flex gap-4 text-xs text-white/50">
            <span>Sales</span>
            <span>Expenses</span>
            <span>Profit</span>
          </div>
        </div>

        <div className="mt-8 space-y-6">

          <ReportBar
            label="Sales"
            value={data.month.sales}
            max={maxValue}
            type="sales"
          />

          <ReportBar
            label="Expenses"
            value={data.month.expenses}
            max={maxValue}
            type="expense"
          />

          <ReportBar
            label="Profit"
            value={Math.max(data.month.profit, 0)}
            max={maxValue}
            type="profit"
          />

        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2">

        <StatCard
          title="Sales Entries"
          value={String(salesCount)}
          icon={<TrendingUp size={20} />}
          positive
        />

        <StatCard
          title="Expense Entries"
          value={String(expenseCount)}
          icon={<Receipt size={20} />}
          positive={false}
        />

      </section>
    </div>
  );
}

/* =========================================================
   PRODUCTS
========================================================= */

function ProductsSection({
  products,
  onAdd,
  onEdit,
}: {
  products: Product[];
  onAdd: () => void;
  onEdit: (product: Product) => void;
}) {
  return (
    <div>

      <PageHeading
        eyebrow="Menu Management"
        title="Products"
        description="Manage menu items, prices and availability."
        action={
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-xl bg-[#f5b942] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffd166]"
          >
            <Plus size={18} />
            Add Product
          </button>
        }
      />

      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Add your first product to build the menu."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#f5b942]/25"
            >
              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs text-white/25">
                    {product.id}
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {product.product}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    product.active
                      ? "bg-green-500/10 text-green-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </span>

              </div>

              <div className="mt-6 flex items-end justify-between">

                <div>
                  <p className="text-xs text-white/35">
                    Price
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#f5b942]">
                    {typeof product.price === "number"
                      ? money(product.price)
                      : product.price}
                  </p>
                </div>

                <button
                  onClick={() => onEdit(product)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Edit
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

/* =========================================================
   SALE FORM
========================================================= */

function SaleForm({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [date, setDate] = useState(localDate());
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid sales amount.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/admin/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addSale",
          date,
          amount: numericAmount,
          note,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Unable to save sale."
        );
      }

      await onSaved();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Date"
        type="date"
        value={date}
        onChange={setDate}
        required
      />

      <InputField
        label="Sales Amount"
        type="number"
        value={amount}
        onChange={setAmount}
        placeholder="Enter amount"
        min="0"
        step="0.01"
        prefix="₹"
        required
      />

      <TextareaField
        label="Note"
        value={note}
        onChange={setNote}
        placeholder="Optional note"
      />

      {error && <FormError message={error} />}

      <ModalActions
        onClose={onClose}
        loading={saving}
        submitText="Save Sale"
      />
    </form>
  );
}

/* =========================================================
   EXPENSE FORM
========================================================= */

function ExpenseForm({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [date, setDate] = useState(localDate());
  const [category, setCategory] = useState("Milk");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid expense amount.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/admin/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addExpense",
          date,
          category,
          amount: numericAmount,
          note,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Unable to save expense."
        );
      }

      await onSaved();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Date"
        type="date"
        value={date}
        onChange={setDate}
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70">
          Category
        </label>

        <div className="relative">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#f5b942]/60"
          >
            <option>Milk</option>
            <option>Tea / Coffee Supplies</option>
            <option>Food Items</option>
            <option>Packaging</option>
            <option>Electricity</option>
            <option>Rent</option>
            <option>Transport</option>
            <option>Maintenance</option>
            <option>Other</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>
      </div>

      <InputField
        label="Amount"
        type="number"
        value={amount}
        onChange={setAmount}
        placeholder="Enter amount"
        min="0"
        step="0.01"
        prefix="₹"
        required
      />

      <TextareaField
        label="Note"
        value={note}
        onChange={setNote}
        placeholder="Optional note"
      />

      {error && <FormError message={error} />}

      <ModalActions
        onClose={onClose}
        loading={saving}
        submitText="Save Expense"
      />
    </form>
  );
}

/* =========================================================
   PRODUCT FORM
========================================================= */

function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [name, setName] = useState(product?.product || "");
  const [price, setPrice] = useState(
    product ? String(product.price) : ""
  );
  const [active, setActive] = useState(product?.active ?? true);
  const [image, setImage] = useState(product?.image || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!price.trim()) {
      setError("Please enter a price.");
      return;
    }

    try {
      setSaving(true);

      const action = product
        ? "updateProduct"
        : "addProduct";

      const payload = product
        ? {
            action,
            id: product.id,
            product: name.trim(),
            price:
              price.toUpperCase() === "MRP"
                ? "MRP"
                : Number(price),
            active,
            image,
          }
        : {
            action,
            product: name.trim(),
            price:
              price.toUpperCase() === "MRP"
                ? "MRP"
                : Number(price),
            active,
            image,
          };

      const response = await fetch("/api/admin/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Unable to save product."
        );
      }

      await onSaved();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Product Name"
        type="text"
        value={name}
        onChange={setName}
        placeholder="Example: Masala Chai"
        required
      />

      <InputField
        label="Price"
        type="text"
        value={price}
        onChange={setPrice}
        placeholder="25 or MRP"
        prefix="₹"
        required
      />

      <InputField
        label="Image Filename"
        type="text"
        value={image}
        onChange={setImage}
        placeholder="example.jpg"
      />

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">

        <div>
          <p className="text-sm font-semibold">
            Product Active
          </p>

          <p className="mt-1 text-xs text-white/35">
            Show this product as available.
          </p>
        </div>

        <input
          type="checkbox"
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          className="h-5 w-5 accent-[#f5b942]"
        />

      </label>

      {error && <FormError message={error} />}

      <ModalActions
        onClose={onClose}
        loading={saving}
        submitText={product ? "Update Product" : "Add Product"}
      />
    </form>
  );
}

/* =========================================================
   UI COMPONENTS
========================================================= */

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5b942]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-white/45">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function SidebarButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-[#f5b942]/10 text-[#f5b942]"
          : "text-white/50 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
  icon,
  positive = false,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#f5b942]/20 hover:bg-white/[0.055]">

      <div className="flex items-center justify-between">

        <div className="rounded-xl bg-[#f5b942]/10 p-3 text-[#f5b942]">
          {icon}
        </div>

        {positive ? (
          <ArrowUpRight
            size={18}
            className="text-green-400"
          />
        ) : (
          <ArrowDownRight
            size={18}
            className="text-red-400"
          />
        )}

      </div>

      <p className="mt-5 text-sm text-white/45">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#f5b942]/30 hover:bg-[#f5b942]/[0.05]"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5b942]/10 text-[#f5b942]">
        {icon}
      </div>

      <h4 className="font-bold">
        {title}
      </h4>

      <p className="mt-1 text-sm text-white/40">
        {description}
      </p>
    </button>
  );
}

function SummaryCard({
  title,
  sales,
  expenses,
  profit,
}: {
  title: string;
  sales: number;
  expenses: number;
  profit: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

      <h3 className="text-lg font-bold">
        {title} Summary
      </h3>

      <div className="mt-5 space-y-4">

        <SummaryRow
          label="Sales"
          value={money(sales)}
        />

        <SummaryRow
          label="Expenses"
          value={money(expenses)}
        />

        <div className="border-t border-white/10 pt-4">

          <SummaryRow
            label="Profit"
            value={money(profit)}
            highlight
          />

        </div>

      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-sm text-white/45">
        {label}
      </span>

      <span
        className={
          highlight
            ? "font-black text-[#f5b942]"
            : "font-bold"
        }
      >
        {value}
      </span>

    </div>
  );
}

function ReportCard({
  title,
  sales,
  expenses,
  profit,
}: {
  title: string;
  sales: number;
  expenses: number;
  profit: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

      <p className="text-sm font-semibold text-white/40">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black text-[#f5b942]">
        {money(sales)}
      </p>

      <div className="mt-5 space-y-3">
        <SummaryRow
          label="Expenses"
          value={money(expenses)}
        />

        <SummaryRow
          label="Profit"
          value={money(profit)}
          highlight
        />
      </div>

    </div>
  );
}

function ReportBar({
  label,
  value,
  max,
  type,
}: {
  label: string;
  value: number;
  max: number;
  type: "sales" | "expense" | "profit";
}) {
  const width = Math.min(
    Math.max((value / max) * 100, 3),
    100
  );

  const barClass =
    type === "sales"
      ? "bg-[#f5b942]"
      : type === "expense"
      ? "bg-red-400"
      : "bg-green-400";

  return (
    <div>

      <div className="mb-2 flex justify-between text-sm">
        <span className="text-white/55">
          {label}
        </span>

        <span className="font-bold">
          {money(value)}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-700`}
          style={{ width: `${width}%` }}
        />
      </div>

    </div>
  );
}

function RecentSales({ sales }: { sales: Sale[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold">
          Recent Sales
        </h3>

        <TrendingUp
          size={19}
          className="text-[#f5b942]"
        />

      </div>

      <div className="mt-5 space-y-3">

        {sales.length === 0 ? (
          <p className="text-sm text-white/35">
            No sales recorded yet.
          </p>
        ) : (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">
                  {sale.date}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {sale.note || "Daily sale"}
                </p>
              </div>

              <p className="font-bold text-[#f5b942]">
                {money(sale.amount)}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

function RecentExpenses({ expenses }: { expenses: Expense[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold">
          Recent Expenses
        </h3>

        <Receipt
          size={19}
          className="text-red-300"
        />

      </div>

      <div className="mt-5 space-y-3">

        {expenses.length === 0 ? (
          <p className="text-sm text-white/35">
            No expenses recorded yet.
          </p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">
                  {expense.category}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {expense.date}
                </p>
              </div>

              <p className="font-bold text-red-300">
                {money(expense.amount)}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

/* =========================================================
   FORM UI
========================================================= */

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-5 py-8 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#11100d] p-6 shadow-2xl sm:p-8">

        <div className="mb-7 flex items-start justify-between gap-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5b942]">
              जय गणेश अमृततुल्य
            </p>

            <h3 className="mt-2 text-2xl font-black">
              {title}
            </h3>

            <p className="mt-1 text-sm text-white/40">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  min,
  step,
  prefix,
  required = false,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: string;
  step?: string;
  prefix?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          required={required}
          className={`w-full rounded-xl border border-white/10 bg-black/30 py-3 text-white outline-none placeholder:text-white/20 focus:border-[#f5b942]/60 ${
            prefix ? "pl-9 pr-4" : "px-4"
          }`}
        />

      </div>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/20 focus:border-[#f5b942]/60"
      />

    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {message}
    </div>
  );
}

function ModalActions({
  onClose,
  loading,
  submitText,
}: {
  onClose: () => void;
  loading: boolean;
  submitText: string;
}) {
  return (
    <div className="flex gap-3 pt-2">

      <button
        type="button"
        onClick={onClose}
        className="flex-1 rounded-xl border border-white/10 px-4 py-3 font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f5b942] px-4 py-3 font-bold text-black transition hover:bg-[#ffd166] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          "Saving..."
        ) : (
          <>
            <Save size={17} />
            {submitText}
          </>
        )}
      </button>

    </div>
  );
}

/* =========================================================
   TABLE UI
========================================================= */

function TableHead({ children }: { children: ReactNode }) {
  return (
    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/35">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-5 py-4 text-sm text-white/60">
      {children}
    </td>
  );
}

/* =========================================================
   EMPTY / LOADING
========================================================= */

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-12 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5b942]/10 text-[#f5b942]">
        <Package size={24} />
      </div>

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-white/35">
        {description}
      </p>

    </div>
  );
}

function LoadingState() {
  return (
    <div>

      <div className="mb-8">
        <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-10 w-52 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
          />
        ))}

      </div>
    </div>
  );
}