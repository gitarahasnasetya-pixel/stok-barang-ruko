let stok = {};

function renderTable() {
  const tbody = document.querySelector("#stokTable tbody");
  tbody.innerHTML = "";
  for (let barang in stok) {
    let row = `<tr>
      <td>${barang}</td>
      <td>${stok[barang].jumlah}</td>
      <td>${stok[barang].tempat}</td>
    </tr>`;
    tbody.innerHTML += row;
  }
}

function tambahBarang() {
  const nama = document.getElementById("namaBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);
  const tempat = document.getElementById("tempatBarang").value.trim();

  if (!nama || jumlah <= 0 || !tempat) {
    alert("Isi nama, jumlah, dan tempat barang dengan benar!");
    return;
  }

  if (stok[nama]) {
    alert("Barang dengan nama ini sudah ada! Gunakan fitur 'Edit' untuk mengubah stok/tempat.");
    return;
  }

  stok[nama] = { jumlah: jumlah, tempat: tempat };
  renderTable();
}

function keluarkanBarang() {
  const nama = document.getElementById("namaBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);

  if (!nama || jumlah <= 0) {
    alert("Isi nama dan jumlah barang dengan benar!");
    return;
  }

  if (stok[nama]) {
    stok[nama].jumlah -= jumlah;
    if (stok[nama].jumlah <= 0) {
      delete stok[nama];
    }
    renderTable();
  } else {
    alert("Barang tidak ditemukan!");
  }
}

function editBarang() {
  const nama = document.getElementById("namaBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);
  const tempat = document.getElementById("tempatBarang").value.trim();

  if (!nama || jumlah < 0 || !tempat) {
    alert("Isi nama, jumlah, dan tempat barang dengan benar!");
    return;
  }

  if (stok[nama]) {
    stok[nama] = { jumlah: jumlah, tempat: tempat };
    renderTable();
  } else {
    alert("Barang tidak ditemukan! Tambahkan dulu barangnya.");
  }
}

function searchBarang() {
  const keyword = document.getElementById("searchBox").value.toLowerCase();
  const rows = document.querySelectorAll("#stokTable tbody tr");

  rows.forEach(row => {
    const nama = row.cells[0].textContent.toLowerCase();
    const tempat = row.cells[2].textContent.toLowerCase();
    if (nama.includes(keyword) || tempat.includes(keyword)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}