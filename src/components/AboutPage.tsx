import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-pink-50 to-pink-100 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4 drop-shadow-md">
            Fanbase Merch JKT48
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Platform e-commerce khusus merchandise JKT48 yang menghubungkan penggemar dengan koleksi merchandise favorit mereka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-700">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                Fanbase Merch adalah platform e-commerce yang didedikasikan untuk mengumpulkan dan menampilkan merchandise dari berbagai fanbase member JKT48.
              </p>
              <p className="text-gray-700 italic">
                Perlu diperhatikan bahwa website ini mungkin hanya berfungsi sebagai katalog. Untuk melakukan pembelian, pengguna harus menghubungi fanbase yang bersangkutan.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-700">Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-pink-600 mb-2">Frontend</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>Bun</li>
                    <li>Vite</li>
                    <li>React</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-pink-600 mb-2">Backend</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>Bun</li>
                    <li>Hono</li>
                    <li>Prisma</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-700">Fitur</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-700 list-disc list-inside space-y-2">
                <li>Registrasi Pengguna</li>
                <li>Login</li>
                <li>Fungsionalitas Keranjang</li>
                <li>Katalog Merchandise</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-700">Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-700 list-disc list-inside space-y-2">
                <li>
                  <strong>User:</strong> Dapat melihat merchandise dan menambahkan item ke keranjang
                </li>
                <li>
                  <strong>Admin:</strong> Dapat menambahkan produk ke platform
                </li>
                <li>Pengguna tanpa login hanya dapat melihat-lihat merchandise</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-800">Link Penting</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-pink-600 mb-2">Frontend</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://jkt48-fanbase-merch.rifkiseptiawan.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/kakarifki/fanbase-merch-backend" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Repository Frontend
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-pink-600 mb-2">Backend</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://fanbase-merch-backend.onrender.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Backend API
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/kakarifki/fanbase-merch-backend" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Repository Backend
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            "Menghubungkan penggemar JKT48 melalui merchandise yang autentik"
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
