export function Routines() {
  return (
    <div className="p-8">
      <div
        className="text-[#25AEA6] text-3xl mb-6 text-center"
        style={{ fontWeight: 800 }}
      >
        Lista de Rutinas
      </div>

      <div className="flex justify-center mt-10">
        <table className="w-4xl mx-auto text-white border border-[#fff] rounded-md overflow-hidden">
          <thead>
            <tr className="bg-[#0F0F0F]">
              <th className="px-6 py-4 border-b border-[#333] text-center">
                Nombre
              </th>
              <th className="px-6 py-4 border-b border-[#333] text-center">
                Descripción
              </th>
              <th className="px-6 py-4 border-b border-[#333] text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[#1d1d1d]">
              <td className="px-6 py-4 border-b border-[#333] text-center">
                Rutina 1
              </td>
              <td className="px-6 py-4 border-b border-[#333] text-center">
                Rutina para principiantes
              </td>
              <td className="px-6 py-4 border-b border-[#333] text-center">
                <button
                  className="bg-[#FF9811] text-black p-2 rounded-md cursor-pointer"
                  style={{ fontWeight: 600 }}
                >
                  Editar
                </button>
                <button
                  className="bg-[#FF9811] text-black p-2 rounded-md ml-10 cursor-pointer"
                  style={{ fontWeight: 600 }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
