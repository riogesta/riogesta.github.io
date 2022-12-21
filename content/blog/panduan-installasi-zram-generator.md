---
title: "Panduan Installasi & Konfigurasi ZRAM Generator"
date: 2022-12-13T15:23:48+07:00
draft: false
---

## Apa itu zram ? {#apa-itu-zram}

ZRAM adalah sebuah modul pada kernel linux (nama sebelumnya adalah compcache) modul ini berfungsi untuk melakukan kompresi blok pada RAM. <cite>[^1]</cite>

[^1]: Improving Performance [link](https://wiki.archlinux.org/title/improving_performance#zram_or_zswap) Arch Wiki.

dalam bahasa sederhananya zram ini bertugas untuk mengkompresi penggunaan RAM pada aplikasi yang sedang berjalan, sehingga menghasilkan ruang kosong lebih pada RAM.

## Apa itu zram generator ? {#apa-itu-zram-generator}

zram generator adalah sebuah tools
yang masih bagian dari systemd, yaitu untuk memudahkan kita dalam melakukan konfigurasi swap pada {{< mono "/dev/zram*" >}}.<cite>[^2]</cite>

[^2]: systemd/zram-generator [link](https://github.com/systemd/zram-generator) Github.

Karena jika kita mengaktifkan zram tanpa tools ini langkahnya sedikit riskan, untuk mengaktifkan zram tanpa zram-generator dapat dilihat pada halaman berikut [wiki.archlinux.org](https://wiki.archlinux.org/title/improving_performance#Swap_on_zram_using_a_udev_rule).

## Panduan Installasi {#panduan-installasi}

### Pemasangan Paket {#pemasangan-paket}

Untuk pemasangan paket dapat dilakukan menggunakan package manager distronya masing-masing.<cite>[^2]</cite>

Arch Linux :
{{< command "pacman -S zram-generator" >}}

Fedora :
{{< command "dnf install zram-generator">}}

Ubuntu :
{{< command "apt install systemd-zram-generator" >}}

### Konfigurasi {#konfigurasi}

Untuk beberapa distro saat pemasang paket zram-generator file config otomatis ditambahkan pada salah satu lokasi berikut:

- {{< code text="/run/systemd/zram-generator.conf" >}}
- {{< code text="/etc/systemd/zram-generator.conf" >}}
- {{< code text="/usr/local/lib/systemd/zram-generator.conf" >}}
- {{< code text="/usr/lib/systemd/zram-generator.conf" >}}

Jika pada lokasi diatas tidak ditemukan salah satupun config kita dapat menambahkannya secara manual {{< mono "zram-generator.conf" >}} ke salah satu lokasi diatas, saya sendiri menyarankan untuk meletakkannya pada lokasi {{< mono "/etc/systemd/zram-generator.conf">}}.

Saya sendiri tidak banyak melakukan konfigurasi berikut adalah isi dari konfigurasi saya :
```systemd {linenos=true}
[zram0]
zram-size = min(ram, 8192)

```

Untuk melihat apa saja yang dapat kita konfigurasi anda dapat mengunjungi link berikut [zram-generator.conf.example](https://github.com/systemd/zram-generator/blob/main/zram-generator.conf.example).<cite>[^2]</cite>

### Mengaktifkan zram-generator sebagai service {#zram-generator-service}

Muat ulang systemd konfigurasi manager
{{< command "systemctl daemon-reload" >}}

Menjalankan service zram0
{{< command "systemctl start /dev/zram0">}}

Cek apakah zram berhasil kita aktifkan
{{< command "zramctl" >}}

Berikut jika kita berhasil mengaktifkan zram pada komputer kita

{{< img-cap src="https://i.ibb.co/GHBTW3G/2022-12-22-00-07.png" alt="zramctl">}}

## Penutup

Berikut adalah bagaimana saya menerapkan konfigurasi zram-generator pada mesin arch linux. 

