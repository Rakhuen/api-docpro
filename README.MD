# Penggunaan API

> base URL http://localhost:8000/api/doc-pro/v1

## Dokter API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
    <th>Input</th>
  </tr>
  <tr>
    <td>/signup</td>
    <td>POST</td>
    <td>Untuk signup dokter</td>
    <td>
      <ul>
        <li>nama</li>
        <li>npa</li>
        <li>alamat</li>
        <li>username</li>
        <li>password</li>
        <li>phone</li>
        <li>email</li>
        <li>tanggal_lahir</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/login</td>
    <td>POST</td>
    <td>Untuk login dokter, res yang akan di berikan berupa token, jwt</td>
    <td>
      <ul>
        <li>username</li>
        <li>password</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/doctor</td>
    <td>GET</td>
    <td>Untuk mendapatkan data dokter, data ini otomatis didapatkan sesuai dokter yang login
  ketika token sudah disimpan di localstorage dan di masukan ke dalam Header
  Authorization (axios)</td>
  <td> - </td>
  </tr>
  <tr>
    <td>/doctor/update</td>
    <td>POST</td>
    <td>Untuk mengupdate data dokter, pada input file harus di letakan di paling
  akhir dari inputan yang ingin di kirim. Karena jika di letakan di depan
  maupun di tengah, validasi untuk mengecek file hanya akan membaca input
  yang ada di atasnya, jadi taro input file paling akhir. Nama input filenya
  "photoDoctor"</td>
  <td>
    <ul>
      <li>nama</li>
      <li>npa</li>
      <li>alamat</li>
      <li>phone</li>
      <li>email</li>
      <li>tanggal_lahir</li>
      <li>photoDoctor</li>
    </ul>
  </td>
  </tr>
  <tr>
    <td>/doctor?id={id_doctor}</td>
    <td>DELETE</td>
    <td>Untuk menghapus dokter</td>
    <td> - </td>
  </tr>
</table>

## Pasien API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
    <th>Input</th>
  </tr>
  <tr>
    <td>/pasien</td>
    <td>GET</td>
    <td>Untuk mendapatkan data seluruh pasien</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/pasien</td>
    <td>POST</td>
    <td> Untuk menambahkan pasien baru, sama seperti dokter, input file harus di taro
  di paling akhir, nama input filenya atau req, nama inputnya (photoPasien)</td>
    <td>
      <ul>
        <li>nama</li>
        <li>tanggal_lahir</li>
        <li>nik</li>
        <li>alamat</li>
        <li>phone</li>
        <li>photoPasien</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/pasien?id={id_pasien}</td>
    <td>DELETE</td>
    <td>Untuk menghapus pasien</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/pasien/detail?id="id_pasien"</td>
    <td>GET</td>
    <td>Untuk mendapatkan detail pasien, dalam detail pasien terdapat data pasien, historys dan photos</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/pasien/search?nama={nama pasien}</td>
    <td>GET</td>
    <td>Untuk search pasien by nama</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/pasien/update?id={id_pasien}</td>
    <td>POST</td>
    <td>Untuk update pasien, untuk file gambar sama diletakan di paling akhir nama inputnya (photoPasien)</td>
    <td>
      <ul>
        <li>nama</li>
        <li>tanggal_lahir</li>
        <li>nik</li>
        <li>alamat</li>
        <li>phone</li>
        <li>photoPasien</li>
      </ul>
    </td>
  </tr>
</table>

## Item API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Input </th>
  </tr>
  <tr>
    <td>/service/detail?id={id_service}</td>
    <td>GET</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/service</td>
    <td>GET</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/service</td>
    <td>POST</td>
    <td>
      <ul>
        <li>service_name</li>
        <li>service_desc</li>
        <li>service_price</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/service/update?id={id_service}</td>
    <td>POST</td>
    <td>
      <ul>
        <li>service_name</li>
        <li>service_desc</li>
        <li>service_price</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/service?id={id_service}</td>
    <td>DELETE</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/drug/detail?id={id_drug}</td>
    <td>GET</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/drug</td>
    <td>GET</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/drug</td>
    <td>POST</td>
    <td> 
      <ul>
        <li>drug_name</li>
        <li>drug_desc</li>
        <li>drug_price</li>
        <li>drug_count</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/drug/update?id="id_drug"</td>
    <td>POST</td>
    <td> 
      <ul>
        <li>drug_name</li>
        <li>drug_desc</li>
        <li>drug_price</li>
        <li>drug_count</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/drug?id={id_drug}</td>
    <td>DELETE</td>
    <td> - </td>
  </tr>
</table>

## Appointment API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
    <th>Input</th>
  </tr>
  <tr>
    <td>/appointment</td>
    <td>GET</td>
    <td>Untuk mendapatkan data semua appointment Pada API ini appointment di ambil berdasarkan hari sekarang</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/appointment/filter?tanggal={(formatnya DD/MM/YYYY)}</td>
    <td>GET</td>
    <td>Untuk memfilter appointment berdasarkan tanggal
  /appointment/filter?tanggal=today. Untuk hari sekarang, bisa hanya tinggal masukan today saja di tanggalnya</td>
  <td>-</td>
  </tr>
  <tr>
    <td>/appointment</td>
    <td>POST</td>
    <td>Untuk menambahkan appointment
  Untuk datanya, input file (foto) di taro di paling akhir setelah input lain
  karena file akan divalidasi terlebih dahulu sebelum masuk ke dalam folder
  public/images/data, jadi diwajibkan taro input file di paling akhir
  nama inputnya "photoData", supaya dikenali oleh multer</td>
    <td> 
      <ul>
        <li>id_pasien</li>
        <li>keperluan</li>
        <li>jam</li>
        <li>tanggal</li>
        <li>keluhan</li>
        <li>photoData</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/appointment/detail?id={id_appointment}</td>
    <td>GET</td>
    <td>Untuk mendapatkan detail appointment</td>
    <td> - </td>
  </tr>
  <tr>
    <td>/appointment?id={id_appointment}</td>
    <td>DELETE</td>
    <td>Untuk mendelete appointment</td>
    <td> - </td>
  </tr>
</table>

## Diagnosa API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
    <th>Input</th>
  </tr>
  <tr>
    <td>/diagnosa</td>
    <td>POST</td>
    <td>untuk membuat diagnosa, field yg dibutuhkan id_appointment</td>
    <td> 
      <ul>
        <li>id_appointment</li>
        <li>penanganan</li>
        <li>total_biaya</li>
      </ul>
    </td>
  </tr>
</table>

## History API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
  </tr>
  <tr>
    <td>/history</td>
    <td>GET</td>
    <td>untuk mendapat data history dari user,appointment,dan diagnosa</td>
  </tr>
</table>

## Photo / photo_data API

<table>
  <tr>
    <th>API</th>
    <th>Type</th>
    <th>Penjelasan</th>
    <th>Input</th>
  </tr>
  <tr>
    <td>/photo</td>
    <td>POST</td>
    <td>Untuk menambahkan foto pada pasien details, name input filenya (photoDataPasien)</td>
    <td> 
      <ul>
        <li>id_pasien</li>
        <li>photoDataPasien</li>
      </ul>
    </td>
  </tr>
   <tr>
    <td>/photo?id={id_photo}</td>
    <td>DELETE</td>
    <td>untuk menghapus foto</td>
    <td> - </td>
  </tr>
</table>


## Tambahan

```javascript
import crypto from "crypto";
import {useState, useEffect} from 'react';

const [pasien, setPasien] = useState([]);

useEffect(() => {
  axios.get("/pasien").then(res => {
    let newData = {};
    const decriptNik = decryptNik(res.data.nik);
    res.data.nik = decriptNik;
    // terusin decryptnya
    
    setPasien(res.data);
  })
},[])

const decryptNik = (encrypt) => {
  const password = "nik";
  const key = crypto.scryptSync(password, "docpro", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted =
    decipher.update(encrypt, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
};

// Bisa dilihat di server/util/encrypt.js
// Harus sama, jangan ada yang diubah !!
```

`Contoh untuk send req api dari form data`

```javascript
  const [fileImage, setFileImage] = useState({});
  const [lokasi, setLokasi] = useState("");
  const [caption, setCaption] = useState("");

  let inputData = new FormData();
  inputData.append("location", lokasi);
  inputData.append("status_postingan", caption);
  inputData.append("postImage", fileImage.file); -> *harus paling akhir

  post_postingan({
  data: inputData,
  });
```

`Opsi membuat format tanggal dari YYYY-MM-DD menjadi DD/MM/YYYY;`

```javascript
let newdate = date.split("-").reverse().join("/");
```

> You can message me for more information ^\_^
