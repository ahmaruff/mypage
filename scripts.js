// ===== DATA =====
// Setiap link adalah object. Semua link disimpan dalam satu array.
const links = [
  { id: 1, title: "GitHub", url: "https://github.com/username", category: "sosmed", icon: "🐙" },
  { id: 2, title: "Instagram", url: "https://instagram.com/username", category: "sosmed", icon: "📸" },
  { id: 3, title: "LinkedIn", url: "https://linkedin.com/in/username", category: "sosmed", icon: "💼" },
  { id: 4, title: "Portofolio", url: "https://example.com/portfolio", category: "project", icon: "🎨" },
  { id: 5, title: "Link Page Ini (Repo)", url: "https://github.com/username/link-page", category: "project", icon: "🧩" },
  { id: 6, title: "Catatan Kursus", url: "https://example.com/catatan", category: "project", icon: "📓" },
  { id: 7, title: "Email", url: "mailto:halo@example.com", category: "kontak", icon: "✉️" },
  { id: 8, title: "WhatsApp", url: "https://wa.me/6281234567890", category: "kontak", icon: "💬" }
];

// ===== STYLE =====
// Class Tailwind untuk kartu link (sama dengan versi HTML di Pertemuan 2)
const CARD_CLASSES =
  "flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-medium shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-900 dark:ring-slate-800 dark:hover:bg-slate-100 dark:hover:text-slate-900 dark:focus-visible:outline-indigo-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

// ===== RENDER =====
function createLinkItem(link) {
  const item = document.createElement("li");
  const anchor = document.createElement("a");

  anchor.href = link.url;
  anchor.className = CARD_CLASSES;

  // Link ke website lain dibuka di tab baru. mailto: tidak perlu.
  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = link.icon;

  anchor.appendChild(icon);
  anchor.appendChild(document.createTextNode(" " + link.title));
  item.appendChild(anchor);

  return item;
}

const linkList = document.querySelector("#link-list");

function renderLinks(category) {
  // 1. Kosongkan daftar lama
  linkList.innerHTML = "";

  // 2. Tambahkan link yang cocok dengan kategori
  links.forEach(function (link) {
    if (category === "semua" || link.category === category) {
      linkList.appendChild(createLinkItem(link));
    }
  });
}

// ===== FILTER =====
const filterTabs = document.querySelector("#filter-tabs");
const tabButtons = filterTabs.querySelectorAll("button");

function handleFilterClick(clickedButton) {
  // 1. Hanya tombol yang diklik yang ditandai aktif
  tabButtons.forEach(function (button) {
    if (button === clickedButton) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });

  // 2. Tampilkan ulang link sesuai kategori tombol
  renderLinks(clickedButton.dataset.category);
}

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleFilterClick(button);
  });
});

// ===== TEMA =====
const themeToggle = document.querySelector("#theme-toggle");

// Menyesuaikan ikon dan label tombol dengan tema yang sedang aktif
function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Ganti ke mode terang");
  } else {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Ganti ke mode gelap");
  }
}

themeToggle.addEventListener("click", function () {
  // toggle() menambah class jika belum ada, menghapus jika sudah ada.
  // Hasilnya true kalau class "dark" sekarang terpasang.
  const isDark = document.documentElement.classList.toggle("dark");

  // Simpan pilihan agar bertahan setelah reload
  localStorage.setItem("linkpage:theme", isDark ? "dark" : "light");

  updateThemeButton();
});

// ===== MULAI =====
renderLinks("semua");
updateThemeButton();

