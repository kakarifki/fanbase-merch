// src/pages/AboutPage.tsx


const AboutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Fanbase Merch</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="mb-2">
          Fanbase Merch adalah platform e-commerce yang didedikasikan untuk mengumpulkan dan menampilkan merchandise dari berbagai fanbase member JKT48. Idenya adalah untuk menyediakan satu tempat terpusat bagi para penggemar untuk mencari dan melihat-lihat merchandise favorit mereka.
        </p>
        <p>
          Perlu diperhatikan bahwa website ini mungkin hanya berfungsi sebagai katalog. Untuk melakukan pembelian, pengguna harus menghubungi fanbase yang bersangkutan.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Project Stack</h2>
        <p className="mb-2">
          Proyek ini adalah aplikasi fullstack yang dibangun dengan teknologi berikut:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <strong>Frontend:</strong>
            <ul>
              <li>Bun</li>
              <li>Vite</li>
              <li>React</li>
              <li>Tailwind CSS</li>
            </ul>
          </li>
          <li>
            <strong>Backend:</strong>
            <ul>
              <li>Bun</li>
              <li>Hono (with OpenAPI)</li>
              <li>Prisma</li>
            </ul>
          </li>
          <li>
            <strong>Database:</strong>
            <ul>
              <li>PostgreSQL (hosted on Neon.tech)</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          <li>Register</li>
          <li>Login</li>
          <li>Cart Functionality</li>
          {/* Tambah fitur lain disini */}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Roles</h2>
        <p className="mb-2">
          Terdapat dua peran pengguna utama:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>User:</strong> Dapat melihat-lihat merchandise dan menambahkan item ke keranjang.
          </li>
          <li>
            <strong>Admin:</strong> Dapat menambahkan produk ke platform.
          </li>
        </ul>
        <p>
            Pengguna yang tidak login hanya dapat melihat-lihat merchandise.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Deployment</h2>
        <p className="mb-2">
          Proyek ini telah berhasil di-deploy menggunakan platform berikut:
        </p>
        <ul className="list-disc list-inside">
          <li>Frontend: Vercel</li>
          <li>Backend: Render.com</li>
          <li>Database: Neon.tech</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Links</h2>
        <ul className="list-disc list-inside">
            <li>
              <strong>Frontend:</strong> <a href="https://jkt48-fanbase-merch.rifkiseptiawan.com" target="_blank" rel="noopener noreferrer">https://jkt48-fanbase-merch.rifkiseptiawan.com</a>
              <li>
                <strong>Frontend Repository:</strong> <a href="https://github.com/kakarifki/fanbase-merch-backend" target="_blank" rel="noopener noreferrer">https://github.com/kakarifki/fanbase-merch-backend</a>
              </li>
            </li>
            <li>
              <strong>Backend:</strong> <a href="https://fanbase-merch-backend.onrender.com/" target="_blank" rel="noopener noreferrer">https://fanbase-merch-backend.onrender.com/</a>
            </li>
              <li>
                <strong>Backend Repository:</strong> <a href="https://github.com/kakarifki/fanbase-merch-backend" target="_blank" rel="noopener noreferrer">https://github.com/kakarifki/fanbase-merch-backend</a>
              </li>
          </ul>
      </section>
    </div>
  );
};

export default AboutPage;
