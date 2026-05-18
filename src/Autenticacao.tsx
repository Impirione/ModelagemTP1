import { useState } from 'react';

export default function TwoFactorAuth() {
  const [codigo, setCodigo] = useState('');

  const validarCodigo = () => {
    console.log('Código validado:', codigo);
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Código Google Authenticator"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="border p-2 w-full"
      />

      <button onClick={validarCodigo} className="bg-purple-600 text-white px-4 py-2 rounded">
        Validar Código
      </button>
    </div>
  );
}