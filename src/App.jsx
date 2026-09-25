/*
 * SUJETO: Tienda Checador Legal MX
 * DIRECCION: dark mode + glassmorphism + gradientes + motion
 * PAGOS: Comprar Ahora → carrito → formulario → Supabase → redirección Mercado Pago
 */

import { useState, useCallback } from 'react';
import './styles.css';

/* SUPABASE CONFIG */
const SUPABASE_URL = 'https://gfumdawyxhkvkpspfmjs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Br00ppjy9MR8VY_uV4N71A_9w6K7iFO';

async function guardarPedido(pedido) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(pedido),
    });
    return res.ok;
  } catch { return false; }
}

const PRODUCTOS = [
  { id: 'lector', nombre: 'Lector de Huella ZK9500', precio: 1500, unidad: 'pza', desc: 'Lector biometrico USB. 3,000 plantillas. TCP/IP y USB.', specs: ['Sensor optico ZKTeco', '3,000 huellas', 'USB + TCP/IP', 'Garantia 1 ano'], icono: '\u{1F512}', tag: null, color: 'neutral', link: 'https://mpago.li/1VoqTS6' },
  { id: 'mensual-1', nombre: 'Licencia Mensual', sub: '1 Sucursal', precio: 2500, unidad: '/mes', desc: 'Control completo para un local. Sin limite de empleados.', specs: ['Sin limite de empleados', 'Lector incluido', 'Instalacion y soporte', 'Actualizaciones'], icono: '\u{1F4CB}', tag: null, color: 'ambar', link: 'https://mpago.la/2i4CJVH' },
  { id: 'mensual-5', nombre: 'Licencia Mensual', sub: 'Hasta 5 Sucursales', precio: 4000, unidad: '/mes', desc: '5 locales, un solo panel. Lector por sucursal.', specs: ['Hasta 5 sucursales', 'Lector por sucursal', 'Multi-sucursal', 'Soporte prioritario'], icono: '\u{1F3E2}', tag: 'Popular', color: 'teal', link: 'https://mpago.la/17eqLuj' },
  { id: 'anual-1', nombre: 'Licencia Anual', sub: '1 Sucursal', precio: 15000, unidad: '/ano', desc: 'Ano completo. $1,250/mes. Ahorra $15,000.', specs: ['Sin limite de empleados', 'Lector incluido', 'Soporte 12 meses', 'Ahorra 50%'], icono: '\u{1F6E1}\uFE0F', tag: 'Mejor valor', color: 'ambar', link: 'https://mpago.li/2nBpWhi' },
  { id: 'anual-5', nombre: 'Licencia Anual', sub: 'Hasta 5 Sucursales', precio: 30000, unidad: '/ano', desc: 'Cobertura total. $2,500/mes. Ahorra $18,000.', specs: ['Hasta 5 sucursales', 'Lectores incluidos', 'Soporte prioritario', 'Ahorra 37.5%'], icono: '\u2B50', tag: null, color: 'teal', link: 'https://mpago.li/1d8SJuP' },
];

const CARACTERISTICAS = [
  { titulo: 'Correccion de marcas', desc: 'El encargado asienta marcas olvidadas con justificacion. Todo queda en la bitacora sellada.', icono: '\u270F\uFE0F' },
  { titulo: 'Impresion con un clic', desc: 'Tarjetas, reportes STPS, pre-nomina. Elige periodo, marca empleados, imprime.', icono: '\u{1F5A8}\uFE0F' },
  { titulo: 'Encriptado y trazable', desc: 'SHA-256 + hora CENAM. Nadie puede alterar un registro sin romper la cadena.', icono: '\u{1F510}' },
  { titulo: 'Auditoria verificable', desc: 'Bitacora completa: quien enrollo, corrigio, imprimio. Hash encadenado.', icono: '\u{1F50D}' },
  { titulo: 'Cumple Art. 132 XXXIV', desc: 'Registro electronico, trazable, inalterable y auditable. Exigible desde 2027.', icono: '\u2696\uFE0F' },
  { titulo: 'Enrolamiento en 3 pasos', desc: 'Alta, dedo al lector 3 veces, listo. Voz humana guia al encargado.', icono: '\u{1F446}' },
  { titulo: 'Exporta a tu nomina', desc: 'Excel con formatos listos para CONTPAQi, Aspel, NOI, SUA y mas. O disena el tuyo con el editor de formatos.', icono: '\u{1F4E4}' },
  { titulo: 'Multi-nomina', desc: 'Usas diferentes sistemas en distintas sucursales? Cada una exporta al formato que necesita.', icono: '\u{1F504}' },
];

const TESTIMONIOS = [
  { nombre: 'Roberto Castaneda', cargo: 'Dueno', empresa: 'SKYNOVA', texto: 'Llevabamos anos con tarjeta perforada. Checador Legal entendio lo que necesita un restaurante: funciona sin internet, sin tablet cara, sin capacitacion de una semana.' },
  { nombre: 'Maria Elena Jauz', cargo: 'Gerente RRHH', empresa: 'JAUZ', texto: 'Lo que me vendio fue la auditoria. Antes no tenia como probar que alguien checo. Ahora cada marca tiene sello y cadena. La STPS lo acepta sin discusion.' },
  { nombre: 'Fernando Lizarraga', cargo: 'Dir. Operaciones', empresa: 'AUTOS LIZBETH', texto: '4 sucursales, cada una con su control. Con la multi-sucursal todo llega a un panel. El tecnico instalo todo y capacito. No tuve que hacer nada.' },
];

const FAQS = [
  { q: 'Necesito internet?', a: 'No. Corre 100% en la PC. Solo usa internet para actualizaciones y sincronizar hora CENAM. Sin internet sigue registrando.' },
  { q: 'Si un empleado olvida checar?', a: 'El encargado asienta la marca con justificacion. Queda en bitacora: quien corrigio y por que.' },
  { q: 'Puedo usar mi propio lector?', a: 'Optimizado para ZKTeco ZK9500. Si ya tienes uno, funciona. Si no, lo incluimos.' },
  { q: 'Como es la instalacion?', a: 'Nuestro tecnico va, instala, configura, enrola al personal y te deja operando. Incluido.' },
  { q: 'Exporta a mi nomina?', a: 'Si. Excel con formatos para Aspel, Contpaqi y otros. Tambien disenas el tuyo.' },
  { q: 'Si la STPS pide reporte?', a: 'Un clic genera el paquete: tarjetas, reporte de jornadas, bitacora. Todo sellado.' },
  { q: 'Los datos son seguros?', a: 'SHA-256 encadenado. No se puede alterar sin romper la cadena. Datos en tu PC, nunca en la nube.' },
  { q: 'Puedo cancelar?', a: 'Si, sin penalizacion. Tus datos se quedan en tu PC y puedes exportarlos.' },
];

const EMPRESAS = ['SKYNOVA', 'JAUZ', 'AUTOS LIZBETH', 'RIU HOTEL'];

function Huella({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 11c1.5 0 3 .8 3 2.5s-1.5 2.5-3 2.5-3-.8-3-2.5 1.5-2.5 3-2.5z" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 5c3 0 5.5 1.5 6.5 4" /><path d="M12 8c1.8 0 3.2.9 3.8 2.2" />
      <path d="M5.5 9C6.5 6.5 9 5 12 5" /><path d="M8.5 16c.8 1.5 2 2.5 3.5 2.5s2.7-1 3.5-2.5" />
    </svg>
  );
}

function CircuitLine() {
  return (
    <div className="flex items-center gap-1 opacity-30">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="h-px w-4 bg-gradient-to-r from-teal-400/60 to-teal-400/20" />
          {i % 3 === 0 && <div className="h-1.5 w-1.5 rounded-full bg-teal-400/60" />}
        </div>
      ))}
    </div>
  );
}

function Glow({ children, className = '' }) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(45,212,191,0.07)] ${className}`}>
      {children}
    </div>
  );
}

function Simulador({ onCerrar }) {
  const [vista, setVista] = useState(0);
  const vistas = ['Tablero', 'Empleados', 'Rol Semanal', 'Reportes', 'Impresion'];
  const tutorial = [
    { titulo: 'Zona de Checada', desc: 'El empleado pone su dedo en el lector. La app reconoce la huella, registra la hora oficial CENAM y confirma con voz humana.' },
    { titulo: 'Tablero del Dia', desc: 'Quien esta en turno, quien llego tarde, faltas y jornadas cerradas. En tiempo real.' },
    { titulo: 'Alta de Empleados', desc: 'Nombre, puesto, salario. La huella se enrola en 3 pasos con el lector.' },
    { titulo: 'Rol Semanal', desc: 'Asignas turnos como en Excel. Publicar activa el control de esa semana.' },
    { titulo: 'Reportes y Cumplimiento', desc: 'Un clic: tarjetas de asistencia, reportes STPS, pre-nomina. Todo sellado y auditable.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onCerrar}>
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl border border-white/[0.08] bg-[#142a20] shadow-[0_0_60px_rgba(45,212,191,0.1)]" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#12241c]/90 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Huella size={20} className="text-teal-400" />
            <span className="font-mono text-[17px] uppercase tracking-[0.15em] text-white/80">Simulador — Checador Legal MX</span>
          </div>
          <button onClick={onCerrar} className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors text-xl">&times;</button>
        </div>
        <div className="p-6">
          <div className="mb-6 flex gap-2 overflow-auto">
            {vistas.map((v, i) => (
              <button key={v} onClick={() => setVista(i)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all ${vista === i ? 'bg-teal-400/20 text-teal-300 border border-teal-400/30' : 'text-white/50 border border-white/[0.06] hover:bg-white/5'}`}>
                {v}
              </button>
            ))}
          </div>
          <Glow className="p-8 min-h-[300px]">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">Vista previa</span>
            </div>
            <h3 className="font-sans text-2xl font-bold text-white">{tutorial[vista].titulo}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-white/60">{tutorial[vista].desc}</p>
            <div className="mt-6 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-12 text-center">
              <Huella size={48} className="mx-auto text-white/20" />
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">{vistas[vista]}</p>
              <p className="mt-2 text-[17px] text-white/30">La version completa muestra esta pantalla con datos reales</p>
            </div>
          </Glow>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {tutorial.map((_, i) => (
                <button key={i} onClick={() => setVista(i)}
                  className={`h-2 rounded-full transition-all ${vista === i ? 'w-8 bg-teal-400' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setVista(Math.max(0, vista - 1))} disabled={vista === 0}
                className="rounded-full border border-white/[0.1] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white/60 disabled:opacity-30 hover:bg-white/5 transition-colors">
                &larr; Anterior
              </button>
              <button onClick={() => setVista(Math.min(vistas.length - 1, vista + 1))} disabled={vista === vistas.length - 1}
                className="rounded-full bg-teal-500 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white disabled:opacity-30 hover:bg-teal-400 transition-colors">
                Siguiente &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContadorUrgencia() {
  const fin = new Date('2027-01-01T00:00:00-06:00');
  const hoy = new Date();
  const dias = Math.max(0, Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24)));
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-red-400/20 bg-red-400/[0.08] px-5 py-2">
      <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
      <span className="font-mono text-[17px] text-red-300">
        <strong className="font-bold">{dias}</strong> dias para cumplir la reforma
      </span>
    </div>
  );
}

function Comparador() {
  const rows = [
    ['Sucursales', '1', 'Hasta 5', '1', 'Hasta 5'],
    ['Empleados', 'Sin limite', 'Sin limite', 'Sin limite', 'Sin limite'],
    ['Lector ZK9500', 'Incluido', 'Incluido', 'Incluido', 'Incluido'],
    ['Instalacion', 'Si', 'Si', 'Si', 'Si'],
    ['Soporte', '12 meses', '12 meses', '12 meses', 'Prioritario 12 meses'],
    ['Actualizaciones', 'Si', 'Si', 'Si', 'Si'],
    ['Precio/mes', '$2,500', '$4,000', '$1,250', '$2,500'],
    ['Ahorro vs mensual', '—', '—', '50%', '37.5%'],
  ];
  const headers = ['', 'Mensual 1 Suc', 'Mensual Multi', 'Anual 1 Suc', 'Anual Multi'];
  return (
    <Glow className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.08]">
            {headers.map((h, i) => (
              <th key={i} className={`px-5 py-4 font-mono text-[12px] uppercase tracking-[0.1em] ${i === 0 ? 'text-white/40' : i <= 2 ? 'text-amber-300' : 'text-teal-300'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-3.5 text-[17px] text-white/60">{row[0]}</td>
              {row.slice(1).map((cell, ci) => (
                <td key={ci} className={`px-5 py-3.5 text-[17px] ${ci < 2 ? 'text-amber-200/80' : 'text-teal-200/80'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Glow>
  );
}

function SellosConfianza() {
  const sellos = [
    { titulo: 'Garantia de 30 dias', desc: 'Si no te convence, te devolvemos tu dinero.', icono: '\u{1F6E1}\uFE0F' },
    { titulo: 'Pago contra entrega', desc: 'Pagas cuando el tecnico termina la instalacion.', icono: '\u{1F4B5}' },
    { titulo: 'Soporte incluido', desc: 'Tecnico certificado disponible por WhatsApp.', icono: '\u{1F4AC}' },
    { titulo: 'Datos en tu PC', desc: 'Nada se sube a la nube. Tu informacion es tuya.', icono: '\u{1F512}' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sellos.map((s, i) => (
        <Glow key={i} className="p-5 text-center">
          <div className="text-[28px] mb-3">{s.icono}</div>
          <div className="font-sans text-[17px] font-semibold">{s.titulo}</div>
          <div className="mt-2 text-[17px] text-white/40">{s.desc}</div>
        </Glow>
      ))}
    </div>
  );
}

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [simuladorAbierto, setSimuladorAbierto] = useState(false);
  const [faqAbierto, setFaqAbierto] = useState(null);
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pedidoExito, setPedidoExito] = useState(null);
  const [formCliente, setFormCliente] = useState({ nombre: '', empresa: '', telefono: '', email: '' });

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const quitarDelCarrito = useCallback((id) => setCarrito(prev => prev.filter(p => p.id !== id)), []);
  const cambiarCantidad = useCallback((id, delta) => {
    setCarrito(prev => prev.map(p => {
      if (p.id !== id) return p;
      const nueva = p.cantidad + delta;
      if (nueva <= 0) return null;
      return { ...p, cantidad: nueva };
    }).filter(Boolean));
  }, []);

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const itemsCount = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  const generarPedidoWhatsApp = () => {
    const lineas = carrito.map(p => `${p.nombre} ${p.sub || ''} x${p.cantidad} — $${(p.precio * p.cantidad).toLocaleString('es-MX')}`);
    const mensaje = `Hola, me interesa comprar:\n\n${lineas.join('\n')}\n\nTotal: $${total.toLocaleString('es-MX')} MXN\n\nMe pueden ayudar con la compra?`;
    return `https://wa.me/5216462947308?text=${encodeURIComponent(mensaje)}`;
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#12241c] font-sans text-white antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#12241c]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-teal-400/5 border border-teal-400/20">
              <Huella size={22} className="text-teal-400" />
            </div>
            <div>
              <div className="font-sans text-[17px] font-bold tracking-tight">Checador Legal</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Control de Jornada</div>
            </div>
          </div>
          <button onClick={() => setCarritoAbierto(!carritoAbierto)}
            className="relative flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.08] px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-teal-300 hover:bg-teal-400/[0.15] hover:text-teal-200 hover:border-teal-400/40 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrito
            {itemsCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 font-mono text-[11px] font-bold text-black">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.03] via-transparent to-red-500/[0.02]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/[0.04] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.08] px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.15em] text-teal-300">
                <Huella size={14} /> Cumplimiento LFT 2027
              </div>
              <h1 className="font-sans text-[48px] sm:text-[64px] font-bold leading-[1.02] tracking-[-0.03em] bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                Control de asistencia que protege tu empresa.
              </h1>
              <p className="mt-6 text-[22px] leading-relaxed text-white/50 max-w-lg">
                Cumple con el Art. 132, fracc. XXXIV de la LFT.
                Evita multas de hasta <strong className="text-red-400 font-semibold">$586,550 MXN</strong> por trabajador.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button onClick={() => scrollTo('productos')}
                  className="group relative rounded-full bg-teal-500 px-8 py-4 font-mono text-[17px] font-bold uppercase tracking-[0.12em] text-black transition-all hover:bg-teal-400 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]">
                  Ver Precios
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button onClick={() => setSimuladorAbierto(true)}
                  className="rounded-full border border-white/[0.12] px-8 py-4 font-mono text-[17px] font-bold uppercase tracking-[0.12em] text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all">
                  Probar Simulador
                </button>
              </div>
              <div className="mt-8">
                <ContadorUrgencia />
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_0_60px_rgba(45,212,191,0.08)] backdrop-blur-xl">
                <div className="rounded-xl bg-[#0d1f17] p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal-300/80">Lector conectado</span>
                    </div>
                    <span className="font-mono text-[11px] text-white/30">ZK9500</span>
                  </div>
                  <div className="text-center py-4">
                    <div className="font-mono text-[56px] font-extralight text-white/90 tracking-tight">
                      21:30<span className="text-white/30">:45</span>
                    </div>
                    <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.25em] text-teal-300/60">
                      Hora Oficial &middot; CENAM
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <Huella size={36} className="text-teal-400/60" />
                    <div>
                      <div className="text-[17px] font-semibold text-white/80">Esperando huella...</div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">Pon tu dedo en el lector</div>
                    </div>
                  </div>
                </div>
              </div>
              <CircuitLine />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-20">
            <div className="text-center">
              <div className="font-sans text-[42px] font-bold bg-gradient-to-b from-teal-300 to-teal-500 bg-clip-text text-transparent">100+</div>
              <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">Empresas activas</div>
            </div>
            <div className="text-center">
              <div className="font-sans text-[42px] font-bold bg-gradient-to-b from-teal-300 to-teal-500 bg-clip-text text-transparent">2022</div>
              <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/40">Operando desde</div>
            </div>
            <div className="hidden h-14 w-px bg-white/[0.08] sm:block" />
            {EMPRESAS.map(e => (
              <div key={e} className="font-mono text-[17px] font-bold uppercase tracking-[0.1em] text-white/30 hover:text-white/50 transition-colors">{e}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CARACTERISTICAS */}
      <section id="caracteristicas" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-teal-400/80">Por que Checador Legal</div>
            <h2 className="mt-4 font-sans text-[44px] font-bold tracking-tight">Lo que le importa al patron</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARACTERISTICAS.map((c, i) => (
              <Glow key={i} className="p-7">
                <div className="mb-5 text-[32px]">{c.icono}</div>
                <h3 className="font-sans text-[22px] font-semibold text-white/90">{c.titulo}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-white/50">{c.desc}</p>
              </Glow>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-teal-400/80">Fichas tecnicas</div>
            <h2 className="mt-4 font-sans text-[44px] font-bold tracking-tight">Productos y Precios</h2>
            <p className="mt-3 text-[17px] text-white/40">Instalacion y soporte incluidos en todas las licencias.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTOS.map(p => {
              const colores = {
                neutral: { border: '!border-white/[0.08]', glow: '', badge: '', btn: 'hover:bg-white/[0.1] hover:border-white/[0.15]', check: '#a1a1aa', price: 'from-white to-white/70' },
                ambar: { border: '!border-amber-400/25', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.07)]', badge: 'bg-amber-500 text-black', btn: 'hover:bg-amber-500 hover:text-black hover:border-amber-500', check: '#fbbf24', price: 'from-amber-200 to-amber-400/80' },
                teal: { border: '!border-teal-400/25', glow: 'shadow-[0_0_20px_rgba(45,212,191,0.07)]', badge: 'bg-teal-500 text-black', btn: 'hover:bg-teal-500 hover:text-black hover:border-teal-500', check: '#2dd4bf', price: 'from-teal-200 to-teal-400/80' },
              };
              const col = colores[p.color] || colores.neutral;
              return (
              <Glow key={p.id} className={`p-7 flex flex-col ${col.border} ${col.glow}`}>
                {p.tag && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full ${col.badge} px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]`}>
                    {p.tag}
                  </div>
                )}
                <div className="mb-4 text-[32px]">{p.icono}</div>
                <h3 className="font-sans text-[22px] font-semibold">{p.nombre}</h3>
                {p.sub && <div className="text-[17px] text-white/40 mt-0.5">{p.sub}</div>}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`font-sans text-[44px] font-bold bg-gradient-to-b ${col.price} bg-clip-text text-transparent`}>${p.precio.toLocaleString('es-MX')}</span>
                  <span className="font-mono text-[17px] text-white/30">{p.unidad}</span>
                </div>
                <p className="mt-3 text-[17px] leading-relaxed text-white/50">{p.desc}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.specs.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[17px] text-white/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={col.check} strokeWidth="3" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 space-y-3">
                  <button onClick={() => { agregarAlCarrito(p); setCheckoutAbierto(true); }}
                    className={`block w-full rounded-full bg-white/[0.06] py-3.5 text-center font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white/80 border border-white/[0.08] ${col.btn} transition-all`}>
                    Comprar Ahora
                  </button>
                  <button onClick={() => agregarAlCarrito(p)}
                    className="w-full rounded-full border border-white/[0.08] py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/50 hover:bg-white/[0.05] transition-colors">
                    + Agregar al Carrito
                  </button>
                </div>
              </Glow>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARADOR */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-teal-400/80">Comparador</div>
            <h2 className="mt-4 font-sans text-[44px] font-bold tracking-tight">Cual te conviene?</h2>
          </div>
          <Comparador />
        </div>
      </section>

      {/* SELLOS DE CONFIANZA */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SellosConfianza />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-teal-400/80">Testimonios</div>
            <h2 className="mt-4 font-sans text-[44px] font-bold tracking-tight">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {TESTIMONIOS.map((t, i) => (
              <Glow key={i} className="p-7">
                <div className="mb-4 flex gap-1 text-amber-400">
                  {[1,2,3,4,5].map(j => <span key={j} className="text-[17px]">&#9733;</span>)}
                </div>
                <p className="text-[17px] leading-relaxed text-white/60 italic">&ldquo;{t.texto}&rdquo;</p>
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <div className="font-semibold text-[17px]">{t.nombre}</div>
                  <div className="text-[17px] text-white/40">{t.cargo} &middot; {t.empresa}</div>
                </div>
              </Glow>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-16 text-center">
            <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-teal-400/80">Preguntas frecuentes</div>
            <h2 className="mt-4 font-sans text-[44px] font-bold tracking-tight">Tienes dudas?</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Glow key={i} className="overflow-hidden">
                <button onClick={() => setFaqAbierto(faqAbierto === i ? null : i)}
                  className="flex w-full items-center justify-between px-7 py-5 text-left font-sans text-[17px] font-semibold text-white/80 hover:bg-white/[0.02] transition-colors">
                  {f.q}
                  <span className={`ml-4 text-[22px] text-white/30 transition-transform duration-300 ${faqAbierto === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqAbierto === i && (
                  <div className="border-t border-white/[0.06] px-7 py-5 text-[17px] leading-relaxed text-white/50">{f.a}</div>
                )}
              </Glow>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/[0.06] blur-[100px]" />
          <div className="relative">
            <Huella size={56} className="mx-auto text-teal-400/60" />
            <h2 className="mt-8 font-sans text-[44px] font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Protege tu empresa antes del 1 de enero de 2027
            </h2>
            <p className="mt-5 text-[17px] text-white/40 max-w-xl mx-auto">
              La reforma ya esta publicada. La multa minima son $29,327 por trabajador.
              Un solo empleado sin registro te cuesta mas que 10 anos de licencia.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => scrollTo('productos')}
                className="rounded-full bg-teal-500 px-8 py-4 font-mono text-[17px] font-bold uppercase tracking-[0.12em] text-black hover:bg-teal-400 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all">
                Ver Precios
              </button>
              <a href="https://wa.me/5216462947308" target="_blank" rel="noopener"
                className="rounded-full border border-white/[0.12] px-8 py-4 font-mono text-[17px] font-bold uppercase tracking-[0.12em] text-white/70 hover:bg-white/[0.06] hover:text-white transition-all">
                Hablar con un Asesor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] bg-[#0a1710]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-teal-400/5 border border-teal-400/20">
                  <Huella size={22} className="text-teal-400" />
                </div>
                <div>
                  <div className="font-sans text-[17px] font-bold">Checador Legal</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Control de Jornada</div>
                </div>
              </div>
              <p className="mt-5 text-[17px] leading-relaxed text-white/40">
                Sistema de control de asistencia biometrico con validez juridica para PyMEs mexicanas.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">Contacto</h4>
              <div className="mt-5 space-y-3 text-[17px] text-white/50">
                <div>WhatsApp: <a href="https://wa.me/5216462947308" className="text-teal-300 hover:text-teal-200 transition-colors">646 294 7308</a></div>
                <div>Correo: <a href="mailto:actasadministrativasclickup@gmail.com" className="text-teal-300 hover:text-teal-200 transition-colors">actasadministrativasclickup@gmail.com</a></div>
                <div>Ensenada, Baja California, Mexico</div>
              </div>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">Legal</h4>
              <div className="mt-5 space-y-3 text-[17px] text-white/40">
                <div>Art. 132 fr. XXXIV LFT</div>
                <div>Hora oficial CENAM</div>
                <div>Encriptacion SHA-256</div>
                <div className="pt-3"><CircuitLine /></div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/[0.06] pt-8 text-center text-[17px] text-white/30">
            Desarrollado por Praxis &middot; Ensenada, B.C. &middot; &copy; 2022
          </div>
        </div>
      </footer>

      {/* CARRITO LATERAL */}
      {carritoAbierto && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md">
          <div className="flex h-full flex-col bg-[#142a20] border-l border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-teal-400/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="font-sans text-lg font-bold">Tu Carrito</span>
                {itemsCount > 0 && <span className="rounded-full bg-teal-400 px-2.5 py-0.5 font-mono text-[11px] font-bold text-black shadow-[0_0_10px_rgba(45,212,191,0.3)]">{itemsCount}</span>}
              </div>
              <button onClick={() => setCarritoAbierto(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors text-xl">&times;</button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {carrito.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Huella size={48} className="text-white/10" />
                  <p className="mt-4 font-sans text-lg font-semibold text-white/40">Carrito vacio</p>
                  <p className="mt-2 text-[17px] text-white/30">Agrega productos para comenzar tu pedido</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carrito.map(item => (
                    <Glow key={item.id} className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-[24px]">{item.icono}</span>
                          <div>
                            <div className="font-sans text-[17px] font-semibold">{item.nombre}</div>
                            {item.sub && <div className="text-[12px] text-white/40">{item.sub}</div>}
                            <div className="mt-1 font-mono text-[17px] text-white/50">${item.precio.toLocaleString('es-MX')} {item.unidad}</div>
                          </div>
                        </div>
                        <button onClick={() => quitarDelCarrito(item.id)} className="text-white/30 hover:text-red-400 transition-colors">&times;</button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => cambiarCantidad(item.id, -1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-white/50 hover:bg-white/5 transition-colors">&minus;</button>
                          <span className="w-8 text-center font-mono text-[17px]">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-white/50 hover:bg-white/5 transition-colors">+</button>
                        </div>
                        <div className="font-sans text-[17px] font-bold">${(item.precio * item.cantidad).toLocaleString('es-MX')}</div>
                      </div>
                    </Glow>
                  ))}
                </div>
              )}
            </div>
            {carrito.length > 0 && (
              <div className="border-t border-white/[0.06] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-lg font-semibold">Total</span>
                  <span className="font-sans text-[32px] font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">${total.toLocaleString('es-MX')} <span className="text-[17px] font-normal text-white/40">MXN</span></span>
                </div>
                <button onClick={() => { setCarritoAbierto(false); setCheckoutAbierto(true); }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 py-4 font-mono text-[17px] font-bold uppercase tracking-[0.12em] text-black hover:bg-teal-400 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all">
                  Proceder al Pago
                </button>
                <a href={generarPedidoWhatsApp()} target="_blank" rel="noopener"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-white/50 hover:bg-white/[0.05] transition-colors">
                  O pedir por WhatsApp
                </a>
                <p className="mt-3 text-center text-[12px] text-white/30">Pago seguro. Te contactamos para confirmar.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIMULADOR */}
      {simuladorAbierto && <Simulador onCerrar={() => setSimuladorAbierto(false)} />}

      {/* CHECKOUT MODAL */}
      {checkoutAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setCheckoutAbierto(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0f1f16] p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-2xl font-bold">Datos de tu Pedido</h2>
              <button onClick={() => setCheckoutAbierto(false)} className="text-white/60 hover:text-white text-2xl">&times;</button>
            </div>
            {pedidoExito ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-400/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-sans text-xl font-bold text-teal-300">Pedido Registrado</h3>
                <p className="mt-2 text-white/50">Folio: <span className="font-mono text-teal-300">{pedidoExito.folio}</span></p>
                <p className="mt-4 text-[14px] text-white/40">Te contactaremos por WhatsApp o correo para confirmar el pago y la instalacion.</p>
                {pedidoExito.link && (
                  <a href={pedidoExito.link} target="_blank" rel="noopener"
                    className="mt-6 block w-full rounded-full bg-teal-500 py-4 text-center font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-black hover:bg-teal-400 transition-all">
                    Pagar Ahora — ${pedidoExito.total?.toLocaleString('es-MX')} MXN
                  </a>
                )}
                <button onClick={() => { setCheckoutAbierto(false); setPedidoExito(null); setCarrito([]); setFormCliente({ nombre: '', empresa: '', telefono: '', email: '' }); }}
                  className="mt-3 w-full rounded-full border border-white/[0.1] py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-white/50 hover:bg-white/[0.05] transition-colors">
                  Pagar después
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <input type="text" placeholder="Nombre completo *" value={formCliente.nombre}
                    onChange={e => setFormCliente(p => ({ ...p, nombre: e.target.value }))}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-teal-400/50 focus:outline-none" />
                  <input type="text" placeholder="Empresa" value={formCliente.empresa}
                    onChange={e => setFormCliente(p => ({ ...p, empresa: e.target.value }))}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-teal-400/50 focus:outline-none" />
                  <input type="tel" placeholder="WhatsApp *" value={formCliente.telefono}
                    onChange={e => setFormCliente(p => ({ ...p, telefono: e.target.value }))}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-teal-400/50 focus:outline-none" />
                  <input type="email" placeholder="Correo electronico" value={formCliente.email}
                    onChange={e => setFormCliente(p => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder-white/30 focus:border-teal-400/50 focus:outline-none" />
                </div>
                <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="space-y-2">
                    {carrito.map(item => (
                      <div key={item.id} className="flex justify-between text-[14px]">
                        <span className="text-white/60">{item.nombre} {item.sub || ''} x{item.cantidad}</span>
                        <span className="font-mono">${(item.precio * item.cantidad).toLocaleString('es-MX')}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/[0.06] pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="font-mono text-teal-300">${total.toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>
                </div>
                <button
                  disabled={enviando || !formCliente.nombre || !formCliente.telefono}
                  onClick={async () => {
                    setEnviando(true);
                    const folio = `CLM-${Date.now().toString(36).toUpperCase()}`;
                    const ok = await guardarPedido({
                      folio,
                      cliente: formCliente.nombre,
                      empresa: formCliente.empresa || null,
                      telefono: formCliente.telefono,
                      email: formCliente.email || null,
                      productos: carrito.map(p => ({ id: p.id, nombre: `${p.nombre} ${p.sub || ''}`, precio: p.precio, cantidad: p.cantidad })),
                      total,
                      estado: 'pendiente',
                    });
                    setEnviando(false);
                    if (ok) {
                      const linkMP = carrito.length === 1 ? carrito[0].link : null;
                      setPedidoExito({ folio, link: linkMP, total });
                    } else alert('Error al guardar. Intenta por WhatsApp.');
                  }}
                  className="mt-6 w-full rounded-full bg-teal-500 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-black hover:bg-teal-400 disabled:opacity-30 transition-all">
                  {enviando ? 'Guardando...' : 'Confirmar Pedido'}
                </button>
                <p className="mt-3 text-center text-[12px] text-white/30">Al confirmar, te contactamos para el pago y la instalacion.</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* WHATSAPP FLOTANTE */}
      <a href="https://wa.me/5216462947308" target="_blank" rel="noopener"
        className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300"
        aria-label="Contactar por WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
