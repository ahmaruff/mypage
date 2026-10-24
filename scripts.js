// ===== DATA =====
// Setiap link adalah object. Semua link disimpan dalam satu array.
const links = [
    { id: 1, title: "GitHub", url: "https://github.com/ahmaruff", category: "sosmed", icon: "🐙" },
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


function createLinkItem(link) {
    // buat element HTML <li> & <a>
    item = document.createElement("li");
    anchor = document.createElement("a")

    // isi attribute <a href="" > & <a class="">
    anchor.href = link.url;
    anchor.className = CARD_CLASSES;


    if(link.url.startsWith("http")) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer"
    }

    // buat element <span>
    const icon = document.createElement("span")
    icon.textContent = link.icon;

    // masukkan <span> icon kedalam elemen anchor
    anchor.appendChild(icon);
    // masukkan title kedalam elemen anchor
    anchor.appendChild(document.createTextNode(link.title))

    // masukkan elemen <a> kedalam <li>
    item.appendChild(anchor)

    return item;
}

// ambil elemen <ul> yang akan jadi wadah list
linkList = document.getElementById("link-list");

// definsi fungsi render
function renderLinks(category) {
    // reset data di linklist  ( <ul> ) supaya didalamnya kosong
    linkList.innerHTML = "";

    // untuk semua data links, lakukan fungsi/perintah berikut (kode yang didalam {} )
    links.forEach(function (link) {
        // jika kategori sesuai dengan parameter atau parameter isinya "semua"
        // maka render link tersebut
        if(link.category == category || category == "semua") {
            // buat elemen <li> pakai fungsi
            // yang udah di definisikan diatas
            li = createLinkItem(link);

            // masukkan li tsb kedalam wadah <ul>
            linkList.appendChild(li);
        }
    });
}

// render 
renderLinks("semua");