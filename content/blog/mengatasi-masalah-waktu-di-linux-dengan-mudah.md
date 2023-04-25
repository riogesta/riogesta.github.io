---
title: "Mengatasi Masalah Waktu di Linux dengan Mudah"
date: 2023-04-24T06:08:23+07:00
draft: false
---

Waktu pada komputer adalah hal yang mungkin sering kita abaikan namun sangat penting untuk diketahui. 

Komputer menggunakan jam waktu sistem (system clock) untuk menghitung waktu. Jam waktu sistem diatur oleh sistem operasi dan menggunakan sebuah sumber waktu yang disebut sebagai Real Time Clock (RTC). RTC ini biasanya merupakan bagian dari komponen motherboard dan mengambil sumber waktu dari baterai kecil yang ada di dalamnya. RTC ini tetap berjalan meskipun komputer dimatikan.

## Timezone

Timezone adalah pengaturan waktu berdasarkan pada zona waktu yang digunakan oleh sebuah negara atau wilayah. Setiap negara atau wilayah memiliki zona waktu yang berbeda-beda tergantung pada letak geografisnya.

## Mengatur timezone pada linux

init systemd menyediakan sebuah daemon *systemd-timesyncd* yang bekerja pada latar belakang untuk menjaga waktu sistem terkini dengan menyesuaikannya dengan waktu yang disediakan oleh server waktu (time server). Layanan ini digunakan untuk memastikan bahwa waktu sistem tetap sinkron dengan waktu server waktu dan menyelesaikan masalah sinkronisasi waktu pada sistem.

langkah - langkah mengatur waktu secara otomatis menggunakan daemon sakti bernama *systemd-timesyncd* :

pastikan bahwa service *systemd-timesyncd* telah berstatus *active*.

{{< img-cap src="https://i.ibb.co/VL2X5CY/Screenshot-20230425-084842.png" alt="systemctl status" >}}

jika status belum *active*, dapat mengaktifkannya dengan perintah berikut :

{{< command "sudo systemctl start systemd-timesyncd.service" >}}

berikutnya jalankan perintah {{< mono "timedatectl">}}, apakah __NTP service__ menampilkan __active__ ? 
jika belum active dapat mengaktifkannya dengan perintah berikut :

{{< command "timedatectl set-ntp 1" >}}

Dan terakhir jangan lupa untuk memastikan bahwa timezone yang di pilih sesuai dengan zona waktu kita.

untuk mengubah timezone sendiri dapat menggunakan perintah berikut :

{{< command "timedatectl set-timezone Asia/Jakarta" >}}

Saya sendiri berada di zona waktu *Asia/Jakarta (WIB, +0700)*. Untuk melihat timezona apa saja yang tersedia :

{{< command "timedatectl list-timezones" >}}

jadi keseluruhan hasil pada status milik saya adalah sebagai berikut

{{< img-cap src="https://i.ibb.co/R9n8hcD/Screenshot-20230425-083851.png" alt="timedatectl status" >}}