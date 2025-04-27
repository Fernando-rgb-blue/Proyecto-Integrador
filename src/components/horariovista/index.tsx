// este es la vista del horario general y con la opcion de descargar el horario como imágen

'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ScheduleItem {
  _id?: string;
  available: number;
  courses: {
    course: string;
    professor: string;
    activity: string;
    classroom: string;
    hours?: number;
  }[];
}

const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"] as const;
  const hours = [
    "07:00 AM a 08:00 AM", "08:00 AM a 09:00 AM", "09:00 AM a 10:00 AM",
    "10:00 AM a 11:00 AM", "11:00 AM a 12:00 PM", "12:00 PM a 01:00 PM",
    "01:00 PM a 02:00 PM", "02:00 PM a 03:00 PM",
    "03:00 PM a 04:00 PM", "04:00 PM a 05:00 PM",
    "05:00 PM a 06:00 PM", "06:00 PM a 07:00 PM",
    "07:00 PM a 08:00 PM", "08:00 PM a 09:00 PM",
  ] as const;
const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<Array<Array<ScheduleItem | null>>>(
    Array.from({ length: 14 }, () => Array(5).fill(null))
  );
  const [loading, setLoading] = useState(false);
  const [anio, setAnio] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [seccion, setSeccion] = useState('');
  const [horarioID, setHorarioID] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [docentes, setDocentes] = useState<any[]>([]);

  // Colores y mapeo curso->color
  const colors = [
    "bg-red-200", "bg-purple-300", "bg-green-200", "bg-blue-300",
    "bg-orange-200", "bg-pink-200", "bg-yellow-200",
  ];
  const courseColorMap: { [key: string]: string } = {};
  const getCourseColor = (courseName: string) => {
    const base = courseName.split('/')[0].trim();
    if (!courseColorMap[base]) {
      courseColorMap[base] = colors[Object.keys(courseColorMap).length % colors.length];
    }
    return courseColorMap[base];
  };

  // Opciones de filtro
  const optionsCiclo = {
    'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
    'II': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
  };
  const optionsSeccion = ['A', 'B'];
  const optionsAnio = ['2025','2026'];
  const optionsPeriodo = ['I', 'II'];
  const filteredCiclos = periodo ? optionsCiclo[periodo] : [];
  

  // Buscar horario
  const handleSearch = async () => {
    if (!anio || !periodo || !ciclo || !seccion) {
      setError('Por favor complete todos los campos');
      return;
    }
    try {
      const resp = await fetch('/api/cicloperiodo/search?' +
        new URLSearchParams({ anio, periodo, ciclo, seccion })
      );
      if (!resp.ok) throw new Error('Error al buscar el horario / El horario no exixste');
      const data = await resp.json();
      setHorarioID(data._id);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Error al buscar el horario');
      setHorarioID(null);
    }
  };

  // Efecto de carga de datos
  useEffect(() => {
    const template = { available: 0, courses: [{ course: '', professor: '', activity: '', classroom: '' }] };

    const createNewSchedule = async (id: string) => {
      const payload: any = { _id: id };
      // inicializo cada día con el template
      ['lunes','martes','miercoles','jueves','viernes'].forEach(day => {
        payload[day] = Array(hours.length).fill(template);
      });
      await axios.post('/api/scheduleadmin', payload);
      setSchedule(Array.from({ length: hours.length }, () => Array(days.length).fill(template)));
    };

    const mapScheduleData = (data: any) => {
      const grid = Array.from({ length: hours.length }, () => Array(days.length).fill(null));
      ['lunes','martes','miercoles','jueves','viernes'].forEach((day, di) => {
        data[day].forEach((itm: any, hi: number) => {
          if (hi < hours.length) grid[hi][di] = { available: itm.available, courses: itm.courses };
        });
      });
      return grid;
    };

    const fetchDocentes = async () => {
      try {
        const res = await fetch('/api/auth/signup');
        const data = await res.json();
        setDocentes(data.filter((u: any) => u.status === 'activo' && u.role !== 'admin'));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchSchedule = async () => {
      if (!horarioID) return;
      try {
        setLoading(true);
        const res = await axios.get(`/api/scheduleadmin/${horarioID}`);
        const data = res.data;
        const required = ['lunes','martes','miercoles','jueves','viernes'];
        const ok = required.every(d => data[d] && Array.isArray(data[d]));
        if (!ok) {
          await createNewSchedule(horarioID);
        } else {
          setSchedule(mapScheduleData(data));
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          await createNewSchedule(horarioID);
        } else {
          setError('Error al cargar: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
    fetchSchedule();
  }, [horarioID]); 


  const getNombreDocente = (id: string) => {
    const d = docentes.find(dc => dc._id === id);
    return d ? d.fullname : id;
  };


  // --- Fusión de celdas consecutivas con los mismos cursos ---
  const isSameCourse = (
    a: ScheduleItem['courses'][0], b: ScheduleItem['courses'][0]
  ) => a.course === b.course && a.professor === b.professor
    && a.activity === b.activity && a.classroom === b.classroom;

  const areSameCourseList = (
    listA: ScheduleItem['courses'],
    listB: ScheduleItem['courses']
  ) => listA.length === listB.length && listA.every((c, i) => isSameCourse(c, listB[i]));

  const computeSpans = () => {
    const rowCount = hours.length;
    const colCount = days.length;
    const spans = Array.from({ length: rowCount }, () => Array(colCount).fill(1));
    const skip = Array.from({ length: rowCount }, () => Array(colCount).fill(false));
    for (let di = 0; di < colCount; di++) {
      for (let hi = 0; hi < rowCount; hi++) {
        if (skip[hi][di]) continue;
        const cell = schedule[hi][di];
        if (cell?.available === 1 && cell.courses.length > 0) {
          let span = 1;
          const firstCourses = cell.courses;
          let j = hi + 1;
          while (j < rowCount) {
            const next = schedule[j][di];
            if (
              next?.available === 1 &&
              areSameCourseList(firstCourses, next.courses)
            ) {
              span++;
              j++;
            } else break;
          }
          spans[hi][di] = span;
          for (let k = hi + 1; k < hi + span; k++) skip[k][di] = true;
        }
      }
    }
    return { spans, skip };
  };

  const { spans, skip } = computeSpans();

  // Función para descargar imagen completa
  const handleDownload = async () => {
    // 1) Cargar html2canvas desde CDN si no está
    if (!window.html2canvas) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('No se pudo cargar html2canvas.'));
        document.body.appendChild(script);
      });
    }

    // 2) Seleccionar el div scrollable
    const original = document.querySelector('.overflow-x-auto') as HTMLElement;
    if (!original) {
      alert('No se encontró el horario para descargar.');
      return;
    }

    // 3) Clonar para quitar overflow y usar todo el ancho/alto
    const clone = original.cloneNode(true) as HTMLElement;
    const fullW = original.scrollWidth;
    const fullH = original.scrollHeight;

    clone.style.overflow = 'visible';
    clone.style.width = fullW + 'px';
    clone.style.height = fullH + 'px';
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    // 4) Renderizar el clon con html2canvas
    const canvas = await window.html2canvas(clone, { scrollX: 0, scrollY: 0 });
    document.body.removeChild(clone);

    // 5) Descargar la imagen pipipi
    const link = document.createElement('a');
    link.download = 'horario.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };



  return (
    <>
      <div className="container mx-auto p-4 pt-10">
        {/* Filtros */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="anio" className="block mb-2">Año</label>
            <select id="anio" value={anio} onChange={e => setAnio(e.target.value)} className="border rounded p-2 w-full">
              <option value="">Seleccione un año</option>
              {optionsAnio.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="periodo" className="block mb-2">Periodo</label>
            <select id="periodo" value={periodo} onChange={e => setPeriodo(e.target.value)} className="border rounded p-2 w-full">
              <option value="">Seleccione un periodo</option>
              {optionsPeriodo.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="ciclo-seccion" className="block mb-2">Ciclo - Sección</label>
            <select
              id="ciclo-seccion"
              value={`${ciclo}-${seccion}`}
              onChange={e => { const [c, s] = e.target.value.split('-'); setCiclo(c); setSeccion(s); }}
              className="border rounded p-2 w-full"
            >
              <option value="">Seleccione ciclo y sección</option>
              {filteredCiclos.map(c => optionsSeccion.map(s => (
                <option key={`${c}-${s}`} value={`${c}-${s}`}>{`${c} - ${s}`}</option>
              )))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">Buscar</button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {loading && <p className="text-blue-500 text-center">Cargando horario...</p>}

        {/* Tabla de Horario */}
        <div className="overflow-x-auto mt-10 mb-8 p-4 ">
          <div className="min-w-[800px] sm:min-w-[600px] dark:bg-dark">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${days.length+1}, minmax(120px,1fr))` }}>
              <div className="bg-blue-800 text-white p-3 border-[2px] border-gray-500 dark:border-black text-center font-bold">HORAS</div>
              {days.map(d => (
                <div key={d} className="bg-blue-800 text-white  p-3 border-[2px] border-gray-500 dark:border-black text-center font-bold">{d}</div>
              ))}

              {hours.map((hr, hi) => (
                <React.Fragment key={hi}>
                  <div className="p-2 text-center border-[2px] border-gray-500 dark:border-black text-sm flex items-center justify-center">{hr}</div>
                  {days.map((_, di) => {
                    if (skip[hi][di]) return null;
                    const cell = schedule[hi][di];
                    const span = spans[hi][di] || 1;
                    const style = span > 1 ? { gridRow: `span ${span}` } : {};
                    return (
                      <div
                        key={`${hi}-${di}`} style={style}
                        className={`h-full border-[2px] border-gray-500 dark:border-black whitespace-normal flex flex-wrap justify-center  text-sm ${
                          cell?.available === 1 ? getCourseColor(cell.courses[0].course) : ''
                        }`}>
                        {cell && cell.available === 1 ? (
                          cell.courses.map((c, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col justify-center items-center flex-1 min-w-0 p-1 text-xs ${getCourseColor(c.course)}`}>
                              <p className="text-center text-black text-xs break-all font-bold">{c.course}</p>
                              <p className="text-center text-black break-all">{getNombreDocente(c.professor)}</p>
                              <p className="text-center text-black break-all font-bold">{c.activity}</p>
                              <p className="text-center text-black break-all mb-2">{c.classroom}</p>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">-</span>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {/* BOTÓN DE DESCARGAR ABAJO */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-600 transition"
          >
            Descargar horario
          </button>
        </div>
      </div>
    </>
  );
};

export default ScheduleTable;

// Para TypeScript evite errores y no moleste =:v
declare global {
  interface Window {
    html2canvas?: any;
  }
}