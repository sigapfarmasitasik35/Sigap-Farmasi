/* akses.js — SIGAB-FARMA. Satu skrip untuk semua halaman:
   1) peran Relawan = hanya melihat  2) menu Perbekes & BAST muncul otomatis */
(function(){
  var S=null; try{S=JSON.parse(localStorage.getItem('sigapSesi')||'null')}catch(e){}
  var P=S&&S.peran, REL=P==='Relawan', ADM=P==='Super Admin';
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var NAV=[['index.html','🏠','Dashboard'],['data-obat.html','💊','Data Obat'],['fasilitas.html','🏥','Fasilitas Kesehatan'],['kebutuhan.html','📦','Kebutuhan Obat'],['distribusi.html','🚚','Distribusi Obat'],['monitoring.html','📈','Monitoring Stok'],['perbekes.html','🧰','Perbekes'],['bast.html','📝','BAST']];
  var LAIN=[['akun.html','👤','Manajemen Akun'],['laporan.html','📄','Laporan'],['pengaturan.html','⚙️','Pengaturan']];
  function aktif(h){return location.pathname.indexOf(h.replace('.html',''))>-1}
  function li(x){return '<li'+(x[0]==='akun.html'?' id="menuManajemenAkun"':'')+'><a href="'+x[0]+'"'+(aktif(x[0])?' class="active"':'')+'>'+x[1]+' '+x[2]+'</a></li>'}

  var css='.pill-lihat{margin-left:auto;font-size:11.5px;font-weight:600;color:#e8a33d;background:#3a2e14;padding:6px 11px;border-radius:20px;white-space:nowrap}.pill-lihat+.avatar{margin-left:8px}';
  if(REL){
    css+='.page-header .btn-primary,.ph .btn,.aksi button.del,.aksi button[title="Edit"]{display:none!important}.badge[onclick],.pemenuhan-wrap{pointer-events:none}';
    if(location.pathname.indexOf('pengaturan')<0) css+='.modal-overlay{display:none!important}';
  }
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  window.SIGAB={peran:P,esc:esc,
    toast:function(m,err){var t=document.createElement('div');t.className='toast'+(err?' err':'');t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},5000)},
    logout:function(){if(confirm('Yakin ingin keluar dari sistem?')){localStorage.removeItem('sigapSesi');location.href='login.html'}}};

  document.addEventListener('DOMContentLoaded',function(){
    var sb=document.getElementById('sb');
    if(sb){ /* halaman baru: bangun menu lengkap */
      sb.innerHTML='<div class="brand">＋ <b>SIGAB-FARMA</b></div><nav><ul>'+NAV.map(li).join('')+'</ul><div class="lbl">Lainnya</div><ul>'+LAIN.map(li).join('')+'<li><a href="#" onclick="SIGAB.logout();return false">🚪 Keluar</a></li></ul></nav>';
      if(!ADM){var m=document.getElementById('menuManajemenAkun'); if(m)m.style.display='none'}
    } else { /* halaman lama: sisipkan 2 menu baru setelah Monitoring Stok */
      var a=document.querySelector('nav a[href="monitoring.html"]');
      if(a){var l=a.closest('li'); [NAV[7],NAV[6]].forEach(function(x){l.insertAdjacentHTML('afterend',li(x))})}
    }
    if(REL){var av=document.querySelector('.topbar .avatar'); if(av)av.insertAdjacentHTML('beforebegin','<span class="pill-lihat">👁 Mode Lihat Saja</span>')}
  });
})();
