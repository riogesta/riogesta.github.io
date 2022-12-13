---
title: "Konfigurasi Font pada GNU/Linux"
desc: "Bagaimana mengkonfigurasi sebuah font dirender untuk sesuai dengan kenyamanan kita"
date: 2022-03-27T09:01:57+07:00
draft: false
# categories : 
---

## Pembukaan

fontconfig adalah library (pustaka) yang dirancang untuk menyediakan daftar font (huruf) yang tersedia untuk aplikasi juga mengkonfigurasi bagaimana sebuah font dirender. Pada sistem operasi GNU/Linux font dirender oleh paket yang bernama FreeType / FreeType2.<cite>[^1]</cite>

[^1]: Font Configuration [link](https://wiki.archlinux.org/title/font_configuration) Arch Wiki.

## Path Konfigurasi fontconfig

path fontconfig pada All User / Wide System
{{< code text="/etc/fonts/local.conf" >}}

path fontconfig pada user
{{< code text="~/.config/fontconfig/fonts.conf" >}}


## Konfigurasi

### Anti-Aliasing

Aliasing adalah efek yang menyebabkan sinyal yang berbeda menjadi tidak dapat dibedakan (atau alias satu sama lain) saat diambil sampelnya . Ini juga sering mengacu pada distorsi atau artefak yang dihasilkan ketika sinyal yang direkonstruksi dari sampel berbeda dari sinyal kontinu asli.<cite>[^2]</cite>

Anti-aliasing salah satu dari sejumlah teknik untuk memerangi masalah aliasing dalam sinyal sampel.<cite>[^3]</cite>

[^2]: Aliasing [link](https://en.wikipedia.org/wiki/Aliasing) Wikipedia.
[^3]: Anti-aliasing [link](https://en.wikipedia.org/wiki/Aliasing) Wikipedia.

pada font rendering disebut dengan **font rasterization**.

Font rasterization adalah proses mengubah teks dari deskripsi vektor (seperti yang ditemukan dalam font yang dapat diskalakan seperti font TrueType ) menjadi deskripsi raster atau bitmap . Ini sering melibatkan beberapa anti-aliasing pada teks layar untuk membuatnya lebih halus dan lebih mudah dibaca. Ini mungkin juga melibatkan petunjuk —informasi yang disematkan dalam data font yang mengoptimalkan detail rendering untuk ukuran karakter tertentu. <cite>[^4]</cite>

[^4]: Font rasterization [link](https://en.wikipedia.org/wiki/Font_rasterization) Wikipedia.

{{< img-cap
src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rasterization-simple.png/200px-Rasterization-simple.png"
alt="font reasterization tanpa anti-aliasing" cap="Gambar 1" >}}

render font tanpa anti-aliasing pada Gambar 1 menampilkan sisi font yang bergerigi, kasar, dan tidak rapih.

{{< img-cap src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rasterization-antialiasing-without-hinting-2.png/200px-Rasterization-antialiasing-without-hinting-2.png" alt="font rasterization dengan anti-aliasing tanpa hinting" cap="Gambar 2">}}

render font dengan anti-aliasing pada Gambar 2 menampilkan sisi font yang terlihat agak rapih kebalikan dari tanpa anti-aliasing yang ditunjukan pada Gambar 1. anti-aliasing pada render font memiliki sebuah kekurangan yakni font terlihat kabur, blur, dan agak tidak jelas; efeknya amat terasa untuk layar dengan resolusi yang rendah.

mengaktifkan anti-aliasing :

```xml
<fontconfig>
    <match target="font">
    ...
    ...
    <edit name="antialias" mode="assign">
        <bool>true</bool>
    </edit>
    ...
    ...
    </match>
</fontconfig>
```

### Hinting

(dikenal juga sebagai instruksi) adalah penggunaan instruksi matematika untuk menyesuaikan tampilan font sehingga sejajar dengan kisi raster (yaitu kisi piksel tampilan). Efek yang dimaksudkan adalah membuat font tampak lebih tajam sehingga lebih mudah dibaca. <cite>[^1]</cite> <cite>[^5]</cite>

[^5]: Font Hinting [link](https://en.wikipedia.org/wiki/Font_hinting) Wikipedia.


{{< img-cap
src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Rasterization-antialiasing.png/200px-Rasterization-antialiasing.png" alt="font rasterization dengan menggunakan anti-aliasing dan hinting" cap="Gambar 3">}}

Gambar 3 tampilan render font dengan anti-aliasing dan hinting. terlihat lebih tegas menunjukkan sisi font dengan sedikit blur pada sisi-sisi font.

mengaktifkan hinting :
```xml
<fontconfig>
    <match target="font">
    ...
    ...
    <edit name="hinting" mode="assign">
        <bool>true</bool>
    </edit>
    ...
    ...
    </match>
</fontconfig>
```

#### Hintstyle

Hintstyle adalah pembentukan ulang font yang dilakukan ke setiap grid. Nilai yang ada pada hintstyle adalah: 

- hintnone
- hintslight
- hintmedium
- hintfull

hintslight akan membuat font lebih kabur/blur untuk tiap baris grid tetapi lebih baik dalam mempertahankan bentuk font, sementara hintfull akan membuat bentuk font tajam dan menyelaras dengan baik ke grid piksel tetapi akan kehilangan lebih banyak bentuk font. <cite>[^1]</cite>

berikut ini adalah tampilan perbedaan tiap hintstyle :

{{< img-cap src="https://winterdom.com/weblog/content/binary/WindowsLiveWriter/ImprovingFontRenderinginUbuntu_136D4/linux-gnome-settings_3.png" alt="macam macam tampilan font hintstyle" cap="Gambar 4">}}

mengaktifkan hintstyle, nilai hintstyle dapat dipilih sesuai presepsi masing-masing.

```xml
<fontconfig>
    <match target="font">
    ...
    ...
    <edit name="hintstyle" mode="assign">
        <const>hintslight</const>
    </edit>
    ...
    ...
    </match>
</fontconfig>
```

### Pixel Alignment

#### Sub pixel

adalah cara untuk meningkatkan resolusi tampilan LCD atau OLED dengan merender piksel untuk mempertimbangkan sifat fisik jenis layar. setiap piksel pada LCD terdiri dari subpiksel merah, hijau, dan biru individu atau subpiksel warna lainnya untuk teks anti-alias dengan detail yang lebih besar atau untuk meningkatkan resolusi semua jenis gambar pada tata letak yang secara khusus dirancang agar kompatibel dengan rendering subpiksel. <cite>[^6]</cite>

[^6]: Subpixel Rendering [link](https://en.wikipedia.org/wiki/Subpixel_rendering) Wikipedia.

{{< img-cap src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Subpixel_demonstration_%28Quartz%29.png/300px-Subpixel_demonstration_%28Quartz%29.png" alt="render font dengan dan tanpa subpixel" cap="Gambar 5">}}

Render subpixel bekerja dengan meningkatkan titik rekonstruksi luminansi layar subpiksel berwarna, seperti tampilan layar LCD atau tampilan layar OLED <cite>[^6]</cite> . untuk melihat informasi lebih lanjut dari Gambar 5 dapat baca pada [alamat ini](https://en.wikipedia.org/wiki/Subpixel_rendering#/media/File:Subpixel_demonstration_(Quartz).png) .

{{< img-cap src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Rasterization-subpixel-RGB.png/200px-Rasterization-subpixel-RGB.png" alt="render font dengan anti-aliasing, hinting, dan subpixel" cap="Gambar 6">}}

Gambar 6 adalah tampilan hasil font yang dirender dengan anti-aliasing, hinting, dan subpixel. bentuk sisi dan kejelasan font terlihat rapih.

mengaktifkan subpixel :

```xml
<fontconfig>
    <match target="font">
    ...
    ...
    <edit name="rgba" mode="assign">
        <const>rgb</const>
    </edit>
    ...
    ...
    </match>
</fontconfig>

```

#### LCD Filter

LCD Filter di rancang untuk mengurangi pinggiran warna pada font. untuk melihat perbandingan tiap LCD Filter dapat dilihat pada halaman berikut [www.spasche.net/files/lcdfiltering](https://www.spasche.net/files/lcdfiltering/)

untuk mengaktifkannya :

```xml
<fontconfig>
    <match target="font">
    ...
    ...
    <edit name="lcdfilter" mode="assign">
        <const>lcddefault</const>
    </edit>
    ...
    ...
    </match>
</fontconfig>

```

## Akhir Kata

Semoga tulisan ini dapat membantu setidaknya memberi sedikit pencerahan tentang bagaimana menyesuaikan tampilan font pada sistem operasi GNU/linux pembaca masing masing.