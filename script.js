const form = document.getElementById('formBarang');
const tabel = document.getElementById('tabelBarang').querySelector('tbody');
const searchInput = document.getElementById('search');

document.addEventListener('DOMContentLoaded', loadData);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const kategori = document.getElementById('kategori').value;
  const jumlah = parseInt(document.getElementById('jumlah').value);
  const lokasi = document.getElementById('lokasi').value;

  addRow(nama, kategori, jumlah, lokasi);
  saveData();
  form.reset();
});

function addRow(nama, kategori, jumlah, lokasi) {
  const row = tabel.insertRow();
  row.innerHTML = `
    <td><input type="checkbox" class="selectRow"></td>
    <td>${nama}</td>
    <td>${kategori}</td>
    <td>${jumlah}</td>
    <td>${lokasi}</td>
    <td>
      <button class="btn" onclick="editBarang(this)">Edit</button>
      <button class="btn" onclick="barangMasuk(this)">+Masuk</button>
      <button class="btn" onclick="barangKeluar(this)">-Keluar</button>
      <button class="btn" onclick="hapusBarang(this)">Hapus</button>
    </td>
  `;
}

function editBarang(btn) {
  const row = btn.parentElement.parentElement;
  document.getElementById('nama').value = row.cells[1].innerText;
  document.getElementById('kategori').value = row.cells[2].innerText;
  document.getElementById('jumlah').value = row.cells[3].innerText;
  document.getElementById('lokasi').value = row.cells[4].innerText;
  row.remove();
  saveData();
}

function barangMasuk(btn) {
  const row = btn.parentElement.parentElement;
  row.cells[3].innerText = parseInt(row.cells[3].innerText) + 1;
  saveData();
}

function barangKeluar(btn) {
  const row = btn.parentElement.parentElement;
  let jumlah = parseInt(row.cells[3].innerText);
  if (jumlah > 0) {
    row.cells[3].innerText = jumlah - 1;
    saveData();
  }
}

function hapusBarang(btn) {
  const row = btn.parentElement.parentElement;
  row.remove();
  saveData();
}

// Search filter
searchInput.addEventListener('keyup', function() {
  const keyword = this.value.toLowerCase();
  const rows = tabel.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    let rowText = rows[i].innerText.toLowerCase();
    rows[i].style.display = rowText.includes(keyword) ? '' : 'none';
  }
});

// Batch actions
function batchMasuk() {
  const checkboxes = document.querySelectorAll('.selectRow:checked');
  checkboxes.forEach(cb => {
    const row = cb.parentElement.parentElement;
    row.cells[3].innerText = parseInt(row.cells[3].innerText) + 1;
  });
  saveData();
}

function batchKeluar() {
  const checkboxes = document.querySelectorAll('.selectRow:checked');
  checkboxes.forEach(cb => {
    const row = cb.parentElement.parentElement;
    let jumlah = parseInt(row.cells[3].innerText);
    if (jumlah > 0) {
      row.cells[3].innerText = jumlah - 1;
    }
  });
  saveData();
}

function batchHapus() {
  const checkboxes = document.querySelectorAll('.selectRow:checked');
  checkboxes.forEach(cb => {
    cb.parentElement.parentElement.remove();
  });
  saveData();
}

// Local Storage
function saveData() {
  const rows = tabel.getElementsByTagName('tr');
  let data = [];
  for (let i = 0; i < rows.length; i++) {
    data.push({
      nama: rows[i].cells[1].innerText,
      kategori: rows[i].cells[2].innerText,
      jumlah: rows[i].cells[3].innerText,
      lokasi: rows[i].cells[4].innerText
    });
  }
  localStorage.setItem('stokBarang', JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('stokBarang')) || [];
  data.forEach(item => {
    addRow(item.nama, item.kategori, item.jumlah, item.lokasi);
  });
}